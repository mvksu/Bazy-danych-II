const router = require("express").Router();

const pathJoin = require("path").join;

const controller = require(pathJoin("..", "controllers", "index"));

//=======================================================
// POBIERANIE danych
//=======================================================
// pobierz dane wszystkich osób
router.get("/list", controller.getPersons);
// pobierz dane konkretnej osoby (o danym personId)
router.get("/list/:personId", controller.getPersonById);
// pobierz dane osób (o danycm „nazwisku”)
router.get("/list/name/:name", controller.getPersonByName);

//=======================================================
// Dodawanie danych
//=======================================================
router.post("/add", controller.addPerson);

//=======================================================
// Usuwanie danych
//=======================================================
router.delete("/del", controller.deletePersons);
// router.delete("/del/:personId", controller.deletePersonById);

module.exports = router;
