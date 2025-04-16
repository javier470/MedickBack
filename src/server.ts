import dotenv from "dotenv";

dotenv.config({ path: '.env' });
import app from "./app.js";
import sequelize from "./config/db.js";
import morgan from "morgan";
import './models/Citas.model.js'
import './models/Especialidad.model.js'
import './models/Medicamentos.model.js'
import './models/Pacientes.model.js'
import './models/Recetas.model.js'
import './models/Roles.model.js'
import './models/Usuarios.model.js'
import './models/RegistroMedicamentos.model.js'




const PORT = process.env.PORT;

sequelize.authenticate()
  .then(async () => {
    console.log(`🐬 Conexión a MySQL Correcta`)
    await sequelize.sync({ alter: false }); // Si se pone en true borrara la base de datos y la creara de nuevo
  })
  .then(() => {
    app.use(morgan("dev"))
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(process.env.DB_USER)
    console.log(`❌ Error al conectar a MySQL: ${err}`)
  })


