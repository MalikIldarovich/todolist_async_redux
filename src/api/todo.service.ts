import serverURL from "./consts";
import { ITodo } from "../interfaces/todos";

const TODOS = "todos";

const TodoService = {
  // GET ALL
  async getAll() {
    try {
      const response = await fetch(`${serverURL}/${TODOS}`);
      const data = await response.json();

      if (!response.ok || !data) return false;

      return data;
    } catch (error) {
      if (error instanceof Error) {
        // return error.message;
        return false;
      }
    }
  },

  // GET WITH LIMIT
  async getWithLimit(quantity: number) {
    try {
      const response = await fetch(`${serverURL}/${TODOS}?_limit=${quantity}`);
      const data = await response.json();

      if (!response.ok || !data) return false;

      return data;
    } catch (error) {
      return false;
    }
  },

  // ADD NEW TODO
  async add(title: string) {
    try {
      const newTodo = { userId: 1, title, completed: false };
      const response = await fetch(`${serverURL}/${TODOS}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();

      if (!response.ok || !data) return false;

      return data as ITodo;
    } catch (error) {
      return false;
    }
  },

  // TOGGLE STATUS TODO
  async toggle(id: number, todo: ITodo) {
    try {
      const response = await fetch(`${serverURL}/${TODOS}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      const data = await response.json();

      if (!response.ok || !data) return false;

      return id;
    } catch (error) {
      return false;
    }
  },

  // DELETE TODO
  async delete(id: number) {
    try {
      const response = await fetch(`${serverURL}/${TODOS}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) return false;

      return id;
    } catch (error) {
      return false;
    }
  },
};

export default TodoService;
