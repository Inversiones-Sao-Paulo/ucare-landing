export interface DiseaseInfo {
  id: string;
  title: string;
  shortDesc: string;
  symptoms: string[];
  treatment: string;
  prevention: string;
}

export const diseases: DiseaseInfo[] = [
  {
    id: "clamidia",
    title: "Clamidia",
    shortDesc: "Tratamiento efectivo y discreto con antibióticos de primera línea.",
    symptoms: ["Flujo vaginal o secreción del pene inusual", "Dolor o ardor al orinar", "Dolor durante las relaciones sexuales", "Sangrado entre periodos"],
    treatment: "La clamidia se trata fácilmente con antibióticos recetados. Es importante que tanto tú como tus parejas sexuales reciban tratamiento al mismo tiempo para evitar reinfecciones.",
    prevention: "Uso correcto y consistente del preservativo, y realizarse chequeos regulares de ITS."
  },
  {
    id: "herpes",
    title: "Herpes genital",
    shortDesc: "Antivirales para controlar brotes y reducir la frecuencia de episodios.",
    symptoms: ["Pequeñas ampollas o úlceras dolorosas en el área genital", "Picazón o ardor", "Dolor al orinar", "Síntomas similares a la gripe (fiebre, ganglios inflamados)"],
    treatment: "No existe cura, pero los medicamentos antivirales pueden prevenir o acortar los brotes, aliviar el dolor y reducir el riesgo de transmisión.",
    prevention: "Evitar el contacto sexual durante un brote activo y usar preservativos (aunque no protegen el 100% de las áreas expuestas)."
  },
  {
    id: "verrugas",
    title: "Verrugas genitales (VPH)",
    shortDesc: "Opciones tópicas para tratar verrugas causadas por VPH de forma segura.",
    symptoms: ["Pequeños bultos o grupos de bultos en la zona genital", "Picazón o incomodidad", "A veces, sangrado con el contacto sexual"],
    treatment: "Las verrugas pueden eliminarse mediante medicamentos tópicos, crioterapia (congelación) o procedimientos menores. El virus (VPH) puede permanecer en el cuerpo.",
    prevention: "Vacunación contra el VPH (altamente efectiva) y uso de preservativo."
  },
  {
    id: "gonorrea",
    title: "Gonorrea",
    shortDesc: "Tratamiento confidencial con antibióticos recomendados.",
    symptoms: ["Secreción espesa, amarilla o verde", "Dolor o ardor al orinar", "Dolor testicular", "Sangrado vaginal inusual"],
    treatment: "Se requiere tratamiento con antibióticos específicos (generalmente inyectables y orales). La resistencia a los antibióticos es una preocupación, por lo que se debe seguir estrictamente la indicación médica.",
    prevention: "Uso de preservativos en todas las prácticas sexuales."
  },
  {
    id: "ureaplasma",
    title: "Ureaplasma",
    shortDesc: "Tratamiento para Ureaplasma urealyticum o parvum bajo evaluación médica.",
    symptoms: ["A menudo asintomático", "Ardor al orinar", "Secreción inusual", "Dolor abdominal bajo"],
    treatment: "Tratamiento con antibióticos (como doxiciclina o azitromicina). El diagnóstico requiere pruebas de laboratorio específicas.",
    prevention: "Prácticas de sexo seguro y chequeos regulares, especialmente si se presentan molestias urinarias recurrentes."
  },
  {
    id: "candidiasis",
    title: "Candidiasis",
    shortDesc: "Tratamiento antifúngico para candidiasis genital recurrente o aguda.",
    symptoms: ["Picazón intensa", "Enrojecimiento e irritación", "Flujo vaginal espeso y blanco (similar al requesón)", "Ardor al orinar o durante el sexo"],
    treatment: "Antifúngicos recetados, ya sean cremas tópicas, óvulos o pastillas orales.",
    prevention: "Mantener la zona íntima seca, evitar ropa muy ajustada o húmeda, y no realizar duchas vaginales."
  },
  {
    id: "tricomonas",
    title: "Tricomonas",
    shortDesc: "Tratamiento bajo evaluación médica confidencial.",
    symptoms: ["Secreción vaginal espumosa, amarillenta o verdosa", "Mal olor", "Picazón o irritación severa", "Dolor al orinar"],
    treatment: "Tratamiento con antibióticos (metronidazol o tinidazol). Las parejas sexuales también deben recibir tratamiento.",
    prevention: "Uso de preservativos y pruebas regulares."
  },
  {
    id: "micoplasma",
    title: "Micoplasma",
    shortDesc: "Tratamiento para Mycoplasma genitalium bajo evaluación médica.",
    symptoms: ["Puede ser asintomático", "Ardor al orinar", "Secreción", "Dolor pélvico o sangrado poscoital"],
    treatment: "Requiere antibióticos de segunda línea, ya que M. genitalium ha desarrollado resistencia a varios tratamientos comunes.",
    prevention: "Uso de métodos de barrera durante el sexo."
  },
  {
    id: "vih",
    title: "VIH (Prevención y Urgencia)",
    shortDesc: "Información crucial sobre prevención (PrEP) y tratamiento de emergencia (PEP).",
    symptoms: ["En las primeras semanas: fiebre, fatiga, ganglios inflamados, dolor de garganta", "Fase asintomática prolongada", "Sin tratamiento, el sistema inmune se debilita"],
    treatment: "Aunque no hay cura, los antirretrovirales (TAR) permiten llevar una vida larga y saludable, volviendo el virus indetectable e intransmisible (I=I).\n\n**Urgencias (PEP):** Si tuviste una exposición de riesgo, debes iniciar el tratamiento de Profilaxis Post-Exposición (PEP) idealmente antes de las 72 horas para prevenir la infección.",
    prevention: "Uso de condón, profilaxis pre-exposición (PrEP) si estás en alto riesgo, y realizarse el examen de VIH regularmente."
  }
];
