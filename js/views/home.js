/**
 * POLSO - Vista: Portada / Inicio
 * Implementa la estructura completa solicitada en la Sección 4 del Prompt Maestro:
 * B. Franja de actualidad
 * C. Noticia principal de gran impacto
 * D. Últimas publicaciones
 * E. Columnas de opinión (visualmente diferenciadas)
 * F. Análisis y contexto
 * G. POLSO en video (reproductores 16:9 con YouTube)
 * H. Temas destacados
 */

window.Polso = window.Polso || {};
window.Polso.Views = window.Polso.Views || {};

window.Polso.Views.Home = {
  render() {
    const store = window.Polso.Store;
    const leadArticle = store.getLeadArticle();
    const allArticles = store.getArticles();
    const opinionArticles = store.getArticlesByType('opinion');
    const analysisArticles = store.getArticlesByType('analisis');
    const recentArticles = allArticles.filter(a => a.id !== leadArticle?.id).slice(0, 6);
    const videos = store.getVideos().slice(0, 4);
    const breaking = store.getBreakingNews();

    return `
      <div class="homepage-view">
        <!-- SECCIÓN B: FRANJA DE ACTUALIDAD / TICKER -->
        <div class="ticker-wrap border-b border-[#2c4a83] text-white py-2.5 px-4 shadow-inner">
          <div class="max-w-7xl mx-auto flex items-center">
            <div class="flex items-center gap-2 bg-[#F7C901] text-[#213863] text-xs font-black uppercase px-3 py-1 rounded-sm tracking-wider mr-4 shrink-0 shadow-sm">
              <span class="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              Actualidad POLSO
            </div>
            <div class="overflow-hidden relative w-full">
              <div class="ticker-content text-sm flex items-center space-x-12">
                ${breaking.map(item => `
                  <a href="${item.link}" class="inline-flex items-center gap-2 text-slate-200 hover:text-[#F7C901] transition-colors font-medium">
                    <span class="text-[#F7C901] font-bold">●</span>
                    ${item.text}
                  </a>
                `).join('')}
                <!-- Duplicado para loop infinito fluido -->
                ${breaking.map(item => `
                  <a href="${item.link}" class="inline-flex items-center gap-2 text-slate-200 hover:text-[#F7C901] transition-colors font-medium">
                    <span class="text-[#F7C901] font-bold">●</span>
                    ${item.text}
                  </a>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">

          <!-- SECCIÓN C: NOTICIA O ARTÍCULO PRINCIPAL (GRAN IMPACTO VISUAL) -->
          ${leadArticle ? `
            <section class="lead-story-section bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div class="lg:col-span-7 relative overflow-hidden bg-slate-900 group">
                  <img
                    src="${leadArticle.image}"
                    alt="${leadArticle.title}"
                    class="w-full h-80 lg:h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-95"
                    onerror="this.src='assets/images/lanzamiento.png'"
                  >
                  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden"></div>
                  <div class="absolute top-4 left-4 z-10 flex gap-2">
                    <span class="badge-yellow text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-sm shadow-md">
                      Tema de Portada
                    </span>
                    <span class="bg-[#213863] text-white text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                      ${leadArticle.categoryLabel}
                    </span>
                  </div>
                </div>

                <div class="lg:col-span-5 p-6 lg:p-10 flex flex-col justify-between bg-white">
                  <div>
                    <div class="hidden lg:flex items-center gap-2 text-xs font-bold tracking-wider text-[#213863] uppercase mb-3">
                      <span class="w-2 h-2 rounded-full bg-[#F7C901]"></span>
                      ${leadArticle.categoryLabel}
                      <span class="text-slate-300">|</span>
                      <span class="text-slate-500 font-normal">${leadArticle.readTime}</span>
                    </div>

                    <h1 class="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-editorial text-[#213863] leading-tight hover:text-[#2c4a83] transition-colors mb-4">
                      <a href="#/articulo/${leadArticle.id}">
                        ${leadArticle.title}
                      </a>
                    </h1>

                    <p class="text-slate-600 text-base lg:text-lg leading-relaxed mb-6 font-normal">
                      ${leadArticle.subtitle}
                    </p>
                  </div>

                  <div class="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-[#213863] font-bold">
                        <i class="fa-solid fa-feather text-sm text-[#213863]"></i>
                      </div>
                      <div>
                        <a href="#/columnista/${leadArticle.authorId}" class="text-sm font-bold text-[#213863] hover:underline block">
                          ${leadArticle.authorName}
                        </a>
                        <span class="text-xs text-slate-500">${leadArticle.date}</span>
                      </div>
                    </div>

                    <a
                      href="#/articulo/${leadArticle.id}"
                      class="inline-flex items-center gap-2 bg-[#213863] hover:bg-[#172746] text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm group"
                    >
                      <span>Leer completo</span>
                      <i class="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform text-[#F7C901]"></i>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          ` : ''}

          <!-- SECCIÓN D: ÚLTIMAS PUBLICACIONES -->
          <section class="latest-publications">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#213863] mb-8">
              <div class="flex items-center gap-3">
                <span class="w-3 h-8 bg-[#F7C901] rounded-sm"></span>
                <h2 class="text-2xl font-black font-serif-editorial text-[#213863] tracking-tight">
                  Últimas Publicaciones
                </h2>
              </div>
              <div class="flex items-center gap-2 text-sm text-slate-600">
                <span class="font-medium">Filtro rápido:</span>
                <a href="#/categoria/politica-nacional" class="px-2.5 py-1 bg-slate-100 hover:bg-[#213863] hover:text-white rounded-full text-xs font-semibold transition-colors">Nacional</a>
                <a href="#/categoria/gobierno-congreso" class="px-2.5 py-1 bg-slate-100 hover:bg-[#213863] hover:text-white rounded-full text-xs font-semibold transition-colors">Congreso</a>
                <a href="#/categoria/politica-regional" class="px-2.5 py-1 bg-slate-100 hover:bg-[#213863] hover:text-white rounded-full text-xs font-semibold transition-colors">Regiones</a>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              ${recentArticles.map(article => `
                <article class="article-card flex flex-col justify-between group">
                  <div>
                    <div class="relative overflow-hidden aspect-[16/10] bg-slate-100">
                      <img
                        src="${article.image}"
                        alt="${article.title}"
                        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onerror="this.src='assets/images/diseno-1.png'"
                      >
                      <span class="absolute top-3 left-3 bg-[#213863] text-white text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
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
          </section>

          <!-- SECCIÓN E: COLUMNAS DE OPINIÓN (VISUALMENTE DIFERENCIADAS) -->
          <section class="opinion-section bg-[#F8FAFC] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 border-y border-slate-200">
            <div class="max-w-7xl mx-auto">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-300 mb-8">
                <div>
                  <div class="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#213863] mb-1">
                    <span class="w-2 h-2 rounded-full bg-[#F7C901]"></span>
                    Voces y Criterio
                  </div>
                  <h2 class="text-3xl font-black font-serif-editorial text-[#213863] tracking-tight">
                    Columnas de Opinión
                  </h2>
                </div>
                <a
                  href="#/opinion"
                  class="inline-flex items-center gap-2 text-sm font-bold text-[#213863] hover:text-[#F7C901] transition-colors"
                >
                  Ver todas las opiniones
                  <i class="fa-solid fa-arrow-right"></i>
                </a>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${opinionArticles.slice(0, 3).map(column => {
                  const author = store.getColumnistById(column.authorId);
                  return `
                    <div class="opinion-card p-6 rounded-lg flex flex-col justify-between">
                      <div>
                        <!-- Identificación destacada de Opinión -->
                        <div class="flex items-center justify-between mb-4">
                          <span class="badge-opinion text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                            COLUMNA DE OPINIÓN
                          </span>
                          <span class="text-xs text-slate-500">${column.date}</span>
                        </div>

                        <!-- Autor y Fotografía -->
                        <div class="flex items-center gap-3 mb-4">
                          <img
                            src="${author ? author.avatar : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80'}"
                            alt="${column.authorName}"
                            class="w-14 h-14 rounded-full object-cover border-2 border-[#F7C901] shadow-sm"
                            onerror="this.src='assets/images/logo-principal.png'"
                          >
                          <div>
                            <h4 class="font-bold text-[#213863] text-base leading-snug">
                              <a href="#/columnista/${column.authorId}" class="hover:underline">
                                ${column.authorName}
                              </a>
                            </h4>
                            <p class="text-xs text-slate-500 line-clamp-1">${author ? author.specialty : 'Columnista POLSO'}</p>
                          </div>
                        </div>

                        <!-- Titular de la Columna -->
                        <h3 class="text-xl font-bold font-serif-editorial text-slate-900 hover:text-[#213863] transition-colors leading-snug mb-3">
                          <a href="#/articulo/${column.id}">
                            “${column.title}”
                          </a>
                        </h3>

                        <!-- Extracto -->
                        <p class="text-sm text-slate-600 italic leading-relaxed line-clamp-3 mb-4">
                          ${column.subtitle}
                        </p>
                      </div>

                      <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span class="text-slate-500">${column.readTime}</span>
                        <a href="#/articulo/${column.id}" class="font-bold text-[#213863] hover:text-[#F7C901] transition-colors inline-flex items-center gap-1">
                          Leer columna completa
                          <i class="fa-solid fa-arrow-right text-[10px]"></i>
                        </a>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </section>

          <!-- SECCIÓN F: ANÁLISIS Y CONTEXTO -->
          <section class="analysis-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-[#213863] mb-8">
              <div class="flex items-center gap-3">
                <span class="w-3 h-8 bg-[#213863] rounded-sm"></span>
                <div>
                  <h2 class="text-2xl font-black font-serif-editorial text-[#213863] tracking-tight">
                    Análisis & Contexto
                  </h2>
                  <p class="text-xs text-slate-500">Explicaciones profundas, datos y políticas públicas para comprender el fondo de la noticia</p>
                </div>
              </div>
              <a href="#/categoria/analisis-politico" class="text-sm font-bold text-[#213863] hover:text-[#F7C901] transition-colors inline-flex items-center gap-1">
                Ver más análisis <i class="fa-solid fa-arrow-right text-xs"></i>
              </a>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <!-- Artículo de análisis principal -->
              ${analysisArticles[0] ? `
                <div class="lg:col-span-7 bg-white rounded-xl border border-slate-200 overflow-hidden p-6 flex flex-col justify-between">
                  <div>
                    <span class="badge-analisis text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3 inline-block">
                      ${analysisArticles[0].categoryLabel}
                    </span>
                    <h3 class="text-2xl font-bold font-serif-editorial text-[#213863] mb-3 leading-snug">
                      <a href="#/articulo/${analysisArticles[0].id}" class="hover:underline">
                        ${analysisArticles[0].title}
                      </a>
                    </h3>
                    <p class="text-slate-600 text-sm leading-relaxed mb-4">
                      ${analysisArticles[0].subtitle}
                    </p>
                    <div class="relative rounded-lg overflow-hidden h-64 mb-4">
                      <img
                        src="${analysisArticles[0].image}"
                        alt="${analysisArticles[0].title}"
                        class="w-full h-full object-cover"
                        onerror="this.src='assets/images/diseno-3.png'"
                      >
                    </div>
                  </div>
                  <div class="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                    <span class="font-bold text-[#213863]">${analysisArticles[0].authorName}</span>
                    <a href="#/articulo/${analysisArticles[0].id}" class="font-bold text-[#213863] hover:underline">
                      Explorar análisis →
                    </a>
                  </div>
                </div>
              ` : ''}

              <!-- Columna lateral con análisis complementarios -->
              <div class="lg:col-span-5 flex flex-col gap-4">
                ${analysisArticles.slice(1, 4).map(art => `
                  <div class="bg-white p-5 rounded-lg border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between">
                    <div>
                      <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
                        <span class="font-bold text-[#213863] uppercase tracking-wider text-[11px]">${art.categoryLabel}</span>
                        <span>${art.readTime}</span>
                      </div>
                      <h4 class="font-bold font-serif-editorial text-base text-slate-900 hover:text-[#213863] leading-snug mb-2">
                        <a href="#/articulo/${art.id}">
                          ${art.title}
                        </a>
                      </h4>
                      <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        ${art.subtitle}
                      </p>
                    </div>
                    <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>Por: <strong class="text-slate-800">${art.authorName}</strong></span>
                      <a href="#/articulo/${art.id}" class="text-[#213863] font-bold hover:underline">Leer</a>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>

          <!-- SECCIÓN G: POLSO EN VIDEO -->
          <section class="video-section bg-[#172746] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-12 text-white">
            <div class="max-w-7xl mx-auto">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700 mb-8">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-[#F7C901] flex items-center justify-center text-[#213863]">
                    <i class="fa-solid fa-play text-sm"></i>
                  </div>
                  <div>
                    <h2 class="text-2xl font-black font-serif-editorial text-white tracking-tight">
                      POLSO en Video
                    </h2>
                    <p class="text-xs text-slate-400">Entrevistas, debates y análisis audiovisual incrustado desde YouTube</p>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <a
                    href="#/videos"
                    class="bg-[#F7C901] hover:bg-[#e0b600] text-[#213863] px-4 py-2 rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow"
                  >
                    <span>Ir a sección de videos</span>
                    <i class="fa-solid fa-arrow-right"></i>
                  </a>
                </div>
              </div>

              <!-- Grid de videos -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${videos.map(video => `
                  <div class="bg-[#213863] rounded-lg overflow-hidden border border-slate-700/60 flex flex-col justify-between group hover:border-[#F7C901] transition-all">
                    <div>
                      <div class="relative aspect-video bg-black cursor-pointer" onclick="Polso.Views.Videos.openPlayerModal('${video.youtubeId}', '${video.title.replace(/'/g, "\\'")}')">
                        <img
                          src="${video.thumbnail}"
                          alt="${video.title}"
                          class="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                        >
                        <div class="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                          <div class="w-12 h-12 rounded-full bg-[#F7C901] text-[#213863] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <i class="fa-solid fa-play ml-0.5"></i>
                          </div>
                        </div>
                        <span class="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded">
                          ${video.duration}
                        </span>
                        <span class="absolute top-2 left-2 bg-[#213863] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                          ${video.categoryLabel}
                        </span>
                      </div>

                      <div class="p-4">
                        <h4 class="font-bold text-sm text-white group-hover:text-[#F7C901] line-clamp-2 leading-snug mb-2 transition-colors">
                          <a href="javascript:void(0)" onclick="Polso.Views.Videos.openPlayerModal('${video.youtubeId}', '${video.title.replace(/'/g, "\\'")}')">
                            ${video.title}
                          </a>
                        </h4>
                        <p class="text-xs text-slate-300 line-clamp-2 mb-3">
                          ${video.description}
                        </p>
                      </div>
                    </div>

                    <div class="p-4 pt-0 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-700/40">
                      <span>${video.author}</span>
                      <button
                        onclick="Polso.Views.Videos.openPlayerModal('${video.youtubeId}', '${video.title.replace(/'/g, "\\'")}')"
                        class="text-[#F7C901] hover:underline font-bold"
                      >
                        Ver video
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </section>

          <!-- SECCIÓN H: TEMAS DESTACADOS -->
          <section class="featured-topics-section bg-white p-8 rounded-xl border border-slate-200">
            <div class="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
              <span class="w-2.5 h-6 bg-[#F7C901] rounded-sm"></span>
              <h3 class="text-lg font-black font-serif-editorial text-[#213863] uppercase tracking-wide">
                Temas Destacados en la Agenda
              </h3>
            </div>
            <div class="flex flex-wrap gap-2.5">
              ${[
                { label: '#Elecciones2026', link: '#/categoria/elecciones', count: '14 análisis' },
                { label: '#CongresoDeLaRepública', link: '#/categoria/gobierno-congreso', count: '28 publicaciones' },
                { label: '#PolíticaRegional', link: '#/categoria/politica-regional', count: '19 reportes' },
                { label: '#ReformaConstitucional', link: '#/buscar?q=reforma', count: '11 artículos' },
                { label: '#DescentralizaciónFiscal', link: '#/buscar?q=descentralizacion', count: '9 artículos' },
                { label: '#RelacionesExteriores', link: '#/categoria/politica-internacional', count: '15 análisis' },
                { label: '#JusticiaYCorrupción', link: '#/especiales/investigaciones', count: '7 investigaciones' }
              ].map(topic => `
                <a
                  href="${topic.link}"
                  class="group flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-[#213863] border border-slate-200 hover:border-[#213863] rounded-lg transition-all"
                >
                  <span class="font-bold text-sm text-[#213863] group-hover:text-[#F7C901] transition-colors">${topic.label}</span>
                  <span class="text-xs text-slate-500 group-hover:text-slate-300">(${topic.count})</span>
                </a>
              `).join('')}
            </div>
          </section>

          <!-- BLOQUE DE SUSCRIPCIÓN BOLETÍN EDITORIAL -->
          <section class="newsletter-block bg-gradient-to-r from-[#213863] to-[#172746] rounded-xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-md">
            <div class="max-w-xl">
              <span class="text-[#F7C901] font-bold text-xs uppercase tracking-widest mb-2 block">Boletín POLSO</span>
              <h3 class="text-2xl sm:text-3xl font-black font-serif-editorial mb-3 leading-tight">
                El análisis político indispensable cada mañana en su correo
              </h3>
              <p class="text-slate-300 text-sm leading-relaxed">
                Reciba nuestras columnas de opinión, investigaciones exclusivas y el pulso legislativo antes del inicio de la jornada. Sin ruido, con criterio e independencia.
              </p>
            </div>
            <form onsubmit="event.preventDefault(); Polso.App.subscribeNewsletter(this);" class="w-full md:w-auto flex flex-col sm:flex-row gap-2 shrink-0">
              <input
                type="email"
                required
                placeholder="Su correo electrónico..."
                class="px-4 py-3 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#F7C901] w-full sm:w-72"
              >
              <button
                type="submit"
                class="bg-[#F7C901] hover:bg-[#e0b600] text-[#213863] font-bold text-sm px-6 py-3 rounded-lg transition-colors whitespace-nowrap shadow-sm"
              >
                Suscribirme gratis
              </button>
            </form>
          </section>

        </div>
      </div>
    `;
  }
};
