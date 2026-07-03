export interface City {
  name: string;
  districts: string[];
}

// Major cities are listed first as requested, then all other cities alphabetically.
export const turkeyData: City[] = [
  // Major Cities First
  {
    name: "İstanbul",
    districts: ["Kadıköy", "Beşiktaş", "Şişli", "Fatih", "Üsküdar", "Ataşehir", "Bakırköy", "Beyoğlu", "Sarıyer", "Kartal", "Maltepe", "Pendik", "Ümraniye", "Eyüpsultan", "Esenyurt", "Başakşehir", "Beylikdüzü"]
  },
  {
    name: "Ankara",
    districts: ["Çankaya", "Keçiören", "Yenimahalle", "Mamak", "Etimesgut", "Altındağ", "Sincan", "Gölbaşı", "Pursaklar"]
  },
  {
    name: "İzmir",
    districts: ["Konak", "Bornova", "Karşıyaka", "Buca", "Bayraklı", "Balçova", "Gaziemir", "Çiğli", "Karabağlar", "Narlıdere", "Urla", "Çeşme", "Aliağa", "Seferihisar", "Torbalı", "Menemen"]
  },
  {
    name: "Bursa",
    districts: ["Osmangazi", "Nilüfer", "Yıldırım", "Mudanya", "Gemlik", "İnegöl", "Karacabey", "Mustafakemalpaşa"]
  },
  {
    name: "Antalya",
    districts: ["Muratpaşa", "Konyaaltı", "Kepez", "Alanya", "Manavgat", "Kemer", "Serik", "Kaş", "Akseki"]
  },
  {
    name: "Muğla",
    districts: ["Bodrum", "Marmaris", "Fethiye", "Menteşe", "Milas", "Datça", "Ortaca", "Dalaman", "Yatağan"]
  },
  {
    name: "Kocaeli",
    districts: ["İzmit", "Gebze", "Darıca", "Körfez", "Gölcük", "Kartepe", "Başiskele", "Derince", "Dilovası"]
  },
  {
    name: "Adana",
    districts: ["Seyhan", "Çukurova", "Yüreğir", "Sarıçam", "Ceyhan", "Kozan"]
  },
  {
    name: "Gaziantep",
    districts: ["Şahinbey", "Şehitkamil", "Nizip", "Oğuzeli", "Islahiye"]
  },
  {
    name: "Trabzon",
    districts: ["Ortahisar", "Akçaabat", "Araklı", "Of", "Yomra", "Beşikdüzü", "Sürmene"]
  },

  // Alphabetical Cities (The remaining of 81)
  {
    name: "Adıyaman",
    districts: ["Merkez", "Kahta", "Besni", "Gölbaşı"]
  },
  {
    name: "Afyonkarahisar",
    districts: ["Merkez", "Sandıklı", "Dinar", "Bolvadin"]
  },
  {
    name: "Ağrı",
    districts: ["Merkez", "Patnos", "Doğubayazıt", "Diyadin"]
  },
  {
    name: "Aksaray",
    districts: ["Merkez", "Ortaköy", "Eskil"]
  },
  {
    name: "Amasya",
    districts: ["Merkez", "Merzifon", "Suluova", "Gümüşhacıköy"]
  },
  {
    name: "Ardahan",
    districts: ["Merkez", "Göle", "Posof"]
  },
  {
    name: "Artvin",
    districts: ["Merkez", "Hopa", "Arhavi", "Borçka"]
  },
  {
    name: "Aydın",
    districts: ["Efeler", "Kuşadası", "Didim", "Söke", "Nazilli", "Çine"]
  },
  {
    name: "Balıkesir",
    districts: ["Altıeylül", "Karesi", "Edremit", "Bandırma", "Ayvalık", "Erdek", "Burhaniye"]
  },
  {
    name: "Bartın",
    districts: ["Merkez", "Amasra", "Ulus"]
  },
  {
    name: "Batman",
    districts: ["Merkez", "Kozluk", "Beşiri"]
  },
  {
    name: "Bayburt",
    districts: ["Merkez", "Aydıntepe", "Demirözü"]
  },
  {
    name: "Bilecik",
    districts: ["Merkez", "Bozüyük", "Osmaneli", "Söğüt"]
  },
  {
    name: "Bingöl",
    districts: ["Merkez", "Genç", "Solhan"]
  },
  {
    name: "Bitlis",
    districts: ["Merkez", "Tatvan", "Ahlat", "Adilcevaz"]
  },
  {
    name: "Bolu",
    districts: ["Merkez", "Gerede", "Mudurnu", "Mengen"]
  },
  {
    name: "Burdur",
    districts: ["Merkez", "Bucak", "Gölhisar"]
  },
  {
    name: "Çanakkale",
    districts: ["Merkez", "Biga", "Gelibolu", "Çan", "Ezine", "Ayvacık"]
  },
  {
    name: "Çankırı",
    districts: ["Merkez", "Ilgaz", "Orta"]
  },
  {
    name: "Çorum",
    districts: ["Merkez", "Sungurlu", "Osmancık", "Alaca"]
  },
  {
    name: "Denizli",
    districts: ["Pamukkale", "Merkezefendi", "Acıpayam", "Tavas", "Buldan"]
  },
  {
    name: "Diyarbakır",
    districts: ["Kayapınar", "Bağlar", "Yenişehir", "Sur", "Ergani", "Bismil", "Silvan"]
  },
  {
    name: "Düzce",
    districts: ["Merkez", "Akçakoca", "Kaynaşlı", "Gölyaka"]
  },
  {
    name: "Edirne",
    districts: ["Merkez", "Keşan", "Uzunköprü", "İpsala"]
  },
  {
    name: "Elazığ",
    districts: ["Merkez", "Kovancılar", "Karakoçan", "Maden"]
  },
  {
    name: "Erzincan",
    districts: ["Merkez", "Tercan", "Üzümlü", "İliç"]
  },
  {
    name: "Erzurum",
    districts: ["Yakutiye", "Palandöken", "Aziziye", "Oltu", "Horasan"]
  },
  {
    name: "Eskişehir",
    districts: ["Odunpazarı", "Tepebaşı", "Sivrihisar", "Çifteler"]
  },
  {
    name: "Giresun",
    districts: ["Merkez", "Bulancak", "Espiye", "Görele", "Tirebolu"]
  },
  {
    name: "Gümüşhane",
    districts: ["Merkez", "Kelkit", "Şiran", "Köse"]
  },
  {
    name: "Hakkari",
    districts: ["Merkez", "Yüksekova", "Şemdinli", "Çukurca"]
  },
  {
    name: "Hatay",
    districts: ["Antakya", "Defne", "İskenderun", "Dörtyol", "Samandağ", "Kırıkhan", "Reyhanlı"]
  },
  {
    name: "Iğdır",
    districts: ["Merkez", "Aralık", "Tuzluca"]
  },
  {
    name: "Isparta",
    districts: ["Merkez", "Yalvaç", "Eğirdir", "Şarkikaraağaç"]
  },
  {
    name: "Kahramanmaraş",
    districts: ["Onikişubat", "Dulkadiroğlu", "Elbistan", "Afşin", "Pazarcık"]
  },
  {
    name: "Karabük",
    districts: ["Merkez", "Safranbolu", "Yenice"]
  },
  {
    name: "Karaman",
    districts: ["Merkez", "Ermenek", "Kazımkarabekir"]
  },
  {
    name: "Kars",
    districts: ["Merkez", "Sarıkamış", "Kağızman", "Selim"]
  },
  {
    name: "Kastamonu",
    districts: ["Merkez", "Tosya", "Taşköprü", "İnebolu"]
  },
  {
    name: "Kayseri",
    districts: ["Melikgazi", "Kocasinan", "Talas", "Develi", "Yahyalı"]
  },
  {
    name: "Kırıkkale",
    districts: ["Merkez", "Yahşihan", "Bahşılı", "Keskin"]
  },
  {
    name: "Kırklareli",
    districts: ["Merkez", "Lüleburgaz", "Babaeski", "Vize"]
  },
  {
    name: "Kırşehir",
    districts: ["Merkez", "Kaman", "Mucur"]
  },
  {
    name: "Kilis",
    districts: ["Merkez", "Elbeyli", "Musabeyli"]
  },
  {
    name: "Konya",
    districts: ["Selçuklu", "Meram", "Karatay", "Ereğli", "Akşehir", "Beyşehir", "Seydişehir"]
  },
  {
    name: "Kütahya",
    districts: ["Merkez", "Tavşanlı", "Simav", "Gediz"]
  },
  {
    name: "Malatya",
    districts: ["Battalgazi", "Yeşilyurt", "Doğanşehir", "Akçadağ"]
  },
  {
    name: "Manisa",
    districts: ["Yunusemre", "Şehzadeler", "Akhisar", "Turgutlu", "Salihli", "Soma", "Alaşehir"]
  },
  {
    name: "Mardin",
    districts: ["Artuklu", "Kızıltepe", "Midyat", "Nusaybin", "Derik"]
  },
  {
    name: "Mersin",
    districts: ["Yenişehir", "Mezitli", "Toroslar", "Akdeniz", "Tarsus", "Silifke", "Anamur", "Erdemli"]
  },
  {
    name: "Nevşehir",
    districts: ["Merkez", "Ürgüp", "Avanos", "Kozaklı", "Hacıbektaş"]
  },
  {
    name: "Niğde",
    districts: ["Merkez", "Bor", "Çiftlik"]
  },
  {
    name: "Ordu",
    districts: ["Altınordu", "Ünye", "Fatsa", "Perşembe"]
  },
  {
    name: "Osmaniye",
    districts: ["Merkez", "Kadirli", "Düziçi", "Bahçe"]
  },
  {
    name: "Rize",
    districts: ["Merkez", "Çayeli", "Ardeşen", "Pazar", "Fındıklı"]
  },
  {
    name: "Sakarya",
    districts: ["Adapazarı", "Serdivan", "Erenler", "Hendek", "Akyazı", "Karasu", "Sapanca"]
  },
  {
    name: "Samsun",
    districts: ["Atakum", "İlkadım", "Canik", "Bafra", "Çarşamba", "Vezirköprü"]
  },
  {
    name: "Siirt",
    districts: ["Merkez", "Kurtalan", "Baykan", "Eruh"]
  },
  {
    name: "Sinop",
    districts: ["Merkez", "Boyabat", "Gerze", "Ayancık"]
  },
  {
    name: "Sivas",
    districts: ["Merkez", "Şarkışla", "Yıldızeli", "Suşehri", "Divriği"]
  },
  {
    name: "Şanlıurfa",
    districts: ["Haliliye", "Eyyübiye", "Karaköprü", "Siverek", "Viranşehir", "Ceylanpınar", "Suruç", "Birecik"]
  },
  {
    name: "Şırnak",
    districts: ["Merkez", "Cizre", "Silopi", "İdil", "Uludere"]
  },
  {
    name: "Tekirdağ",
    districts: ["Süleymanpaşa", "Çorlu", "Çerkezköy", "Kapaklı", "Malkara", "Şarköy"]
  },
  {
    name: "Tokat",
    districts: ["Merkez", "Erbaa", "Turhal", "Niksar", "Zile"]
  },
  {
    name: "Tunceli",
    districts: ["Merkez", "Ovacık", "Hozat", "Pertek"]
  },
  {
    name: "Uşak",
    districts: ["Merkez", "Banaz", "Eşme", "Ulubey"]
  },
  {
    name: "Van",
    districts: ["İpekyolu", "Tuşba", "Edremit", "Erciş", "Gevaş", "Muradiye"]
  },
  {
    name: "Yalova",
    districts: ["Merkez", "Çiftlikköy", "Çınarcık", "Altınova"]
  },
  {
    name: "Yozgat",
    districts: ["Merkez", "Sorgun", "Akdağmadeni", "Yerköy"]
  },
  {
    name: "Zonguldak",
    districts: ["Merkez", "Ereğli", "Alaplı", "Çaycuma", "Devrek"]
  }
];

export const turkeyCategories = [
  "Çilingir",
  "Fırın & Ekmek",
  "Oto Tamir & Elektrik",
  "Çiçekçi",
  "Terzi",
  "Restoran",
  "Kafe",
  "Berber & Kuaför",
  "Diş Hekimi",
  "Kuru Temizleme",
  "Tesisatçı",
  "Güzellik Salonu"
];
