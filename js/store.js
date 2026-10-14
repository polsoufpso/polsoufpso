/**
 * POLSO - Data Store & LocalStorage Persistence Manager
 * Gestiona artículos, columnas de opinión, columnistas, análisis, videos y configuración.
 */

window.Polso = window.Polso || {};

(function () {
  const STORAGE_KEY = 'polso_editorial_db_v2';

  // Datos iniciales de alta calidad editorial
  const INITIAL_DATA = {
    settings: {
      siteName: 'POLSO',
      tagline: 'El pulso del poder, la política y la opinión independiente',
      edition: 'Edición Colombia & Latinoamérica',
      contactEmail: 'redaccion@polso.com',
      youtubeChannel: 'https://youtube.com',
      lastUpdated: new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    },
    columnists: [
      {
        id: 'clara-montalvo',
        name: 'Dra. Clara Montalvo',
        role: 'Analista política y catedrática de Derecho Constitucional',
        bio: 'Doctora en Ciencia Política por la Universidad de Salamanca. Investigadora del comportamiento electoral, diseño institucional y reformas judiciales en América Latina.',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
        specialty: 'Instituciones y Justicia',
        social: { twitter: '@claramontalvo', linkedin: 'claramontalvo' }
      },
      {
        id: 'santiago-valenzuela',
        name: 'Dr. Santiago Valenzuela',
        role: 'Economista y consultor de políticas públicas',
        bio: 'Magíster en Economía Pública por London School of Economics (LSE). Especialista en finanzas territoriales, macroeconomía y sostenibilidad fiscal.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80',
        specialty: 'Economía y Finanzas Públicas',
        social: { twitter: '@santiagovale', linkedin: 'santiagovalenzuela' }
      },
      {
        id: 'mariana-cardenas',
        name: 'Mariana Cárdenas',
        role: 'Periodista de investigación y defensora de derechos humanos',
        bio: 'Ganadora del Premio Nacional de Periodismo. Ha cubierto durante más de 15 años el conflicto, la contratación pública y los derechos de comunidades vulnerables.',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',
        specialty: 'Investigación y DDHH',
        social: { twitter: '@marianacardenas', linkedin: 'marianacardenas' }
      },
      {
        id: 'andres-felipe-restrepo',
        name: 'Andrés Felipe Restrepo',
        role: 'Consultor en gobernanza regional y descentralización',
        bio: 'Exsecretario de planeación y consultor internacional. Analiza periódicamente las tensiones entre el poder central y los gobiernos locales.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
        specialty: 'Política Regional',
        social: { twitter: '@afrestrepo', linkedin: 'afrestrepo' }
      },
      {
        id: 'lucia-vargas',
        name: 'Lucía Vargas Nieto',
        role: 'Especialista en relaciones internacionales y diplomacia',
        bio: 'Analista de asuntos hemisféricos y política exterior. Máster en Estudios Internacionales por Georgetown University.',
        avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=500&q=80',
        specialty: 'Política Internacional',
        social: { twitter: '@luciavargas_int', linkedin: 'luciavargas' }
      },
      {
        id: 'gabriel-mendoza',
        name: 'Gabriel Mendoza',
        role: 'Sociólogo y director de encuestas de opinión',
        bio: 'Investigador sobre opinión pública, polarización digital y dinámicas de participación ciudadana en elecciones.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=500&q=80',
        specialty: 'Opinión Pública y Datos',
        social: { twitter: '@gmendoza_datos', linkedin: 'gabrielmendoza' }
      }
    ],
    articles: [
      {
        id: 'tablero-poder-2026',
        type: 'articulo',
        category: 'politica-nacional',
        categoryLabel: 'Política Nacional',
        title: 'El tablero de poder 2026: alianzas, fracturas y la reconfiguración del mapa político nacional',
        subtitle: 'Un análisis exhaustivo de los movimientos estratégicos en los partidos tradicionales, la emergencia de nuevos liderazgos y las tensiones en el Congreso.',
        authorId: 'clara-montalvo',
        authorName: 'Dra. Clara Montalvo',
        date: '2026-10-14',
        updatedDate: '2026-10-14 14:30',
        readTime: '7 min de lectura',
        image: 'assets/images/lanzamiento.png',
        imageCaption: 'Sesión plenaria del Congreso de la República durante el debate sobre las reformas institucionales.',
        isFeatured: true,
        isLead: true,
        tags: ['Congreso', 'Alianzas', 'Elecciones 2026', 'Gobernabilidad'],
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        content: `
          <p class="lead text-xl text-slate-700 font-medium mb-6">El escenario político entra en una fase decisiva donde los bloques legislativos han comenzado a fracturarse en torno a los proyectos de ley más sensibles del año. Las alianzas que parecían inquebrantables hace seis meses hoy muestran fisuras evidentes.</p>

          <p class="mb-4">A medida que se aproxima el calendario electoral, los partidos mayoritarios buscan asegurar su independencia frente al Ejecutivo, mientras los sectores independientes reclaman mayor espacio en las comisiones constitucionales. La dinámica parlamentaria ha pasado de una discusión programática a una medición constante de fuerzas regionales.</p>

          <blockquote class="editorial-quote">
            "No estamos presenciando un simple cambio de mayorías en el Congreso, sino una transformación profunda en la forma en que los partidos negocian su respaldo territorial frente al poder central."
          </blockquote>

          <h3 class="text-2xl font-bold font-serif-editorial text-[#213863] mt-8 mb-4">El dilema de la coalición de gobierno</h3>
          <p class="mb-4">Para el oficialismo, mantener la disciplina de bancada se ha convertido en un desafío diario. El desgaste natural del mandato, sumado a los reparos fiscales formulados por los ministerios técnicos, ha obligado a replantear el ritmo de radicación de las iniciativas legislativas.</p>

          <p class="mb-4">Varios congresistas de regiones clave han manifestado en privado que sus electores exigen compromisos concretos de inversión en infraestructura antes de acompañar los articulados de mayor impacto tributario y regulatorio.</p>

          <div class="bg-slate-50 border-l-4 border-[#213863] p-5 my-6 rounded-r-lg">
            <h4 class="font-bold text-[#213863] text-lg mb-2">Puntos clave del balance legislativo:</h4>
            <ul class="list-disc list-inside space-y-1 text-slate-700">
              <li>El 65% de los proyectos priorizados aún aguarda segundo debate.</li>
              <li>Las bancadas independientes concentran el voto decisorio en plenarias.</li>
              <li>Los acuerdos regionales condicionan el respaldo a la agenda económica.</li>
            </ul>
          </div>

          <h3 class="text-2xl font-bold font-serif-editorial text-[#213863] mt-8 mb-4">Proyecciones hacia el nuevo ciclo electoral</h3>
          <p class="mb-4">La fragmentación del electorado sugiere que ninguna fuerza política logrará una hegemonía absoluta. La capacidad de tender puentes y construir consensos pragmáticos determinará quién ostentará el control real de la agenda pública en los próximos cuatro años.</p>
        `
      },
      {
        id: 'radiografia-congreso-reformas',
        type: 'analisis',
        category: 'gobierno-congreso',
        categoryLabel: 'Gobierno y Congreso',
        title: 'Radiografía del Congreso: las votaciones clave que definieron las reformas estructurales',
        subtitle: 'Datos exclusivos y desglose de votos por bancadas en las iniciativas más disputadas de la actual legislatura.',
        authorId: 'santiago-valenzuela',
        authorName: 'Dr. Santiago Valenzuela',
        date: '2026-10-13',
        updatedDate: '2026-10-13 18:20',
        readTime: '6 min de lectura',
        image: 'assets/images/diseno-1.png',
        imageCaption: 'Conteo electrónico de votos en la Cámara de Representantes.',
        isFeatured: true,
        tags: ['Votaciones', 'Reformas', 'Senado', 'Cámara'],
        content: `
          <p class="lead text-xl text-slate-700 font-medium mb-6">El balance legislativo del último trimestre revela un Congreso mucho más pragmático y menos doctrinario de lo que transmiten los discursos encendidos en las redes sociales.</p>
          <p class="mb-4">Tras revisar más de 140 votaciones nominales, POLSO identificó que en el 42% de los artículos aprobados existió coincidencia entre sectores teóricamente opuestos. Las negociaciones técnicas en las subcomisiones fueron el verdadero motor de los acuerdos.</p>
          <blockquote class="editorial-quote">
            "El debate en el atril responde a la tribuna mediática, pero el articulado definitivo se escribe en las reuniones de ponentes donde prevalece la matemática del quórum."
          </blockquote>
          <h3 class="text-2xl font-bold font-serif-editorial text-[#213863] mt-8 mb-4">Los votos bisagra que inclinaron la balanza</h3>
          <p class="mb-4">Un grupo de 18 legisladores procedentes de circunscripciones intermedias logró modificar sustancialmente más de 25 artículos de la reforma económica, salvaguardando exenciones para el sector agroindustrial y garantizando mayores transferencias directas a sus departamentos.</p>
        `
      },
      {
        id: 'columna-ilusion-consenso',
        type: 'opinion',
        category: 'opinion',
        categoryLabel: 'Columnas de Opinión',
        title: 'La ilusión del consenso en tiempos de crispación partidista',
        subtitle: 'Cuando el debate político se reduce al agravio moral, la deliberación democrática se convierte en un simulacro estéril.',
        authorId: 'clara-montalvo',
        authorName: 'Dra. Clara Montalvo',
        date: '2026-10-14',
        updatedDate: '2026-10-14 08:00',
        readTime: '4 min de lectura',
        image: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Fotografía editorial de Clara Montalvo para POLSO.',
        isFeatured: true,
        tags: ['Democracia', 'Deliberación', 'Opinión'],
        content: `
          <p class="lead text-xl text-slate-700 font-medium mb-6">Se ha puesto de moda invocar el consenso como la panacea de todos nuestros males públicos. Sin embargo, en una sociedad diversa y con profundas asimetrías, el disenso razonado no es una anomalía: es el corazón mismo de la política.</p>
          <p class="mb-4">El verdadero problema contemporáneo no radica en que pensemos distinto sobre los impuestos, la salud o la política exterior. La patología surge cuando despojamos al adversario de su legitimidad moral y convertimos la discrepancia técnica en un juicio de intenciones.</p>
          <blockquote class="editorial-quote">
            "La democracia no exige que nos amemos ni que compartamos los mismos ideales; exige que acordemos las reglas para tramitar pacíficamente nuestras diferencias irresolubles."
          </blockquote>
          <p class="mb-4">Hoy vemos con preocupación cómo las dirigencias prefieren la ovación complaciente de su propia cámara de eco antes que la incomodidad fecunda del debate informado. Es tiempo de recuperar la sobriedad republicana: menos adjetivos y más argumentos.</p>
        `
      },
      {
        id: 'columna-reforma-tributaria-gasto',
        type: 'opinion',
        category: 'opinion',
        categoryLabel: 'Columnas de Opinión',
        title: 'Reforma tributaria y gasto público: la cuenta que nadie quiere pagar',
        subtitle: 'No hay atajos mágicos: toda promesa de mayor gasto del Estado requiere una fuente real, sostenible y honesta de financiamiento.',
        authorId: 'santiago-valenzuela',
        authorName: 'Dr. Santiago Valenzuela',
        date: '2026-10-12',
        updatedDate: '2026-10-12 09:15',
        readTime: '5 min de lectura',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Análisis de balance fiscal y cuentas públicas.',
        isFeatured: true,
        tags: ['Economía', 'Impuestos', 'Gasto Público'],
        content: `
          <p class="lead text-xl text-slate-700 font-medium mb-6">En la discusión presupuestal de cada año se repite el mismo ritual esquizofrénico: un entusiasmo irrefrenable por aumentar las partidas de gasto combinado con una resistencia férrea a cualquier incremento en la recaudación.</p>
          <p class="mb-4">La regla fiscal no es un fetiche de tecnócratas insensibles; es el seguro de vida de las futuras generaciones para evitar el colapso de la deuda soberana y la inflación que siempre castiga con mayor crudeza a los hogares más vulnerables.</p>
          <blockquote class="editorial-quote">
            "Gobernar es priorizar. Quien promete simultáneamente reducir impuestos, multiplicar los subsidios y bajar el déficit está vendiendo alquimia fiscal."
          </blockquote>
          <p class="mb-4">Ha llegado la hora de hablar con franqueza a la ciudadanía: la modernización del aparato productivo y la garantía de derechos sociales solo serán sostenibles si ensanchamos la base tributaria con equidad y eficiencia en la ejecución.</p>
        `
      },
      {
        id: 'columna-descentralizacion-retorica',
        type: 'opinion',
        category: 'opinion',
        categoryLabel: 'Columnas de Opinión',
        title: 'Descentralización o retórica: el olvido crónico de las regiones',
        subtitle: 'El centralismo bogotano continúa asfixiando la capacidad de decisión de municipios y departamentos.',
        authorId: 'andres-felipe-restrepo',
        authorName: 'Andrés Felipe Restrepo',
        date: '2026-10-11',
        updatedDate: '2026-10-11 11:00',
        readTime: '5 min de lectura',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Vista aérea de una capital departamental en Colombia.',
        isFeatured: false,
        tags: ['Regiones', 'Federalismo', 'Descentralización'],
        content: `
          <p class="lead text-xl text-slate-700 font-medium mb-6">Cada mandatario nacional jura lealtad a las regiones durante la campaña, pero al instalarse en la Casa de Nariño la burocracia centralista vuelve a imponer su camisa de fuerza sobre los presupuestos locales.</p>
          <p class="mb-4">Tener que viajar a la capital para mendigar el visto bueno a un proyecto de acueducto rural es una humillación institucional inaceptable en pleno siglo XXI. Urge una reforma de fondo al Sistema General de Participaciones.</p>
        `
      },
      {
        id: 'gobernabilidad-territorial-pulsos',
        type: 'articulo',
        category: 'politica-regional',
        categoryLabel: 'Política Regional',
        title: 'Gobernabilidad territorial: los pulsos entre mandatarios regionales y el Ejecutivo central',
        subtitle: 'Alcaldes y gobernadores de las principales ciudades consolidan un bloque común para exigir autonomía financiera y recursos de regalías.',
        authorId: 'andres-felipe-restrepo',
        authorName: 'Andrés Felipe Restrepo',
        date: '2026-10-13',
        updatedDate: '2026-10-13 16:45',
        readTime: '5 min de lectura',
        image: 'assets/images/diseno-2.png',
        imageCaption: 'Cumbre de mandatarios regionales en Medellín.',
        isFeatured: true,
        tags: ['Regiones', 'Alcaldías', 'Gobernaciones', 'Presupuesto'],
        content: `
          <p class="lead text-xl text-slate-700 font-medium mb-6">La cumbre de gobernadores celebrada esta semana dejó un mensaje contundente: las regiones no están dispuestas a aceptar más dilaciones en el desembolso de las transferencias territoriales pactadas.</p>
          <p class="mb-4">Con un documento suscrito por 24 mandatarios seccionales, el bloque regional solicitó formalmente una mesa técnica permanente de concertación con el Ministerio de Hacienda para destrabar los fondos del Sistema General de Regalías asignados a obras de mitigación ambiental y vías terciarias.</p>
        `
      },
      {
        id: 'geopolitica-andina-diplomacia',
        type: 'analisis',
        category: 'politica-internacional',
        categoryLabel: 'Política Internacional',
        title: 'Geopolítica andina: el impacto de los nuevos equilibrios diplomáticos en América Latina',
        subtitle: 'La reapertura de rutas comerciales, la transición energética global y la relación bilateral con Washington marcan la agenda exterior.',
        authorId: 'lucia-vargas',
        authorName: 'Lucía Vargas Nieto',
        date: '2026-10-12',
        updatedDate: '2026-10-12 12:00',
        readTime: '6 min de lectura',
        image: 'assets/images/diseno-3.png',
        imageCaption: 'Encuentro bilateral de cancilleres en la sede de la OEA.',
        isFeatured: true,
        tags: ['Diplomacia', 'América Latina', 'Comercio', 'Geopolítica'],
        content: `
          <p class="lead text-xl text-slate-700 font-medium mb-6">El tablero latinoamericano experimenta una reconfiguración silenciosa pero profunda. Lejos de las viejas afinidades ideológicas monolíticas, los gobiernos de la región están optando por un pragmatismo multivectorial.</p>
          <p class="mb-4">Las negociaciones en torno a los corredores interoceánicos, el suministro de minerales estratégicos para la transición verde y la cooperación en seguridad transfronteriza están superando las diferencias partidarias tradicionales.</p>
        `
      },
      {
        id: 'elecciones-algoritmos-polarizacion',
        type: 'analisis',
        category: 'elecciones',
        categoryLabel: 'Elecciones',
        title: 'Elecciones y polarización: cómo los algoritmos de redes sociales están moldeando la intención de voto',
        subtitle: 'Investigación de POLSO revela el impacto de las campañas microdirigidas y las cámaras de resonancia en los jóvenes votantes.',
        authorId: 'gabriel-mendoza',
        authorName: 'Gabriel Mendoza',
        date: '2026-10-10',
        updatedDate: '2026-10-10 17:00',
        readTime: '6 min de lectura',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Análisis de datos masivos y patrones de consumo informativo en plataformas digitales.',
        isFeatured: true,
        tags: ['Algoritmos', 'Redes Sociales', 'Votantes', 'Datos'],
        content: `
          <p class="lead text-xl text-slate-700 font-medium mb-6">Las estrategias electorales ya no se definen en las plazas públicas ni en las vallas de las autopistas. El combate decisivo por la mente del ciudadano tiene lugar en los primeros tres segundos de un video vertical en su pantalla móvil.</p>
          <p class="mb-4">Un estudio longitudinal realizado por el Observatorio de Datos de POLSO demostró que el 73% de los usuarios menores de 35 años consumen información política exclusivamente a través de algoritmos de recomendación que premian la indignación y la confrontación emocional sobre el contraste de fuentes.</p>
        `
      },
      {
        id: 'investigacion-contratacion-publica',
        type: 'especial',
        category: 'especiales',
        categoryLabel: 'Investigaciones Especiales',
        title: 'Investigación: Los contratos llave en mano y las alertas de sobrecostos en la infraestructura vial',
        subtitle: 'Revisión minuciosa de 38 licitaciones públicas revela patrones reiterados de adiciones presupuestales y retrasos en obras clave.',
        authorId: 'mariana-cardenas',
        authorName: 'Mariana Cárdenas',
        date: '2026-10-09',
        updatedDate: '2026-10-09 20:30',
        readTime: '8 min de lectura',
        image: 'assets/images/inauguracion.png',
        imageCaption: 'Obras de infraestructura vial en corredores estratégicos del país.',
        isFeatured: true,
        tags: ['Investigación', 'Corrupción', 'Infraestructura', 'Contraloría'],
        content: `
          <p class="lead text-xl text-slate-700 font-medium mb-6">Durante seis meses, el equipo investigativo de POLSO cruzó bases de datos del sistema electrónico de contratación pública para rastrear el destino de más de 4.2 billones de pesos en infraestructura de transporte.</p>
          <p class="mb-4">Los hallazgos son alarmantes: en más del 60% de los proyectos analizados se presentaron pliegos sastre con un único proponente habilitado, seguido de prórrogas temporales que incrementaron el costo inicial en promedio un 35%.</p>
        `
      },
      {
        id: 'politicas-publicas-salud-balance',
        type: 'analisis',
        category: 'politicas-publicas',
        categoryLabel: 'Políticas Públicas',
        title: 'Políticas públicas: el reto de la cobertura universal frente al déficit presupuestal en salud',
        subtitle: 'Especialistas analizan la viabilidad técnica y financiera del modelo preventivo propuesto por el Ministerio.',
        authorId: 'santiago-valenzuela',
        authorName: 'Dr. Santiago Valenzuela',
        date: '2026-10-08',
        updatedDate: '2026-10-08 10:15',
        readTime: '5 min de lectura',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Centros de atención primaria y retos de abastecimiento hospitalario.',
        isFeatured: false,
        tags: ['Salud', 'Políticas Públicas', 'Presupuesto'],
        content: `
          <p class="lead text-xl text-slate-700 font-medium mb-6">Garantizar acceso a servicios de salud de alta calidad en las zonas rurales apartadas es un imperativo moral y constitucional. No obstante, las proyecciones actuariales advierten sobre un faltante estructural de recursos si no se corrigen las ineficiencias en el giro directo.</p>
        `
      },
      {
        id: 'politica-local-seguridad-ciudades',
        type: 'articulo',
        category: 'politica-local',
        categoryLabel: 'Política Local',
        title: 'Política local: los retos de seguridad ciudadana que desafían a las alcaldías de las grandes urbes',
        subtitle: 'Inteligencia policial, cámaras con reconocimiento biométrico y reformas al sistema penal en el centro del debate municipal.',
        authorId: 'mariana-cardenas',
        authorName: 'Mariana Cárdenas',
        date: '2026-10-07',
        updatedDate: '2026-10-07 15:40',
        readTime: '4 min de lectura',
        image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=800&q=80',
        imageCaption: 'Operativos de control territorial en centros urbanos.',
        isFeatured: false,
        tags: ['Seguridad', 'Alcaldías', 'Justicia Local'],
        content: `
          <p class="lead text-xl text-slate-700 font-medium mb-6">El clamor por mayor tranquilidad en el transporte público y las calles barriales se ha convertido en la principal métrica de evaluación ciudadana para las administraciones locales.</p>
        `
      },
      {
        id: 'especial-perfiles-lideres-2030',
        type: 'especial',
        category: 'especiales',
        categoryLabel: 'Especiales / Perfiles',
        title: 'Perfiles del poder: los 10 líderes emergentes que marcarán el debate de la próxima década',
        subtitle: 'Quiénes son, de dónde vienen y qué alianzas construyen las figuras que están renovando el espectro político.',
        authorId: 'clara-montalvo',
        authorName: 'Dra. Clara Montalvo',
        date: '2026-10-06',
        updatedDate: '2026-10-06 18:00',
        readTime: '7 min de lectura',
        image: 'assets/images/equipo-portada.png',
        imageCaption: 'Nuevos rostros en el debate político nacional y regional.',
        isFeatured: false,
        tags: ['Perfiles', 'Liderazgo', 'Futuro Político'],
        content: `
          <p class="lead text-xl text-slate-700 font-medium mb-6">Más allá de las figuras tradicionales que han copado los titulares durante las últimas décadas, en las asambleas, concejos y movimientos sociales germina una nueva generación con un lenguaje y unas prioridades distintas.</p>
        `
      }
    ],
    videos: [
      {
        id: 'v1',
        title: 'Entrevista exclusiva: "El costo de no lograr acuerdos en el Congreso lo pagará la ciudadanía"',
        category: 'entrevistas',
        categoryLabel: 'Entrevistas',
        youtubeId: 'dQw4w9WgXcQ',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '24:18',
        date: '2026-10-14',
        author: 'Redacción POLSO',
        description: 'Un diálogo directo y a fondo sobre el futuro de las reformas institucionales, los vetos cruzados y la gobernabilidad en el legislativo.',
        thumbnail: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
        isMain: true
      },
      {
        id: 'v2',
        title: 'Análisis en video: ¿Por qué fracasan las coaliciones políticas en América Latina?',
        category: 'analisis',
        categoryLabel: 'Análisis en video',
        youtubeId: 'jNQXAC9IVRw',
        youtubeUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
        duration: '16:40',
        date: '2026-10-12',
        author: 'Dra. Clara Montalvo',
        description: 'Desglosamos con datos históricos los factores institucionales que provocan la caída prematura de los acuerdos de gobierno.',
        thumbnail: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'v3',
        title: 'Programa semanal: POLSO Debate #12 - Balance del gasto público e inflación',
        category: 'programas',
        categoryLabel: 'Programas',
        youtubeId: 'L_LUpnjgPso',
        youtubeUrl: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
        duration: '42:05',
        date: '2026-10-10',
        author: 'Dr. Santiago Valenzuela',
        description: 'Mesa de debate con expertos en política monetaria, finanzas territoriales y sostenibilidad fiscal.',
        thumbnail: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'v4',
        title: 'Especial audiovisual: Las regiones olvidadas frente al presupuesto central',
        category: 'recientes',
        categoryLabel: 'Videos recientes',
        youtubeId: 'fJ9rUzIMcZQ',
        youtubeUrl: 'https://www.youtube.com/watch?v=fJ9rUzIMcZQ',
        duration: '18:55',
        date: '2026-10-08',
        author: 'Andrés Restrepo & Mariana Cárdenas',
        description: 'Crónica documental desde los municipios con mayores rezagos en inversión pública.',
        thumbnail: 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=800&q=80'
      }
    ],
    breakingNews: [
      { text: 'Congreso inicia debate definitivo de la reforma a las finanzas territoriales.', link: '#/categoria/gobierno-congreso' },
      { text: 'Banco Central mantiene tasa de interés de referencia ante desaceleración de la inflación.', link: '#/articulo/radiografia-congreso-reformas' },
      { text: 'Mandatarios regionales radican pliego de peticiones sobre autonomía presupuestal.', link: '#/articulo/gobernabilidad-territorial-pulsos' },
      { text: 'POLSO en video: Ya disponible la entrevista exclusiva sobre el tablero de poder 2026.', link: '#/videos' }
    ],
    comments: {
      'tablero-poder-2026': [
        {
          name: 'Carlos Hernando Duque',
          date: '2026-10-14 11:20',
          text: 'Excelente análisis. Refleja fielmente lo que ocurre en las regiones donde los caciques locales ya no le responden sumisamente a los directorios nacionales.'
        },
        {
          name: 'Beatriz Elena Osorio',
          date: '2026-10-14 13:45',
          text: 'Hacía falta un medio que tratara la política con rigor sin caer en el sensacionalismo de las redes. Felicitaciones al equipo de POLSO.'
        }
      ]
    }
  };

  // Objeto Store con métodos públicos y reactivos
  const Store = {
    data: null,

    init() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          this.data = JSON.parse(stored);
        } else {
          this.resetToDefaults();
        }
      } catch (e) {
        console.warn('Error reading from localStorage, using initial dataset:', e);
        this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
      }
      return this.data;
    },

    save() {
      try {
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        }
        if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') {
          window.dispatchEvent(new CustomEvent('polso:data-changed', { detail: this.data }));
        }
      } catch (e) {
        if (typeof console !== 'undefined' && console.error) {
          console.error('Error saving to localStorage:', e);
        }
      }
    },

    resetToDefaults() {
      this.data = JSON.parse(JSON.stringify(INITIAL_DATA));
      this.save();
      return this.data;
    },

    // Getters de Artículos
    getArticles() {
      return this.data ? this.data.articles : [];
    },

    getArticleById(id) {
      if (!this.data) return null;
      return this.data.articles.find(a => a.id === id);
    },

    getArticlesByCategory(category) {
      if (!this.data) return [];
      return this.data.articles.filter(a => a.category === category);
    },

    getArticlesByType(type) {
      if (!this.data) return [];
      return this.data.articles.filter(a => a.type === type);
    },

    getArticlesByAuthor(authorId) {
      if (!this.data) return [];
      return this.data.articles.filter(a => a.authorId === authorId);
    },

    getFeaturedArticles() {
      if (!this.data) return [];
      return this.data.articles.filter(a => a.isFeatured);
    },

    getLeadArticle() {
      if (!this.data) return null;
      return this.data.articles.find(a => a.isLead) || this.data.articles[0];
    },

    // Guardar / Actualizar Artículo
    saveArticle(article) {
      if (!this.data) this.init();
      const index = this.data.articles.findIndex(a => a.id === article.id);
      if (index >= 0) {
        this.data.articles[index] = { ...this.data.articles[index], ...article, updatedDate: new Date().toISOString() };
      } else {
        if (!article.id) {
          article.id = 'art-' + Date.now();
        }
        if (!article.date) {
          article.date = new Date().toISOString().split('T')[0];
        }
        this.data.articles.unshift(article);
      }
      this.save();
      return article;
    },

    deleteArticle(id) {
      if (!this.data) return;
      this.data.articles = this.data.articles.filter(a => a.id !== id);
      this.save();
    },

    // Columnistas
    getColumnists() {
      return this.data ? this.data.columnists : [];
    },

    getColumnistById(id) {
      if (!this.data) return null;
      return this.data.columnists.find(c => c.id === id);
    },

    saveColumnist(columnist) {
      if (!this.data) this.init();
      const index = this.data.columnists.findIndex(c => c.id === columnist.id);
      if (index >= 0) {
        this.data.columnists[index] = { ...this.data.columnists[index], ...columnist };
      } else {
        if (!columnist.id) {
          columnist.id = 'col-' + Date.now();
        }
        this.data.columnists.push(columnist);
      }
      this.save();
      return columnist;
    },

    deleteColumnist(id) {
      if (!this.data) return;
      this.data.columnists = this.data.columnists.filter(c => c.id !== id);
      this.save();
    },

    // Videos
    getVideos() {
      return this.data ? this.data.videos : [];
    },

    getMainVideo() {
      if (!this.data) return null;
      return this.data.videos.find(v => v.isMain) || this.data.videos[0];
    },

    saveVideo(video) {
      if (!this.data) this.init();
      // Extraer YouTube ID si viene URL completa
      const yId = this.extractYouTubeId(video.youtubeUrl || video.youtubeId);
      if (yId) {
        video.youtubeId = yId;
      }
      if (!video.thumbnail && video.youtubeId) {
        video.thumbnail = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
      }

      const index = this.data.videos.findIndex(v => v.id === video.id);
      if (index >= 0) {
        this.data.videos[index] = { ...this.data.videos[index], ...video };
      } else {
        if (!video.id) video.id = 'vid-' + Date.now();
        if (!video.date) video.date = new Date().toISOString().split('T')[0];
        this.data.videos.unshift(video);
      }
      this.save();
      return video;
    },

    deleteVideo(id) {
      if (!this.data) return;
      this.data.videos = this.data.videos.filter(v => v.id !== id);
      this.save();
    },

    // Ticker y Ajustes
    getBreakingNews() {
      return this.data ? this.data.breakingNews : [];
    },

    getSettings() {
      return this.data ? this.data.settings : INITIAL_DATA.settings;
    },

    // Comentarios
    getComments(articleId) {
      if (!this.data || !this.data.comments) return [];
      return this.data.comments[articleId] || [];
    },

    addComment(articleId, comment) {
      if (!this.data) this.init();
      if (!this.data.comments) this.data.comments = {};
      if (!this.data.comments[articleId]) this.data.comments[articleId] = [];
      this.data.comments[articleId].unshift({
        ...comment,
        date: new Date().toLocaleString('es-ES', { dateStyle: 'short', timeStyle: 'short' })
      });
      this.save();
    },

    // Utilidad segura para extraer identificador de YouTube
    extractYouTubeId(url) {
      if (!url) return '';
      // Si ya es un ID de 11 caracteres sin protocolo
      if (/^[a-zA-Z0-9_-]{11}$/.test(url.trim())) {
        return url.trim();
      }
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
        return match[2];
      }
      return '';
    },

    // Búsqueda en texto completo
    search(query, options = {}) {
      if (!this.data || !query) return [];
      const q = query.toLowerCase().trim();
      let results = this.data.articles.filter(item => {
        const inTitle = (item.title || '').toLowerCase().includes(q);
        const inSubtitle = (item.subtitle || '').toLowerCase().includes(q);
        const inAuthor = (item.authorName || '').toLowerCase().includes(q);
        const inCategory = (item.categoryLabel || '').toLowerCase().includes(q);
        const inContent = (item.content || '').toLowerCase().includes(q);
        const inTags = (item.tags || []).some(t => t.toLowerCase().includes(q));

        return inTitle || inSubtitle || inAuthor || inCategory || inContent || inTags;
      });

      if (options.category && options.category !== 'todas') {
        results = results.filter(a => a.category === options.category);
      }
      if (options.type && options.type !== 'todos') {
        results = results.filter(a => a.type === options.type);
      }
      if (options.sort === 'antiguos') {
        results.sort((a, b) => new Date(a.date) - new Date(b.date));
      } else {
        // Por defecto más recientes
        results.sort((a, b) => new Date(b.date) - new Date(a.date));
      }

      return results;
    }
  };

  // Inicializar de inmediato
  Store.init();
  window.Polso.Store = Store;
})();
