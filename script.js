function evaluar() {
  const servicio = parseInt(document.getElementById("servicio").value);
  const puntualidad = parseInt(document.getElementById("puntualidad").value);
  const nps = parseInt(document.getElementById("nps").value);
  const quejas = parseInt(document.getElementById("quejas").value);
  
  const luzSemaforo = document.getElementById("indicadorSemaforo");
  const nivelSpan = document.getElementById("nivelRiesgoSpan");

  if (isNaN(servicio) || isNaN(puntualidad) || isNaN(nps) || isNaN(quejas)) {
    if (luzSemaforo) luzSemaforo.style.backgroundColor = "#555";
    if (nivelSpan) nivelSpan.innerHTML = "RIESGO: <span style='color:#555;'>-</span>";
    document.getElementById("resultado").innerHTML =
      "<p style='color:red;'>Por favor ingresa todos los datos</p>";
    return;
  }

  if (luzSemaforo) luzSemaforo.style.backgroundColor = "#555";
  if (nivelSpan) nivelSpan.innerHTML = "RIESGO: <span style='color:#555;'>-</span>";
  document.getElementById("resultado").innerHTML = "<p>Analizando...</p>";
  document.getElementById("acciones").innerHTML = "";


  fetch("https://joseolan.app.n8n.cloud/webhook/cliente-riesgo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      servicio,
      puntualidad,
      nps,
      quejas
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Datos recibidos:", data);

      let color = "";
      let emoji = "";

    
      if (data.nivel.includes("ALTO")) {
        color = "#e63946";
        emoji = "🔴";
      } else if (data.nivel.includes("MEDIO")) {
        color = "#f4a261";
        emoji = "🟡";
      } else {
        color = "#2a9d8f";
        emoji = "🟢";
      }

      if (luzSemaforo) luzSemaforo.style.backgroundColor = color;
      
      if (nivelSpan) {
        nivelSpan.innerHTML = `RIESGO: <span style="color:${color}">${data.nivel}</span>`;
      }

  
      let mensajeLimpio = data.mensaje || "";
      if (mensajeLimpio.includes("Acciones específicas:")) {
        mensajeLimpio = mensajeLimpio.split("Acciones específicas:")[0];
      }
      
    
      mensajeLimpio = mensajeLimpio.replace(/Estado:/gi, "<strong>Estado:</strong>");
      mensajeLimpio = mensajeLimpio.replace(/Resumen:/gi, "<br><br><strong>Resumen:</strong>");
      mensajeLimpio = mensajeLimpio.replace(/Hallazgo principal:/gi, "<br><br><strong>Hallazgo principal:</strong>");
      mensajeLimpio = mensajeLimpio.replace(/Problemas detectados:/gi, "<br><br><strong>Problemas detectados:</strong>");

      document.getElementById("resultado").innerHTML = `
        <div style="background-color: #27272b; padding: 15px; border-radius: 8px; margin-top: 10px; text-align: left;">
          <p style="margin-bottom: 10px; border-bottom: 1px solid #444; padding-bottom: 10px;">
            <strong>Problemas Principales:</strong><br>
            <span style="color: var(--primary-color);">${data.problemas.join(", ") || "Ninguno"}</span>
          </p>
          <p style="line-height: 1.6;">
            <strong>Insight de Análisis:</strong><br>
            ${mensajeLimpio}
          </p>
        </div>
      `;

  
      function convertirLista(texto) {
        if (!texto) return "<li>No disponible</li>";

        return texto
          .split("\n")
          .filter(line => line.trim() !== "")
          .map(line => `<li>${line.replace("-", "").trim()}</li>`)
          .join("");
      }


      document.getElementById("acciones").innerHTML = `
        <div class="acciones-box">
          <h3>Acciones Específicas</h3>
          <ul>${convertirLista(data.accionesEspecificas)}</ul>

          <h3>Acciones Generales</h3>
          <ul>${convertirLista(data.accionesGenerales)}</ul>
        </div>
      `;
    })
    .catch(err => {
      console.error(err);

      if (luzSemaforo) luzSemaforo.style.backgroundColor = "#555";
      if (nivelSpan) nivelSpan.innerHTML = "RIESGO: <span style='color:#555;'>-</span>";

      document.getElementById("resultado").innerHTML =
        "<p style='color:red;'>Error al conectar con el agente</p>";

      document.getElementById("acciones").innerHTML = "";
    });
}

//  DATOS DE CLIENTES PREDEFINIDOS
function seleccionarCliente(clienteId, btnElement) {
  // Quitar clase activa de todos los botones
  const botones = document.querySelectorAll(".client-item");
  botones.forEach(btn => btn.classList.remove("active"));
  
  // Activar el botón presionado
  if (btnElement) {
    btnElement.classList.add("active");
  }

  const clientes = {
    cliente1: { servicio: 50, puntualidad: 60, nps: -20, quejas: 5 }, // Riesgo Alto
    cliente2: { servicio: 75, puntualidad: 80, nps: 20, quejas: 2 },  // Riesgo Medio
    cliente3: { servicio: 95, puntualidad: 98, nps: 80, quejas: 0 }   // Riesgo Bajo
  };

  const servicioInput = document.getElementById("servicio");
  const puntualidadInput = document.getElementById("puntualidad");
  const npsInput = document.getElementById("nps");
  const quejasInput = document.getElementById("quejas");

  if (clientes[clienteId]) {
    const data = clientes[clienteId];
    servicioInput.value = data.servicio;
    puntualidadInput.value = data.puntualidad;
    npsInput.value = data.nps;
    quejasInput.value = data.quejas;
  } else {
    // Si se selecciona "Personalizado", limpiar los campos para llenarlos a mano
    servicioInput.value = "";
    puntualidadInput.value = "";
    npsInput.value = "";
    quejasInput.value = "";
  }
}

// LIMPIAR TODOS LOS CAMPOS
function limpiarMetricas() {
  document.getElementById("servicio").value = "";
  document.getElementById("puntualidad").value = "";
  document.getElementById("nps").value = "";
  document.getElementById("quejas").value = "";

 

  // Resetear selección en lista de clientes usando seleccionarCliente con un string vacío
  // Esto activará el botón "Personalizado / Nuevo" que debería ser el último
  const botones = document.querySelectorAll(".client-item");
  botones.forEach(btn => btn.classList.remove("active"));
  
  // Asignamos activo al último botón (Personalizado)
  if (botones.length > 0) {
    botones[botones.length - 1].classList.add("active");
  }
}