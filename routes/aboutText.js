const express = require("express");
const router = express.Router();
const mysql = require("../mysql").pool;

router.get("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error: error });
    conn.query("SELECT * FROM aboutText;", (error, result, fields) => {
      if (error) return res.status(500).send({ error: error });
      return res.status(200).send({ response: result });
    });
  });
});

router.post("/", (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) return res.status(500).send({ error: error });
    conn.query(
      "INSERT INTO aboutText (text) VALUES (?)",
      [req.body.text],
      (error, result, field) => {
        conn.release();
        if (error)
          return res.status(500).send({
            error: error,
            response: null,
          });
        res.status(201).send({
          message: "About text added successfully",
        });
      }
    );
  });
});

router.put("/", (req, res, next) => {
  res.status(201).send({
    message: "put aboutText",
  });
});

router.delete("/", (req, res, next) => {
  res.status(201).send({
    message: "delete aboutText",
  });
});

module.exports = router;
