import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  category: string;
  company_size: string;
  budget: string;
  pain_points: string[];
  matched_tools: string[];
  source: string;
  created_at?: string;
}

export async function storeLead(lead: LeadData): Promise<{ success: boolean; error?: string }> {
  if (!supabase) {
    console.log('[Lead] Supabase not configured — lead not stored:', lead.email);
    return { success: true };
  }

  try {
    const { error } = await supabase
      .from('leads')
      .insert([{
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        category: lead.category,
        company_size: lead.company_size,
        budget: lead.budget,
        pain_points: lead.pain_points,
        matched_tools: lead.matched_tools,
        source: lead.source,
        created_at: new Date().toISOString(),
      }]);

    if (error) {
      console.error('[Lead] Supabase insert error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('[Lead] Unexpected error:', err);
    return { success: false, error: 'Erro inesperado ao salvar lead' };
  }
}
