const { Router } = require("express");
const router = Router();
const asignaturasCtrl = require("../controller/asignaturas.controller");

router.get("/media/:student_id", asignaturasCtrl.getMedia);
router.get("/apuntadas/:student_id", asignaturasCtrl.getApuntadas);
router.get("/apuntadas", asignaturasCtrl.getDatosTotales);
router.get("/impartidas/:teacher_id", asignaturasCtrl.getImpartidas);
router.get("/impartidas", asignaturasCtrl.getImpartidasTotales);

module.exports = router;