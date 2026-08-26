import { useState, useEffect } from 'react'
import { ArrowRight, ArrowLeft, ShieldCheck, HeartPulse, Stethoscope, ChevronRight } from 'lucide-react'
import { diseases, type DiseaseInfo } from './data'

const MAIN_SITE_URL = "https://ucare.cl";
const SITE_URL = "https://consultas.ucare.cl";
const DEFAULT_TITLE = "Guía de Salud Sexual y Prevención de ITS | UCARE";
const DEFAULT_DESCRIPTION =
  "Información clara sobre síntomas, prevención y evaluación de ITS: clamidia, herpes genital, VPH, gonorrea, VIH, PrEP y PEP.";

function getDiseaseFromUrl(): DiseaseInfo | null {
  const topicId = new URLSearchParams(window.location.search).get("tema");
  return diseases.find((disease) => disease.id === topicId) ?? null;
}

function topicUrl(disease: DiseaseInfo | null): string {
  return disease ? `${SITE_URL}/?tema=${encodeURIComponent(disease.id)}` : `${SITE_URL}/`;
}

function setMetaContent(selector: string, content: string) {
  const element = document.querySelector<HTMLMetaElement>(selector);
  if (element) element.content = content;
}

function App() {
  const [selectedDisease, setSelectedDisease] = useState<DiseaseInfo | null>(() => getDiseaseFromUrl());

  const selectDisease = (disease: DiseaseInfo) => {
    const url = new URL(window.location.href);
    url.searchParams.set("tema", disease.id);
    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    setSelectedDisease(disease);
  };

  const returnToTopics = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("tema");
    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    setSelectedDisease(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedDisease]);

  useEffect(() => {
    const handlePopState = () => setSelectedDisease(getDiseaseFromUrl());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const title = selectedDisease
      ? `${selectedDisease.title}: síntomas, prevención y evaluación | UCARE`
      : DEFAULT_TITLE;
    const description = selectedDisease
      ? `Conoce síntomas, prevención y cuándo solicitar una evaluación médica para ${selectedDisease.title.toLowerCase()}. Información educativa de UCARE.`
      : DEFAULT_DESCRIPTION;
    const canonicalUrl = topicUrl(selectedDisease);

    document.title = title;
    setMetaContent('meta[name="description"]', description);
    setMetaContent('meta[property="og:title"]', title);
    setMetaContent('meta[property="og:description"]', description);
    setMetaContent('meta[property="og:url"]', canonicalUrl);
    setMetaContent('meta[name="twitter:title"]', title);
    setMetaContent('meta[name="twitter:description"]', description);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = canonicalUrl;
  }, [selectedDisease]);

  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-burgundy)] font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
          <button
            type="button"
            onClick={returnToTopics}
            className="font-bold text-2xl text-[var(--color-primary)] flex items-center gap-2 cursor-pointer text-left"
            aria-label="Volver a la guía de salud sexual"
          >
            <HeartPulse className="h-6 w-6" />
            <span>Guía de Salud Sexual</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 md:py-12">
        {selectedDisease ? (
          <DiseaseDetail 
            disease={selectedDisease} 
            onBack={returnToTopics}
          />
        ) : (
          <HomeView onSelect={selectDisease} />
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

      <section aria-labelledby="temas-heading">
        <div className="mb-5 text-center">
          <h2 id="temas-heading" className="text-2xl font-bold">
            Guías sobre síntomas, prevención y evaluación de ITS
          </h2>
          <p className="mt-2 opacity-75">
            Selecciona un tema para conocer información general y cuándo buscar orientación médica.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {diseases.map((disease) => (
          <a
            key={disease.id}
            href={`?tema=${disease.id}`}
            onClick={(event) => {
              event.preventDefault();
              onSelect(disease);
            }}
            className="group block bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-[var(--color-primary)]/20 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-primary)]"
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
          </a>
        ))}
        </div>
      </section>

      <section aria-labelledby="orientacion-heading" className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <h2 id="orientacion-heading" className="text-2xl font-bold">
            Orientación para prevenir ITS y cuidar tu salud sexual
          </h2>
          <p className="mt-2 opacity-75">
            La prevención combina información, métodos de barrera, vacunación cuando corresponda y controles de salud.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <article className="bg-white rounded-2xl p-6 border border-[var(--color-primary)]/10">
            <h3 className="font-bold text-lg mb-2">Reconoce cambios en tu cuerpo</h3>
            <p className="text-sm leading-relaxed opacity-80">
              Ardor al orinar, secreciones inusuales, lesiones, dolor pélvico o sangrado fuera de lo habitual son motivos para buscar orientación profesional.
            </p>
          </article>
          <article className="bg-white rounded-2xl p-6 border border-[var(--color-primary)]/10">
            <h3 className="font-bold text-lg mb-2">Los exámenes importan aunque no haya síntomas</h3>
            <p className="text-sm leading-relaxed opacity-80">
              Algunas ITS pueden no presentar señales visibles. La necesidad de pruebas depende de tus prácticas, antecedentes y una evaluación clínica.
            </p>
          </article>
          <article className="bg-white rounded-2xl p-6 border border-[var(--color-primary)]/10">
            <h3 className="font-bold text-lg mb-2">Actúa pronto ante una exposición al VIH</h3>
            <p className="text-sm leading-relaxed opacity-80">
              La PEP es una medida de urgencia que debe iniciarse lo antes posible y, como máximo, dentro de 72 horas. Acude a un servicio de urgencia.
            </p>
          </article>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="max-w-3xl mx-auto">
        <div className="text-center mb-6">
          <h2 id="faq-heading" className="text-2xl font-bold">
            Preguntas frecuentes sobre ITS, PrEP y PEP
          </h2>
        </div>
        <div className="space-y-3">
          <details className="bg-white rounded-2xl p-5 border border-[var(--color-primary)]/10">
            <summary className="font-bold cursor-pointer">¿Todas las ITS producen síntomas?</summary>
            <p className="pt-3 text-sm leading-relaxed opacity-80">
              No. Algunas infecciones pueden no presentar síntomas, por lo que una evaluación y las pruebas indicadas por un profesional siguen siendo importantes.
            </p>
          </details>
          <details className="bg-white rounded-2xl p-5 border border-[var(--color-primary)]/10">
            <summary className="font-bold cursor-pointer">¿Cuándo conviene consultar por síntomas de una ITS?</summary>
            <p className="pt-3 text-sm leading-relaxed opacity-80">
              Consulta si notas lesiones, flujo o secreción inusual, ardor al orinar, dolor pélvico, sangrado fuera de lo habitual o si tuviste una exposición que te preocupa.
            </p>
          </details>
          <details className="bg-white rounded-2xl p-5 border border-[var(--color-primary)]/10">
            <summary className="font-bold cursor-pointer">¿Qué hago si tuve una exposición de riesgo al VIH?</summary>
            <p className="pt-3 text-sm leading-relaxed opacity-80">
              Busca atención de urgencia de inmediato. La profilaxis post-exposición (PEP) debe iniciarse lo antes posible y dentro de las 72 horas posteriores a la exposición.
            </p>
          </details>
          <details className="bg-white rounded-2xl p-5 border border-[var(--color-primary)]/10">
            <summary className="font-bold cursor-pointer">¿Qué es la PrEP?</summary>
            <p className="pt-3 text-sm leading-relaxed opacity-80">
              La profilaxis pre-exposición (PrEP) es una estrategia de prevención del VIH que requiere evaluación, indicación y seguimiento profesional.
            </p>
          </details>
          <details className="bg-white rounded-2xl p-5 border border-[var(--color-primary)]/10">
            <summary className="font-bold cursor-pointer">¿El preservativo previene todas las ITS?</summary>
            <p className="pt-3 text-sm leading-relaxed opacity-80">
              Reduce de manera importante el riesgo de muchas ITS, pero no elimina todo el riesgo de infecciones transmitidas por contacto de piel. Las vacunas, los controles y la comunicación con las parejas también ayudan.
            </p>
          </details>
        </div>
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
