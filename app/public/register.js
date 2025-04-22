// Obtiene el primer elemento del DOM con la clase "error"
// Este elemento se usará para mostrar mensajes de error si el registro falla
const mensajeError = document.getElementsByClassName("error")[0];

// Agrega un event listener al formulario de registro para manejar el evento "submit"
document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault(); // Previene que el formulario recargue la página al enviarse

  // Muestra en consola el valor del campo "user"
  console.log(e.target.children.user.value);

  // Realiza una solicitud POST a la API para registrar un nuevo usuario
  const res = await fetch("http://localhost:4000/api/register", {
    method: "POST", // Método HTTP POST
    headers: {
      "Content-Type": "application/json" // Especifica que se está enviando JSON
    },
    body: JSON.stringify({ // Convierte los datos del formulario a JSON
      user: e.target.children.user.value, // Valor del input de usuario
      password: e.target.children.password.value, // Valor del input de contraseña
      psrepeat: e.target.children.psrepeat.value // Valor del input de confirmación de contraseña
    })
  });

  // Si la respuesta no fue exitosa (status diferente a 2xx)
  if (!res.ok) return mensajeError.classList.toggle("escondido", false); // Muestra el mensaje de error

  // Convierte la respuesta a JSON
  const resJson = await res.json();

  // Si la respuesta incluye una redirección, redirige al usuario a esa URL
  if (resJson.redirect) {
    window.location.href = resJson.redirect;
  }
});
