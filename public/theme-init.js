/* Se ejecuta antes de pintar para aplicar tema e idioma guardados (sin parpadeo).
   Es un archivo externo porque la CSP no permite scripts en línea. */
(function () {
  try {
    var root = document.documentElement
    var theme = localStorage.getItem('jofe-theme')
    root.dataset.theme = theme === 'light' ? 'light' : 'dark'

    var lang = localStorage.getItem('jofe-lang')
    if (lang !== 'es' && lang !== 'en') {
      lang = (navigator.language || 'es').toLowerCase().indexOf('en') === 0 ? 'en' : 'es'
    }
    root.lang = lang
  } catch (e) {
    document.documentElement.dataset.theme = 'dark'
  }
})()
