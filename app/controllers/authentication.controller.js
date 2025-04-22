// Importación de librerías necesarias
import bcryptjs from "bcryptjs"; // Para encriptar y comparar contraseñas
import jsonwebtoken from "jsonwebtoken"; // Para generar tokens JWT
import dotenv from "dotenv"; // Para cargar variables de entorno desde un archivo .env

dotenv.config(); // Cargar las variables de entorno definidas en .env

// Simulación de base de datos con un solo usuario pre-registrado (usuario "a" con contraseña encriptada)
const usuarios = [{
    user: "a",
    password: "$2b$05$HZrNMq1.NnyfcIJQhmrRau4Gphn0BWLT/wKzGTh9xbW9eeD4UihLC" // Contraseña encriptada (equivale a "a")
}];

// ===============================
// Función para iniciar sesión
// ===============================
async function login(req, res) {
    console.log(req.body); // Muestra los datos que llegan del cliente

    const user = req.body.user; // Extrae el nombre de usuario del body
    const password = req.body.password; // Extrae la contraseña del body

    // Verifica que se hayan enviado ambos campos
    if (!user || !password) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    // Busca al usuario en el arreglo (simulando una DB)
    const usuarioAResvisar = usuarios.find(usuario => usuario.user === user);

    // Si no se encuentra el usuario, se retorna error
    if (!usuarioAResvisar) {
        return res.status(400).send({ status: "Error", message: "Error durante login" });
    }

    // Compara la contraseña ingresada con la encriptada
    const loginCorrecto = await bcryptjs.compare(password, usuarioAResvisar.password);

    // Si la contraseña es incorrecta
    if (!loginCorrecto) {
        return res.status(400).send({ status: "Error", message: "Error durante login" });
    }

    // Si el login fue exitoso, se genera un token JWT
    const token = jsonwebtoken.sign(
        { user: usuarioAResvisar.user }, // Payload del token
        process.env.JWT_SECRET, // Clave secreta
        { expiresIn: process.env.JWT_EXPIRATION } // Duración del token
    );

    // Configuración de la cookie que guardará el JWT en el navegador
    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000), // Tiempo de vida en milisegundos
        path: "/" // Ruta donde la cookie es válida
    };

    // Enviar la cookie al cliente
    res.cookie("jwt", token, cookieOption);

    // Respuesta exitosa
    res.send({ status: "ok", message: "Usuario loggeado", redirect: "/admin" });
}

// ===============================
// Función para registrar un nuevo usuario
// ===============================
async function register(req, res) {
    console.log(req.body); // Mostrar datos recibidos en consola

    const user = req.body.user; // Extrae el nombre de usuario
    const password = req.body.password; // Contraseña
    const psrepeat = req.body.psrepeat; // Confirmación de contraseña

    // Verifica que todos los campos estén llenos
    if (!user || !password || !psrepeat) {
        return res.status(400).send({ status: "Error", message: "Los campos están incompletos" });
    }

    // Verifica si el usuario ya existe
    const usuarioAResvisar = usuarios.find(usuario => usuario.user === user);

    if (usuarioAResvisar) {
        return res.status(400).send({ status: "Error", message: "Este usuario ya existe" });
    }

    // Verifica si las contraseñas coinciden
    if (password !== psrepeat) {
        return res.status(400).send({ status: "Error", message: "Las contraseñas no coinciden" });
    }

    // Genera un "salt" (valor aleatorio para mejorar la encriptación)
    const salt = await bcryptjs.genSalt(5);

    // Encripta la contraseña
    const hashPassword = await bcryptjs.hash(password, salt);

    // Crea el nuevo objeto de usuario con la contraseña encriptada
    const nuevoUsuario = {
        user,
        password: hashPassword
    };

    // Guarda el nuevo usuario en el arreglo (simulación de guardar en DB)
    usuarios.push(nuevoUsuario);

    console.log(usuarios); // Muestra todos los usuarios registrados hasta el momento

    // Respuesta de éxito
    return res.status(201).send({
        status: "ok",
        message: `Usuario ${nuevoUsuario.user} agregado`,
        redirect: "/"
    });
}

// Exporta las funciones login y register para usarlas en otros archivos
export const methods = {
    login,
    register
}
