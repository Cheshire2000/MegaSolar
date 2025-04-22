// ===================== IMPORTACIONES =====================

// Importa el framework Express para crear el servidor web
import express from "express";

// Importa el módulo 'path' para trabajar con rutas de archivos del sistema
import path from 'path';

// Importa 'fileURLToPath' para poder obtener el path real del archivo actual
import { fileURLToPath } from 'url';

// Importa los métodos del controlador de autenticación (login y registro)
import { methods as authentication } from "./controllers/authentication.controller.js";

import { methods as clientesController } from "./controllers/clientes.control.js";



// ============ CONFIGURACIÓN DEL DIRECTORIO ACTUAL ============

// Convierte la URL del módulo en una ruta de archivo
const __filename = fileURLToPath(import.meta.url);

// Obtiene el directorio actual del archivo
const __dirname = path.dirname(__filename);




// ============ INICIALIZACIÓN DE LA APP EXPRESS ============

// Crea una instancia de la aplicación Express
const app = express();

// Define el puerto donde el servidor escuchará las peticiones
app.set("port", 4000);

// Inicia el servidor y lo pone a escuchar en el puerto definido
app.listen(app.get("port"), () => {
  console.log("SERVIDOR CORRIENDO EN PUERTO", app.get("port"));
});




// ============ MIDDLEWARES ============

// Sirve archivos estáticos desde el directorio 'public'
// (CSS, imágenes, scripts del lado del cliente, etc.)
app.use(express.static(__dirname + "/public"));

// Permite al servidor entender solicitudes con formato JSON (como peticiones POST)
app.use(express.json());




// ============ DEFINICIÓN DE RUTAS ============

// Ruta raíz: muestra el archivo 'login.html'
app.get("/", (req, res) => res.sendFile(__dirname + "/pages/login.html"));

// Ruta de registro: muestra 'register.html'
app.get("/register", (req, res) => res.sendFile(__dirname + "/pages/register.html"));

// Ruta de clientes: muestra 'clientes.html'
app.get("/clientes", (req, res) => res.sendFile(__dirname + "/pages/clientes.html"));

// Ruta de administrador: muestra 'admin.html'
app.get("/admin", (req, res) => res.sendFile(__dirname + "/pages/admin/admin.html"));

// Ruta de administrador: muestra 'admin.html'
app.get("/newcliente", (req, res) => res.sendFile(__dirname + "/pages/newcliente.html"));




// ============ RUTAS DE LA API ============

// Ruta POST para registrar un nuevo usuario
app.post("/api/register", authentication.register);

// Ruta POST para iniciar sesión
app.post("/api/login", authentication.login);

// =========================================

app.post("/api/clientes", clientesController.addCliente);

