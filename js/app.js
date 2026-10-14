/**
 * POLSO - Aplicación Principal y Manejo de Eventos UI
 * - Barra de progreso de lectura
 * - Menú hamburguesa móvil y desplegables accesibles
 * - Modal de búsqueda global con atajo de teclado (Cmd+K / Ctrl+K)
 * - Sistema de notificaciones Toast
 */

window.Polso = window.Polso || {};

(function () {
  const App = {
    init() {
      this.initStore();
      this.initRouter();
      this.initHeaderEvents();
      this.initScrollProgress();
      this.initKeyboardShortcuts();
      this.updateHeaderDate();
    },

    initStore() {
      if (window.Polso.Store) {
        window.Polso.Store.init();
      }
    },

    initRouter() {
      if (window.Polso.Router) {
        window.Polso.Router.init();
      }
    },

    // Fecha actual formateada para la barra superior
    updateHeaderDate() {
      const dateEl = document.getElementById('header-current-date');
      if (dateEl) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const now = new Date().toLocaleDateString('es-ES', options);
        // Capitalizar primera letra
        dateEl.textContent = now.charAt(0).toUpperCase() + now.slice(1);
      }
    },

    // Eventos del encabezado y menús desplegables
    initHeaderEvents() {
      // Toggle de menús desplegables por clic y soporte accesible
      const dropdownButtons = document.querySelectorAll('.dropdown-toggle-btn');
      dropdownButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const parent = btn.closest('.dropdown');
          const isOpen = parent.classList.contains('is-open');

          // Cerrar otros dropdowns abiertos
          document.querySelectorAll('.dropdown.is-open').forEach(d => {
            if (d !== parent) d.classList.remove('is-open');
          });

          if (isOpen) {
            parent.classList.remove('is-open');
            btn.setAttribute('aria-expanded', 'false');
          } else {
            parent.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      });

      // Cerrar dropdowns al hacer clic fuera
      document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown.is-open').forEach(d => {
          d.classList.remove('is-open');
          const btn = d.querySelector('.dropdown-toggle-btn');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });
      });
    },

    // Menú hamburguesa móvil
    toggleMobileMenu() {
      const menu = document.getElementById('mobile-drawer');
      const backdrop = document.getElementById('mobile-drawer-backdrop');
      if (!menu) return;

      const isClosed = menu.classList.contains('-translate-x-full');
      if (isClosed) {
        menu.classList.remove('-translate-x-full');
        if (backdrop) backdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      } else {
        this.closeMobileMenu();
      }
    },

    closeMobileMenu() {
      const menu = document.getElementById('mobile-drawer');
      const backdrop = document.getElementById('mobile-drawer-backdrop');
      if (menu) menu.classList.add('-translate-x-full');
      if (backdrop) backdrop.classList.add('hidden');
      document.body.style.overflow = '';
    },

    // Acordeón para subcategorías en móvil
    toggleMobileAccordion(sectionId) {
      const content = document.getElementById(sectionId);
      const icon = document.getElementById('icon-' + sectionId);
      if (!content) return;

      if (content.classList.contains('hidden')) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      } else {
        content.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
      }
    },

    // Modal de búsqueda global
    openSearchModal() {
      const modal = document.getElementById('global-search-modal');
      const input = document.getElementById('global-search-input');
      if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => { if (input) input.focus(); }, 100);
      }
    },

    closeSearchModal() {
      const modal = document.getElementById('global-search-modal');
      if (modal) modal.classList.add('hidden');
    },

    handleGlobalSearch(query) {
      if (!query || !query.trim()) return;
      this.closeSearchModal();
      window.location.hash = `#/buscar?q=${encodeURIComponent(query.trim())}`;
    },

    // Barra de progreso de lectura en artículos
    initScrollProgress() {
      const bar = document.getElementById('reading-progress-bar');
      if (!bar) return;

      window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const progress = (window.scrollY / totalHeight) * 100;
          bar.style.width = `${progress}%`;
        }
      });
    },

    // Atajos de teclado útiles (Cmd+K / Ctrl+K para buscar, Escape para cerrar)
    initKeyboardShortcuts() {
      document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          this.openSearchModal();
        }
        if (e.key === 'Escape') {
          this.closeSearchModal();
          this.closeMobileMenu();
          if (Polso.Views.Videos && Polso.Views.Videos.closePlayerModal) {
            Polso.Views.Videos.closePlayerModal();
          }
          if (Polso.Views.Admin && Polso.Views.Admin.closeArticleModal) {
            Polso.Views.Admin.closeArticleModal();
          }
        }
      });
    },

    // Sistema de notificaciones Toast
    toast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toastEl = document.createElement('div');
      toastEl.className = 'toast';
      toastEl.innerHTML = `
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-[#F7C901]' : 'fa-triangle-exclamation text-red-400'} text-base"></i>
        <div class="flex-1 font-medium">${message}</div>
      `;

      container.appendChild(toastEl);

      setTimeout(() => {
        toastEl.style.opacity = '0';
        toastEl.style.transform = 'translateY(10px)';
        toastEl.style.transition = 'all 0.3s ease';
        setTimeout(() => toastEl.remove(), 300);
      }, 3500);
    },

    // Suscripción al boletín
    subscribeNewsletter(form) {
      const email = form.querySelector('input[type="email"]').value;
      if (email) {
        form.reset();
        this.toast(`¡Gracias por suscribirse a POLSO con ${email}! Recibirá nuestro informe editorial cada mañana.`);
      }
    }
  };

  window.Polso.App = App;
})();
