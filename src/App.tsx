import { useState, useEffect } from 'react'
import { ArrowRight, ArrowLeft, ShieldCheck, HeartPulse, Stethoscope, ChevronRight } from 'lucide-react'
import { diseases, type DiseaseInfo } from './data'

const MAIN_SITE_URL = "https://ucare.cl";

function App() {
  const [selectedDisease, setSelectedDisease] = useState<DiseaseInfo | null>(null);

  // Scroll to top when changing views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedDisease]);

  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-burgundy)] font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
          <div className="font-bold text-2xl text-[var(--color-primary)] flex items-center gap-2 cursor-pointer" onClick={() => setSelectedDisease(null)}>
            <HeartPulse className="h-6 w-6" />
            <span>Guía de Salud Sexual</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {selectedDisease ? (
          <DiseaseDetail 
            disease={selectedDisease} 
            onBack={() => setSelectedDisease(null)} 
          />
        ) : (
          <HomeView onSelect={setSelectedDisease} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-burgundy)] text-white mt-12 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center text-sm opacity-80 space-y-4">
          <p>
            La información contenida en esta página tiene fines exclusivamente educativos e informativos. 
            No sustituye el consejo, diagnóstico o tratamiento médico profesional.
          </p>
          <p>© {new Date().getFullYear()} Guía de Salud Sexual. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

function HomeView({ onSelect }: { onSelect: (d: DiseaseInfo) => void }) {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Información confiable para tu <span className="text-[var(--color-primary)]">salud íntima</span>
        </h1>
        <p className="text-lg opacity-80">
          Conocer los síntomas, tratamientos y formas de prevención de las Infecciones de Transmisión Sexual (ITS) es el primer paso para cuidar de ti y de tus parejas.
        </p>
        <div className="pt-4">
          <a 
            href={MAIN_SITE_URL}
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-wine)] transition-colors shadow-md hover:shadow-lg text-lg"
          >
            Evaluarme
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {diseases.map((disease) => (
          <div 
            key={disease.id}
            onClick={() => onSelect(disease)}
            className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[var(--color-primary)]/20"
          >
            <h3 className="text-xl font-bold mb-2 text-[var(--color-primary)] group-hover:text-[var(--color-wine)] transition-colors">
              {disease.title}
            </h3>
            <p className="text-sm opacity-80 mb-6 min-h-[40px]">
              {disease.shortDesc}
            </p>
            <div className="flex justify-between items-center text-sm font-semibold text-[var(--color-burgundy)] group-hover:text-[var(--color-primary)] transition-colors">
              Leer más información
              <ChevronRight className="h-4 w-4" />
            </div>
          </div>
        ))}
      </section>

      <section className="bg-white rounded-3xl p-8 shadow-sm border border-[var(--color-primary)]/10 text-center max-w-3xl mx-auto">
        <ShieldCheck className="h-12 w-12 text-[var(--color-primary)] mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-4">¿Sientes alguna molestia o tuviste una exposición de riesgo?</h2>
        <p className="opacity-80 mb-6">
          La evaluación médica temprana es clave para un diagnóstico certero y un tratamiento efectivo. No esperes a que los síntomas empeoren.
        </p>
        <a 
          href={MAIN_SITE_URL}
          className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-6 py-3 rounded-full font-bold hover:bg-[var(--color-wine)] transition-colors"
        >
          Evaluarme
          <ArrowRight className="h-4 w-4" />
        </a>
      </section>
    </div>
  );
}

function DiseaseDetail({ disease, onBack }: { disease: DiseaseInfo, onBack: () => void }) {
  return (
    <div className="max-w-3xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium opacity-70 hover:opacity-100 transition-opacity mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a la lista
      </button>

      <article className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-[var(--color-primary)]/10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-primary)] mb-4">
          {disease.title}
        </h1>
        <p className="text-lg opacity-80 mb-8 pb-8 border-b border-gray-100">
          {disease.shortDesc}
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Stethoscope className="h-5 w-5 text-[var(--color-primary)]" />
              Síntomas comunes
            </h2>
            <ul className="list-disc pl-5 space-y-2 opacity-90">
              {disease.symptoms.map((sym, i) => (
                <li key={i}>{sym}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <HeartPulse className="h-5 w-5 text-[var(--color-primary)]" />
              Tratamiento
            </h2>
            <p className="opacity-90 whitespace-pre-wrap leading-relaxed">
              {disease.treatment}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <ShieldCheck className="h-5 w-5 text-[var(--color-primary)]" />
              Prevención
            </h2>
            <p className="opacity-90 whitespace-pre-wrap leading-relaxed">
              {disease.prevention}
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="font-semibold mb-4 text-lg">
            ¿Necesitas evaluación o tratamiento para {disease.title}?
          </p>
          <a 
            href={MAIN_SITE_URL}
            className="inline-flex items-center gap-2 bg-[var(--color-primary)] text-white px-8 py-4 rounded-full font-bold hover:bg-[var(--color-wine)] transition-colors shadow-md hover:shadow-lg"
          >
            Evaluarme
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </article>
    </div>
  );
}

export default App
