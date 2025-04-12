import app from "./app.js";
import sequelize from "./config/db.js";
import config from "./config/config.js";
import dotenv from "dotenv";
import morgan from "morgan";
import './models/Citas.model.js'
import './models/Especialidad.model.js'
import './models/Medicamentos.model.js'
import './models/Pacientes.model.js'
import './models/Recetas.model.js'
import './models/Roles.model.js'
import './models/Usuarios.model.js'
import './models/RegistroMedicamentos.model.js'



dotenv.config();

const PORT = config.PORT;

sequelize.authenticate()
  .then(async () => {
    console.log(`🐬 Conexión a MySQL Correcta`)
    await sequelize.sync({ alter: true }); // Si se pone en true borrara la base de datos y la creara de nuevo
  })
  .then(() => {
    app.use(morgan("dev"))
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`❌ Error al conectar a MySQL: ${err}`)
  })


