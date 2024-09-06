const express = require("express");
const { CreateTodo, UpdateTodo } = require("./zod");
const { Todos } = require("./db");
const app = express();
const cors = require('cors')
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todos.find();
    res.json(todos);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.post("/todos/post", async (req, res) => {
  const todoPayload = req.body;
  try {
    const validTodo = await CreateTodo.safeParse(todoPayload);
    if (!validTodo.success) {
      return res.status(400).json({
        error: validTodo.error.message,
      });
    }
    await Todos.create(todoPayload);
    res.json({
      message: "Todo created successfully",
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

app.put("/todos/completed", async (req, res) => {
  const todoPayload = req.body;
  console.error("Update Request Payload:", todoPayload); 
  try {
    const validTodo = await UpdateTodo.safeParse(todoPayload);
    if (!validTodo.success) {
      return res.status(400).json({
        error: validTodo.error.message,
      });
    }

    const result = await Todos.updateOne(
      { title: todoPayload.title },
      { $set: { completed: todoPayload.completed } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({
      message: "Todo updated successfully",
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

app.delete("/todos/delete", async (req, res) => {
  const todoPayload = req.body;
  try {
    const validTodo = await UpdateTodo.safeParse(todoPayload);
    if (!validTodo.success) {
      return res.status(400).json({
        error: validTodo.error.message,
      });
    }

    await Todos.deleteOne({ title: todoPayload.title });
    res.json({
      message: "Todo deleted successfully",
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
