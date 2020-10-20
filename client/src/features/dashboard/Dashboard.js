import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import { selectTodo, display, removeTodo, deleteTodo, getTodo, createTodo, addTodo, updateTodo } from "./todosSlice"
import axios from 'axios'
export  function Todos () {
  const todo = useSelector(selectTodo)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTodo(todo))
  }, [])
  const [inputText, setInputText] = useState("")
  function handleSubmit(e) {
    e.preventDefault()
    dispatch(addTodo(inputText))
    setInputText('')
  }
function handleDelete (item){
  dispatch(removeTodo(item.id))
}
function handleUpdate (id, status){
  dispatch(updateTodo({id, status}))
}
  return (
<div className="container">
      <form className="todo-form" onSubmit={handleSubmit}>
        <input
          onChange={(e) => setInputText(e.target.value)}
          className="todo-input"
          placeholder="Enter your todo here"
          value={inputText}
        ></input>
      </form>
      <div className="todo-labels-container">
        <div className="todo-description-label">Description</div>
        <div className="todo-status-label">Status</div>
      </div>
      {todo.map((item) => (
        <div className="todo-item-container" key={item.id} id={item.id}>
          <div className="todo-description">{item.description}</div>
          <div className="todo-status-container">
            <div className="todo-status" >{item.status}</div>
            <div className="todo-completed" onClick={() => handleUpdate(item.id, 'completed')}>Completed</div>
            <div className="todo-active"  onClick={() => handleUpdate(item.id, 'active')}>Active</div>
          </div>
          <button
            className="todo-delete-btn"
            onClick={() => handleDelete(item)}
          >
            x
          </button>
        </div>
      ))}
    </div>
  )
}