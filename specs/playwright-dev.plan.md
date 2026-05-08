# Plan de Tests Completo - playwright.dev

## Application Overview

playwright.dev es el sitio oficial de la librería Playwright de Microsoft. Ofrece documentación técnica, ejemplos de código interactivos con selector de lenguaje (TypeScript, JavaScript, Python, Java, .NET), navegación a Docs/API/Community, toggle de tema claro/oscuro, barra de búsqueda con acceso por teclado, múltiples CTAs ("Get started"), soporte para tres navegadores (Chromium, Firefox, WebKit) y enlaces a recursos externos como GitHub, Discord y npm.

## Test Scenarios

### 1. Suite 1 - Carga y Renderizado de la Página Principal

**Seed:** `tests/seed.spec.ts`

#### 1.1. TC-001: Carga correcta de la página principal

**File:** `tests/homepage/homepage-load.spec.ts`

**Steps:**
  1. Navegar a / (https://playwright.dev)
    - expect: La URL final debe ser https://playwright.dev/
    - expect: El título del documento debe coincidir con /Playwright/
    - expect: El logo de Playwright en el navbar debe ser visible
  2. Verificar el hero section
    - expect: El heading 'Playwright enables reliable web automation for testing, scripting, and AI agents.' debe estar visible con role heading
    - expect: El botón 'Get started' con role link debe ser visible
    - expect: El botón/enlace 'Star us on GitHub' debe ser visible
  3. Verificar el navbar completo
    - expect: El enlace 'Docs' debe ser visible
    - expect: El enlace 'API' debe ser visible
    - expect: El enlace 'Community' debe ser visible
    - expect: El icono/enlace de GitHub debe ser visible
    - expect: El icono del buscador debe ser visible
    - expect: El toggle de tema debe ser visible
  4. Hacer scroll al 50% de la página y verificar las secciones de features
    - expect: Deben aparecer secciones que describen capacidades: soporte de navegadores, lenguajes, auto-wait, tracing
    - expect: Ningún elemento debe mostrar overflow horizontal
  5. Hacer scroll hasta el footer
    - expect: El footer debe ser visible con copyright o enlaces a Microsoft
    - expect: No deben aparecer errores visuales ni elementos rotos

#### 1.2. TC-002: Sin errores JavaScript ni recursos 404 en la carga inicial

**File:** `tests/homepage/no-errors-on-load.spec.ts`

**Steps:**
  1. Interceptar todos los requests de red antes de navegar
  2. Navegar a / y esperar estado networkidle
    - expect: La página alcanza estado networkidle
  3. Verificar que ningún request crítico devolvió status 404 o 500
    - expect: Cero respuestas con status >= 400 para recursos estáticos críticos
  4. Verificar que la consola del navegador no tiene mensajes de nivel error
    - expect: Cero errores en consola

### 2. Suite 2 - Navegación Principal (Navbar)

**Seed:** `tests/seed.spec.ts`

#### 2.1. TC-003: Click en 'Docs' navega a la introducción

**File:** `tests/navigation/nav-docs.spec.ts`

**Steps:**
  1. Navegar a /
    - expect: La página principal carga correctamente
  2. Hacer click en el enlace con role link y nombre 'Docs'
    - expect: La URL cambia a /docs/intro
    - expect: El heading 'Installation' es visible
    - expect: El sidebar de documentación es visible a la izquierda

#### 2.2. TC-004: Click en 'API' navega a la referencia de API

**File:** `tests/navigation/nav-api.spec.ts`

**Steps:**
  1. Navegar a /
    - expect: La página principal carga correctamente
  2. Hacer click en el enlace con nombre 'API' en la barra de navegación
    - expect: La URL cambia a una ruta que contiene /docs/api/
    - expect: El contenido de referencia de API es visible

#### 2.3. TC-005: Click en 'Community' navega a la página de comunidad

**File:** `tests/navigation/nav-community.spec.ts`

**Steps:**
  1. Navegar a /
    - expect: La página principal carga correctamente
  2. Hacer click en el enlace con nombre 'Community'
    - expect: La URL cambia a /community o ruta equivalente
    - expect: El contenido de comunidad (Discord, Stack Overflow) es visible

#### 2.4. TC-006: El logo navega de regreso a la página principal

**File:** `tests/navigation/logo-back-home.spec.ts`

**Steps:**
  1. Navegar directamente a /docs/intro
    - expect: La página de introducción está cargada
  2. Hacer click en el logo de Playwright ubicado en el navbar
    - expect: La URL regresa a https://playwright.dev/ o /
    - expect: El hero section es visible nuevamente con el heading principal

#### 2.5. TC-007: El enlace de GitHub abre el repositorio correcto

**File:** `tests/navigation/nav-github-link.spec.ts`

**Steps:**
  1. Navegar a /
    - expect: La página principal carga correctamente
  2. Identificar el enlace del icono de GitHub en el navbar y verificar sus atributos
    - expect: El href apunta a https://github.com/microsoft/playwright
    - expect: El enlace tiene target='_blank'
    - expect: El enlace tiene rel que incluye noopener

### 3. Suite 3 - Búsqueda

**Seed:** `tests/seed.spec.ts`

#### 3.1. TC-008: Abrir el panel de búsqueda con click en el icono

**File:** `tests/search/open-search-click.spec.ts`

**Steps:**
  1. Navegar a /
    - expect: La página principal carga correctamente
  2. Hacer click en el icono/botón de búsqueda en el navbar
    - expect: El panel/modal de búsqueda se abre
    - expect: El campo de texto de búsqueda está enfocado automáticamente
    - expect: Hay un placeholder de texto como 'Search docs' o similar

#### 3.2. TC-009: Abrir el panel de búsqueda con atajo de teclado Ctrl+K / Cmd+K

**File:** `tests/search/open-search-keyboard.spec.ts`

**Steps:**
  1. Navegar a /
    - expect: La página principal carga correctamente
  2. Presionar ControlOrMeta+K para activar el atajo de búsqueda
    - expect: El panel de búsqueda se abre
    - expect: El campo de texto está enfocado

#### 3.3. TC-010: Búsqueda con término válido muestra resultados relevantes

**File:** `tests/search/search-valid-term.spec.ts`

**Steps:**
  1. Navegar a / y abrir el panel de búsqueda
    - expect: El panel de búsqueda está abierto
  2. Escribir 'locator' en el campo de búsqueda
    - expect: Aparecen resultados de búsqueda en tiempo real
    - expect: Los resultados son relevantes al término 'locator'
  3. Hacer click en el primer resultado
    - expect: La navegación lleva a una página de documentación sobre locators
    - expect: La URL contiene /docs/locators o ruta relacionada

#### 3.4. TC-011: Búsqueda con término inexistente muestra mensaje de sin resultados

**File:** `tests/search/search-no-results.spec.ts`

**Steps:**
  1. Navegar a / y abrir el panel de búsqueda
    - expect: El panel de búsqueda está abierto
  2. Escribir 'xyzterminoquenoexiste99999' en el campo
    - expect: Aparece un mensaje de tipo 'No results found' o equivalente
    - expect: No se muestran resultados falsos o no relacionados
    - expect: La interfaz no muestra errores ni se rompe visualmente

#### 3.5. TC-012: Cerrar el panel de búsqueda con la tecla Escape

**File:** `tests/search/close-search-escape.spec.ts`

**Steps:**
  1. Navegar a / y abrir el panel de búsqueda
    - expect: El panel de búsqueda está abierto
  2. Presionar la tecla Escape
    - expect: El panel de búsqueda se cierra
    - expect: La página principal sigue siendo visible y funcional

#### 3.6. TC-013: Búsqueda acepta caracteres especiales sin romper la UI

**File:** `tests/search/search-special-chars.spec.ts`

**Steps:**
  1. Navegar a / y abrir el panel de búsqueda
    - expect: El panel de búsqueda está abierto
  2. Escribir caracteres especiales como <script>alert(1)</script>
    - expect: El texto se muestra literalmente en el campo sin ejecutar scripts
    - expect: La UI no se rompe
  3. Limpiar el campo y escribir page.$$('div')
    - expect: La UI maneja correctamente caracteres como $, (, ), '

### 4. Suite 4 - Selector de Lenguaje de Programación

**Seed:** `tests/seed.spec.ts`

#### 4.1. TC-014: El selector de lenguaje es visible con TypeScript por defecto

**File:** `tests/language-selector/default-language.spec.ts`

**Steps:**
  1. Navegar a / en sesión limpia (sin cookies previas)
    - expect: TypeScript o Node.js es el lenguaje seleccionado por defecto
    - expect: Los tabs disponibles incluyen: TypeScript, JavaScript, Python, Java, .NET
    - expect: El bloque de código visible usa sintaxis TypeScript

#### 4.2. TC-015: Cambiar lenguaje a Python actualiza los ejemplos de código

**File:** `tests/language-selector/switch-python.spec.ts`

**Steps:**
  1. Navegar a / y verificar que el lenguaje activo inicial es TypeScript
    - expect: TypeScript está seleccionado por defecto
  2. Hacer click en el tab 'Python' del selector de lenguaje
    - expect: El tab Python queda visualmente activo
    - expect: Los bloques de código cambian a sintaxis Python (import re, async_playwright)
    - expect: TypeScript ya no está activo visualmente

#### 4.3. TC-016: Cambiar lenguaje a Java actualiza los ejemplos de código

**File:** `tests/language-selector/switch-java.spec.ts`

**Steps:**
  1. Navegar a / y hacer click en el tab 'Java'
    - expect: El tab Java queda activo
    - expect: Los bloques de código muestran sintaxis Java (import com.microsoft.playwright, public class)

#### 4.4. TC-017: Cambiar lenguaje a .NET actualiza los ejemplos de código

**File:** `tests/language-selector/switch-dotnet.spec.ts`

**Steps:**
  1. Navegar a / y hacer click en el tab '.NET'
    - expect: El tab .NET queda activo
    - expect: Los bloques de código muestran sintaxis C# (using Microsoft.Playwright, [Test], await Page.GotoAsync)

#### 4.5. TC-018: La selección de lenguaje persiste al navegar a Docs y regresar

**File:** `tests/language-selector/language-persistence.spec.ts`

**Steps:**
  1. Navegar a / y seleccionar 'Python' en el selector de lenguaje
    - expect: Python está seleccionado
  2. Navegar a /docs/intro haciendo click en 'Docs'
    - expect: Python sigue seleccionado en la página de documentación
  3. Usar el botón Back del navegador para regresar a /
    - expect: Python sigue seleccionado en la página principal (guardado en localStorage)

### 5. Suite 5 - Toggle de Tema Claro/Oscuro

**Seed:** `tests/seed.spec.ts`

#### 5.1. TC-019: Toggle de tema es visible en el navbar

**File:** `tests/theme/theme-toggle-visible.spec.ts`

**Steps:**
  1. Navegar a /
    - expect: El botón/toggle de tema es visible en la barra de navegación
    - expect: El toggle tiene un aria-label descriptivo como 'Switch between dark and light mode'

#### 5.2. TC-020: Cambiar al modo oscuro

**File:** `tests/theme/switch-dark-mode.spec.ts`

**Steps:**
  1. Navegar a / asegurándose de que el tema es claro (sesión limpia)
    - expect: El fondo de la página es claro (blanco o tonos claros)
  2. Hacer click en el toggle de tema
    - expect: El atributo data-theme o clase del elemento html cambia a 'dark'
    - expect: El fondo cambia a tonos oscuros
    - expect: El texto sigue siendo legible
    - expect: El toggle muestra el icono de sol

#### 5.3. TC-021: Cambiar de modo oscuro de vuelta a claro

**File:** `tests/theme/switch-light-mode.spec.ts`

**Steps:**
  1. Navegar a / y activar el modo oscuro
    - expect: El modo oscuro está activo
  2. Hacer click nuevamente en el toggle
    - expect: El modo claro se restaura
    - expect: El fondo vuelve a tonos claros

#### 5.4. TC-022: La preferencia de tema persiste al recargar la página

**File:** `tests/theme/theme-persistence-reload.spec.ts`

**Steps:**
  1. Navegar a / y activar el modo oscuro
    - expect: El modo oscuro está activo
  2. Recargar la página con page.reload()
    - expect: El modo oscuro sigue activo después de la recarga
    - expect: El atributo de tema en html sigue indicando 'dark'

#### 5.5. TC-023: El modo oscuro se aplica consistentemente en las secciones de código

**File:** `tests/theme/dark-mode-code-blocks.spec.ts`

**Steps:**
  1. Navegar a / y activar el modo oscuro
    - expect: Los bloques de código en home adoptan el estilo oscuro
  2. Navegar a /docs/intro
    - expect: Los bloques de código en docs también están en modo oscuro

### 6. Suite 6 - Botones de Llamada a la Acción (CTA)

**Seed:** `tests/seed.spec.ts`

#### 6.1. TC-024: Click en 'Get started' navega a /docs/intro

**File:** `tests/cta/get-started.spec.ts`

**Steps:**
  1. Navegar a /
    - expect: La página principal carga correctamente
  2. Localizar el enlace/botón 'Get started' con role link en el hero section y verificar que es visible y no está deshabilitado
    - expect: El botón 'Get started' es visible y activo
  3. Hacer click en 'Get started'
    - expect: La URL cambia a /docs/intro
    - expect: El heading 'Installation' es visible en la página de destino

### 7. Suite 7 - Secciones de Features en la Página Principal

**Seed:** `tests/seed.spec.ts`

#### 7.1. TC-025: Sección de soporte multi-navegador es visible

**File:** `tests/features/multi-browser.spec.ts`

**Steps:**
  1. Navegar a / y hacer scroll hasta la sección de navegadores
    - expect: Se mencionan los tres navegadores: Chromium, Firefox y WebKit/Safari
    - expect: Los iconos o logos de cada navegador son visibles
    - expect: Hay texto descriptivo que explica el soporte cross-browser

#### 7.2. TC-026: Sección de soporte multi-lenguaje es visible

**File:** `tests/features/multi-language.spec.ts`

**Steps:**
  1. Navegar a / y hacer scroll hasta la sección de lenguajes soportados
    - expect: Se mencionan: TypeScript, JavaScript, Python, Java y .NET
    - expect: Cada lenguaje tiene una representación visual o de texto clara

#### 7.3. TC-027: Sección de Auto-wait es visible

**File:** `tests/features/auto-wait.spec.ts`

**Steps:**
  1. Navegar a / y hacer scroll buscando la sección de auto-wait o accionabilidad
    - expect: Hay contenido que describe que Playwright espera automáticamente a que los elementos estén listos
    - expect: El texto es legible y no tiene problemas de renderizado

#### 7.4. TC-028: Sección de Trace Viewer / herramientas de debugging es visible

**File:** `tests/features/trace-viewer.spec.ts`

**Steps:**
  1. Navegar a / y hacer scroll buscando la sección de Trace Viewer
    - expect: Se mencionan capacidades: Trace Viewer, grabación de video, capturas de pantalla, inspector
    - expect: Hay elementos visuales que ilustran la capacidad

#### 7.5. TC-029: Los bloques de código tienen syntax highlighting

**File:** `tests/features/code-syntax-highlight.spec.ts`

**Steps:**
  1. Navegar a / y localizar los bloques de código
    - expect: Al menos un bloque de código es visible
    - expect: El código tiene resaltado de sintaxis con múltiples colores
    - expect: El fondo del bloque es distinto al fondo de la página
  2. Cambiar el lenguaje a Python
    - expect: El mismo bloque actualiza su contenido con nuevo syntax highlighting

### 8. Suite 8 - Responsividad

**Seed:** `tests/seed.spec.ts`

#### 8.1. TC-030: Vista móvil (375px) - Menú hamburguesa funcional

**File:** `tests/responsive/mobile-375.spec.ts`

**Steps:**
  1. Configurar el viewport a 375x812 y navegar a /
    - expect: La página carga sin overflow horizontal
    - expect: El menú de navegación principal no es visible directamente (colapsado)
    - expect: El icono del menú hamburguesa es visible
  2. Hacer click en el menú hamburguesa
    - expect: El menú desplegable aparece con los enlaces: Docs, API, Community, GitHub
  3. Hacer click en el enlace 'Docs' en el menú móvil
    - expect: La navegación a /docs/intro es exitosa

#### 8.2. TC-031: Vista tablet (768px) - Layout correcto

**File:** `tests/responsive/tablet-768.spec.ts`

**Steps:**
  1. Configurar el viewport a 768x1024 y navegar a /
    - expect: La página carga sin overflow horizontal
    - expect: La navegación está adaptada para tablet
    - expect: El hero section con heading y CTA son visibles

#### 8.3. TC-032: Vista desktop grande (1440px) - Contenido centrado correctamente

**File:** `tests/responsive/desktop-1440.spec.ts`

**Steps:**
  1. Configurar el viewport a 1440x900 y navegar a /
    - expect: La página carga correctamente
    - expect: El contenido está centrado con márgenes apropiados
    - expect: No hay elementos demasiado estirados o con espaciado excesivo
    - expect: El navbar es completamente visible sin truncado

### 9. Suite 9 - Accesibilidad

**Seed:** `tests/seed.spec.ts`

#### 9.1. TC-033: Navegación completa solo con teclado

**File:** `tests/accessibility/keyboard-navigation.spec.ts`

**Steps:**
  1. Navegar a / y presionar Tab repetidamente
    - expect: El foco avanza lógicamente de izquierda a derecha, de arriba a abajo
    - expect: Cada elemento interactivo tiene un indicador visual de foco
  2. Verificar que los enlaces del navbar son alcanzables por teclado
    - expect: Docs, API, Community, GitHub, búsqueda y toggle de tema son accesibles por Tab
  3. Con el foco en 'Get started', presionar Enter
    - expect: Navega a /docs/intro
  4. Presionar Shift+Tab para navegar en sentido inverso
    - expect: El orden inverso se mantiene lógico

#### 9.2. TC-034: Atributos aria-label en elementos de iconos

**File:** `tests/accessibility/aria-labels.spec.ts`

**Steps:**
  1. Navegar a / y verificar aria-labels de iconos interactivos
    - expect: El icono de GitHub tiene aria-label descriptivo
    - expect: El toggle de tema tiene aria-label descriptivo
    - expect: El botón de búsqueda tiene aria-label descriptivo
    - expect: El logo de Playwright tiene texto alternativo o aria-label

#### 9.3. TC-035: Imágenes con atributos alt correctos

**File:** `tests/accessibility/image-alt-attributes.spec.ts`

**Steps:**
  1. Navegar a / y obtener todas las etiquetas img de la página
    - expect: Las imágenes informativas tienen atributos alt no vacíos y descriptivos
    - expect: Las imágenes decorativas tienen alt='' o aria-hidden='true'

### 10. Suite 10 - Documentación (Flujos internos)

**Seed:** `tests/seed.spec.ts`

#### 10.1. TC-036: Sidebar de la documentación es navegable

**File:** `tests/docs/sidebar-navigation.spec.ts`

**Steps:**
  1. Navegar a /docs/intro y verificar el sidebar
    - expect: El sidebar izquierdo es visible con múltiples secciones
    - expect: Contiene al menos: Getting Started, Guides, API
  2. Hacer click en un enlace del sidebar (por ejemplo 'Writing tests')
    - expect: La URL cambia a la sección correspondiente
    - expect: El enlace activo en el sidebar queda visualmente resaltado

#### 10.2. TC-037: Paginación Next/Previous al final de las páginas de docs

**File:** `tests/docs/pagination-next-prev.spec.ts`

**Steps:**
  1. Navegar a /docs/intro y hacer scroll hasta el final
    - expect: Existe un botón o enlace 'Next' al final de la página
    - expect: El texto del botón indica la página siguiente
  2. Hacer click en 'Next'
    - expect: La URL cambia a la página siguiente
    - expect: Aparece un botón 'Previous'
  3. Hacer click en 'Previous'
    - expect: Regresa a /docs/intro

#### 10.3. TC-038: El buscador dentro de la documentación encuentra términos técnicos

**File:** `tests/docs/docs-search-technical-terms.spec.ts`

**Steps:**
  1. Navegar a /docs/intro y abrir el panel de búsqueda (Ctrl+K)
    - expect: El panel de búsqueda se abre
  2. Escribir 'page.goto' y hacer click en un resultado
    - expect: La navegación lleva a la página de API con el método goto documentado

#### 10.4. TC-039: Selector de lenguaje en la documentación cambia los ejemplos de código

**File:** `tests/docs/docs-language-selector.spec.ts`

**Steps:**
  1. Navegar a /docs/intro y cambiar el lenguaje a 'Python'
    - expect: Los bloques de código en la página de docs cambian a sintaxis Python
  2. Cambiar a 'Java'
    - expect: Los bloques de código muestran sintaxis Java

### 11. Suite 11 - Enlaces Externos y Seguridad

**Seed:** `tests/seed.spec.ts`

#### 11.1. TC-040: Todos los enlaces externos abren en nueva pestaña con rel correcto

**File:** `tests/external-links/external-links-security.spec.ts`

**Steps:**
  1. Navegar a / y obtener todos los enlaces que apuntan a dominios externos
    - expect: Cada enlace externo tiene target='_blank'
    - expect: Cada enlace externo tiene rel que incluye noopener

#### 11.2. TC-041: Enlace de Discord en Community apunta a URL válida

**File:** `tests/external-links/discord-link.spec.ts`

**Steps:**
  1. Navegar a /community y localizar el enlace de Discord
    - expect: El href apunta a una URL válida de Discord
    - expect: El enlace no está roto (responde con status 200)

### 12. Suite 12 - Performance y Métricas

**Seed:** `tests/seed.spec.ts`

#### 12.1. TC-042: Página principal carga en menos de 5 segundos

**File:** `tests/performance/load-time.spec.ts`

**Steps:**
  1. Registrar el timestamp antes de navegar a /
  2. Navegar a / y esperar el evento load
    - expect: La carga completa ocurre en menos de 5000ms
    - expect: El heading principal es visible en menos de 3000ms

#### 12.2. TC-043: No hay recursos críticos con respuesta lenta (> 3s)

**File:** `tests/performance/slow-resources.spec.ts`

**Steps:**
  1. Interceptar todas las solicitudes de red y navegar a /
    - expect: Ningún recurso JS o CSS crítico tarda más de 3 segundos en responder
