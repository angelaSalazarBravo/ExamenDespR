var express = require("express");
var router = express.Router();

/* GET home page. */

// router.get("/", function (req, res) {
//   res.redirect("/examen/index");
// });
router.get("/examen/index", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/addToSqlite", async (req, res) => {
  const {
    nombre,
    apellidos,
    unidad,
    fecha,
    descripcion,
    asunto,
    informa,
    tipo,
    medida1,
    medida2,
    expulsionaula,
    atiende,
    horaEnvia,
    horaAtiende,
    jefaturaInforma,
  } = req.body;
  db.serialize(() => {
    const stmt = db.prepare(
      `INSERT INTO examenSqlites (nombre,
    apellidos,
    unidad,
    fecha,
    descripcion,
    asunto,
    informa,
    tipo,
    medida1,
    medida2,
    expulsionaula,
    atiende,
    horaEnvia,
    horaAtiende,
    jefaturaInforma,) VALUES (?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?)`
    );
    stmt.run(
      nombre,
      apellidos,
      unidad,
      fecha,
      descripcion,
      asunto,
      informa,
      tipo,
      medida1,
      medida2,
      expulsionaula,
      atiende,
      horaEnvia,
      horaAtiende,
      jefaturaInforma,
      (err) => {
        if (err) {
          console.error("Error al insertar datos en SQLite", err);
          res.status(500).send("Error interno del servidor");
        } else {
          res.json({ success: true });
        }
      }
    );
    stmt.finalize();
  });
});
router.get("*", (req, res) => {
  res.redirect("/examen/index");
});
module.exports = router;
