const express = require("express");
const db = require("../db"); // 👈 connects db.js
const router = express.Router();

// GET all todos
router.get("/", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(results);
  });
});

// ADD todo
router.post("/", (req, res) => {
  const { title } = req.body;

  db.query(
    "INSERT INTO todos (title, completed) VALUES (?, ?)",
    [title, false],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        id: result.insertId,
        title,
        completed: false
      });
    }
  );
});

// DELETE todo
router.delete("/:id", (req, res) => {
  db.query(
    "DELETE FROM todos WHERE id = ?",
    [req.params.id],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({ message: "Todo deleted" });
    }
  );
});

module.exports = router;

// UPDATE todo (edit title or completed)
router.put("/:id", (req, res) => {
  const { title, completed } = req.body;

  db.query(
    "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
    [title, completed, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
});
