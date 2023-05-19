var express = require("express");
var router = express.Router();
var bookService = require("../services/book.service");
const FormData = require('form-data');
const multer = require('multer');
const fs = require("fs");
const config = require("../config");

// Configurar Multer para manejar las solicitudes de carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads') // Directorio donde se almacenarán los archivos cargados
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname) // Nombre del archivo almacenado en el servidor
  }
})


const upload = multer({ storage: storage })

/* GET INDEX */
router.get("/", async (req, res, next) => {
  const results = await bookService.findBooks();
  res.render("index", {
    respuesta: results,
    title: "Books",
  });
});

/* FIND BOOK */
router.get("/book/:bookId", async (req, res) => {
  const id = req.params.bookId;

  const results = await bookService.findBookId(id);

  res.render("detail", {
    title: "Book",
    book: results?.book,
  });
});

/* CREATE BOOK */
router.get("/create-book", (req, res, next) => {
  res.render("form", { title: "Agregar libro" });
});

router.post("/create-book", async (req, res, next) => {
  let book = req.body;
  const results = await bookService.createBook(book);
  res.render("form", { title: "Agregar libro" });
});

/* UPDATE BOOK */
router.get("/update-book/:bookId", (req, res, next) => {
  let bookId = req.params.bookId;
  res.render("update", { title: "Modificar libro", bookId });
});

router.post("/update-book", upload.single('image'), async (req, res, next) => {
  let book = req.body;
  let imagen = req.file

  const imagePath = `${config.rootPath}/uploads/${imagen.filename}`;

  const bookId = book.bookId;

  const formData = new FormData();
  formData.append("image", fs.createReadStream(imagePath));

  const results = await bookService.updateBooksById(bookId, formData);
  res.render("update", { title: "Modificar libro", bookId });
});

module.exports = router;
