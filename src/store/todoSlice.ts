import {
  createSlice,
  createAsyncThunk,
  AnyAction,
  PayloadAction,
} from "@reduxjs/toolkit";
import { ITodo } from "../interfaces/todos";
import TodoService from "../api/todo.service";

interface ITodosState {
  todos: ITodo[];
  loading: boolean;
  error: string | null;
}
const initialState: ITodosState = {
  todos: [],
  loading: false,
  error: null,
};

// Get
const getTodos = createAsyncThunk<ITodo[], undefined, { rejectValue: string }>(
  "todos/getTodos",
  async function (_, { rejectWithValue }) {
    const data = await TodoService.getWithLimit(10);
    return data ? data : rejectWithValue("Server error");
  }
);
// Add
const addTodo = createAsyncThunk<ITodo, string, { rejectValue: string }>(
  "todos/addTodo",
  async function (title: string, { rejectWithValue }) {
    const data = await TodoService.add(title);
    return data ? data : rejectWithValue("Can`t add todo");
  }
);
// Toggle
const toggleTodo = createAsyncThunk<number, number, { rejectValue: string }>(
  "todos/toggleTodo",
  async function (id: number, { rejectWithValue, getState }) {
    const todo: ITodo = (getState() as any).todos.todos.find(
      (todo: ITodo) => todo.id === id
    );
    const data = await TodoService.toggle(id, todo);
    return data ? data : rejectWithValue("Can`t toggle status in todo");
  }
);
// Delete
const deleteTodo = createAsyncThunk<number, number, { rejectValue: string }>(
  "todos/deleteTodo",
  async function (id: number, { rejectWithValue }) {
    const data = await TodoService.delete(id);
    return data ? data : rejectWithValue("Can`t delete todo");
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(toggleTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleTodo.fulfilled, (state, action) => {
        state.loading = false;
        const todo = state.todos.find((todo) => todo.id === action.payload);
        if (todo != null) todo.completed = !todo.completed;
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Predicate function
function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

export { getTodos, addTodo, toggleTodo, deleteTodo };
export default todoSlice.reducer;
