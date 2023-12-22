const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

app.get("/test", (req, res) => {
  return res.status(200).json({ message: "Hitting the api" });
});

try {
  app.listen(port, () => {
    console.log("Server running on PORT", port);
  });
} catch (err) {
  console.log(err);
}
