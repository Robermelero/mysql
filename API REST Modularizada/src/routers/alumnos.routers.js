
const { Router } = require("express");
const router = Router();
const studentsCtrl = require("../controller/alumnos.controller");


router.get("/alumnos/:student_id", studentsCtrl.getStudent);
router.get("/alumnos", studentsCtrl.getStudent);
router.post("/alumnos", studentsCtrl.postStudent);
router.delete("/alumnos/:student_id", studentsCtrl.deleteStudent);
router.put("/alumnos", studentsCtrl.putStudent);


module.exports = router;
