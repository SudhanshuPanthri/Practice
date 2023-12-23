const { getNotes, getNote, createNote } = require("./database.js");
const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send({ message: "Something broke" });
});

app.get("/test", (req, res) => {
  return res.status(200).json({ message: "Hitting the api" });
});

app.get("/notes", async (req, res) => {
  const data = await getNotes();
  return res.status(200).json({ result: data });
});

app.get("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const data = await getNote(id);
  return res.status(200).json({ result: data });
});

app.post("/notes", async (req, res) => {
  const { title, content } = req.body;
  await createNote(title, content);
  return res.status(200).json({ message: "Created Note" });
});

try {
  app.listen(port, () => {
    console.log("Server running on PORT", port);
  });
} catch (err) {
  console.log(err);
}
