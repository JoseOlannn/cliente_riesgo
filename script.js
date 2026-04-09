function evaluar() {
    const servicio = parseInt(document.getElementById("servicio").value);
    const puntualidad = parseInt(document.getElementById("puntualidad").value);
    const nps = parseInt(document.getElementById("nps").value);
    const quejas = parseInt(document.getElementById("quejas").value);

    const semaforo = document.getElementById("semaforo");
    const nivelSpan = document.getElementById("nivel");

    if (isNaN(servicio) || isNaN(puntualidad) || isNaN(nps) || isNaN(quejas)) {
        alert("Por favor ingresa todos los datos");
        return;
    }

    if (nivelSpan) nivelSpan.textContent = "Analizando...";

    fetch("https://joseolan.app.n8n.cloud/webhook/cliente-riesgo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ servicio, puntualidad, nps, quejas })
    })
    .then(res => res.json())
    .then(data => {
        let color = "green", emoji = "🟢";
        if (data.nivel.includes("ALTO")) { color = "red"; emoji = "🔴"; }
        else if (data.nivel.includes("MEDIO")) { color = "orange"; emoji = "🟡"; }

        // Actualizar Semáforo
        semaforo.style.background = color;
        semaforo.textContent = emoji;

        // Actualizar Textos
        document.getElementById("nivel").textContent = data.nivel;
        document.getElementById("descripcion").textContent = data.mensaje || "";
        document.getElementById("problemas").textContent = "Problemas detectados: " + (data.problemas?.join(", ") || "Ninguno");
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

function seleccionarCliente(clienteId, btnElement) {
    const botones = document.querySelectorAll(".client-item");
    botones.forEach(btn => btn.classList.remove("active"));
    if (btnElement) btnElement.classList.add("active");

    const clientes = {
        cliente1: { servicio: 50, puntualidad: 60, nps: -20, quejas: 5 },
        cliente2: { servicio: 75, puntualidad: 80, nps: 20, quejas: 2 },
        cliente3: { servicio: 95, puntualidad: 98, nps: 80, quejas: 0 }
    };

    if (clientes[clienteId]) {
        const data = clientes[clienteId];
        document.getElementById("servicio").value = data.servicio;
        document.getElementById("puntualidad").value = data.puntualidad;
        document.getElementById("nps").value = data.nps;
        document.getElementById("quejas").value = data.quejas;
    }
}

function limpiarMetricas() {
    document.getElementById("servicio").value = "";
    document.getElementById("puntualidad").value = "";
    document.getElementById("nps").value = "";
    document.getElementById("quejas").value = "";
}

// MODO OSCURO 
const toggleButton = document.getElementById("toggle-mode");
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggleButton.textContent = document.body.classList.contains("light-mode") ? "🌙" : "🌞";
});