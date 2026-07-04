import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Define TS Interfaces for our database entities
export interface Lead {
  id: string;
  name: string;
  category: string;
  address: string;
  phone: string;
  rating: number;
  reviews_count: number;
  reviews_summary: string;
  has_website: boolean;
  website_url: string;
  place_id: string;
  status: 'new' | 'generating' | 'ready' | 'contacted' | 'archived';
  created_at: string;
}

export interface GeneratedSite {
  id: string;
  lead_id: string;
  /**
   * Şablon adı — eski 3 şablon + yeni 28 şablon desteklenir.
   * Eski uyumluluk: 'business' | 'restaurant' | 'service'
   * Yeni şablonlar: 'cafe_warm' | 'barber_dark' | 'locksmith_urgent' | ... vb.
   * Tam liste: src/components/templates/template-types.ts → TemplateName
   */
  template_name: string;
  theme_config: {
    primary: string;
    secondary: string;
    fontFamily: string;
    fontFamilyHeading?: string;
    accent?: string;
  };
  content: {
    hero: {
      title: string;
      subtitle: string;
      cta_text: string;
      badge_text?: string;
    };
    about: string;
    services: Array<{ title: string; description: string; icon?: string }>;
    testimonials: Array<{ name: string; text: string; rating?: number }>;
    contact: {
      company_name?: string;
      phone: string;
      email: string;
      address: string;
      hours: string;
      whatsapp_message?: string;
    };
    images?: {
      hero_bg?: string;
      about_img?: string;
      services_img?: string;
      gallery?: string[];
      logo?: string;
    };
    /* Kategoriye özel alanlar (opsiyonel) */
    menu_items?: Array<{
      category: string;
      items: Array<{ name: string; description?: string; price: string }>;
    }>;
    price_list?: Array<{
      title: string;
      price: string;
      duration?: string;
      description?: string;
      is_popular?: boolean;
    }>;
    team_members?: Array<{
      name: string;
      role: string;
      image?: string;
      description?: string;
    }>;
    gallery_images?: Array<{
      src: string;
      alt: string;
      category?: string;
    }>;
    listings?: Array<{
      title: string;
      location: string;
      price: string;
      features: string;
      image?: string;
    }>;
  };
  edit_token: string;
  created_at: string;
  updated_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Detect if we should use Supabase or fall back to local file database
const useSupabase = supabaseUrl && supabaseKey;

// Path for local file-based database fallback
const LOCAL_DB_PATH = path.join(process.cwd(), 'local_db.json');

// Initialize Local DB if it doesn't exist
interface LocalStore {
  leads: Lead[];
  generated_sites: GeneratedSite[];
}

function getLocalStore(): LocalStore {
  try {
    if (!fs.existsSync(LOCAL_DB_PATH)) {
      const initialStore: LocalStore = { leads: [], generated_sites: [] };
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(initialStore, null, 2), 'utf-8');
      return initialStore;
    }
    const data = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(data) as LocalStore;
  } catch (error) {
    console.error('Error reading local database file:', error);
    return { leads: [], generated_sites: [] };
  }
}

function saveLocalStore(store: LocalStore) {
  try {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(store, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing local database file:', error);
  }
}

// Initialize Supabase client if keys are available
const supabase = useSupabase ? createClient(supabaseUrl, supabaseKey) : null;

if (useSupabase) {
  console.log('Using real Supabase Database');
} else {
  console.log('Supabase credentials missing. Running in LOCAL Mock Mode (saving to local_db.json)');
}

// Export database interface functions
export const db = {
  isMock: !useSupabase,

  // Leads DB Methods
  async getLeads(): Promise<Lead[]> {
    if (useSupabase && supabase) {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      const store = getLocalStore();
      return store.leads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  },

  async getLeadById(id: string): Promise<Lead | null> {
    if (useSupabase && supabase) {
      const { data, error } = await supabase.from('leads').select('*').eq('id', id).single();
      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }
      return data;
    } else {
      const store = getLocalStore();
      return store.leads.find((l) => l.id === id) || null;
    }
  },

  async saveLead(leadData: Omit<Lead, 'id' | 'created_at' | 'status'>): Promise<Lead> {
    if (useSupabase && supabase) {
      // Check if lead already exists by place_id
      const { data: existing } = await supabase.from('leads').select('*').eq('place_id', leadData.place_id).single();
      if (existing) return existing;

      const { data, error } = await supabase
        .from('leads')
        .insert([{ ...leadData, status: 'new' }])
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const store = getLocalStore();
      const existing = store.leads.find((l) => l.place_id === leadData.place_id);
      if (existing) return existing;

      const newLead: Lead = {
        ...leadData,
        id: crypto.randomUUID(),
        status: 'new',
        created_at: new Date().toISOString(),
      };
      store.leads.push(newLead);
      saveLocalStore(store);
      return newLead;
    }
  },

  async updateLeadStatus(id: string, status: Lead['status']): Promise<void> {
    if (useSupabase && supabase) {
      const { error } = await supabase.from('leads').update({ status }).eq('id', id);
      if (error) throw error;
    } else {
      const store = getLocalStore();
      const lead = store.leads.find((l) => l.id === id);
      if (lead) {
        lead.status = status;
        saveLocalStore(store);
      }
    }
  },

  // Generated Sites DB Methods
  async getSiteByLeadId(leadId: string): Promise<GeneratedSite | null> {
    if (useSupabase && supabase) {
      const { data, error } = await supabase.from('generated_sites').select('*').eq('lead_id', leadId).single();
      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    } else {
      const store = getLocalStore();
      return store.generated_sites.find((s) => s.lead_id === leadId) || null;
    }
  },

  async getSiteById(id: string): Promise<GeneratedSite | null> {
    if (useSupabase && supabase) {
      const { data, error } = await supabase.from('generated_sites').select('*').eq('id', id).single();
      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }
      return data;
    } else {
      const store = getLocalStore();
      return store.generated_sites.find((s) => s.id === id) || null;
    }
  },

  async saveSite(siteData: Omit<GeneratedSite, 'id' | 'edit_token' | 'created_at' | 'updated_at'>): Promise<GeneratedSite> {
    if (useSupabase && supabase) {
      // Check if site already exists
      const { data: existing } = await supabase.from('generated_sites').select('*').eq('lead_id', siteData.lead_id).single();
      
      if (existing) {
        // Update existing
        const { data, error } = await supabase
          .from('generated_sites')
          .update({
            template_name: siteData.template_name,
            theme_config: siteData.theme_config,
            content: siteData.content,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        return data;
      } else {
        // Insert new
        const { data, error } = await supabase
          .from('generated_sites')
          .insert([
            {
              ...siteData,
              edit_token: crypto.randomUUID(),
            },
          ])
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    } else {
      const store = getLocalStore();
      const existingIdx = store.generated_sites.findIndex((s) => s.lead_id === siteData.lead_id);
      
      if (existingIdx >= 0) {
        const updated: GeneratedSite = {
          ...store.generated_sites[existingIdx],
          template_name: siteData.template_name,
          theme_config: siteData.theme_config,
          content: siteData.content,
          updated_at: new Date().toISOString(),
        };
        store.generated_sites[existingIdx] = updated;
        saveLocalStore(store);
        return updated;
      } else {
        const newSite: GeneratedSite = {
          ...siteData,
          id: crypto.randomUUID(),
          edit_token: crypto.randomUUID(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        store.generated_sites.push(newSite);
        saveLocalStore(store);
        return newSite;
      }
    }
  },

  async updateSiteContent(id: string, content: GeneratedSite['content'], token: string): Promise<GeneratedSite> {
    if (useSupabase && supabase) {
      // Validate token first
      const { data: existing, error: fetchErr } = await supabase.from('generated_sites').select('edit_token').eq('id', id).single();
      if (fetchErr || !existing) throw new Error('Site not found');
      if (existing.edit_token !== token) throw new Error('Unauthorized: Invalid edit token');

      const { data, error } = await supabase
        .from('generated_sites')
        .update({
          content,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      const store = getLocalStore();
      const siteIdx = store.generated_sites.findIndex((s) => s.id === id);
      if (siteIdx === -1) throw new Error('Site not found');
      
      const site = store.generated_sites[siteIdx];
      if (site.edit_token !== token) throw new Error('Unauthorized: Invalid edit token');

      const updated: GeneratedSite = {
        ...site,
        content,
        updated_at: new Date().toISOString(),
      };
      store.generated_sites[siteIdx] = updated;
      saveLocalStore(store);
      return updated;
    }
  },

  async resetDatabase(): Promise<void> {
    if (useSupabase && supabase) {
      // Supabase deletes require a filter. Using neq with a mock UUID deletes everything.
      const { error: sitesErr } = await supabase
        .from('generated_sites')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      if (sitesErr) throw sitesErr;

      const { error: leadsErr } = await supabase
        .from('leads')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      if (leadsErr) throw leadsErr;
    } else {
      saveLocalStore({ leads: [], generated_sites: [] });
    }
  }
};
