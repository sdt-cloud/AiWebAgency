/**
 * places-search.ts — Çoklu Kaynaklı İşletme Arama Motoru
 *
 * Sıra (fallback zinciri):
 *   1. Google Places API  — (ücretli, en zengin veri, varsa ilk denenir)
 *   2. Overpass API        — (ücretsiz, OpenStreetMap verisi, en güvenilir ücretsiz kaynak)
 *   3. Nominatim API       — (ücretsiz, OSM geocoder, son çare)
 *
 * Her sağlayıcı başarısız olursa bir sonraki otomatik devreye girer.
 * Tüm sağlayıcılar başarısız olursa boş dizi döner (asla sahte veri döndürmez).
 */

// ─── Ortak Arayüz ───────────────────────────────────────────────────────────

export interface PlaceResult {
  name: string;
  category: string;
  address: string;
  phone: string;
  rating: number;
  reviews_count: number;
  reviews: string[];
  has_website: boolean;
  website_url: string;
  place_id: string;
  source: 'google' | 'overpass' | 'nominatim';
}

// ─── Yardımcı Fonksiyonlar ──────────────────────────────────────────────────

/** Overpass QL injection koruması: Özel karakterleri escape eder */
function escapeOverpassValue(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/** Regex metacharacter escape: Overpass regex filtrelerinde güvenli kullanım */
function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ─── Türkçe Kategori → OSM Tag Eşleme Tablosu ─────────────────────────────

interface OsmTagQuery {
  /** Overpass tag filtresi parçaları  */
  overpassFilters: string[];
  /** Nominatim arama sorguları (Türkçe)  */
  nominatimQueries: string[];
}

const CATEGORY_OSM_MAP: Record<string, OsmTagQuery> = {
  'Çilingir': {
    overpassFilters: [
      '["shop"="locksmith"]',
      '["craft"="locksmith"]',
      '["craft"="key_cutting"]',
    ],
    nominatimQueries: ['çilingir', 'anahtar', 'locksmith'],
  },
  'Fırın & Ekmek': {
    overpassFilters: [
      '["shop"="bakery"]',
      '["craft"="bakery"]',
    ],
    nominatimQueries: ['fırın', 'ekmek fırını', 'bakery', 'unlu mamüller'],
  },
  'Oto Tamir & Elektrik': {
    overpassFilters: [
      '["shop"="car_repair"]',
      '["shop"="car"]',
      '["amenity"="car_wash"]',
      '["craft"="electronics_repair"]',
    ],
    nominatimQueries: ['oto tamir', 'oto elektrik', 'oto servis', 'car repair'],
  },
  'Çiçekçi': {
    overpassFilters: [
      '["shop"="florist"]',
    ],
    nominatimQueries: ['çiçekçi', 'çiçek', 'florist'],
  },
  'Terzi': {
    overpassFilters: [
      '["shop"="tailor"]',
      '["craft"="tailor"]',
      '["craft"="dressmaker"]',
    ],
    nominatimQueries: ['terzi', 'tailor', 'tadilat'],
  },
  'Restoran': {
    overpassFilters: [
      '["amenity"="restaurant"]',
    ],
    nominatimQueries: ['restoran', 'restaurant', 'lokanta'],
  },
  'Kafe': {
    overpassFilters: [
      '["amenity"="cafe"]',
    ],
    nominatimQueries: ['kafe', 'cafe', 'kahveci'],
  },
  'Berber & Kuaför': {
    overpassFilters: [
      '["shop"="hairdresser"]',
      '["shop"="barber"]',
    ],
    nominatimQueries: ['berber', 'kuaför', 'hairdresser', 'barber'],
  },
  'Diş Hekimi': {
    overpassFilters: [
      '["amenity"="dentist"]',
      '["healthcare"="dentist"]',
    ],
    nominatimQueries: ['diş hekimi', 'diş kliniği', 'dentist'],
  },
  'Kuru Temizleme': {
    overpassFilters: [
      '["shop"="dry_cleaning"]',
      '["shop"="laundry"]',
    ],
    nominatimQueries: ['kuru temizleme', 'çamaşırhane', 'laundry'],
  },
  'Tesisatçı': {
    overpassFilters: [
      '["craft"="plumber"]',
    ],
    nominatimQueries: ['tesisatçı', 'sıhhi tesisat', 'plumber'],
  },
  'Güzellik Salonu': {
    overpassFilters: [
      '["shop"="beauty"]',
      '["leisure"="beauty"]',
    ],
    nominatimQueries: ['güzellik salonu', 'beauty salon', 'güzellik merkezi'],
  },
};

// Eğer bilinmeyen bir kategori gelirse genel bir sorgu uygula
function getOsmMapping(category: string): OsmTagQuery {
  if (CATEGORY_OSM_MAP[category]) return CATEGORY_OSM_MAP[category];

  // Bilinmeyen kategori → genel arama (regex metachar'ları escape edilir)
  const keyword = category.toLowerCase().split(/[&,\/]/).map(s => s.trim()).filter(Boolean);
  return {
    overpassFilters: keyword.map(k => `["name"~"${escapeRegex(k)}",i]`),
    nominatimQueries: keyword,
  };
}

// ─── Google Places API Sağlayıcısı ─────────────────────────────────────────

const googleApiKey = process.env.GOOGLE_MAPS_API_KEY || '';

async function searchGooglePlaces(location: string, keyword: string): Promise<PlaceResult[]> {
  if (!googleApiKey) return [];

  console.log(`[Google Places] "${keyword}" in "${location}" aranıyor…`);

  const searchQuery = `${keyword} in ${location}`;
  const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${googleApiKey}`;

  const searchRes = await fetch(searchUrl);
  const searchData = await searchRes.json();

  if (searchData.status !== 'OK' && searchData.status !== 'ZERO_RESULTS') {
    throw new Error(`Google Places hata: ${searchData.status} - ${searchData.error_message || ''}`);
  }

  const places = searchData.results || [];
  const results: PlaceResult[] = [];

  for (const place of places.slice(0, 10)) {
    try {
      const detailUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_phone_number,website,rating,user_ratings_total,reviews,formatted_address,types&key=${googleApiKey}`;

      const detailRes = await fetch(detailUrl);
      const detailData = await detailRes.json();

      if (detailData.status === 'OK') {
        const r = detailData.result;
        const reviews: string[] = (r.reviews || []).map((rv: any) => rv.text).filter(Boolean);

        let category = keyword;
        if (r.types && r.types.length > 0) {
          category = r.types[0].replace(/_/g, ' ');
          category = category.charAt(0).toUpperCase() + category.slice(1);
        }

        results.push({
          name: r.name,
          category,
          address: r.formatted_address || '',
          phone: r.formatted_phone_number || '',
          rating: r.rating || 0,
          reviews_count: r.user_ratings_total || 0,
          reviews,
          has_website: !!r.website,
          website_url: r.website || '',
          place_id: place.place_id,
          source: 'google',
        });
      }
    } catch (detailErr) {
      console.error(`[Google Places] Detay hatası ${place.place_id}:`, detailErr);
    }
  }

  console.log(`[Google Places] ${results.length} sonuç bulundu.`);
  return results;
}

// ─── Overpass API Sağlayıcısı (OpenStreetMap) ───────────────────────────────

async function fetchOverpass(query: string): Promise<any[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    // URLSearchParams otomatik olarak form-urlencoded yapıya dönüştürür
    // ve Türkçe karakterleri doğru şekilde encode eder
    const body = new URLSearchParams();
    body.set('data', query);

    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'User-Agent': 'AI-Agency/1.0',
      },
      body: body.toString(),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorText = await res.text().catch(() => '');
      console.error(`[Overpass API] HTTP ${res.status}: ${errorText.slice(0, 200)}`);
      return [];
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('json')) {
      console.error(`[Overpass API] Beklenen JSON ama dönen: ${contentType}`);
      return [];
    }

    const data = await res.json();
    return data.elements || [];
  } catch (err: any) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.error('[Overpass API] Zaman aşımı (20s).');
    } else {
      console.error('[Overpass API] Fetch hatası:', err.message || err);
    }
    return [];
  }
}

async function searchOverpass(district: string, city: string, category: string): Promise<PlaceResult[]> {
  console.log(`[Overpass API] "${category}" in "${district}, ${city}" aranıyor…`);

  const mapping = getOsmMapping(category);

  const nwrClauses = mapping.overpassFilters
    .map(filter => `nwr(area.searchArea)${filter};`)
    .join('');

  // 1. İlçe seviyesinde ara (injection korumalı)
  const safeDistrict = escapeOverpassValue(district);
  const safeCity = escapeOverpassValue(city);
  const districtQuery = `[out:json][timeout:15];area["name"="${safeDistrict}"]["admin_level"~"[6-9]"]->.searchArea;(${nwrClauses});out center 15;`;
  let elements = await fetchOverpass(districtQuery);

  // 2. İlçede sonuç yoksa şehir genelinde dene
  if (elements.length === 0) {
    console.log(`[Overpass API] İlçe seviyesinde sonuç yok, "${city}" genelinde aranıyor…`);
    const cityQuery = `[out:json][timeout:15];area["name"="${safeCity}"]["admin_level"~"[4-6]"]->.searchArea;(${nwrClauses});out center 15;`;
    elements = await fetchOverpass(cityQuery);
  }

  const results: PlaceResult[] = elements
    .filter((el: any) => el.tags && el.tags.name)
    .slice(0, 15)
    .map((el: any, idx: number) => {
      const tags = el.tags;
      const addr = [
        tags['addr:street'],
        tags['addr:neighbourhood'],
        tags['addr:district'] || district,
        tags['addr:city'] || city,
      ].filter(Boolean).join(', ');

      return {
        name: tags.name,
        category: category,
        address: addr || `${district}, ${city}`,
        phone: tags.phone || tags['contact:phone'] || '',
        rating: 0,
        reviews_count: 0,
        reviews: [],
        has_website: !!(tags.website || tags['contact:website']),
        website_url: tags.website || tags['contact:website'] || '',
        place_id: `osm_${el.type}_${el.id}`,
        source: 'overpass' as const,
      };
    });

  console.log(`[Overpass API] ${results.length} sonuç bulundu.`);
  return results;
}

// ─── Nominatim API Sağlayıcısı (Son Çare) ──────────────────────────────────

async function searchNominatim(district: string, city: string, category: string): Promise<PlaceResult[]> {
  console.log(`[Nominatim API] "${category}" in "${district}, ${city}" aranıyor…`);

  const mapping = getOsmMapping(category);
  const allResults: PlaceResult[] = [];

  // Birden fazla Türkçe terim dene, ilk sonuç veren ile devam et
  for (const queryTerm of mapping.nominatimQueries) {
    if (allResults.length >= 5) break;

    try {
      const searchQuery = `${queryTerm} ${district} ${city}`;
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=jsonv2&addressdetails=1&limit=10`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(url, {
        headers: { 'User-Agent': 'AI-Agency-System/1.0 (contact: sedat@ai-agency.dev)' },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json();

      if (data && data.length > 0) {
        for (const place of data) {
          if (!place.name) continue;
          // Çift kayıt engelle
          if (allResults.some(r => r.name === place.name)) continue;

          const addr = place.address || {};
          const addressString = [addr.road, addr.suburb, addr.town || addr.city_district, addr.city].filter(Boolean).join(', ');

          allResults.push({
            name: place.name,
            category: category,
            address: addressString || place.display_name,
            phone: '',
            rating: 0,
            reviews_count: 0,
            reviews: [],
            has_website: false,
            website_url: '',
            place_id: `nom_${place.place_id}`,
            source: 'nominatim',
          });
        }
      }
    } catch (err) {
      console.error(`[Nominatim API] "${queryTerm}" sorgusu başarısız:`, err);
    }

    // Nominatim rate limit: 1 istek/saniye
    if (mapping.nominatimQueries.indexOf(queryTerm) < mapping.nominatimQueries.length - 1) {
      await new Promise(r => setTimeout(r, 1100));
    }
  }

  console.log(`[Nominatim API] ${allResults.length} sonuç bulundu.`);
  return allResults;
}

// ─── Ana Arama Fonksiyonu (Fallback Zinciri) ────────────────────────────────

export interface SearchResult {
  places: PlaceResult[];
  source: string;
  totalScanned: number;
}

export async function searchPlaces(location: string, keyword: string): Promise<SearchResult> {
  // location formatı: "İlçe, Şehir"
  const parts = location.split(',').map(s => s.trim());
  const district = parts[0] || '';
  const city = parts[1] || parts[0] || '';

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`🔍 İşletme Arama Başlatıldı: "${keyword}" → ${district}, ${city}`);
  console.log(`${'═'.repeat(60)}`);

  // 1. Google Places (varsa)
  if (googleApiKey) {
    try {
      const googleResults = await searchGooglePlaces(location, keyword);
      if (googleResults.length > 0) {
        console.log(`✅ Google Places: ${googleResults.length} sonuç döndü.`);
        return { places: googleResults, source: 'Google Places API', totalScanned: googleResults.length };
      }
      console.log(`⚠️  Google Places sonuç döndürmedi, Overpass'a geçiliyor…`);
    } catch (err) {
      console.error(`❌ Google Places başarısız:`, err);
    }
  } else {
    console.log(`ℹ️  Google Maps API anahtarı yok, ücretsiz kaynaklara geçiliyor…`);
  }

  // 2. Overpass API (birincil ücretsiz)
  try {
    const overpassResults = await searchOverpass(district, city, keyword);
    if (overpassResults.length > 0) {
      console.log(`✅ Overpass API: ${overpassResults.length} sonuç döndü.`);
      return { places: overpassResults, source: 'OpenStreetMap (Overpass)', totalScanned: overpassResults.length };
    }
    console.log(`⚠️  Overpass sonuç döndürmedi, Nominatim'e geçiliyor…`);
  } catch (err) {
    console.error(`❌ Overpass başarısız:`, err);
  }

  // 3. Nominatim API (son çare)
  try {
    const nominatimResults = await searchNominatim(district, city, keyword);
    if (nominatimResults.length > 0) {
      console.log(`✅ Nominatim: ${nominatimResults.length} sonuç döndü.`);
      return { places: nominatimResults, source: 'OpenStreetMap (Nominatim)', totalScanned: nominatimResults.length };
    }
  } catch (err) {
    console.error(`❌ Nominatim başarısız:`, err);
  }

  console.log(`⛔ Tüm sağlayıcılar sonuçsuz. Boş dizi döndürülüyor.`);
  return { places: [], source: 'none', totalScanned: 0 };
}

// ─── Durum Raporu ───────────────────────────────────────────────────────────

export const placesSearchStatus = {
  hasGoogleKey: !!googleApiKey,
  providers: googleApiKey
    ? ['Google Places', 'Overpass (OSM)', 'Nominatim (OSM)']
    : ['Overpass (OSM)', 'Nominatim (OSM)'],
};
