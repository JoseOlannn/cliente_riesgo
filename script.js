function evaluar() {
  const servicio = parseInt(document.getElementById("servicio").value);
  const puntualidad = parseInt(document.getElementById("puntualidad").value);
  const nps = parseInt(document.getElementById("nps").value);
  const quejas = parseInt(document.getElementById("quejas").value);

  if (isNaN(servicio) || isNaN(puntualidad) || isNaN(nps) || isNaN(quejas)) {
    alert("Por favor ingresa todos los datos");
    return;
  }

  // Llamada al backend
  fetch("https://joseolan.app.n8n.cloud/webhook/cliente-riesgo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ servicio, puntualidad, nps, quejas })
  })
  .then(res => res.json())
  .then(data => {
    // Determinar color y emoji del semáforo
    let color = "green", emoji = "🟢";
    if (data.nivel.includes("ALTO")) { color = "red"; emoji = "🔴"; }
    else if (data.nivel.includes("MEDIO")) { color = "orange"; emoji = "🟡"; }

    // Semáforo visual
    const semaforo = document.getElementById("semaforo");
    semaforo.style.background = color;
    semaforo.textContent = emoji;

    // Nivel y descripción
    document.getElementById("nivel").textContent = data.nivel;
    document.getElementById("descripcion").textContent = data.mensaje || "";

    // Datos individuales
    document.getElementById("problemas").textContent = "Problemas detectados: " + (data.problemas.join(", ") || "Ninguno");
    document.getElementById("problema-principal").textContent = "Problema principal: " + (data.problemaPrincipal || "Ninguno");
    document.getElementById("prioridad").textContent = "Prioridad: " + data.prioridad;
    document.getElementById("tiempo").textContent = "Tiempo de acción: " + data.tiempo;
    document.getElementById("responsable").textContent = "Responsable: " + data.responsable;

    // Acciones
    document.getElementById("acciones-especificas").textContent = data.accionesEspecificas;
    document.getElementById("acciones-generales").textContent = data.accionesGenerales;
  })
  .catch(err => {
    console.error(err);
    alert("Error al conectar con el agente");
  });
}

const toggleButton = document.getElementById("toggle-mode");

toggleButton.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  // Cambiar icono
  if(document.body.classList.contains("light-mode")){
    toggleButton.textContent = "🌙";
  } else {
    toggleButton.textContent = "🌞";
  }
});