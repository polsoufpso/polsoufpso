/**
 * POLSO - Vista: Panel de Administración Editorial (CMS)
 * Implementa los requerimientos de la Sección 9 del Prompt Maestro:
 * - Zona privada de administración para gestionar contenidos sin modificar código
 * - CRUD de artículos, columnas de opinión y análisis
 * - CRUD de columnistas
 * - Gestión de videos de YouTube
 * - Estadísticas y métricas en tiempo real
 * - Restauración segura de datos de muestra
 */

window.Polso = window.Polso || {};
window.Polso.Views = window.Polso.Views || {};

window.Polso.Views.Admin = {
  activeTab: 'articulos', // 'articulos', 'columnistas', 'videos'
  editingArticleId: null,

  render() {
    const store = window.Polso.Store;
    const articles = store.getArticles();
    const columnists = store.getColumnists();
    const videos = store.getVideos();

    return `
      <div class="admin-dashboard-view max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- Encabezado del Panel Editorial -->
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200 mb-8">
          <div class="flex items-center gap-4">
            <img src="assets/images/logo-principal.png" alt="POLSO" class="w-14 h-14 object-contain drop-shadow-sm shrink-0">
            <div>
              <div class="inline-flex items-center gap-2 bg-[#213863] text-white text-xs font-black uppercase px-2.5 py-0.5 rounded-sm mb-1.5 shadow-sm">
                <i class="fa-solid fa-lock text-[#F7C901]"></i> Sistema Editorial POLSO CMS
              </div>
              <h1 class="text-2xl sm:text-3xl font-black font-serif-editorial text-[#213863] tracking-tight">
                Panel de Administración de Contenidos
              </h1>
              <p class="text-slate-500 text-xs sm:text-sm">
                Gestione publicaciones, columnas de opinión, perfiles de analistas y catálogo audiovisual en tiempo real.
              </p>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button
              onclick="Polso.Views.Admin.resetData()"
              class="border border-red-300 hover:bg-red-50 text-red-700 px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
              title="Restaura los datos iniciales de muestra de POLSO"
            >
              <i class="fa-solid fa-rotate-left"></i>
              Restablecer datos de muestra
            </button>
            <a
              href="#/portada"
              class="bg-[#213863] hover:bg-[#172746] text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
            >
              <i class="fa-solid fa-arrow-up-right-from-square text-[#F7C901]"></i>
              Ver Sitio Público
            </a>
          </div>
        </header>

        <!-- TARJETAS DE MÉTRICAS EDITORIALES -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Publicaciones</span>
              <span class="text-3xl font-black text-[#213863]">${articles.length}</span>
              <span class="text-xs text-slate-400 block mt-1">Artículos y columnas</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-blue-50 text-[#213863] flex items-center justify-center text-xl">
              <i class="fa-solid fa-newspaper"></i>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Columnistas</span>
              <span class="text-3xl font-black text-[#213863]">${columnists.length}</span>
              <span class="text-xs text-slate-400 block mt-1">Firmas activas</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-amber-50 text-[#213863] flex items-center justify-center text-xl">
              <i class="fa-solid fa-users"></i>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Videos</span>
              <span class="text-3xl font-black text-[#213863]">${videos.length}</span>
              <span class="text-xs text-slate-400 block mt-1">Incrustados de YouTube</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl">
              <i class="fa-brands fa-youtube"></i>
            </div>
          </div>

          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Estado CMS</span>
              <span class="text-lg font-black text-emerald-600 flex items-center gap-1.5 mt-1">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Operativo
              </span>
              <span class="text-xs text-slate-400 block mt-1">Persistencia activa</span>
            </div>
            <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
              <i class="fa-solid fa-database"></i>
            </div>
          </div>
        </div>

        <!-- PESTAÑAS DE GESTIÓN -->
        <div class="flex items-center gap-2 border-b border-slate-200 mb-8 overflow-x-auto whitespace-nowrap">
          <button
            onclick="Polso.Views.Admin.switchTab('articulos')"
            class="px-5 py-3 border-b-2 font-bold text-sm transition-colors flex items-center gap-2 ${this.activeTab === 'articulos' ? 'border-[#213863] text-[#213863]' : 'border-transparent text-slate-500 hover:text-slate-800'}"
          >
            <i class="fa-solid fa-file-pen"></i>
            Artículos & Opinión (${articles.length})
          </button>
          <button
            onclick="Polso.Views.Admin.switchTab('columnistas')"
            class="px-5 py-3 border-b-2 font-bold text-sm transition-colors flex items-center gap-2 ${this.activeTab === 'columnistas' ? 'border-[#213863] text-[#213863]' : 'border-transparent text-slate-500 hover:text-slate-800'}"
          >
            <i class="fa-solid fa-users"></i>
            Columnistas (${columnists.length})
          </button>
          <button
            onclick="Polso.Views.Admin.switchTab('videos')"
            class="px-5 py-3 border-b-2 font-bold text-sm transition-colors flex items-center gap-2 ${this.activeTab === 'videos' ? 'border-[#213863] text-[#213863]' : 'border-transparent text-slate-500 hover:text-slate-800'}"
          >
            <i class="fa-brands fa-youtube text-red-600"></i>
            Videos de YouTube (${videos.length})
          </button>
        </div>

        <!-- CONTENIDO DE LA PESTAÑA ACTIVA -->
        ${this.activeTab === 'articulos' ? this.renderArticlesTab(articles, columnists) : ''}
        ${this.activeTab === 'columnistas' ? this.renderColumnistsTab(columnists) : ''}
        ${this.activeTab === 'videos' ? this.renderVideosTab(videos) : ''}

        <!-- MODAL DE EDICIÓN / CREACIÓN DE ARTÍCULO -->
        <div id="article-form-modal" class="hidden fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4 overflow-y-auto">
          <div class="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl border border-slate-200 my-8">
            <div class="flex items-center justify-between p-5 border-b border-slate-200 bg-[#213863] text-white">
              <h3 id="article-modal-title" class="font-bold text-base font-serif-editorial">
                Crear Nueva Publicación
              </h3>
              <button onclick="Polso.Views.Admin.closeArticleModal()" class="text-slate-300 hover:text-white">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onsubmit="event.preventDefault(); Polso.Views.Admin.saveArticleForm(this);" class="p-6 sm:p-8 space-y-4 max-h-[80vh] overflow-y-auto">
              <input type="hidden" name="id" value="">

              <div>
                <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Titular Principal *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Titular riguroso y de alto impacto..."
                  class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                >
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Subtítulo o Resumen *</label>
                <textarea
                  name="subtitle"
                  required
                  rows="2"
                  placeholder="Contexto o bajada que resume la publicación..."
                  class="w-full px-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                ></textarea>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Tipo de Publicación</label>
                  <select
                    name="type"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                  >
                    <option value="articulo">Artículo / Noticia</option>
                    <option value="opinion">Columna de Opinión</option>
                    <option value="analisis">Análisis en Profundidad</option>
                    <option value="especial">Investigación Especial</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Categoría</label>
                  <select
                    name="category"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                  >
                    <option value="politica-nacional">Política Nacional</option>
                    <option value="gobierno-congreso">Gobierno y Congreso</option>
                    <option value="politica-regional">Política Regional</option>
                    <option value="politica-local">Política Local</option>
                    <option value="politica-internacional">Política Internacional</option>
                    <option value="elecciones">Elecciones</option>
                    <option value="opinion">Opinión</option>
                    <option value="especiales">Especiales</option>
                  </select>
                </div>

                <div>
                  <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Autor / Firma *</label>
                  <select
                    name="authorId"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                  >
                    ${columnists.map(c => `
                      <option value="${c.id}">${c.name}</option>
                    `).join('')}
                    <option value="redaccion">Redacción POLSO</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase text-[#213863] mb-1">URL de Imagen de Portada</label>
                  <input
                    type="text"
                    name="image"
                    placeholder="assets/images/diseno-1.png o enlace web..."
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                  >
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Pie de Foto (Créditos)</label>
                  <input
                    type="text"
                    name="imageCaption"
                    placeholder="Descripción y créditos de la fotografía..."
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                  >
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-[#213863] mb-1">
                  URL de Video de YouTube (opcional)
                </label>
                <input
                  type="text"
                  name="youtubeUrl"
                  placeholder="https://www.youtube.com/watch?v=..."
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                >
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Etiquetas (separadas por coma)</label>
                <input
                  type="text"
                  name="tags"
                  placeholder="Congreso, Elecciones, Reforma, Presupuesto..."
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                >
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-[#213863] mb-1">
                  Cuerpo del Artículo (Formato HTML / Texto enriquecido) *
                </label>
                <textarea
                  name="content"
                  required
                  rows="8"
                  placeholder="Escriba los párrafos, subtítulos (<h3>) y citas (<blockquote class='editorial-quote'>)..."
                  class="w-full px-4 py-3 border border-slate-300 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#213863]"
                ></textarea>
              </div>

              <div class="flex items-center gap-6 py-2">
                <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input type="checkbox" name="isFeatured" class="rounded text-[#213863] w-4 h-4">
                  <span>Destacar en Portada</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700">
                  <input type="checkbox" name="isLead" class="rounded text-[#213863] w-4 h-4">
                  <span>Noticia Principal de Apertura (Tema del día)</span>
                </label>
              </div>

              <div class="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onclick="Polso.Views.Admin.closeArticleModal()"
                  class="px-4 py-2.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="bg-[#213863] hover:bg-[#172746] text-white px-6 py-2.5 rounded-lg text-xs font-bold transition-colors shadow"
                >
                  Guardar Publicación
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  renderArticlesTab(articles, columnists) {
    return `
      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold font-serif-editorial text-[#213863]">
            Gestión de Artículos y Columnas
          </h2>
          <button
            onclick="Polso.Views.Admin.openCreateArticleModal()"
            class="bg-[#213863] hover:bg-[#172746] text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow"
          >
            <i class="fa-solid fa-plus text-[#F7C901]"></i>
            Redactar nueva publicación
          </button>
        </div>

        <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs text-slate-600">
              <thead class="bg-slate-50 text-slate-700 uppercase font-bold border-b border-slate-200">
                <tr>
                  <th class="px-6 py-3.5">Titular</th>
                  <th class="px-6 py-3.5">Tipo</th>
                  <th class="px-6 py-3.5">Categoría</th>
                  <th class="px-6 py-3.5">Autor</th>
                  <th class="px-6 py-3.5">Fecha</th>
                  <th class="px-6 py-3.5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-200">
                ${articles.map(art => `
                  <tr class="hover:bg-slate-50 transition-colors">
                    <td class="px-6 py-4 font-bold text-slate-900 max-w-xs">
                      <div class="flex items-center gap-2">
                        ${art.isLead ? '<span class="text-[10px] bg-[#F7C901] text-[#213863] px-1.5 py-0.5 rounded font-black shrink-0">PORTADA</span>' : ''}
                        <span class="truncate block">${art.title}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span class="${art.type === 'opinion' ? 'badge-opinion' : 'badge-blue'} px-2 py-0.5 rounded font-bold text-[10px] uppercase">
                        ${art.type}
                      </span>
                    </td>
                    <td class="px-6 py-4">${art.categoryLabel}</td>
                    <td class="px-6 py-4 font-semibold text-slate-800">${art.authorName}</td>
                    <td class="px-6 py-4 text-slate-500 whitespace-nowrap">${art.date}</td>
                    <td class="px-6 py-4 text-right whitespace-nowrap">
                      <div class="flex items-center justify-end gap-2">
                        <a
                          href="#/articulo/${art.id}"
                          class="p-1.5 text-slate-500 hover:text-[#213863]"
                          title="Ver en vivo"
                        >
                          <i class="fa-solid fa-eye"></i>
                        </a>
                        <button
                          onclick="Polso.Views.Admin.editArticle('${art.id}')"
                          class="p-1.5 text-blue-600 hover:text-blue-800"
                          title="Editar"
                        >
                          <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                        <button
                          onclick="Polso.Views.Admin.deleteArticle('${art.id}')"
                          class="p-1.5 text-red-600 hover:text-red-800"
                          title="Eliminar"
                        >
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  renderColumnistsTab(columnists) {
    return `
      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold font-serif-editorial text-[#213863]">
            Directorio de Columnistas y Analistas
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${columnists.map(col => `
            <div class="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex items-start gap-4">
              <img
                src="${col.avatar}"
                alt="${col.name}"
                class="w-16 h-16 rounded-full object-cover border-2 border-[#F7C901]"
                onerror="this.src='assets/images/logo-principal.png'"
              >
              <div class="flex-1">
                <h4 class="font-bold text-base text-[#213863]">${col.name}</h4>
                <span class="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded inline-block mt-0.5 mb-1.5">
                  ${col.specialty}
                </span>
                <p class="text-xs text-slate-500 line-clamp-2">${col.bio}</p>
                <div class="mt-3 flex items-center gap-2">
                  <a href="#/columnista/${col.id}" class="text-xs font-bold text-[#213863] hover:underline">
                    Ver perfil
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  renderVideosTab(videos) {
    return `
      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold font-serif-editorial text-[#213863]">
            Catálogo Audiovisual Incrustado
          </h2>
          <button
            onclick="Polso.Views.Videos.openAddVideoModal()"
            class="bg-[#213863] hover:bg-[#172746] text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 shadow"
          >
            <i class="fa-solid fa-plus text-[#F7C901]"></i>
            Añadir video de YouTube
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${videos.map(v => `
            <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                <div class="aspect-video bg-black relative">
                  <img src="${v.thumbnail}" alt="${v.title}" class="w-full h-full object-cover">
                  <span class="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                    ${v.duration}
                  </span>
                </div>
                <div class="p-4">
                  <span class="text-[10px] font-bold uppercase text-[#213863] bg-slate-100 px-2 py-0.5 rounded">
                    ${v.categoryLabel}
                  </span>
                  <h4 class="font-bold text-sm text-[#213863] mt-2 mb-1 line-clamp-2">${v.title}</h4>
                  <p class="text-xs text-slate-500 line-clamp-2">${v.description}</p>
                </div>
              </div>
              <div class="p-4 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
                <span class="text-slate-400">ID: ${v.youtubeId}</span>
                <button
                  onclick="Polso.Views.Admin.deleteVideo('${v.id}')"
                  class="text-red-600 hover:text-red-800 font-bold"
                >
                  Eliminar
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  switchTab(tab) {
    this.activeTab = tab;
    window.Polso.Router.route();
  },

  openCreateArticleModal() {
    this.editingArticleId = null;
    const modal = document.getElementById('article-form-modal');
    const form = modal.querySelector('form');
    form.reset();
    form.id.value = '';
    document.getElementById('article-modal-title').textContent = 'Crear Nueva Publicación';
    modal.classList.remove('hidden');
  },

  editArticle(id) {
    this.editingArticleId = id;
    const store = window.Polso.Store;
    const art = store.getArticleById(id);
    if (!art) return;

    const modal = document.getElementById('article-form-modal');
    const form = modal.querySelector('form');
    form.id.value = art.id;
    form.title.value = art.title;
    form.subtitle.value = art.subtitle;
    form.type.value = art.type;
    form.category.value = art.category;
    form.authorId.value = art.authorId;
    form.image.value = art.image || '';
    form.imageCaption.value = art.imageCaption || '';
    form.youtubeUrl.value = art.youtubeUrl || '';
    form.tags.value = (art.tags || []).join(', ');
    form.content.value = art.content || '';
    form.isFeatured.checked = !!art.isFeatured;
    form.isLead.checked = !!art.isLead;

    document.getElementById('article-modal-title').textContent = 'Editar Publicación';
    modal.classList.remove('hidden');
  },

  closeArticleModal() {
    const modal = document.getElementById('article-form-modal');
    if (modal) modal.classList.add('hidden');
  },

  saveArticleForm(form) {
    const store = window.Polso.Store;
    const authorSelect = form.authorId;
    const authorName = authorSelect.options[authorSelect.selectedIndex].text;

    const categoryMap = {
      'politica-nacional': 'Política Nacional',
      'gobierno-congreso': 'Gobierno y Congreso',
      'politica-regional': 'Política Regional',
      'politica-local': 'Política Local',
      'politica-internacional': 'Política Internacional',
      'elecciones': 'Elecciones',
      'opinion': 'Opinión',
      'especiales': 'Especiales'
    };

    const tagsArray = form.tags.value.split(',').map(t => t.trim()).filter(Boolean);

    const articleData = {
      id: form.id.value || ('art-' + Date.now()),
      title: form.title.value.trim(),
      subtitle: form.subtitle.value.trim(),
      type: form.type.value,
      category: form.category.value,
      categoryLabel: categoryMap[form.category.value] || 'Actualidad',
      authorId: form.authorId.value,
      authorName: authorName,
      image: form.image.value.trim() || 'assets/images/diseno-1.png',
      imageCaption: form.imageCaption.value.trim(),
      youtubeUrl: form.youtubeUrl.value.trim(),
      tags: tagsArray,
      content: form.content.value,
      isFeatured: form.isFeatured.checked,
      isLead: form.isLead.checked,
      readTime: '5 min de lectura'
    };

    // Si este se marca como Lead, desmarcar los demás
    if (articleData.isLead) {
      store.getArticles().forEach(a => { a.isLead = false; });
    }

    store.saveArticle(articleData);
    this.closeArticleModal();
    Polso.App.toast('Publicación guardada con éxito');
    window.Polso.Router.route();
  },

  deleteArticle(id) {
    if (confirm('¿Está seguro de que desea eliminar esta publicación?')) {
      window.Polso.Store.deleteArticle(id);
      Polso.App.toast('Publicación eliminada correctamente');
      window.Polso.Router.route();
    }
  },

  deleteVideo(id) {
    if (confirm('¿Desea retirar este video del catálogo?')) {
      window.Polso.Store.deleteVideo(id);
      Polso.App.toast('Video eliminado');
      window.Polso.Router.route();
    }
  },

  resetData() {
    if (confirm('¿Restablecer todos los contenidos originales de POLSO? Se restaurarán los artículos, columnas y videos de muestra.')) {
      window.Polso.Store.resetToDefaults();
      Polso.App.toast('Datos originales restaurados con éxito');
      window.Polso.Router.route();
    }
  }
};
