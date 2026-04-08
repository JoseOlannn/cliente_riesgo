function evaluar() {
  // Obtener datos del formulario
  const servicio = parseInt(document.getElementById("servicio").value);
  const puntualidad = parseInt(document.getElementById("puntualidad").value);
  const nps = parseInt(document.getElementById("nps").value);
  const quejas = parseInt(document.getElementById("quejas").value);

  // Validación básica
  if (isNaN(servicio) || isNaN(puntualidad) || isNaN(nps) || isNaN(quejas)) {
    document.getElementById("resultado").innerHTML =
      "<p style='color:red;'>Por favor ingresa todos los datos correctamente</p>";
    return;
  }

  // Mostrar mensaje de carga
  document.getElementById("resultado").innerHTML =
    "<p>Analizando cliente...</p>";

  // Enviar datos a n8n
  fetch("https://joseolan.app.n8n.cloud/webhook-test/cliente-riesgo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      servicio: servicio,
      puntualidad: puntualidad,
      nps: nps,
      quejas: quejas
    })
  })
    .then(response => {
      console.log("Respuesta cruda:", response);

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      return response.json();
    })
    .then(data => {
      console.log("Respuesta JSON:", data);

      // Mostrar resultado en pantalla
      document.getElementById("resultado").innerHTML = `
        <h3>Resultado</h3>
        <p><strong>Riesgo:</strong> ${data.nivel}</p>
        <p><strong>Problemas:</strong> ${data.problemas.join(", ")}</p>
        <p><strong>Acción:</strong> ${data.accion}</p>
      `;
    })
    .catch(error => {
      console.error("Error:", error);

      document.getElementById("resultado").innerHTML =
        "<p style='color:red;'>Error al conectar con el agente</p>";
    });
}