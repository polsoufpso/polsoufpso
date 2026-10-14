/**
 * POLSO - Vista: Buscador y Filtros Avanzados
 * Implementa los requerimientos de la Sección 8 del Prompt Maestro:
 * - Búsqueda en datos reales por palabras clave, titular, autor, categoría y tags
 * - Filtros por categoría y orden cronológico
 * - Mensajes claros de resultados y estado vacío amigable
 */

window.Polso = window.Polso || {};
window.Polso.Views = window.Polso.Views || {};

window.Polso.Views.Search = {
  currentQuery: '',
  selectedCategory: 'todas',
  selectedType: 'todos',
  selectedSort: 'recientes',

  render(searchParams) {
    const store = window.Polso.Store;
    let query = '';
    if (typeof URLSearchParams !== 'undefined') {
      const urlParams = new URLSearchParams(searchParams || '');
      query = urlParams.get('q') || this.currentQuery || '';
    } else {
      const match = (searchParams || '').match(/q=([^&]*)/);
      query = match ? decodeURIComponent(match[1]) : (this.currentQuery || '');
    }
    this.currentQuery = query;

    const results = store.search(query, {
      category: this.selectedCategory,
      type: this.selectedType,
      sort: this.selectedSort
    });

    return `
      <div class="search-view max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- Breadcrumb -->
        <div class="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <a href="#/portada" class="hover:text-[#213863] font-bold">Inicio</a>
          <span>/</span>
          <span class="text-[#213863] font-bold uppercase">Buscador Editorial</span>
        </div>

        <!-- Encabezado y Barra de Búsqueda Principal -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-10">
          <h1 class="text-2xl sm:text-3xl font-black font-serif-editorial text-[#213863] mb-4">
            Buscador de Publicaciones e Investigaciones
          </h1>
          <p class="text-slate-600 text-sm mb-6">
            Localice columnas, análisis, coberturas legislativas y entrevistas en toda la base editorial de POLSO.
          </p>

          <form onsubmit="event.preventDefault(); Polso.Views.Search.executeSearch(this.q.value);" class="flex flex-col sm:flex-row gap-3">
            <div class="relative flex-1">
              <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input
                type="text"
                name="q"
                value="${query}"
                placeholder="Buscar por titular, autor, tema o palabra clave (ej. Congreso, Reforma, Alianzas)..."
                class="w-full pl-11 pr-10 py-3.5 border border-slate-300 rounded-xl text-base text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#213863] shadow-inner"
              >
              ${query ? `
                <button
                  type="button"
                  onclick="Polso.Views.Search.executeSearch('')"
                  class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  title="Limpiar búsqueda"
                >
                  <i class="fa-solid fa-circle-xmark"></i>
                </button>
              ` : ''}
            </div>

            <button
              type="submit"
              class="bg-[#213863] hover:bg-[#172746] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow"
            >
              <i class="fa-solid fa-magnifying-glass text-[#F7C901]"></i>
              <span>Buscar</span>
            </button>
          </form>

          <!-- Filtros de Búsqueda -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-100">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Categoría</label>
              <select
                onchange="Polso.Views.Search.updateFilter('category', this.value)"
                class="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#213863]"
              >
                <option value="todas" ${this.selectedCategory === 'todas' ? 'selected' : ''}>Todas las categorías</option>
                <option value="politica-nacional" ${this.selectedCategory === 'politica-nacional' ? 'selected' : ''}>Política Nacional</option>
                <option value="gobierno-congreso" ${this.selectedCategory === 'gobierno-congreso' ? 'selected' : ''}>Gobierno y Congreso</option>
                <option value="politica-regional" ${this.selectedCategory === 'politica-regional' ? 'selected' : ''}>Política Regional</option>
                <option value="politica-internacional" ${this.selectedCategory === 'politica-internacional' ? 'selected' : ''}>Política Internacional</option>
                <option value="elecciones" ${this.selectedCategory === 'elecciones' ? 'selected' : ''}>Elecciones</option>
                <option value="opinion" ${this.selectedCategory === 'opinion' ? 'selected' : ''}>Opinión</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Tipo de Contenido</label>
              <select
                onchange="Polso.Views.Search.updateFilter('type', this.value)"
                class="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#213863]"
              >
                <option value="todos" ${this.selectedType === 'todos' ? 'selected' : ''}>Todos los formatos</option>
                <option value="articulo" ${this.selectedType === 'articulo' ? 'selected' : ''}>Artículos / Noticias</option>
                <option value="analisis" ${this.selectedType === 'analisis' ? 'selected' : ''}>Análisis a fondo</option>
                <option value="opinion" ${this.selectedType === 'opinion' ? 'selected' : ''}>Columnas de Opinión</option>
                <option value="especial" ${this.selectedType === 'especial' ? 'selected' : ''}>Investigaciones Especiales</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase mb-1">Orden Cronológico</label>
              <select
                onchange="Polso.Views.Search.updateFilter('sort', this.value)"
                class="w-full text-xs border border-slate-300 rounded-lg px-3 py-2 bg-slate-50 text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#213863]"
              >
                <option value="recientes" ${this.selectedSort === 'recientes' ? 'selected' : ''}>Más recientes primero</option>
                <option value="antiguos" ${this.selectedSort === 'antiguos' ? 'selected' : ''}>Más antiguos primero</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Resultados de la Búsqueda -->
        <div>
          <div class="flex items-center justify-between pb-3 border-b-2 border-[#213863] mb-8">
            <h2 class="text-xl font-black font-serif-editorial text-[#213863]">
              ${query ? `Resultados para: “${query}”` : 'Todas las publicaciones'}
            </h2>
            <span class="text-xs text-slate-500 font-semibold">
              Se encontraron <strong class="text-[#213863] font-bold">${results.length}</strong> publicaciones
            </span>
          </div>

          ${results.length === 0 ? `
            <div class="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <div class="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <i class="fa-solid fa-magnifying-glass"></i>
              </div>
              <h3 class="text-xl font-bold font-serif-editorial text-[#213863] mb-2">
                No se encontraron publicaciones que coincidan con su búsqueda
              </h3>
              <p class="text-slate-500 text-sm max-w-md mx-auto mb-6">
                Intente utilizar palabras clave más generales o explore los temas más consultados por nuestros lectores.
              </p>
              <div class="flex flex-wrap justify-center gap-2">
                <button onclick="Polso.Views.Search.executeSearch('Congreso')" class="px-3 py-1 bg-slate-100 hover:bg-[#213863] hover:text-white rounded-full text-xs font-semibold">#Congreso</button>
                <button onclick="Polso.Views.Search.executeSearch('Reformas')" class="px-3 py-1 bg-slate-100 hover:bg-[#213863] hover:text-white rounded-full text-xs font-semibold">#Reformas</button>
                <button onclick="Polso.Views.Search.executeSearch('Presupuesto')" class="px-3 py-1 bg-slate-100 hover:bg-[#213863] hover:text-white rounded-full text-xs font-semibold">#Presupuesto</button>
                <button onclick="Polso.Views.Search.executeSearch('Elecciones')" class="px-3 py-1 bg-slate-100 hover:bg-[#213863] hover:text-white rounded-full text-xs font-semibold">#Elecciones</button>
              </div>
            </div>
          ` : `
            <div class="space-y-6">
              ${results.map(article => `
                <article class="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start">
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
                        ${article.categoryLabel}
                      </span>
                      <span class="text-xs text-slate-400">·</span>
                      <span class="text-xs text-slate-500">${article.date}</span>
                      <span class="text-xs text-slate-400">·</span>
                      <span class="text-xs text-slate-500">${article.readTime}</span>
                    </div>

                    <h3 class="text-xl font-bold font-serif-editorial text-[#213863] hover:text-[#2c4a83] leading-snug mb-2">
                      <a href="#/articulo/${article.id}">
                        ${article.title}
                      </a>
                    </h3>

                    <p class="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-3">
                      ${article.subtitle}
                    </p>

                    <div class="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <span class="font-bold text-[#213863]">Por: ${article.authorName}</span>
                      <a href="#/articulo/${article.id}" class="text-[#213863] font-bold hover:text-[#F7C901] flex items-center gap-1">
                        Leer artículo <i class="fa-solid fa-arrow-right text-[10px]"></i>
                      </a>
                    </div>
                  </div>
                </article>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;
  },

  executeSearch(q) {
    this.currentQuery = q.trim();
    window.location.hash = `#/buscar?q=${encodeURIComponent(this.currentQuery)}`;
  },

  updateFilter(type, value) {
    if (type === 'category') this.selectedCategory = value;
    if (type === 'type') this.selectedType = value;
    if (type === 'sort') this.selectedSort = value;
    window.Polso.Router.route();
  }
};
