/**
 * POLSO - Vista: Especiales Periodísticos e Investigaciones
 * Implementa las coberturas especiales requeridas en la Sección 3 del Menú:
 * - Especiales electorales
 * - Perfiles políticos
 * - Investigaciones a fondo
 * - Coberturas temáticas
 */

window.Polso = window.Polso || {};
window.Polso.Views = window.Polso.Views || {};

window.Polso.Views.Especiales = {
  render(subview) {
    const store = window.Polso.Store;
    const allArticles = store.getArticles();
    const sub = subview || 'todos';

    const specialMetadata = {
      'electorales': {
        title: 'Especiales Electorales',
        desc: 'Monitoreo de campañas, financiamiento de partidos, alianzas regionales y encuestas de opinión.',
        icon: 'fa-check-to-slot'
      },
      'perfiles': {
        title: 'Perfiles Políticos',
        desc: 'Radiografías humanas y de trayectoria de las personalidades que toman las decisiones de poder en Colombia y la región.',
        icon: 'fa-id-card'
      },
      'investigaciones': {
        title: 'Investigaciones de Fondo',
        desc: 'Periodismo de datos, seguimiento a la contratación del Estado y fiscalización del uso de recursos públicos.',
        icon: 'fa-magnifying-glass-chart'
      },
      'coberturas': {
        title: 'Coberturas Temáticas',
        desc: 'Dossiers multidisciplinarios sobre reformas estructurales, justicia transicional y política exterior.',
        icon: 'fa-folder-tree'
      },
      'todos': {
        title: 'Especiales & Investigaciones POLSO',
        desc: 'Grandes reportajes, dossieres exclusivos y perfiles en profundidad elaborados por nuestra unidad investigativa.',
        icon: 'fa-award'
      }
    };

    const meta = specialMetadata[sub] || specialMetadata['todos'];

    // Filtrar publicaciones especiales
    let articles = allArticles.filter(a => a.type === 'especial' || (a.category && a.category.includes('especial')));
    if (articles.length === 0) {
      articles = allArticles.slice(0, 4);
    }

    return `
      <div class="especiales-view max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- Breadcrumb -->
        <div class="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <a href="#/portada" class="hover:text-[#213863] font-bold">Inicio</a>
          <span>/</span>
          <span class="text-[#213863] font-bold uppercase">Especiales</span>
          ${sub !== 'todos' ? `<span>/</span><span class="text-slate-400 uppercase">${meta.title}</span>` : ''}
        </div>

        <!-- Encabezado con imagen de fondo editorial -->
        <header class="bg-[#172746] text-white rounded-2xl p-8 sm:p-12 mb-12 shadow-lg border-b-4 border-[#F7C901] relative overflow-hidden">
          <div class="relative z-10 max-w-3xl">
            <span class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#F7C901] bg-[#213863] px-3 py-1 rounded-sm mb-4">
              <i class="fa-solid ${meta.icon}"></i>
              Unidad de Investigaciones
            </span>
            <h1 class="text-3xl sm:text-5xl font-black font-serif-editorial mb-4 tracking-tight">
              ${meta.title}
            </h1>
            <p class="text-slate-200 text-base sm:text-lg leading-relaxed">
              ${meta.desc}
            </p>
          </div>
        </header>

        <!-- Subnavegación de especiales -->
        <div class="flex items-center gap-2 border-b border-slate-200 pb-4 mb-10 overflow-x-auto whitespace-nowrap">
          <a href="#/especiales" class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${sub === 'todos' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            Todos los especiales
          </a>
          <a href="#/especiales/electorales" class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${sub === 'electorales' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            Especiales electorales
          </a>
          <a href="#/especiales/perfiles" class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${sub === 'perfiles' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            Perfiles políticos
          </a>
          <a href="#/especiales/investigaciones" class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${sub === 'investigaciones' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            Investigaciones
          </a>
          <a href="#/especiales/coberturas" class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${sub === 'coberturas' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            Coberturas temáticas
          </a>
        </div>

        <!-- Mosaico de Grandes Reportajes -->
        <div class="space-y-10">
          ${articles.map((art, idx) => `
            <article class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div class="lg:col-span-6 relative aspect-video lg:aspect-auto">
                <img
                  src="${art.image}"
                  alt="${art.title}"
                  class="w-full h-full object-cover"
                  onerror="this.src='assets/images/lanzamiento.png'"
                >
                <div class="absolute top-4 left-4 bg-[#213863] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow">
                  ${art.categoryLabel}
                </div>
              </div>

              <div class="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span class="text-[#213863] font-bold">POLSO INVESTIGA</span>
                    <span>·</span>
                    <span>${art.date}</span>
                    <span>·</span>
                    <span>${art.readTime}</span>
                  </div>

                  <h2 class="text-2xl sm:text-3xl font-black font-serif-editorial text-[#213863] hover:text-[#172746] leading-tight mb-4">
                    <a href="#/articulo/${art.id}">
                      ${art.title}
                    </a>
                  </h2>

                  <p class="text-slate-600 text-base leading-relaxed mb-6 font-normal">
                    ${art.subtitle}
                  </p>
                </div>

                <div class="pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="text-xs font-bold text-slate-700">Por: ${art.authorName}</span>
                  </div>
                  <a
                    href="#/articulo/${art.id}"
                    class="bg-[#213863] hover:bg-[#172746] text-white px-5 py-2.5 rounded-lg text-xs font-bold inline-flex items-center gap-2 transition-colors"
                  >
                    <span>Explorar informe</span>
                    <i class="fa-solid fa-arrow-right text-[10px] text-[#F7C901]"></i>
                  </a>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </div>
    `;
  }
};
