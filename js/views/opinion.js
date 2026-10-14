/**
 * POLSO - Vista: Opinión, Columnas y Debates
 * Implementa el centro editorial de opinión:
 * - Columna principal destacada de la semana
 * - Mosaico de columnas de opinión con autor y extractos
 * - Debates y perspectivas (confrontación de ideas democráticas)
 * - Acceso a nuestros columnistas
 */

window.Polso = window.Polso || {};
window.Polso.Views = window.Polso.Views || {};

window.Polso.Views.Opinion = {
  render(subview) {
    const store = window.Polso.Store;
    const opinionArticles = store.getArticlesByType('opinion');
    const columnists = store.getColumnists();

    return `
      <div class="opinion-hub-view max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- Breadcrumb -->
        <div class="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <a href="#/portada" class="hover:text-[#213863] font-bold">Inicio</a>
          <span>/</span>
          <span class="text-[#213863] font-bold uppercase">Opinión & Debates</span>
        </div>

        <!-- Banner de Opinión -->
        <header class="bg-[#213863] text-white rounded-2xl p-8 sm:p-12 mb-12 shadow-sm border-b-4 border-[#F7C901]">
          <div class="max-w-3xl">
            <span class="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#F7C901] bg-[#172746] px-3 py-1 rounded-sm mb-4">
              <i class="fa-solid fa-pen-nib"></i>
              Línea Abierta de Criterio
            </span>
            <h1 class="text-3xl sm:text-5xl font-black font-serif-editorial mb-4 tracking-tight">
              Opinión & Columnistas
            </h1>
            <p class="text-slate-200 text-base sm:text-lg leading-relaxed">
              Las firmas más lúcidas, independientes y rigurosas analizan las decisiones de poder, las instituciones y el rumbo del país. Criterio con argumento, sin ataduras dogmáticas.
            </p>
          </div>
        </header>

        <!-- Subnavegación de la sección Opinión -->
        <div class="flex items-center gap-3 border-b border-slate-200 pb-4 mb-10 overflow-x-auto whitespace-nowrap">
          <a href="#/opinion" class="px-4 py-2 bg-[#213863] text-white rounded-lg text-xs font-bold shadow-sm">
            Todas las columnas
          </a>
          <a href="#/columnistas" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#213863] rounded-lg text-xs font-bold transition-colors">
            Nuestros Columnistas (${columnists.length})
          </a>
          <a href="#/opinion/debates" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#213863] rounded-lg text-xs font-bold transition-colors">
            Debates & Perspectivas
          </a>
        </div>

        <!-- Columna Destacada de la Semana -->
        ${opinionArticles[0] ? `
          <section class="mb-14">
            <div class="bg-white rounded-xl border-t-4 border-[#F7C901] border-x border-b border-slate-200 p-8 shadow-sm">
              <span class="text-[11px] font-black uppercase tracking-wider text-[#F7C901] bg-[#213863] px-3 py-1 rounded-sm mb-4 inline-block">
                Columna de la Semana
              </span>
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div class="lg:col-span-8">
                  <h2 class="text-2xl sm:text-3xl lg:text-4xl font-black font-serif-editorial text-[#213863] mb-4 leading-tight">
                    <a href="#/articulo/${opinionArticles[0].id}" class="hover:underline">
                      “${opinionArticles[0].title}”
                    </a>
                  </h2>
                  <p class="text-slate-600 text-base sm:text-lg italic leading-relaxed mb-6 font-normal">
                    ${opinionArticles[0].subtitle}
                  </p>
                  <div class="flex items-center gap-4">
                    <a href="#/articulo/${opinionArticles[0].id}" class="bg-[#213863] hover:bg-[#172746] text-white px-5 py-2.5 rounded-lg text-xs font-bold inline-flex items-center gap-2 transition-colors">
                      Leer columna completa <i class="fa-solid fa-arrow-right text-[10px] text-[#F7C901]"></i>
                    </a>
                    <span class="text-xs text-slate-500">${opinionArticles[0].readTime}</span>
                  </div>
                </div>
                <div class="lg:col-span-4 flex flex-col items-center text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <img
                    src="${store.getColumnistById(opinionArticles[0].authorId)?.avatar || 'assets/images/logo-principal.png'}"
                    alt="${opinionArticles[0].authorName}"
                    class="w-24 h-24 rounded-full object-cover border-4 border-[#F7C901] shadow-md mb-3"
                    onerror="this.src='assets/images/logo-principal.png'"
                  >
                  <h3 class="font-bold text-lg text-[#213863]">
                    <a href="#/columnista/${opinionArticles[0].authorId}" class="hover:underline">
                      ${opinionArticles[0].authorName}
                    </a>
                  </h3>
                  <p class="text-xs text-slate-500 mt-1">${store.getColumnistById(opinionArticles[0].authorId)?.role}</p>
                </div>
              </div>
            </div>
          </section>
        ` : ''}

        <!-- Grilla de Columnas -->
        <section class="mb-16">
          <div class="flex items-center gap-3 pb-3 border-b-2 border-[#213863] mb-8">
            <span class="w-3 h-7 bg-[#F7C901] rounded-sm"></span>
            <h2 class="text-2xl font-black font-serif-editorial text-[#213863]">
              Últimas Columnas Publicadas
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            ${opinionArticles.map(column => {
              const col = store.getColumnistById(column.authorId);
              return `
                <div class="opinion-card p-6 rounded-xl flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <span class="badge-opinion text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                        OPINIÓN
                      </span>
                      <span class="text-xs text-slate-400">${column.date}</span>
                    </div>

                    <div class="flex items-center gap-3 mb-4">
                      <img
                        src="${col ? col.avatar : 'assets/images/logo-principal.png'}"
                        alt="${column.authorName}"
                        class="w-12 h-12 rounded-full object-cover border-2 border-[#F7C901]"
                        onerror="this.src='assets/images/logo-principal.png'"
                      >
                      <div>
                        <h4 class="font-bold text-sm text-[#213863]">
                          <a href="#/columnista/${column.authorId}" class="hover:underline">
                            ${column.authorName}
                          </a>
                        </h4>
                        <span class="text-[11px] text-slate-500">${col ? col.specialty : ''}</span>
                      </div>
                    </div>

                    <h3 class="text-lg font-bold font-serif-editorial text-slate-900 hover:text-[#213863] leading-snug mb-3 transition-colors">
                      <a href="#/articulo/${column.id}">
                        “${column.title}”
                      </a>
                    </h3>

                    <p class="text-xs text-slate-600 italic line-clamp-3 leading-relaxed mb-4">
                      ${column.subtitle}
                    </p>
                  </div>

                  <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span class="text-slate-400">${column.readTime}</span>
                    <a href="#/articulo/${column.id}" class="text-[#213863] font-bold hover:text-[#F7C901] inline-flex items-center gap-1 transition-colors">
                      Leer columna <i class="fa-solid fa-arrow-right text-[10px]"></i>
                    </a>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </section>

        <!-- SECCIÓN DEBATES Y PERSPECTIVAS -->
        <section class="bg-slate-50 border border-slate-200 rounded-2xl p-8 mb-16">
          <div class="text-center max-w-2xl mx-auto mb-8">
            <span class="text-xs font-black uppercase tracking-wider text-[#213863] bg-[#F7C901] px-3 py-1 rounded-sm">
              Debates & Perspectivas
            </span>
            <h3 class="text-2xl sm:text-3xl font-black font-serif-editorial text-[#213863] mt-3 mb-2">
              El Dilema Territorial: ¿Centralismo de control o Autonomía regional irrestricta?
            </h3>
            <p class="text-xs text-slate-500">Dos visiones autorizadas confrontan sus argumentos sobre la descentralización del presupuesto nacional.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Perspectiva A -->
            <div class="bg-white p-6 rounded-xl border-t-4 border-[#213863] shadow-sm">
              <span class="text-xs font-bold uppercase text-[#213863] bg-slate-100 px-2 py-0.5 rounded">Tesis Centralista</span>
              <h4 class="font-serif-editorial font-bold text-lg text-[#213863] mt-2 mb-2">
                "Sin supervisión fiscal del poder central, las regalías corren riesgo de dispersión clientelar"
              </h4>
              <p class="text-xs text-slate-600 leading-relaxed mb-4">
                La experiencia histórica demuestra que transferir sumas multimillonarias a municipios sin capacidad técnica de planeación alimenta la ineficiencia y la captura política local.
              </p>
              <div class="flex items-center gap-2 pt-3 border-t border-slate-100 text-xs text-slate-500">
                <span class="font-bold text-[#213863]">Por: Dr. Santiago Valenzuela</span>
              </div>
            </div>

            <!-- Perspectiva B -->
            <div class="bg-white p-6 rounded-xl border-t-4 border-[#F7C901] shadow-sm">
              <span class="text-xs font-bold uppercase text-[#213863] bg-amber-50 px-2 py-0.5 rounded">Tesis Autonomista</span>
              <h4 class="font-serif-editorial font-bold text-lg text-[#213863] mt-2 mb-2">
                "Bogotá no puede continuar decidiendo si un municipio apartado merece o no agua potable"
              </h4>
              <p class="text-xs text-slate-600 leading-relaxed mb-4">
                El centralismo no previene la corrupción: solo la centraliza en la burocracia de los ministerios. Las regiones tienen derecho constitucional a definir su propio modelo de desarrollo.
              </p>
              <div class="flex items-center gap-2 pt-3 border-t border-slate-100 text-xs text-slate-500">
                <span class="font-bold text-[#213863]">Por: Andrés Felipe Restrepo</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }
};
