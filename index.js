const {
  getNotes,
  getNote,
  createNote,
  deleteNote,
  updateNote,
} = require("./database.js");
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

app.delete("/notes/:id", async (req, res) => {
  const id = req.params.id;
  await deleteNote(id);
  return res.status(204).json({ message: `Document Deleted with ID : ${id}` });
});

//put will update the whole data it doesn't apply to partial updation within the data or object.
//it requires the whole data to be passed;

app.put();

//if i want to change something particular i will use patch method rather than updating the whole document or data;
//it requires only the value or key that needs to be updated

app.patch("/notes/:id", async (req, res) => {
  const id = req.params.id;
  const data = await updateNote(id);
  return res.status(201).json({ result: data });
});

try {
  app.listen(port, () => {
    console.log("Server running on PORT", port);
  });
} catch (err) {
  console.log(err);
}
