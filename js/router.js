/**
 * POLSO - Enrutador SPA (Single Page Application Router)
 * Gestiona la navegación basada en Hash (#/) sin recargas de página:
 * Mapea cada opción del menú desplegable a una vista completamente funcional.
 */

window.Polso = window.Polso || {};

(function () {
  const Router = {
    currentRoute: '',

    init() {
      window.addEventListener('hashchange', () => this.route());
      window.addEventListener('DOMContentLoaded', () => this.route());
    },

    route() {
      const hash = window.location.hash || '#/portada';
      this.currentRoute = hash;

      const mainContent = document.getElementById('main-content');
      if (!mainContent) return;

      // Cerrar menú móvil si está abierto
      if (window.Polso.App && window.Polso.App.closeMobileMenu) {
        window.Polso.App.closeMobileMenu();
      }

      // Desplazamiento suave al inicio de página
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Análisis de ruta y parámetros
      const cleanHash = hash.replace(/^#\/?/, '');
      const [path, queryString] = cleanHash.split('?');
      const segments = path.split('/').filter(Boolean);

      let html = '';
      let pageTitle = 'POLSO - Periodismo Político y Opinión';

      try {
        if (segments.length === 0 || segments[0] === 'portada') {
          html = Polso.Views.Home.render();
          pageTitle = 'POLSO | El pulso del poder, la política y la opinión independiente';
        } else if (segments[0] === 'articulo' && segments[1]) {
          html = Polso.Views.Article.render(segments[1]);
          const art = Polso.Store.getArticleById(segments[1]);
          if (art) pageTitle = `${art.title} | POLSO`;
        } else if (segments[0] === 'opinion') {
          html = Polso.Views.Opinion.render(segments[1]);
          pageTitle = 'Opinión y Columnistas | POLSO';
        } else if (segments[0] === 'columnistas') {
          html = Polso.Views.Columnists.renderDirectory();
          pageTitle = 'Nuestros Columnistas | POLSO';
        } else if (segments[0] === 'columnista' && segments[1]) {
          html = Polso.Views.Columnists.renderProfile(segments[1]);
          const col = Polso.Store.getColumnistById(segments[1]);
          if (col) pageTitle = `${col.name} - Perfil y Columnas | POLSO`;
        } else if (segments[0] === 'videos') {
          html = Polso.Views.Videos.render(segments[1]);
          pageTitle = 'POLSO en Video | Análisis y Entrevistas Audiovisuales';
        } else if (segments[0] === 'categoria' && segments[1]) {
          html = Polso.Views.Category.render(segments[1]);
          pageTitle = `${segments[1].replace(/-/g, ' ').toUpperCase()} | POLSO`;
        } else if (segments[0] === 'ultimas') {
          html = Polso.Views.Category.render('ultimas');
          pageTitle = 'Últimas Publicaciones | POLSO';
        } else if (segments[0] === 'destacados') {
          html = Polso.Views.Category.render('destacados');
          pageTitle = 'Contenido Destacado | POLSO';
        } else if (segments[0] === 'analisis') {
          const sub = segments[1] || 'analisis-politico';
          html = Polso.Views.Category.render(sub);
          pageTitle = 'Análisis Político & Contexto | POLSO';
        } else if (segments[0] === 'especiales') {
          html = Polso.Views.Especiales.render(segments[1] || 'todos');
          pageTitle = 'Especiales e Investigaciones | POLSO';
        } else if (segments[0] === 'nosotros') {
          html = Polso.Views.Nosotros.render(segments[1] || 'quienes-somos');
          pageTitle = 'Nosotros & Sala de Redacción | POLSO';
        } else if (segments[0] === 'buscar') {
          html = Polso.Views.Search.render(queryString);
          pageTitle = 'Buscador de Publicaciones | POLSO';
        } else if (segments[0] === 'admin') {
          html = Polso.Views.Admin.render();
          pageTitle = 'Panel Editorial CMS | POLSO';
        } else {
          // Fallback a portada si ruta no existe
          html = Polso.Views.Home.render();
        }
      } catch (err) {
        console.error('Error rendering view:', err);
        html = `
          <div class="max-w-xl mx-auto py-20 px-4 text-center">
            <h2 class="text-2xl font-bold font-serif-editorial text-[#213863] mb-2">Error al cargar la sección</h2>
            <p class="text-slate-500 text-sm mb-6">${err.message}</p>
            <a href="#/portada" class="bg-[#213863] text-white px-5 py-2.5 rounded-lg text-xs font-bold">Volver a Portada</a>
          </div>
        `;
      }

      mainContent.innerHTML = html;
      document.title = pageTitle;

      // Actualizar estado activo en navegación
      this.updateActiveNavLinks(cleanHash);
    },

    updateActiveNavLinks(currentPath) {
      document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href') || '';
        const cleanHref = href.replace(/^#\/?/, '');
        if (cleanHref && currentPath.startsWith(cleanHref)) {
          link.classList.add('text-[#F7C901]');
        } else {
          link.classList.remove('text-[#F7C901]');
        }
      });
    }
  };

  window.Polso.Router = Router;
})();
