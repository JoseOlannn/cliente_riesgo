function evaluar() {
  const servicio = parseInt(document.getElementById("servicio").value);
  const puntualidad = parseInt(document.getElementById("puntualidad").value);
  const nps = parseInt(document.getElementById("nps").value);
  const quejas = parseInt(document.getElementById("quejas").value);

  if (isNaN(servicio) || isNaN(puntualidad) || isNaN(nps) || isNaN(quejas)) {
    document.getElementById("resultado").innerHTML =
      "<p style='color:red;'>Por favor ingresa todos los datos</p>";
    return;
  }

  document.getElementById("resultado").innerHTML = "Analizando...";

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

      let color = "";
      let emoji = "";

      if (data.nivel.includes("ALTO")) {
        color = "red";
        emoji = "🔴";
      } else if (data.nivel.includes("MEDIO")) {
        color = "orange";
        emoji = "🟡";
      } else {
        color = "green";
        emoji = "🟢";
      }

      document.getElementById("resultado").innerHTML = `
        <h3>Resultado</h3>

        <div class="semaforo" style="background:${color}">
          ${emoji} ${data.nivel}
        </div>

        <p><strong>Problemas:</strong> ${data.problemas.join(", ") || "Ninguno"}</p>
        <p><strong>Acción:</strong> ${data.accion}</p>

        <p><strong>Diagnóstico:</strong> 
        El cliente presenta riesgo ${data.nivel.toLowerCase()} debido a 
        ${data.problemas.join(", ") || "condiciones estables"}.
        </p>
      `;
    })
    .catch(err => {
      console.error(err);
      document.getElementById("resultado").innerHTML =
        "<p style='color:red;'>Error al conectar con el agente</p>";
    });
}