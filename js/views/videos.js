/**
 * POLSO - Vista: Hub Audiovisual "POLSO en Video"
 * Implementa los requerimientos de la Sección 7 del Prompt Maestro:
 * - Video principal destacado con reproductor 16:9
 * - Galería de videos clasificada por categorías temáticas
 * - Función interactiva para añadir un video mediante URL válida de YouTube
 * - Extracción segura de Video ID
 * - Modal de reproducción fluida
 */

window.Polso = window.Polso || {};
window.Polso.Views = window.Polso.Views || {};

window.Polso.Views.Videos = {
  activeCategory: 'todas',

  render(categoryFilter) {
    const store = window.Polso.Store;
    const allVideos = store.getVideos();
    const mainVideo = store.getMainVideo() || allVideos[0];
    const category = categoryFilter || this.activeCategory || 'todas';
    this.activeCategory = category;

    const filteredVideos = category === 'todas'
      ? allVideos
      : allVideos.filter(v => v.category === category);

    return `
      <div class="videos-hub-view max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- Breadcrumb -->
        <div class="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <a href="#/portada" class="hover:text-[#213863] font-bold">Inicio</a>
          <span>/</span>
          <span class="text-[#213863] font-bold uppercase">POLSO en Video</span>
        </div>

        <!-- Encabezado de la Sección -->
        <header class="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200 mb-10">
          <div>
            <div class="inline-flex items-center gap-2 bg-[#F7C901] text-[#213863] text-xs font-black uppercase px-3 py-1 rounded-sm mb-3">
              <i class="fa-solid fa-play"></i> Canal Audiovisual
            </div>
            <h1 class="text-3xl sm:text-4xl font-black font-serif-editorial text-[#213863] tracking-tight">
              POLSO en Video
            </h1>
            <p class="text-slate-600 text-sm mt-1 max-w-2xl">
              Entrevistas de poder, análisis de coyuntura y programas en profundidad incrustados directamente desde YouTube.
            </p>
          </div>

          <div class="flex items-center gap-3">
            <button
              onclick="Polso.Views.Videos.openAddVideoModal()"
              class="bg-[#213863] hover:bg-[#172746] text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-sm"
            >
              <i class="fa-solid fa-plus text-[#F7C901]"></i>
              Añadir video de YouTube
            </button>
            <a
              href="https://youtube.com"
              target="_blank"
              class="border border-slate-300 hover:border-[#213863] text-slate-700 px-4 py-2.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-2"
            >
              <i class="fa-brands fa-youtube text-red-600 text-sm"></i>
              Canal Oficial
            </a>
          </div>
        </header>

        <!-- VIDEO PRINCIPAL DESTACADO (16:9) -->
        ${mainVideo ? `
          <section class="featured-video-player bg-[#172746] rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-14">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-8">
                <div class="aspect-video-container shadow-2xl border border-slate-700">
                  <iframe
                    id="featured-youtube-iframe"
                    src="https://www.youtube.com/embed/${mainVideo.youtubeId}?rel=0"
                    title="${mainVideo.title}"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                </div>
              </div>

              <div class="lg:col-span-4 flex flex-col justify-between">
                <div>
                  <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F7C901] mb-3">
                    <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    Transmisión Destacada · ${mainVideo.categoryLabel}
                  </div>

                  <h2 class="text-xl sm:text-2xl font-black font-serif-editorial text-white mb-4 leading-snug">
                    ${mainVideo.title}
                  </h2>

                  <p class="text-slate-300 text-sm leading-relaxed mb-6">
                    ${mainVideo.description}
                  </p>
                </div>

                <div class="pt-6 border-t border-slate-700/70 flex items-center justify-between text-xs text-slate-400">
                  <span>Conduce: <strong class="text-white">${mainVideo.author}</strong></span>
                  <span class="font-mono bg-black/40 px-2 py-1 rounded text-slate-300">${mainVideo.duration}</span>
                </div>
              </div>
            </div>
          </section>
        ` : ''}

        <!-- FILTROS TEMÁTICOS DE VIDEOS -->
        <div class="flex items-center gap-2 pb-4 mb-8 border-b border-slate-200 overflow-x-auto whitespace-nowrap">
          <button
            onclick="Polso.Views.Videos.filterCategory('todas')"
            class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${category === 'todas' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}"
          >
            Todos los videos
          </button>
          <button
            onclick="Polso.Views.Videos.filterCategory('entrevistas')"
            class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${category === 'entrevistas' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}"
          >
            Entrevistas
          </button>
          <button
            onclick="Polso.Views.Videos.filterCategory('analisis')"
            class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${category === 'analisis' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}"
          >
            Análisis en video
          </button>
          <button
            onclick="Polso.Views.Videos.filterCategory('programas')"
            class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${category === 'programas' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}"
          >
            Programas
          </button>
          <button
            onclick="Polso.Views.Videos.filterCategory('recientes')"
            class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${category === 'recientes' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}"
          >
            Videos recientes
          </button>
        </div>

        <!-- GRILLA DE VIDEOS -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${filteredVideos.map(video => `
            <div class="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group">
              <div>
                <div
                  class="relative aspect-video bg-black cursor-pointer overflow-hidden"
                  onclick="Polso.Views.Videos.openPlayerModal('${video.youtubeId}', '${video.title.replace(/'/g, "\\'")}')"
                >
                  <img
                    src="${video.thumbnail}"
                    alt="${video.title}"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  >
                  <div class="absolute inset-0 bg-black/30 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                    <div class="w-12 h-12 rounded-full bg-[#F7C901] text-[#213863] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <i class="fa-solid fa-play ml-0.5"></i>
                    </div>
                  </div>
                  <span class="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-mono px-2 py-0.5 rounded">
                    ${video.duration}
                  </span>
                  <span class="absolute top-2 left-2 bg-[#213863] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                    ${video.categoryLabel}
                  </span>
                </div>

                <div class="p-5">
                  <div class="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>${video.date}</span>
                    <span>${video.author}</span>
                  </div>

                  <h3 class="text-base font-bold font-serif-editorial text-[#213863] group-hover:text-[#172746] leading-snug mb-2 line-clamp-2">
                    <a href="javascript:void(0)" onclick="Polso.Views.Videos.openPlayerModal('${video.youtubeId}', '${video.title.replace(/'/g, "\\'")}')">
                      ${video.title}
                    </a>
                  </h3>

                  <p class="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    ${video.description}
                  </p>
                </div>
              </div>

              <div class="p-5 pt-0 flex items-center justify-between text-xs border-t border-slate-100">
                <button
                  onclick="Polso.Views.Videos.setAsMainVideo('${video.id}')"
                  class="text-slate-500 hover:text-[#213863] font-semibold text-[11px]"
                >
                  Reproducir arriba ↑
                </button>
                <button
                  onclick="Polso.Views.Videos.openPlayerModal('${video.youtubeId}', '${video.title.replace(/'/g, "\\'")}')"
                  class="font-bold text-[#213863] hover:text-[#F7C901] transition-colors flex items-center gap-1"
                >
                  Ver en ventana <i class="fa-solid fa-expand text-[10px]"></i>
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- MODAL DE REPRODUCTOR DE VIDEO -->
        <div id="video-player-modal" class="hidden fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4">
          <div class="bg-slate-900 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl border border-slate-700 animate-fadeIn">
            <div class="flex items-center justify-between p-4 border-b border-slate-800 text-white">
              <h4 id="modal-video-title" class="font-bold text-sm truncate mr-4 text-slate-200"></h4>
              <button onclick="Polso.Views.Videos.closePlayerModal()" class="text-slate-400 hover:text-white p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            <div class="p-4 bg-black">
              <div class="aspect-video-container">
                <iframe
                  id="modal-youtube-iframe"
                  src=""
                  title="Reproductor POLSO"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <!-- MODAL PARA AÑADIR VIDEO DE YOUTUBE -->
        <div id="add-video-modal" class="hidden fixed inset-0 z-50 modal-backdrop flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200">
            <div class="flex items-center justify-between p-5 border-b border-slate-200 bg-[#213863] text-white">
              <div class="flex items-center gap-2">
                <i class="fa-brands fa-youtube text-red-500 text-lg"></i>
                <h3 class="font-bold text-base">Añadir Video desde YouTube</h3>
              </div>
              <button onclick="Polso.Views.Videos.closeAddVideoModal()" class="text-slate-300 hover:text-white">
                <i class="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onsubmit="event.preventDefault(); Polso.Views.Videos.saveNewVideo(this);" class="p-6 space-y-4">
              <div>
                <label class="block text-xs font-bold uppercase text-[#213863] mb-1">
                  URL o Enlace de YouTube *
                </label>
                <input
                  type="text"
                  name="youtubeUrl"
                  required
                  placeholder="Ej: https://www.youtube.com/watch?v=dQw4w9WgXcQ o https://youtu.be/..."
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                  oninput="Polso.Views.Videos.previewYouTubeId(this.value)"
                >
                <p id="youtube-url-feedback" class="text-[11px] text-slate-500 mt-1">
                  POLSO extraerá automáticamente el código identificador seguro del video.
                </p>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Título del Video *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="Titular periodístico del video..."
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                >
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Categoría</label>
                  <select
                    name="category"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                  >
                    <option value="entrevistas">Entrevistas</option>
                    <option value="analisis">Análisis en video</option>
                    <option value="programas">Programas</option>
                    <option value="recientes">Videos recientes</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Duración (aprox.)</label>
                  <input
                    type="text"
                    name="duration"
                    placeholder="Ej: 18:24"
                    class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                  >
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Descripción breve</label>
                <textarea
                  name="description"
                  rows="2"
                  placeholder="Resumen del contenido del video..."
                  class="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
                ></textarea>
              </div>

              <div class="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onclick="Polso.Views.Videos.closeAddVideoModal()"
                  class="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  class="bg-[#213863] hover:bg-[#172746] text-white px-5 py-2 rounded-lg text-xs font-bold transition-colors"
                >
                  Guardar e Incrustar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  },

  filterCategory(cat) {
    this.activeCategory = cat;
    window.location.hash = cat === 'todas' ? '#/videos' : `#/videos/${cat}`;
  },

  setAsMainVideo(videoId) {
    const store = window.Polso.Store;
    const all = store.getVideos();
    all.forEach(v => { v.isMain = (v.id === videoId); });
    store.save();
    window.Polso.Router.route();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    Polso.App.toast('Video colocado como principal');
  },

  openPlayerModal(youtubeId, title) {
    const modal = document.getElementById('video-player-modal');
    const iframe = document.getElementById('modal-youtube-iframe');
    const titleEl = document.getElementById('modal-video-title');
    if (modal && iframe) {
      iframe.src = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`;
      if (titleEl) titleEl.textContent = title;
      modal.classList.remove('hidden');
    }
  },

  closePlayerModal() {
    const modal = document.getElementById('video-player-modal');
    const iframe = document.getElementById('modal-youtube-iframe');
    if (modal && iframe) {
      iframe.src = '';
      modal.classList.add('hidden');
    }
  },

  openAddVideoModal() {
    const modal = document.getElementById('add-video-modal');
    if (modal) modal.classList.remove('hidden');
  },

  closeAddVideoModal() {
    const modal = document.getElementById('add-video-modal');
    if (modal) modal.classList.add('hidden');
  },

  previewYouTubeId(url) {
    const feedback = document.getElementById('youtube-url-feedback');
    const id = window.Polso.Store.extractYouTubeId(url);
    if (feedback) {
      if (id) {
        feedback.innerHTML = `<span class="text-emerald-600 font-bold">✓ ID de video identificado correctamente: <strong>${id}</strong></span>`;
      } else if (url.trim().length > 5) {
        feedback.innerHTML = `<span class="text-amber-600">Introduzca una URL válida de YouTube</span>`;
      }
    }
  },

  saveNewVideo(form) {
    const store = window.Polso.Store;
    const url = form.youtubeUrl.value.trim();
    const id = store.extractYouTubeId(url);

    if (!id) {
      alert('Por favor introduzca una URL o identificador válido de YouTube.');
      return;
    }

    const categoryMap = {
      entrevistas: 'Entrevistas',
      analisis: 'Análisis en video',
      programas: 'Programas',
      recientes: 'Videos recientes'
    };

    const newVideo = {
      title: form.title.value.trim(),
      category: form.category.value,
      categoryLabel: categoryMap[form.category.value] || 'Video',
      youtubeUrl: url,
      youtubeId: id,
      duration: form.duration.value.trim() || '15:00',
      description: form.description.value.trim(),
      author: 'Redacción POLSO Video',
      date: new Date().toISOString().split('T')[0]
    };

    store.saveVideo(newVideo);
    this.closeAddVideoModal();
    Polso.App.toast('Video añadido con éxito a la galería');
    window.Polso.Router.route();
  }
};
