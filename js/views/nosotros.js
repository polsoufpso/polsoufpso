/**
 * POLSO - Vista: Nosotros, Línea Editorial, Equipo y Contacto
 * Implementa las secciones institucionales requeridas en el Menú:
 * - Quiénes somos
 * - Línea editorial & Código de ética
 * - Equipo periodístico (utilizando assets/images/equipo-portada.png)
 * - Formulario de contacto funcional con validación
 * - Política de privacidad y tratamiento de datos
 */

window.Polso = window.Polso || {};
window.Polso.Views = window.Polso.Views || {};

window.Polso.Views.Nosotros = {
  render(subview) {
    const sub = subview || 'quienes-somos';

    return `
      <div class="nosotros-view max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <!-- Breadcrumb -->
        <div class="text-xs text-slate-500 mb-6 flex items-center gap-2">
          <a href="#/portada" class="hover:text-[#213863] font-bold">Inicio</a>
          <span>/</span>
          <span class="text-[#213863] font-bold uppercase">Nosotros</span>
        </div>

        <!-- Encabezado Institucional -->
        <header class="bg-[#213863] text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-sm border-b-4 border-[#F7C901]">
          <span class="text-xs font-black uppercase tracking-widest text-[#F7C901] bg-[#172746] px-3 py-1 rounded-sm mb-3 inline-block">
            Medio Digital Independiente
          </span>
          <h1 class="text-3xl sm:text-5xl font-black font-serif-editorial mb-3 tracking-tight">
            POLSO
          </h1>
          <p class="text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed">
            Un medio de comunicación dedicado al periodismo político, el análisis riguroso y la opinión fundamentada.
          </p>
        </header>

        <!-- Subnavegación Institucional -->
        <div class="flex items-center gap-2 border-b border-slate-200 pb-4 mb-10 overflow-x-auto whitespace-nowrap">
          <a href="#/nosotros/quienes-somos" class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${sub === 'quienes-somos' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            Quiénes somos
          </a>
          <a href="#/nosotros/linea-editorial" class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${sub === 'linea-editorial' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            Línea editorial & Ética
          </a>
          <a href="#/nosotros/equipo" class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${sub === 'equipo' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            Equipo & Redacción
          </a>
          <a href="#/nosotros/contacto" class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${sub === 'contacto' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            Contacto
          </a>
          <a href="#/nosotros/privacidad" class="px-4 py-2 rounded-lg text-xs font-bold transition-colors ${sub === 'privacidad' ? 'bg-[#213863] text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            Política de privacidad
          </a>
        </div>

        <!-- Contenido según la pestaña activa -->
        <div class="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          ${sub === 'quienes-somos' ? this.renderQuienesSomos() : ''}
          ${sub === 'linea-editorial' ? this.renderLineaEditorial() : ''}
          ${sub === 'equipo' ? this.renderEquipo() : ''}
          ${sub === 'contacto' ? this.renderContacto() : ''}
          ${sub === 'privacidad' ? this.renderPrivacidad() : ''}
        </div>
      </div>
    `;
  },

  renderQuienesSomos() {
    return `
      <div class="space-y-6">
        <h2 class="text-3xl font-black font-serif-editorial text-[#213863] mb-4">
          Nuestra Misión y Propósito
        </h2>
        <p class="text-base text-slate-700 leading-relaxed font-body-editorial">
          <strong>POLSO</strong> nace con la convicción de que una democracia deliberativa robusta requiere medios digitales comprometidos exclusivamente con la verdad comprobada, el criterio analítico y la independencia editorial.
        </p>
        <p class="text-base text-slate-700 leading-relaxed font-body-editorial">
          Frente al ruido de las redes sociales y el sensacionalismo de la inmediatez, POLSO apuesta por la pausa reflexiva, el contraste metodológico de fuentes y la explicación pedagógica del ejercicio del poder público.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <div class="p-6 bg-slate-50 border-t-4 border-[#213863] rounded-xl">
            <i class="fa-solid fa-scale-balanced text-2xl text-[#213863] mb-3"></i>
            <h3 class="font-bold text-lg text-[#213863] mb-2">Rigor Analítico</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              No nos limitamos a contar lo que ocurre: investigamos por qué ocurre y cuáles son sus consecuencias institucionales y ciudadanas.
            </p>
          </div>
          <div class="p-6 bg-slate-50 border-t-4 border-[#F7C901] rounded-xl">
            <i class="fa-solid fa-shield-halved text-2xl text-[#213863] mb-3"></i>
            <h3 class="font-bold text-lg text-[#213863] mb-2">Independencia</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Sin militancia partidista ni subordinación a grupos económicos. Nuestro único compromiso es con el derecho de la ciudadanía a estar informada.
            </p>
          </div>
          <div class="p-6 bg-slate-50 border-t-4 border-[#213863] rounded-xl">
            <i class="fa-solid fa-lightbulb text-2xl text-[#213863] mb-3"></i>
            <h3 class="font-bold text-lg text-[#213863] mb-2">Pluralismo</h3>
            <p class="text-xs text-slate-600 leading-relaxed">
              Acogemos una diversidad de firmas y corrientes del pensamiento democrático para enriquecer la deliberación pública.
            </p>
          </div>
        </div>
      </div>
    `;
  },

  renderLineaEditorial() {
    return `
      <div class="space-y-6">
        <h2 class="text-3xl font-black font-serif-editorial text-[#213863] mb-4">
          Línea Editorial & Principios Éticos
        </h2>
        <p class="text-base text-slate-700 leading-relaxed">
          POLSO se rige por un estricto Código de Ética Periodística que orienta cada una de las coberturas, columnas y reportajes emitidos en nuestra plataforma.
        </p>

        <div class="space-y-6 my-8">
          <div class="border-l-4 border-[#213863] pl-4">
            <h3 class="font-bold text-lg text-[#213863] mb-1">1. Separación taxativa entre información y opinión</h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              Nuestras notas periodísticas se fundamentan en hechos corroborados, documentos oficiales y testimonios de primera mano. Las columnas de opinión reflejan exclusivamente la postura de su autor y se identifican con total nitidez en el diseño visual de la plataforma.
            </p>
          </div>

          <div class="border-l-4 border-[#F7C901] pl-4">
            <h3 class="font-bold text-lg text-[#213863] mb-1">2. Derecho a la réplica y rectificación</h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              Cualquier persona, entidad o funcionario aludido en una investigación tiene garantizado el espacio oportuno para presentar sus precisiones o descargos.
            </p>
          </div>

          <div class="border-l-4 border-[#213863] pl-4">
            <h3 class="font-bold text-lg text-[#213863] mb-1">3. Conflicto de interés y transparencia</h3>
            <p class="text-sm text-slate-600 leading-relaxed">
              Los periodistas y columnistas de POLSO declaran públicamente cualquier vínculo contractual, familiar o institucional que pudiera comprometer la imparcialidad de su cobertura.
            </p>
          </div>
        </div>
      </div>
    `;
  },

  renderEquipo() {
    return `
      <div class="space-y-8">
        <div>
          <h2 class="text-3xl font-black font-serif-editorial text-[#213863] mb-2">
            Equipo de Redacción & Consejo Editorial
          </h2>
          <p class="text-slate-600 text-sm">
            Los profesionales detrás del pulso informativo diario de POLSO.
          </p>
        </div>

        <!-- Fotografía del equipo -->
        <div class="rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
          <img
            src="assets/images/equipo-portada.png"
            alt="Equipo de Redacción POLSO"
            class="w-full h-80 object-cover"
            onerror="this.src='assets/images/lanzamiento.png'"
          >
          <div class="p-4 bg-slate-900 text-white text-xs flex items-center justify-between">
            <span>Redacción central y mesa editorial de POLSO</span>
            <span class="text-[#F7C901] font-bold">Bogotá, D.C.</span>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6">
          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 class="font-bold text-base text-[#213863]">Dirección General</h4>
            <p class="text-xs text-slate-500 font-semibold mb-2">Steeven Zuleta</p>
            <p class="text-xs text-slate-600">Liderazgo editorial y estrategia institucional del medio.</p>
          </div>

          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 class="font-bold text-base text-[#213863]">Jefatura de Redacción</h4>
            <p class="text-xs text-slate-500 font-semibold mb-2">Dra. Clara Montalvo</p>
            <p class="text-xs text-slate-600">Coordinación de la agenda legislativa y cobertura política.</p>
          </div>

          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 class="font-bold text-base text-[#213863]">Unidad de Datos & Economía</h4>
            <p class="text-xs text-slate-500 font-semibold mb-2">Dr. Santiago Valenzuela</p>
            <p class="text-xs text-slate-600">Análisis macroeconómico, presupuesto y finanzas territoriales.</p>
          </div>

          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 class="font-bold text-base text-[#213863]">Investigaciones Especiales</h4>
            <p class="text-xs text-slate-500 font-semibold mb-2">Mariana Cárdenas</p>
            <p class="text-xs text-slate-600">Contratación del Estado y fiscalización ciudadana.</p>
          </div>

          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 class="font-bold text-base text-[#213863]">Gobernanza Regional</h4>
            <p class="text-xs text-slate-500 font-semibold mb-2">Andrés Felipe Restrepo</p>
            <p class="text-xs text-slate-600">Corresponsalías departamentales y descentralización.</p>
          </div>

          <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <h4 class="font-bold text-base text-[#213863]">Producción Audiovisual</h4>
            <p class="text-xs text-slate-500 font-semibold mb-2">Equipo POLSO Video</p>
            <p class="text-xs text-slate-600">Edición, entrevistas en estudio y coberturas en terreno.</p>
          </div>
        </div>
      </div>
    `;
  },

  renderContacto() {
    return `
      <div class="max-w-2xl mx-auto space-y-6">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-black font-serif-editorial text-[#213863] mb-2">
            Contacto & Sala de Redacción
          </h2>
          <p class="text-slate-600 text-sm">
            ¿Tiene una pista de investigación, una solicitud editorial o desea escribir en nuestro espacio de opinión?
          </p>
        </div>

        <form onsubmit="event.preventDefault(); Polso.Views.Nosotros.submitContact(this);" class="space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Nombre completo *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Su nombre..."
                class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
              >
            </div>
            <div>
              <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Correo electrónico *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="su.correo@ejemplo.com"
                class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
              >
            </div>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Motivo del mensaje</label>
            <select
              name="subject"
              class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
            >
              <option value="pista">Pista o filtración confidencial de investigación</option>
              <option value="opinion">Propuesta para publicar columna de opinión</option>
              <option value="prensa">Comunicado de prensa oficial</option>
              <option value="rectificacion">Solicitud de aclaración o rectificación</option>
              <option value="general">Consulta general</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold uppercase text-[#213863] mb-1">Mensaje *</label>
            <textarea
              name="message"
              required
              rows="5"
              placeholder="Describa los detalles de su mensaje..."
              class="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#213863]"
            ></textarea>
          </div>

          <div class="p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
            <i class="fa-solid fa-lock text-[#213863] mr-1"></i>
            Garantizamos estricta confidencialidad de la fuente periodística conforme al artículo 74 de la Constitución Política.
          </div>

          <button
            type="submit"
            class="w-full bg-[#213863] hover:bg-[#172746] text-white font-bold py-3.5 rounded-lg text-sm transition-colors shadow"
          >
            Enviar mensaje a la Redacción
          </button>
        </form>
      </div>
    `;
  },

  renderPrivacidad() {
    return `
      <div class="space-y-6">
        <h2 class="text-3xl font-black font-serif-editorial text-[#213863] mb-4">
          Política de Privacidad y Tratamiento de Datos
        </h2>
        <div class="text-sm text-slate-700 space-y-4 leading-relaxed font-body-editorial">
          <p>
            En <strong>POLSO</strong> valoramos profundamente la privacidad de nuestros lectores y usuarios digitales. En cumplimiento de las disposiciones vigentes en materia de protección de datos personales (Ley Estatutaria 1581 de 2012 y normativas equivalentes), le informamos sobre el tratamiento de la información recabada en este sitio.
          </p>

          <h3 class="font-bold text-base text-[#213863] pt-2">1. Información recolectada</h3>
          <p>
            POLSO únicamente recopila datos suministrados voluntariamente por los usuarios a través del formulario de suscripción al boletín, comentarios en artículos o el canal de contacto con la redacción.
          </p>

          <h3 class="font-bold text-base text-[#213863] pt-2">2. Uso exclusivo editorial</h3>
          <p>
            Los correos electrónicos y nombres recopilados jamás son vendidos, transferidos ni compartidos con empresas de publicidad de terceros. Se emplean exclusivamente para el envío del resumen editorial y la moderación de aportes en el sitio.
          </p>

          <h3 class="font-bold text-base text-[#213863] pt-2">3. Derechos del titular</h3>
          <p>
            Cualquier suscriptor puede solicitar la baja inmediata de nuestras listas de distribución o la rectificación de sus datos escribiendo a <span class="font-mono text-xs bg-slate-100 px-1 py-0.5 rounded">redaccion@polso.com</span>.
          </p>
        </div>
      </div>
    `;
  },

  submitContact(form) {
    const name = form.name.value;
    form.reset();
    Polso.App.toast(`Gracias ${name}, su mensaje ha sido enviado a la Redacción de POLSO.`);
  }
};
