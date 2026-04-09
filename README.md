# 🚦 Detector de Riesgo de Clientes - Traxion Dashboard

Un panel de control web (Dashboard) interactivo diseñado para evaluar y visualizar el nivel de riesgo de clientes basándose en sus métricas clave. El sistema se apoya en un agente de Inteligencia Artificial (a través de un webhook de n8n) para analizar las métricas en tiempo real, asignar un nivel de riesgo (Semáforo) y proponer planes de acción estructurados.

## 🌟 Características Principales

*   **Base de Clientes (Selección Rápida):** Lista interactiva para probar rápidamente el sistema con datos de clientes predefinidos (Riesgo Alto, Medio, Bajo) o ingresar datos completamente personalizados.
*   **Métricas Evaluadas:**
    *   Nivel de Servicio (%)
    *   Puntualidad (%)
    *   NPS (Net Promoter Score)
    *   Quejas Abiertas
*   **Análisis Dinámico por IA:** Comunicación en tiempo real con un webhook que devuelve el análisis detallado del cliente.
*   **Semáforo de Riesgo:** Indicador visual (Rojo, Amarillo, Verde) junto con los principales problemas encontrados y un *insight* directo generado por la IA.
*   **Plan de Acción:** Listas organizadas automáticamente en "Acciones Específicas" y "Acciones Generales" para mitigar el riesgo detectado.
*   **Interfaz Fluida:** Diseño responsivo moderno y limpio con un layout de 4 columnas diseñado para adaptarse y lucir profesional en múltiples resoluciones.

## 🛠️ Tecnologías Utilizadas

*   **HTML5:** Estructura semántica del panel de control.
*   **CSS3 (Vanilla):** Sistema de grillas (`CSS Grid`) y `Flexbox` para un diseño de tarjetas (Cards) equilibrado de lado a lado.
*   **JavaScript (Vanilla):** Lógica funcional para manipular eventos del DOM, capturar las métricas de entrada y realizar las peticiones web (`fetch`) de forma asincrónica.
*   **n8n / Webhooks:** El backend simulado que procesa las métricas y ejecuta los prompts a un LLM para retornar el análisis final en formato JSON.

## 🚀 Uso e Instalación

Al ser un proyecto Vanilla de HTML/CSS/JS, **no necesitas instalar ninguna dependencia o servidor** para verlo en funcionamiento.

1.  **Clona o descarga** este repositorio en tu computadora.
2.  Descomprime la carpeta si es necesario.
3.  Simplemente haz **doble clic en el archivo `index.html`** para abrirlo directamente en tu navegador web de preferencia (Chrome, Edge, Firefox, Safari).

### ¿Cómo probarlo?

1.  **Opción Automática:** Selecciona uno de los clientes desde la primera columna `Base de Clientes` (Ej. "Cliente 1 (Riesgo Alto)"). Verás que los números se llenan solos.
2.  **Opción Manual:** Selecciona "Personalizado / Nuevo" e ingresa directamente los números que tú desees en la columna `Métricas`.
3.  Haz clic en el botón naranja **`EVALUAR`**.
4.  Observa cómo el semáforo cambia de color y la pantalla se llena tanto con el análisis (*insight*) como con las instrucciones de las acciones sugeridas.
5.  Puedes hacer clic en el botón **`BORRAR`** para reiniciar tu área de trabajo.

## 📂 Estructura de Archivos

```plaintext
Detección_Cliente/
├── assets/          # (Opcional) Carpeta para imágenes como logotipos.
├── index.html       # Estructura principal y layout de la página en 4 columnas.
├── styles.css       # Reglas de estilo para colores oscuros, tarjetas y animaciones.
└── script.js        # Lógica de conexión a IA, actualización de UI y manejo de botones.
```

## 🔌 API y Endpoint Externo

El proyecto se comunica a través del método `POST` al siguiente webhook de prueba:
`https://joseolan.app.n8n.cloud/webhook/cliente-riesgo`

Envía un JSON con la estructura `{ "servicio": 50, "puntualidad": 60, "nps": -20, "quejas": 5 }` y espera el color de riesgo y el string del análisis de regreso para renderizar.

---
*Hecho por Joseolan.*
