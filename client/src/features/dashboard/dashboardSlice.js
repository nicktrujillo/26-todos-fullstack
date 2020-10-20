import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    todos: [],
  },
  reducers: {
    display: (state, action) => {
      state.todo = action.payload;
    },
  },
});

export const { display } = dashboardSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getTodo = () => (dispatch) => {
    axios.get("/api/todos").then((r) => dispatch(display(r.data)))
  }
  export const addTodo = (obj) => (dispatch) => {
    axios.post('/api/todos', {description: obj} ).then((r) => {dispatch(getTodo())})
  }
  export const removeTodo = (id) => (dispatch) => {
    axios.delete('/api/todos/' + id).then((r) => {
      dispatch(getTodo())
    })
  }
  export const updateTodo = (obj) => (dispatch) => {
    axios.patch('/api/todos/' + obj.id, {status: obj.status} ).then((r) => {dispatch(getTodo())})
  }
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectTodos = state => state.dashboard.todos;

export default dashboardSlice.reducer;