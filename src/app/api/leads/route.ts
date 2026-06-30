import { NextRequest, NextResponse } from 'next/server';
import { storeLead } from '../../../lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { name, email, phone, category, company_size, budget, pain_points, matched_tools } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Nome, email e telefone são obrigatórios.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Formato de email inválido.' },
        { status: 400 }
      );
    }

    const result = await storeLead({
      name,
      email,
      phone,
      category: category || '',
      company_size: company_size || '',
      budget: budget || '',
      pain_points: pain_points || [],
      matched_tools: matched_tools || [],
      source: 'match-saas',
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Erro ao salvar lead.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[API/leads] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}
