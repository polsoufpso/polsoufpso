/**
 * POLSO - Vista: Listado de Categorías y Secciones
 * Renderiza listados ordenados y filtrados para todas las secciones del menú:
 * - Política nacional, regional, local, internacional
 * - Gobierno y Congreso
 * - Elecciones
 * - Análisis y Especiales
 */

window.Polso = window.Polso || {};
window.Polso.Views = window.Polso.Views || {};

window.Polso.Views.Category = {
  render(categorySlug, subcategorySlug) {
    const store = window.Polso.Store;
    const allArticles = store.getArticles();

    // Mapeo amigable de slugs a títulos y descripciones editoriales
    const categoryMetadata = {
      'politica-nacional': {
        title: 'Política Nacional',
        desc: 'El pulso de las decisiones centrales, las reformas estructurales, los partidos y el equilibrio de poderes.',
        icon: 'fa-landmark'
      },
      'politica-regional': {
        title: 'Política Regional',
        desc: 'Gobernaciones, asambleas y el pulso de la descentralización fiscal en los departamentos.',
        icon: 'fa-map-location-dot'
      },
      'politica-local': {
        title: 'Política Local',
        desc: 'Alcaldías, concejos municipales y las dinámicas urbanas y comunitarias más cercanas al ciudadano.',
        icon: 'fa-city'
      },
      'politica-internacional': {
        title: 'Política Internacional',
        desc: 'Diplomacia, relaciones bilaterales, geopolítica hemisférica y acuerdos globales.',
        icon: 'fa-earth-americas'
      },
      'gobierno-congreso': {
        title: 'Gobierno y Congreso',
        desc: 'Seguimiento riguroso a las plenarias, comisiones constitucionales, debates de control político y proyectos de ley.',
        icon: 'fa-scale-balanced'
      },
      'elecciones': {
        title: 'Elecciones',
        desc: 'Cobertura electoral independiente, encuestas, mapas de intención de voto y perfiles de candidatos.',
        icon: 'fa-check-to-slot'
      },
      'analisis-politico': {
        title: 'Análisis Político',
        desc: 'Artículos de fondo y explicaciones metodológicas para descifrar las tendencias de poder.',
        icon: 'fa-chart-pie'
      },
      'politicas-publicas': {
        title: 'Políticas Públicas',
        desc: 'Evaluación técnica del impacto de los programas estatales, presupuesto y regulación social.',
        icon: 'fa-file-lines'
      },
      'ultimas': {
        title: 'Últimas Publicaciones',
        desc: 'Todas las noticias, análisis y columnas publicadas en orden cronológico inverso.',
        icon: 'fa-newspaper'
      },
      'destacados': {
        title: 'Contenido Destacado',
        desc: 'Las investigaciones e historias más relevantes seleccionadas por nuestro consejo editorial.',
        icon: 'fa-star'
      }
    };

    const meta = categoryMetadata[categorySlug] || {
      title: categorySlug.replace(/-/g, ' ').toUpperCase(),
      desc: 'Cobertura periodística e información especializada de POLSO.',
      icon: 'fa-folder-open'
    };

    // Filtrar artículos
    let articles = [];
    if (categorySlug === 'ultimas') {
      articles = [...allArticles].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (categorySlug === 'destacados') {
      articles = store.getFeaturedArticles();
    } else {
      articles = allArticles.filter(a => {
        return a.category === categorySlug ||
               (a.tags && a.tags.some(t => t.toLowerCase() === categorySlug.replace(/-/g, ' ')));
      });
      // Si la categoría específica no tiene artículos directos, mostrar afines
      if (articles.length === 0) {
        articles = allArticles.slice(0, 6);
      }
    }

    return `
      <div class="category-view max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- Breadcrumb -->
        <div class="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <a href="#/portada" class="hover:text-[#213863] font-bold">Inicio</a>
          <span>/</span>
          <span class="text-slate-400">Categoría</span>
          <span>/</span>
          <span class="text-[#213863] font-bold uppercase">${meta.title}</span>
        </div>

        <!-- Banner de Encabezado de Sección -->
        <header class="bg-gradient-to-r from-[#213863] to-[#172746] rounded-2xl p-8 sm:p-10 text-white mb-12 shadow-sm relative overflow-hidden">
          <div class="relative z-10 max-w-3xl">
            <div class="inline-flex items-center gap-2 bg-[#F7C901] text-[#213863] text-xs font-bold uppercase px-3 py-1 rounded-sm mb-4">
              <i class="fa-solid ${meta.icon}"></i>
              Sección Editorial
            </div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-editorial mb-4 tracking-tight">
              ${meta.title}
            </h1>
            <p class="text-slate-300 text-base sm:text-lg leading-relaxed">
              ${meta.desc}
            </p>
          </div>
          <div class="absolute -right-10 -bottom-10 opacity-10 text-white pointer-events-none hidden md:block">
            <i class="fa-solid ${meta.icon} text-[200px]"></i>
          </div>
        </header>

        <!-- Filtros y Contador de Artículos -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 mb-8 gap-4">
          <div class="text-sm text-slate-600">
            Mostrando <strong class="text-[#213863] font-bold">${articles.length}</strong> publicaciones en esta sección
          </div>
          <div class="flex items-center gap-2">
            <label class="text-xs text-slate-500 font-medium">Ordenar por:</label>
            <select
              onchange="Polso.Views.Category.sortArticles(this.value, '${categorySlug}')"
              class="text-xs border border-slate-300 rounded px-3 py-1.5 bg-white text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#213863]"
            >
              <option value="recientes">Más recientes primero</option>
              <option value="antiguos">Más antiguos primero</option>
            </select>
          </div>
        </div>

        <!-- Grid de Artículos -->
        ${articles.length === 0 ? `
          <div class="bg-white rounded-xl p-12 text-center border border-slate-200">
            <i class="fa-regular fa-newspaper text-4xl text-slate-400 mb-4"></i>
            <h3 class="text-xl font-bold font-serif-editorial text-[#213863] mb-2">No hay publicaciones disponibles en esta sección</h3>
            <p class="text-sm text-slate-500 mb-6">Nuestro equipo de redacción se encuentra preparando nuevos informes para este tema.</p>
            <a href="#/portada" class="bg-[#213863] text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-[#172746]">
              Explorar otras secciones
            </a>
          </div>
        ` : `
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${articles.map(article => `
              <article class="article-card flex flex-col justify-between group">
                <div>
                  <div class="relative overflow-hidden aspect-[16/10] bg-slate-100">
                    <img
                      src="${article.image}"
                      alt="${article.title}"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onerror="this.src='assets/images/diseno-1.png'"
                    >
                    <span class="absolute top-3 left-3 bg-[#213863] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                      ${article.categoryLabel}
                    </span>
                  </div>

                  <div class="p-5">
                    <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span>${article.date}</span>
                      <span class="flex items-center gap-1">
                        <i class="fa-regular fa-clock text-[10px]"></i>
                        ${article.readTime}
                      </span>
                    </div>

                    <h3 class="text-lg font-bold font-serif-editorial text-slate-900 group-hover:text-[#213863] leading-snug mb-2 line-clamp-2 transition-colors">
                      <a href="#/articulo/${article.id}">
                        ${article.title}
                      </a>
                    </h3>

                    <p class="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                      ${article.subtitle}
                    </p>
                  </div>
                </div>

                <div class="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="font-bold text-[#213863] flex items-center gap-1.5">
                    <i class="fa-solid fa-pen-nib text-[10px] text-[#F7C901]"></i>
                    ${article.authorName}
                  </span>
                  <a href="#/articulo/${article.id}" class="text-[#213863] font-bold hover:text-[#F7C901] flex items-center gap-1 transition-colors">
                    Leer <i class="fa-solid fa-chevron-right text-[10px]"></i>
                  </a>
                </div>
              </article>
            `).join('')}
          </div>
        `}
      </div>
    `;
  },

  sortArticles(order, slug) {
    // Reordenar mediante navegación o re-render
    Polso.App.toast(`Ordenando publicaciones: ${order === 'recientes' ? 'Más recientes' : 'Más antiguos'}`);
  }
};
