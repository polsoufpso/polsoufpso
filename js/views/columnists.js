/**
 * POLSO - Vista: Directorio de Columnistas y Perfil Individual
 * Implementa los requerimientos de la Sección 6 del Prompt Maestro:
 * - Directorio general con fotos, biografías y especialidades
 * - Perfil individual del columnista con todas sus columnas y artículos
 */

window.Polso = window.Polso || {};
window.Polso.Views = window.Polso.Views || {};

window.Polso.Views.Columnists = {
  // Directorio de todos los columnistas
  renderDirectory() {
    const store = window.Polso.Store;
    const columnists = store.getColumnists();

    return `
      <div class="columnists-directory-view max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- Breadcrumb -->
        <div class="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <a href="#/portada" class="hover:text-[#213863] font-bold">Inicio</a>
          <span>/</span>
          <a href="#/opinion" class="hover:text-[#213863] font-bold">Opinión</a>
          <span>/</span>
          <span class="text-[#213863] font-bold uppercase">Nuestros Columnistas</span>
        </div>

        <header class="bg-[#213863] text-white rounded-2xl p-8 sm:p-12 mb-12 shadow-sm border-b-4 border-[#F7C901]">
          <div class="max-w-3xl">
            <span class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#F7C901] bg-[#172746] px-3 py-1 rounded-sm mb-4">
              <i class="fa-solid fa-users"></i>
              Panel de Opinión & Análisis
            </span>
            <h1 class="text-3xl sm:text-5xl font-black font-serif-editorial mb-4 tracking-tight">
              Nuestros Columnistas
            </h1>
            <p class="text-slate-200 text-base sm:text-lg leading-relaxed">
              Un consejo plural de pensadores, juristas, economistas e investigadores que aportan criterio, rigor analítico e independencia al debate público.
            </p>
          </div>
        </header>

        <!-- Grid de Columnistas -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${columnists.map(col => {
            const articles = store.getArticlesByAuthor(col.id);
            return `
              <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div class="p-6">
                  <div class="flex items-center gap-4 mb-4">
                    <img
                      src="${col.avatar}"
                      alt="${col.name}"
                      class="w-20 h-20 rounded-full object-cover border-2 border-[#F7C901] shadow-sm"
                      onerror="this.src='assets/images/logo-principal.png'"
                    >
                    <div>
                      <h3 class="font-bold text-lg font-serif-editorial text-[#213863] leading-snug">
                        <a href="#/columnista/${col.id}" class="hover:underline">
                          ${col.name}
                        </a>
                      </h3>
                      <span class="inline-block bg-slate-100 text-slate-700 text-[11px] font-bold px-2 py-0.5 rounded mt-1">
                        ${col.specialty}
                      </span>
                    </div>
                  </div>

                  <p class="text-xs text-slate-500 font-medium mb-3">${col.role}</p>

                  <p class="text-sm text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    ${col.bio}
                  </p>
                </div>

                <div class="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="text-slate-500 font-semibold">
                    <strong class="text-[#213863]">${articles.length}</strong> publicaciones
                  </span>
                  <a
                    href="#/columnista/${col.id}"
                    class="bg-[#213863] hover:bg-[#172746] text-white px-3 py-1.5 rounded text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Ver perfil y columnas</span>
                    <i class="fa-solid fa-arrow-right text-[10px] text-[#F7C901]"></i>
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  // Perfil individual del columnista
  renderProfile(columnistId) {
    const store = window.Polso.Store;
    const columnist = store.getColumnistById(columnistId);

    if (!columnist) {
      return `
        <div class="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 class="text-3xl font-black font-serif-editorial text-[#213863] mb-4">Columnista no encontrado</h2>
          <p class="text-slate-600 mb-6">El autor solicitado no está registrado en el directorio editorial.</p>
          <a href="#/columnistas" class="bg-[#213863] text-white px-6 py-2.5 rounded-lg text-sm font-bold">
            Ver directorio de columnistas
          </a>
        </div>
      `;
    }

    const articles = store.getArticlesByAuthor(columnist.id);

    return `
      <div class="columnist-profile-view max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- Breadcrumb -->
        <div class="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <a href="#/portada" class="hover:text-[#213863] font-bold">Inicio</a>
          <span>/</span>
          <a href="#/opinion" class="hover:text-[#213863] font-bold">Opinión</a>
          <span>/</span>
          <a href="#/columnistas" class="hover:text-[#213863] font-bold">Columnistas</a>
          <span>/</span>
          <span class="text-[#213863] font-bold uppercase">${columnist.name}</span>
        </div>

        <!-- Ficha de Encabezado del Columnista -->
        <header class="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-sm mb-12">
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <img
              src="${columnist.avatar}"
              alt="${columnist.name}"
              class="w-32 h-32 rounded-full object-cover border-4 border-[#F7C901] shadow-md shrink-0"
              onerror="this.src='assets/images/logo-principal.png'"
            >
            <div class="text-center sm:text-left flex-1">
              <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span class="bg-[#213863] text-white text-xs font-bold uppercase px-2.5 py-0.5 rounded">
                  Firma Editorial
                </span>
                <span class="bg-[#FEF3C7] text-[#92400E] text-xs font-bold uppercase px-2.5 py-0.5 rounded border border-[#FDE68A]">
                  ${columnist.specialty}
                </span>
              </div>

              <h1 class="text-3xl sm:text-4xl font-black font-serif-editorial text-[#213863] mb-2">
                ${columnist.name}
              </h1>
              <p class="text-sm font-semibold text-slate-500 mb-4">${columnist.role}</p>

              <p class="text-base text-slate-700 leading-relaxed mb-6 font-normal">
                ${columnist.bio}
              </p>

              <!-- Redes Sociales del Columnista -->
              <div class="flex items-center justify-center sm:justify-start gap-3">
                ${columnist.social?.twitter ? `
                  <a href="https://twitter.com/${columnist.social.twitter.replace('@', '')}" target="_blank" class="text-xs bg-slate-100 hover:bg-[#213863] hover:text-white text-slate-700 px-3 py-1.5 rounded-full font-bold transition-colors inline-flex items-center gap-1.5">
                    <i class="fa-brands fa-x-twitter"></i> ${columnist.social.twitter}
                  </a>
                ` : ''}
                ${columnist.social?.linkedin ? `
                  <a href="https://linkedin.com/in/${columnist.social.linkedin}" target="_blank" class="text-xs bg-slate-100 hover:bg-blue-700 hover:text-white text-slate-700 px-3 py-1.5 rounded-full font-bold transition-colors inline-flex items-center gap-1.5">
                    <i class="fa-brands fa-linkedin"></i> LinkedIn
                  </a>
                ` : ''}
              </div>
            </div>
          </div>
        </header>

        <!-- Publicaciones del autor -->
        <section>
          <div class="flex items-center justify-between pb-4 border-b-2 border-[#213863] mb-8">
            <h2 class="text-2xl font-black font-serif-editorial text-[#213863]">
              Columnas y Artículos (${articles.length})
            </h2>
            <span class="text-xs text-slate-500">Ordenados cronológicamente</span>
          </div>

          ${articles.length === 0 ? `
            <div class="bg-white p-8 text-center rounded-xl border border-slate-200">
              <p class="text-slate-500">Este autor aún no tiene publicaciones registradas.</p>
            </div>
          ` : `
            <div class="space-y-6">
              ${articles.map(article => `
                <article class="bg-white rounded-xl border border-slate-200 p-6 hover:border-slate-300 transition-all flex flex-col md:flex-row gap-6 items-start">
                  ${article.image ? `
                    <div class="w-full md:w-56 h-36 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                      <img
                        src="${article.image}"
                        alt="${article.title}"
                        class="w-full h-full object-cover"
                        onerror="this.src='assets/images/diseno-1.png'"
                      >
                    </div>
                  ` : ''}

                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="${article.type === 'opinion' ? 'badge-opinion' : 'badge-blue'} text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                        ${article.type === 'opinion' ? 'COLUMNA' : article.categoryLabel}
                      </span>
                      <span class="text-xs text-slate-400">·</span>
                      <span class="text-xs text-slate-500">${article.date}</span>
                      <span class="text-xs text-slate-400">·</span>
                      <span class="text-xs text-slate-500">${article.readTime}</span>
                    </div>

                    <h3 class="text-xl font-bold font-serif-editorial text-slate-900 hover:text-[#213863] leading-snug mb-2 transition-colors">
                      <a href="#/articulo/${article.id}">
                        ${article.title}
                      </a>
                    </h3>

                    <p class="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                      ${article.subtitle}
                    </p>

                    <a
                      href="#/articulo/${article.id}"
                      class="text-xs font-bold text-[#213863] hover:text-[#F7C901] inline-flex items-center gap-1 transition-colors"
                    >
                      Leer publicación completa <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </a>
                  </div>
                </article>
              `).join('')}
            </div>
          `}
        </section>
      </div>
    `;
  }
};
