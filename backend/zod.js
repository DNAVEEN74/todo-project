const z = require("zod");

const CreateTodo = z.object({
  title: z.string().min(5),
  description: z.string().min(10),
});

const UpdateTodo = z.object({
  title: z.string().min(5),
  completed: z.boolean()
});


module.exports = {
  CreateTodo,
  UpdateTodo,
};
