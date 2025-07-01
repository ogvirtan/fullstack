const express = require("express");
const morgan = require("morgan");
const app = express();

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post-content"
  )
);

app.get("/info", (request, response) => {
  const date = new Date().toString();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const contact = persons.find((c) => c.id === id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  persons = persons.filter((c) => c.id !== id);
  res.status(204).end();

  console.log("", persons);
});

app.post("/api/persons", (req, res) => {
  morgan.token("post-content", function (req, res) {
    return JSON.stringify(req.body);
  });
  const body = req.body;

  if (!body.name) {
    if (!body.number) {
      return res.status(400).json({
        error: "everything is missing",
      });
    }
    return res.status(400).json({
      error: "name missing",
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: "number missing",
    });
  }
  if (persons.find((c) => c.name === body.name)) {
    return res.status(400).json({
      error: `${body.name} is already a contact`,
    });
  }

  const contact = {
    id: Math.floor(Math.random() * 1000000).toString(),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(contact);
  res.json(contact);

  console.log("", persons);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
