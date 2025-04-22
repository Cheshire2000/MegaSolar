// Selecciona el primer elemento con la clase "error" (mensaje de error oculto por defecto)
const mensajeError = document.getElementsByClassName("error")[0];

// Agrega un event listener al formulario de login que escucha el evento "submit"
document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Previene que el formulario recargue la página al enviarse

  // Extrae los valores de los campos de usuario y contraseña del formulario
  const user = document.querySelector("#user").value;
const password = document.querySelector("#password").value;

  // Envía una solicitud POST al endpoint /api/login con los datos del formulario
  const res = await fetch("http://localhost:4000/api/login", {
    method: "POST", // Método HTTP
    headers: {
      "Content-Type": "application/json" // Especifica que se está enviando JSON
    },
    body: JSON.stringify({
      user, // Nombre de usuario
      password // Contraseña
    })
  });

  // Si la respuesta no es exitosa, se muestra el mensaje de error
  if (!res.ok) return mensajeError.classList.toggle("escondido", false);

  // Convierte la respuesta del servidor a formato JSON
  const resJson = await res.json();

  // Si la respuesta contiene una redirección, redirige al usuario a la página indicada
  if (resJson.redirect) {
    window.location.href = resJson.redirect;
  }
});
