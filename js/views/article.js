/**
 * POLSO - Vista: Página Individual de Artículo
 * Implementa la estructura editorial completa requerida en la Sección 5 del Prompt Maestro:
 * - Categoría, Titular, Subtítulo
 * - Autor y perfil con enlaces
 * - Fecha de publicación y actualización
 * - Imagen principal con caption y alt
 * - Cuerpo con subtítulos, citas, listas, video de YouTube incrustado
 * - Botones de compartir
 * - Artículos relacionados
 * - Más publicaciones del autor
 * - Identificación visible para Columnas de Opinión
 */

window.Polso = window.Polso || {};
window.Polso.Views = window.Polso.Views || {};

window.Polso.Views.Article = {
  render(articleId) {
    const store = window.Polso.Store;
    const article = store.getArticleById(articleId);

    if (!article) {
      return `
        <div class="max-w-4xl mx-auto px-4 py-20 text-center">
          <div class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            !
          </div>
          <h2 class="text-3xl font-black font-serif-editorial text-[#213863] mb-4">Artículo no encontrado</h2>
          <p class="text-slate-600 mb-8">El artículo solicitado no existe o fue reubicado en la plataforma.</p>
          <a href="#/portada" class="bg-[#213863] text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-[#172746]">
            Volver a la Portada
          </a>
        </div>
      `;
    }

    const author = store.getColumnistById(article.authorId) || {
      name: article.authorName,
      role: 'Redacción POLSO',
      avatar: 'assets/images/logo-principal.png',
      bio: 'Equipo periodístico de POLSO dedicado al seguimiento de la política nacional, el poder y la actualidad.',
      id: article.authorId || 'redaccion'
    };

    const isOpinion = article.type === 'opinion';
    const relatedArticles = store.getArticles()
      .filter(a => a.id !== article.id && (a.category === article.category || a.type === article.type))
      .slice(0, 3);
    const moreByAuthor = store.getArticlesByAuthor(article.authorId)
      .filter(a => a.id !== article.id)
      .slice(0, 3);
    const comments = store.getComments(article.id);

    // Si tiene video de YouTube
    const youtubeId = article.youtubeUrl ? store.extractYouTubeId(article.youtubeUrl) : null;

    return `
      <article class="article-single-view bg-white pb-20">
        <!-- Barra de navegación contextual (Miga de pan) -->
        <nav class="border-b border-slate-200 bg-slate-50 py-3 px-4 sm:px-6 lg:px-8">
          <div class="max-w-4xl mx-auto flex items-center justify-between text-xs text-slate-500">
            <div class="flex items-center gap-2 overflow-x-auto whitespace-nowrap">
              <a href="#/portada" class="hover:text-[#213863] font-semibold">Inicio</a>
              <span>/</span>
              <a href="#/categoria/${article.category}" class="hover:text-[#213863] font-semibold uppercase">
                ${article.categoryLabel}
              </a>
              <span>/</span>
              <span class="text-slate-400 truncate max-w-xs">${article.title}</span>
            </div>
            <div class="hidden sm:flex items-center gap-3">
              <span class="text-slate-400">Tamaño del texto:</span>
              <button onclick="Polso.Views.Article.changeFontSize(-1)" class="w-6 h-6 border rounded bg-white font-bold hover:bg-slate-100" title="Reducir fuente">A-</button>
              <button onclick="Polso.Views.Article.changeFontSize(1)" class="w-6 h-6 border rounded bg-white font-bold hover:bg-slate-100" title="Aumentar fuente">A+</button>
            </div>
          </div>
        </nav>

        <!-- ENCABEZADO EDITORIAL -->
        <header class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
          <!-- Distintivo según tipo (Opinión, Noticia, Análisis) -->
          <div class="flex items-center gap-3 mb-4">
            ${isOpinion ? `
              <span class="badge-opinion text-xs font-black uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                <i class="fa-solid fa-pen-fancy mr-1"></i> COLUMNA DE OPINIÓN
              </span>
            ` : `
              <span class="badge-blue text-xs font-bold uppercase tracking-wider px-3 py-1 rounded shadow-sm">
                ${article.categoryLabel}
              </span>
            `}
            <span class="text-xs text-slate-500 flex items-center gap-1">
              <i class="fa-regular fa-clock"></i>
              ${article.readTime}
            </span>
          </div>

          <!-- Titular principal -->
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black font-serif-editorial text-[#213863] leading-tight mb-6">
            ${article.title}
          </h1>

          <!-- Subtítulo o Resumen -->
          <p class="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal mb-8 border-l-2 border-[#F7C901] pl-4 italic">
            ${article.subtitle}
          </p>

          <!-- Ficha de Autor y Metadatos -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-y border-slate-200">
            <div class="flex items-center gap-4">
              <img
                src="${author.avatar}"
                alt="${author.name}"
                class="w-14 h-14 rounded-full object-cover border-2 ${isOpinion ? 'border-[#F7C901]' : 'border-slate-300'} shadow-sm"
                onerror="this.src='assets/images/logo-principal.png'"
              >
              <div>
                <div class="flex items-center gap-2">
                  <a href="#/columnista/${author.id}" class="text-base font-bold text-[#213863] hover:underline">
                    ${author.name}
                  </a>
                  ${isOpinion ? '<span class="text-[10px] bg-[#F7C901] text-[#213863] font-black uppercase px-1.5 py-0.5 rounded">Columnista</span>' : ''}
                </div>
                <p class="text-xs text-slate-500 line-clamp-1">${author.role}</p>
                <div class="text-xs text-slate-400 mt-0.5">
                  Publicado: <span class="text-slate-600 font-medium">${article.date}</span>
                  ${article.updatedDate ? `· Actualizado: <span class="text-slate-600">${article.updatedDate}</span>` : ''}
                </div>
              </div>
            </div>

            <!-- Botones de Redes Sociales para Compartir -->
            <div class="flex items-center gap-2 shrink-0">
              <span class="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">Compartir:</span>
              <button
                onclick="Polso.Views.Article.shareArticle('twitter', '${article.title.replace(/'/g, "\\'")}', window.location.href)"
                class="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#213863] hover:text-white text-slate-600 flex items-center justify-center transition-colors shadow-sm"
                title="Compartir en X / Twitter"
              >
                <i class="fa-brands fa-x-twitter text-sm"></i>
              </button>
              <button
                onclick="Polso.Views.Article.shareArticle('whatsapp', '${article.title.replace(/'/g, "\\'")}', window.location.href)"
                class="w-9 h-9 rounded-full bg-slate-100 hover:bg-emerald-600 hover:text-white text-slate-600 flex items-center justify-center transition-colors shadow-sm"
                title="Compartir en WhatsApp"
              >
                <i class="fa-brands fa-whatsapp text-sm"></i>
              </button>
              <button
                onclick="Polso.Views.Article.shareArticle('linkedin', '${article.title.replace(/'/g, "\\'")}', window.location.href)"
                class="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-700 hover:text-white text-slate-600 flex items-center justify-center transition-colors shadow-sm"
                title="Compartir en LinkedIn"
              >
                <i class="fa-brands fa-linkedin-in text-sm"></i>
              </button>
              <button
                onclick="Polso.Views.Article.copyUrl(window.location.href)"
                class="w-9 h-9 rounded-full bg-slate-100 hover:bg-[#F7C901] hover:text-[#213863] text-slate-600 flex items-center justify-center transition-colors shadow-sm"
                title="Copiar enlace"
              >
                <i class="fa-solid fa-link text-sm"></i>
              </button>
            </div>
          </div>
        </header>

        <!-- IMAGEN DESTACADA PRINCIPAL -->
        ${article.image ? `
          <figure class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
            <div class="relative rounded-xl overflow-hidden shadow-sm bg-slate-900">
              <img
                src="${article.image}"
                alt="${article.title}"
                class="w-full max-h-[540px] object-cover"
                onerror="this.src='assets/images/lanzamiento.png'"
              >
            </div>
            ${article.imageCaption ? `
              <figcaption class="mt-2 text-xs text-slate-500 italic text-center sm:text-left flex items-center gap-1.5 justify-center sm:justify-start">
                <i class="fa-solid fa-camera text-slate-400"></i>
                ${article.imageCaption}
              </figcaption>
            ` : ''}
          </figure>
        ` : ''}

        <!-- CUERPO PRINCIPAL DEL ARTÍCULO -->
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="article-body-content" class="article-content font-body-editorial text-slate-800 text-lg leading-relaxed space-y-6">
            ${article.content}
          </div>

          <!-- Video de YouTube incrustado si existe -->
          ${youtubeId ? `
            <div class="my-10 bg-slate-900 rounded-xl p-4 shadow-lg">
              <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#F7C901] mb-3">
                <i class="fa-solid fa-video"></i>
                Video relacionado de cobertura
              </div>
              <div class="aspect-video-container">
                <iframe
                  src="https://www.youtube.com/embed/${youtubeId}?rel=0"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          ` : ''}

          <!-- Etiquetas del Artículo -->
          ${article.tags && article.tags.length > 0 ? `
            <div class="pt-8 mt-10 border-t border-slate-200">
              <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Temas vinculados:</span>
              <div class="flex flex-wrap gap-2">
                ${article.tags.map(tag => `
                  <a
                    href="#/buscar?q=${encodeURIComponent(tag)}"
                    class="px-3 py-1 bg-slate-100 hover:bg-[#213863] hover:text-white rounded-full text-xs font-semibold text-slate-700 transition-colors"
                  >
                    #${tag}
                  </a>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- Caja de Autor al pie del artículo -->
          <div class="mt-12 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img
              src="${author.avatar}"
              alt="${author.name}"
              class="w-20 h-20 rounded-full object-cover border-2 border-[#213863] shadow-md shrink-0"
              onerror="this.src='assets/images/logo-principal.png'"
            >
            <div class="text-center sm:text-left flex-1">
              <span class="text-xs font-bold text-[#F7C901] uppercase tracking-wider bg-[#213863] px-2 py-0.5 rounded inline-block mb-1">
                Sobre el autor
              </span>
              <h3 class="text-xl font-bold font-serif-editorial text-[#213863] mb-1">
                <a href="#/columnista/${author.id}" class="hover:underline">
                  ${author.name}
                </a>
              </h3>
              <p class="text-xs text-slate-500 font-medium mb-3">${author.role}</p>
              <p class="text-sm text-slate-600 leading-relaxed mb-4">
                ${author.bio}
              </p>
              <a
                href="#/columnista/${author.id}"
                class="inline-flex items-center gap-1.5 text-xs font-bold text-[#213863] hover:text-[#F7C901] transition-colors"
              >
                Ver todos sus artículos y columnas <i class="fa-solid fa-arrow-right text-[10px]"></i>
              </a>
            </div>
          </div>

          <!-- SECCIÓN DE COMENTARIOS / INTERACCIÓN EDITORIAL -->
          <section class="mt-14 pt-8 border-t border-slate-200">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold font-serif-editorial text-[#213863]">
                Debate y Comentarios de Lectores (${comments.length})
              </h3>
              <span class="text-xs text-slate-500">Moderación editorial activa</span>
            </div>

            <!-- Formulario de nuevo comentario -->
            <form onsubmit="event.preventDefault(); Polso.Views.Article.submitComment('${article.id}', this);" class="bg-white border border-slate-200 rounded-lg p-5 mb-8 shadow-sm">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Su nombre completo..."
                  class="px-3.5 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#213863]"
                >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Su correo (no será público)..."
                  class="px-3.5 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#213863]"
                >
              </div>
              <textarea
                name="text"
                required
                rows="3"
                placeholder="Comparta su opinión o perspectiva argumentada sobre esta publicación..."
                class="w-full px-3.5 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#213863] mb-3"
              ></textarea>
              <div class="flex items-center justify-between">
                <span class="text-xs text-slate-400">POLSO promueve el debate riguroso y respetuoso.</span>
                <button
                  type="submit"
                  class="bg-[#213863] hover:bg-[#172746] text-white text-xs font-bold px-5 py-2 rounded transition-colors shadow-sm"
                >
                  Publicar comentario
                </button>
              </div>
            </form>

            <!-- Lista de comentarios -->
            <div class="space-y-4">
              ${comments.length === 0 ? `
                <p class="text-sm text-slate-500 italic text-center py-4">Sea el primero en comentar esta publicación.</p>
              ` : comments.map(c => `
                <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-bold text-sm text-[#213863]">${c.name}</span>
                    <span class="text-xs text-slate-400">${c.date}</span>
                  </div>
                  <p class="text-sm text-slate-700 leading-relaxed">${c.text}</p>
                </div>
              `).join('')}
            </div>
          </section>
        </div>

        <!-- ARTÍCULOS RELACIONADOS Y MÁS DEL AUTOR -->
        <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-12 border-t-2 border-slate-200">
          <div class="mb-8">
            <h3 class="text-2xl font-black font-serif-editorial text-[#213863] tracking-tight">
              Artículos Relacionados
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            ${relatedArticles.map(rel => `
              <div class="article-card flex flex-col justify-between group">
                <div>
                  <div class="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                    <img
                      src="${rel.image}"
                      alt="${rel.title}"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onerror="this.src='assets/images/diseno-2.png'"
                    >
                    <span class="absolute top-2 left-2 bg-[#213863] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow">
                      ${rel.categoryLabel}
                    </span>
                  </div>
                  <div class="p-4">
                    <h4 class="font-bold font-serif-editorial text-base text-slate-900 group-hover:text-[#213863] leading-snug mb-2 line-clamp-2">
                      <a href="#/articulo/${rel.id}">
                        ${rel.title}
                      </a>
                    </h4>
                    <p class="text-xs text-slate-600 line-clamp-2 mb-3">
                      ${rel.subtitle}
                    </p>
                  </div>
                </div>
                <div class="p-4 pt-0 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <span>${rel.authorName}</span>
                  <a href="#/articulo/${rel.id}" class="text-[#213863] font-bold hover:underline">Leer</a>
                </div>
              </div>
            `).join('')}
          </div>

          ${moreByAuthor.length > 0 ? `
            <div class="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 class="font-bold text-sm uppercase tracking-wider text-[#213863] mb-4">
                Más publicaciones de ${author.name}:
              </h4>
              <ul class="divide-y divide-slate-200">
                ${moreByAuthor.map(item => `
                  <li class="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <a href="#/articulo/${item.id}" class="font-serif-editorial font-bold text-slate-800 hover:text-[#213863] transition-colors">
                      ${item.title}
                    </a>
                    <span class="text-xs text-slate-500 shrink-0">${item.date}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
          ` : ''}
        </section>
      </article>
    `;
  },

  // Ajuste interactivo del tamaño de letra
  changeFontSize(delta) {
    const el = document.getElementById('article-body-content');
    if (!el) return;
    const currentSize = parseFloat(window.getComputedStyle(el).fontSize);
    const newSize = Math.max(14, Math.min(24, currentSize + delta * 2));
    el.style.fontSize = newSize + 'px';
  },

  // Compartir en redes sociales
  shareArticle(platform, title, url) {
    let shareUrl = '';
    const text = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);

    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}&via=polso_digital`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    }
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=450');
    }
  },

  // Copiar URL con Toast feedback
  copyUrl(url) {
    navigator.clipboard.writeText(url).then(() => {
      Polso.App.toast('Enlace copiado al portapapeles con éxito');
    }).catch(() => {
      Polso.App.toast('No se pudo copiar el enlace', 'error');
    });
  },

  // Enviar comentario
  submitComment(articleId, form) {
    const name = form.name.value.trim();
    const text = form.text.value.trim();
    if (!name || !text) return;

    window.Polso.Store.addComment(articleId, { name, text });
    form.reset();
    Polso.App.toast('Comentario publicado correctamente');
    // Re-renderizar la vista
    window.location.reload ? window.Polso.Router.route() : null;
  }
};
