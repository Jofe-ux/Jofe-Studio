/** Diccionario base (español). `en.ts` debe tener exactamente la misma forma. */
export const es = {
  a11y: {
    skip: 'Saltar al contenido',
    goHome: (brand: string) => `${brand}, ir al inicio`,
    mainNav: 'Principal',
    mobileNav: 'Menú móvil',
    footerNav: 'Pie de página',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    newTab: '(se abre en una pestaña nueva)',
    toLight: 'Cambiar a tema claro',
    toDark: 'Cambiar a tema oscuro',
    switchLang: 'Cambiar idioma a inglés',
  },
  nav: {
    inicio: 'Inicio',
    proyectos: 'Proyectos',
    'sobre-mi': 'Sobre mí',
    tecnologias: 'Tecnologías',
    contacto: 'Contacto',
  },
  cta: { talk: 'Hablemos' },
  hero: {
    explore: 'Explorar proyectos',
    contact: 'Contactarme',
    portraitAlt: (owner: string) =>
      `Retrato profesional de ${owner}, desarrollador de software, con traje negro y gafas oscuras`,
    indicators: {
      total: 'proyectos presentados',
      production: 'proyectos en producción',
      development: 'proyecto en desarrollo',
    },
  },
  status: {
    label: 'Estado de los proyectos',
    production: 'en producción',
    development: 'en desarrollo',
  },
  projects: {
    eyebrow: 'Proyectos',
    title: 'Proyectos que llevan ideas a producción.',
    description:
      'Una selección de soluciones digitales que he diseñado y desarrollado para diferentes necesidades y sectores.',
    meta: (total: number, production: number) => `${total} casos · ${production} en producción`,
    carouselLabel: 'Carrusel de proyectos',
    prev: 'Proyecto anterior',
    next: 'Proyecto siguiente',
    pause: 'Pausar avance automático',
    play: 'Reanudar avance automático',
    slide: (i: number, n: number) => `Proyecto ${i} de ${n}`,
    goTo: (i: number) => `Ir al proyecto ${i}`,
    view: 'Ver proyecto',
    opensIn: (name: string) => `(abre ${name} en una pestaña nueva)`,
    production: 'En producción',
    development: 'En desarrollo',
    comingSoon: 'PRÓXIMAMENTE',
    noDemo: 'En construcción · sin demo disponible',
    techOf: (name: string) => `Tecnologías de ${name}`,
    mockup: {
      building: 'en construcción',
      previewBuilding: 'Vista previa en construcción',
      pending: 'Captura pendiente',
    },
  },
  about: {
    eyebrow: 'Sobre mí',
    title: 'Más allá del código.',
    introBefore: 'Soy ',
    introAfter: ', desarrollador de software y responsable de ',
    body:
      'Me apasiona crear soluciones digitales que aporten valor a las personas y empresas. Disfruto participar en las diferentes etapas del desarrollo de software, desde el análisis y diseño hasta la programación, implementación y mejora continua.',
    pillars: [
      { title: 'Perfil profesional', text: 'Desarrollador de software y responsable de Jofe Studio.' },
      { title: 'Intereses tecnológicos', text: 'Aplicaciones web, plataformas y sistemas de gestión.' },
      { title: 'Enfoque de trabajo', text: 'Resolver problemas reales mediante tecnología que aporte valor a personas y empresas.' },
      { title: 'Fortalezas', text: 'Participación en todo el ciclo: análisis, diseño, programación, implementación y mejora continua.' },
    ],
    codeLabel: 'Resumen del perfil en formato de código',
    focus: ['web', 'plataformas', 'gestión'],
  },
  tech: {
    eyebrow: 'Tecnologías',
    title: 'Tecnologías que impulsan nuestras soluciones.',
    description: 'Lenguajes, frameworks y herramientas con las que diseñamos y construimos.',
  },
  contact: {
    eyebrow: 'Contacto',
    title: '¿Tienes un proyecto en mente?',
    description: 'Estamos abiertos a conectar, colaborar y desarrollar nuevas soluciones tecnológicas.',
    none: 'Los canales de contacto se publicarán muy pronto.',
    labels: { email: 'Correo', whatsapp: 'WhatsApp', github: 'GitHub', linkedin: 'LinkedIn' },
    linkedinValue: 'Perfil profesional',
  },
  footer: {
    navigation: 'Navegación',
    networks: 'Redes profesionales',
    developedBy: 'Desarrollado por',
    rights: 'Todos los derechos reservados.',
  },
}

export type Dict = typeof es
