# POLSO — Plataforma Digital de Periodismo, Política y Opinión

**POLSO** es una plataforma editorial digital moderna, robusta y responsive, concebida bajo los más altos estándares periodísticos internacionales para el seguimiento del poder, las instituciones, la coyuntura legislativa, el análisis riguroso y la opinión fundamentada.

---

## 🎨 1. Identidad Visual y Paleta de Marca

La identidad cromática se adhiere de forma estricta a la paleta institucional:

- **Azul Institucional:** `#213863` (Predomina en encabezados, barras de navegación institucional, títulos editoriales y elementos de autoridad).
- **Amarillo de Identidad:** `#F7C901` (Utilizado estratégicamente en botones de llamada a la acción, viñetas de alerta, indicadores de transmisión en vivo, citas y distintivos de opinión).
- **Blanco:** `#FFFFFF` (Garantiza el confort de lectura y amplios espacios de descanso visual).
- **Neutros y Grises:** `#F8FAFC`, `#F1F5F9`, `#E2E8F0`, `#64748B` para tarjetas secundarias, divisores, pies de foto y textos auxiliares.

### Tipografías Editoriales
- **Titulares y Opinión:** `Playfair Display` (Serif con autoridad y elegancia periodística).
- **Cuerpo de lectura y citas:** `Merriweather` (Excelente legibilidad y ritmo tipográfico).
- **Interfaz y Navegación:** `Inter` (Moderna, nítida y accesible en pantallas de alta densidad).

---

## 🏛️ 2. Estructura y Menú de Navegación Funcional

Cada una de las opciones del menú conduce a una sección o listado 100% funcional gestionado mediante enrutamiento SPA basado en hash:

1. **Inicio**
   - Portada (`#/portada`)
   - Últimas publicaciones (`#/ultimas`)
   - Contenido destacado (`#/destacados`)
2. **Actualidad**
   - Política nacional (`#/categoria/politica-nacional`)
   - Política regional (`#/categoria/politica-regional`)
   - Política local (`#/categoria/politica-local`)
   - Política internacional (`#/categoria/politica-internacional`)
   - Gobierno y Congreso (`#/categoria/gobierno-congreso`)
   - Elecciones (`#/categoria/elecciones`)
3. **Opinión**
   - Columnas de opinión (`#/opinion`)
   - Nuestros columnistas (`#/columnistas`)
   - Últimas opiniones (`#/opinion`)
   - Debates y perspectivas (`#/opinion/debates`)
4. **Análisis**
   - Análisis político (`#/categoria/analisis-politico`)
   - Informes especiales (`#/especiales/investigaciones`)
   - Datos y contexto (`#/buscar?q=datos`)
   - Políticas públicas (`#/categoria/politicas-publicas`)
5. **POLSO en video**
   - Entrevistas (`#/videos/entrevistas`)
   - Análisis en video (`#/videos/analisis`)
   - Programas (`#/videos/programas`)
   - Videos recientes (`#/videos/recientes`)
   - Lista de reproducción de YouTube (`#/videos`)
6. **Especiales**
   - Especiales electorales (`#/especiales/electorales`)
   - Perfiles políticos (`#/especiales/perfiles`)
   - Investigaciones (`#/especiales/investigaciones`)
   - Coberturas temáticas (`#/especiales/coberturas`)
7. **Nosotros**
   - Quiénes somos (`#/nosotros/quienes-somos`)
   - Línea editorial & Código de ética (`#/nosotros/linea-editorial`)
   - Equipo & Redacción (`#/nosotros/equipo`)
   - Contacto (`#/nosotros/contacto`)
   - Política de privacidad (`#/nosotros/privacidad`)

---

## 📰 3. Módulos y Secciones de la Plataforma

### Portada (Página de Inicio)
- **Franja de Actualidad (Ticker / Breaking News):** Ticker animado en tiempo real con alertas de noticias de última hora, interactivo y con pausa al posar el cursor.
- **Noticia Principal (Lead Story):** Bloque de gran impacto visual con fotografía a gran escala, distintivo de sección, titular jerárquico, resumen, autor y botón de lectura completa.
- **Últimas Publicaciones:** Cuadrícula de tarjetas con filtros rápidos por categoría, cálculo de tiempo de lectura, autor y metadatos.
- **Columnas de Opinión:** Espacio con diferenciación visual nítida (borde amarillo superior, fotografía circular del columnista, tipografía serif entrecomillada, extracto y etiqueta "COLUMNA DE OPINIÓN").
- **Análisis y Contexto:** Desglose con infografías de balance fiscal y puntos clave del Congreso.
- **POLSO en Video:** Tarjetas audiovisuales con miniaturas 16:9, indicador de duración y reproductor modal de YouTube.
- **Temas Destacados:** Etiquetas dinámicas (`#Elecciones2026`, `#Congreso`, etc.) para acceso temático directo.
- **Boletín Editorial:** Formulario para suscripción matutina por correo electrónico.

### Página Individual de Artículo
- Miga de pan de navegación jerárquica.
- Titular editorial, subtítulo y distintivo de categoría o columna.
- Barra de metadatos de autor con enlace al perfil y fechas de publicación/actualización.
- Botones para compartir en **X (Twitter), WhatsApp, LinkedIn y Copiar Enlace** con aviso Toast.
- Selector interactivo de tamaño de texto (`A-` / `A+`).
- Barra de progreso de lectura fijada en el tope de la pantalla.
- Cuerpo editorial con letra capital (*drop cap*), citas destacadas (*blockquotes*), listas analíticas e incrustación de video de YouTube.
- Módulo de comentarios interactivos con persistencia.
- Artículos relacionados y más publicaciones del autor.

### Directorio y Perfiles de Columnistas
- Mosaico con fichas de los analistas, biografías, credenciales, especialidad y enlaces a redes sociales.
- Página individual de cada columnista con el listado cronológico de todos sus artículos.

### Hub Audiovisual "POLSO en Video"
- Reproductor principal con relación de aspecto 16:9 para YouTube.
- Filtro por categorías temáticas (Entrevistas, Análisis, Programas, Recientes).
- Modal para añadir videos ingresando una URL de YouTube (`watch?v=...`, `youtu.be/...`), extrayendo el ID de forma segura sin descargar copias locales de terceros.

### Buscador y Filtros Avanzados
- Búsqueda en vivo sobre datos reales por palabras clave, titular, autor o tema.
- Filtros por categoría, tipo de formato (artículo, opinión, análisis, especial) y orden cronológico.
- Atajo global de teclado: `⌘K` (Mac) o `Ctrl+K` (Windows/Linux).

### Panel de Administración Editorial (CMS)
- Zona privada (`#/admin`) para gestionar el medio sin tocar una sola línea de código:
  - Redacción y edición de publicaciones en texto enriquecido.
  - Asignación de autor, categoría, imagen de portada y video de YouTube.
  - Indicador de noticia destacada o apertura principal.
  - Gestión del catálogo audiovisual.
  - Métricas en tiempo real.
  - Botón de **"Restablecer datos de muestra"** para recuperar el estado inicial en cualquier momento.
  - Persistencia en `LocalStorage`.

---

## 🚀 4. Cómo Abrir y Usar la Plataforma

No requiere instalación de Node ni compiladores externos. Funciona de manera inmediata:

1. **Abrir directamente en el navegador:**
   - Hacer doble clic sobre `polso/index.html` o ejecutar en la terminal:
   ```bash
   open /Users/steevena./Documents/polso/index.html
   ```
2. **O mediante un servidor web local:**
   ```bash
   cd /Users/steevena./Documents/polso
   python3 -m http.server 8000
   ```
   Luego ingresar en el navegador a: `http://localhost:8000`
