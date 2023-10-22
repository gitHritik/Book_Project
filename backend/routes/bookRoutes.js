import express from "express";
import { Book } from "../model/book.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);

    return response.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const allBooks = await Book.find({});
    res.status(200).json({
      count: allBooks.length,
      data: allBooks,
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      res.status(401).send("Book don't exist");
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
router.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = req.params;
    const updateBook = await Book.findByIdAndUpdate(id, req.body);

    if (!updateBook) {
      res.status(401).send({ message: "Book don't exist" });
    }

    res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteBook = await Book.findByIdAndDelete(id);

    if (!deleteBook) {
      res.status(401).send({ message: "Book don't exist" });
    }

    res.status(200).send({ message: "Book Deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});
export default router;
