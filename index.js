import express from "express";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
console.log(process.env.PORT);

app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});

let users = [
  {
    id: 1,
    name: "Rafael",
    age: 41,
  },
  {
    id: 2,
    name: "Jose",
    age: 56,
  },
  {
    id: 3,
    name: "Carlos Alberto",
    age: 23,
  },
];
app.get("/", (request, response) => {
  response.send(`
    <h1>Trabalhando com express</h1>
    `);
});

app.get("/users", (request, response) => {
  response.send(users);
});

app.get("/users/:userId", (request, response) => {
  const userId = request.params.userId;
  const user = users.find((user) => {
    return user.id === Number(userId);
  });
  return response.send(user);
});

app.post("/users", (request, response) => {
  const newUser = request.body;
  users.push(newUser);
  return response.status(StatusCodes.CREATED).send(newUser);
});

app.put("/users/:userId", (request, response) => {
  const userId = request.params.userId;

  const updatedUser = request.body;

  users = users.map((user) => {
    if (Number(userId) === user.id) {
      return updatedUser;
    }
    return user;
  });
  response.status(200).send(updatedUser);
});

app.delete("/users/:userId", (request, response) => {
  const userId = request.params.userId;
  users = users.filter((user) => {
    return user.id !== Number(userId);
  });

  return response.status(StatusCodes.NO_CONTENT).send();
});
