'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { matchTools, getCategoryOptions, getPainPointOptions, MatchAnswers, ScoredTool } from '@/lib/matcher';
import { getCategoryLabel } from '@/lib/tools';
import { buildAffiliateUrl } from '@/config/affiliates';

interface LeadForm {
  name: string;
  email: string;
  phone: string;
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
              i + 1 <= current
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {i + 1}
          </div>
          {i < total - 1 && (
            <div
              className={`w-8 h-0.5 ${
                i + 1 < current ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default function MatchPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState<MatchAnswers>({
    category: '',
    companySize: '',
    budget: '',
    painPoints: [],
  });
  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: '',
    email: '',
    phone: '',
  });
  const [results, setResults] = useState<ScoredTool[] | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const categoryOptions = getCategoryOptions();
  const painPointOptions = getPainPointOptions();

  const handleCategorySelect = useCallback((value: string) => {
    setAnswers(prev => ({ ...prev, category: value }));
    setStep(2);
  }, []);

  const handleCompanySizeSelect = useCallback((value: string) => {
    setAnswers(prev => ({ ...prev, companySize: value }));
    setStep(3);
  }, []);

  const handleBudgetSelect = useCallback((value: string) => {
    setAnswers(prev => ({ ...prev, budget: value }));
    setStep(4);
  }, []);

  const handlePainPointToggle = useCallback((value: string) => {
    setAnswers(prev => ({
      ...prev,
      painPoints: prev.painPoints.includes(value)
        ? prev.painPoints.filter(p => p !== value)
        : [...prev.painPoints, value],
    }));
  }, []);

  const handleContinueToForm = useCallback(() => {
    setStep(5);
  }, []);

  const handleSubmit = useCallback(async () => {
    setError('');
    setSubmitting(true);

    try {
      const matched = matchTools(answers);
      setResults(matched);

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadForm,
          ...answers,
          matched_tools: matched.map(m => m.tool.slug),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        console.warn('[Match] Lead storage warning:', data.error);
      }

      setSubmitted(true);
    } catch (err) {
      console.error('[Match] Submit error:', err);
      setError('Ocurrió un error. Intenta nuevamente.');
    } finally {
      setSubmitting(false);
    }
  }, [answers, leadForm]);

  // ---- Step 1: Category ----
  if (step === 1) {
    return (
      <div className="flex flex-col min-h-[70vh]">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Encuentra el SaaS Ideal para Tu Empresa
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Responde 5 preguntas rápidas y descubre las 3 mejores herramientas para tu negocio.
              Análisis personalizado en menos de 2 minutos.
            </p>
          </div>
        </section>

        <section className="flex-1 max-w-2xl mx-auto px-4 py-12 w-full">
          <StepIndicator current={1} total={5} />

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¿En qué área necesitas software?
            </h2>
            <p className="text-gray-600 mb-8">
              Selecciona la categoría principal para encontrar las mejores opciones.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categoryOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleCategorySelect(option.value)}
                  className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group"
                >
                  <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition">
                    {option.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Ver herramientas →</div>
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ---- Step 2: Company Size ----
  if (step === 2) {
    return (
      <div className="flex flex-col min-h-[70vh]">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Encuentra el SaaS Ideal para Tu Empresa
            </h1>
          </div>
        </section>

        <section className="flex-1 max-w-2xl mx-auto px-4 py-12 w-full">
          <StepIndicator current={2} total={5} />

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                {getCategoryLabel(answers.category)}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¿Cuántos empleados tiene tu empresa?
            </h2>
            <p className="text-gray-600 mb-8">
              Esto nos ayuda a recomendar herramientas adecuadas a tu tamaño.
            </p>

            <div className="space-y-3">
              {[
                { value: '<10', label: 'Menos de 10', desc: 'Microempresa o autónomo' },
                { value: '10-50', label: '10 a 50 empleados', desc: 'Pequeña empresa' },
                { value: '50-200', label: '50 a 200 empleados', desc: 'Mediana empresa' },
                { value: '200+', label: 'Más de 200', desc: 'Gran empresa' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => handleCompanySizeSelect(option.value)}
                  className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group"
                >
                  <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-500">{option.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="mt-6 text-sm text-gray-500 hover:text-blue-600 transition"
            >
              ← Volver
            </button>
          </div>
        </section>
      </div>
    );
  }

  // ---- Step 3: Budget ----
  if (step === 3) {
    return (
      <div className="flex flex-col min-h-[70vh]">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Encuentra el SaaS Ideal para Tu Empresa
            </h1>
          </div>
        </section>

        <section className="flex-1 max-w-2xl mx-auto px-4 py-12 w-full">
          <StepIndicator current={3} total={5} />

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                {getCategoryLabel(answers.category)}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¿Cuál es el presupuesto mensual para software?
            </h2>
            <p className="text-gray-600 mb-8">
              Considera el valor que tu empresa puede invertir por mes en esta herramienta.
            </p>

            <div className="space-y-3">
              {[
                { value: 'ate-100', label: 'Hasta 100/mes', desc: 'Opciones gratuitas y básicas' },
                { value: '100-500', label: '100 a 500/mes', desc: 'Buena relación costo-beneficio' },
                { value: '500-2000', label: '500 a 2.000/mes', desc: 'Herramientas completas' },
                { value: '2000+', label: 'Más de 2.000/mes', desc: 'Soluciones enterprise' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => handleBudgetSelect(option.value)}
                  className="w-full text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group"
                >
                  <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-500">{option.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="mt-6 text-sm text-gray-500 hover:text-blue-600 transition"
            >
              ← Volver
            </button>
          </div>
        </section>
      </div>
    );
  }

  // ---- Step 4: Pain Points ----
  if (step === 4) {
    return (
      <div className="flex flex-col min-h-[70vh]">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Encuentra el SaaS Ideal para Tu Empresa
            </h1>
          </div>
        </section>

        <section className="flex-1 max-w-2xl mx-auto px-4 py-12 w-full">
          <StepIndicator current={4} total={5} />

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                {getCategoryLabel(answers.category)}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              ¿Cuáles son los mayores desafíos de tu empresa?
            </h2>
            <p className="text-gray-600 mb-8">
              Selecciona una o más opciones. Esto nos ayuda a priorizar las herramientas adecuadas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {painPointOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handlePainPointToggle(option.value)}
                  className={`text-left p-4 border-2 rounded-lg transition ${
                    answers.painPoints.includes(option.value)
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition ${
                        answers.painPoints.includes(option.value)
                          ? 'bg-blue-600 border-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {answers.painPoints.includes(option.value) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{option.label}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(3)}
                className="text-sm text-gray-500 hover:text-blue-600 transition"
              >
                ← Volver
              </button>
              <button
                onClick={handleContinueToForm}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Continuar →
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ---- Step 5: Lead Form ----
  if (step === 5 && !submitted) {
    return (
      <div className="flex flex-col min-h-[70vh]">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              ¡Último paso! Ve tus recomendaciones
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Completa tus datos para recibir el análisis personalizado con las 3 mejores herramientas.
            </p>
          </div>
        </section>

        <section className="flex-1 max-w-2xl mx-auto px-4 py-12 w-full">
          <StepIndicator current={5} total={5} />

          <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tus datos
            </h2>
            <p className="text-gray-600 mb-8">
              Tus datos están seguros. No compartimos con terceros.
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  id="name"
                  type="text"
                  value={leadForm.name}
                  onChange={e => setLeadForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Tu nombre"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Email profesional *
                </label>
                <input
                  id="email"
                  type="email"
                  value={leadForm.email}
                  onChange={e => setLeadForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="tu@empresa.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                  Teléfono / WhatsApp *
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={leadForm.phone}
                  onChange={e => setLeadForm(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+34 600 000 000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                {error}
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={() => setStep(4)}
                className="text-sm text-gray-500 hover:text-blue-600 transition"
              >
                ← Volver
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting || !leadForm.name || !leadForm.email || !leadForm.phone}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Analizando...' : 'Ver Resultados →'}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ---- Results ----
  if (submitted && results) {
    return (
      <div className="flex flex-col">
        <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-12">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              ¡Aquí están tus mejores opciones!
            </h1>
            <p className="text-lg text-green-100 max-w-2xl mx-auto">
              Según tus respuestas, estas son las 3 herramientas que mejor se adaptan a tu perfil.
            </p>
          </div>
        </section>

        <section className="py-16 max-w-4xl mx-auto px-4 w-full">
          <div className="space-y-8">
            {results.map((scored, index) => (
              <div
                key={scored.tool.slug}
                className={`bg-white border-2 rounded-xl p-8 shadow-sm ${
                  index === 0 ? 'border-yellow-400 ring-4 ring-yellow-50' : 'border-gray-200'
                }`}
              >
                {index === 0 && (
                  <div className="inline-flex items-center gap-1.5 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold mb-4">
                    🏆 Mejor Opción
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {scored.tool.name}
                    </h2>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="text-yellow-400 font-bold">★ {scored.tool.rating.toFixed(1)}</div>
                      <span className="text-sm text-gray-500">{getCategoryLabel(scored.tool.category)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{scored.score}%</div>
                    <div className="text-xs text-gray-500">Match</div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{scored.tool.description}</p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Por qué te lo recomendamos:</p>
                  <ul className="space-y-1">
                    {scored.reasons.map((reason, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-600 flex-shrink-0">✓</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <Link
                    href={`/ferramentas/${scored.tool.slug}`}
                    className="flex-1 text-center text-blue-600 font-semibold hover:text-blue-800 transition py-2"
                  >
                    Ver Detalles
                  </Link>
                  <a
                    href={buildAffiliateUrl(scored.tool.website_url, scored.tool.slug)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition py-2"
                  >
                    Visitar →
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/categorias"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Explorar Más Herramientas
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return null;
}
