import { defineStore } from 'pinia'

export const useToDoerStore = defineStore('useToDoerStore', {
  state: () => {
    return {
      id: 2,
      todos:  [
        {id: 1, text: 'Comprar Pan', hover: false},
        {id: 2, text: 'Cocinar', hover: false},
      ],
      completedTodos: [],
    }
  },

  actions: {
    addTodo() {
      this.todos.push({ id: this.id++, text: this.newTodo })
      this.newTodo = ''
    },
    removeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
    },
    completeTodo(todo) {
      this.todos = this.todos.filter((t) => t !== todo)
      this.completedTodos.push(todo)
    },
    removeCompletedTodo(todo) {
      this.completedTodos = this.completedTodos.filter((t) => t !== todo)
    },
    uncompleteTodo(todo) {
      this.completedTodos = this.completedTodos.filter((t) => t !== todo)
      this.todos.push(todo)
    },
    handleHover(todo, hover) {
      if (this.todos.indexOf(todo) != -1) {
        this.todos[this.todos.indexOf(todo)].hover = hover
      }
      else {
        this.completedTodos[this.todos.indexOf(todo)].hover = hover
      }
    }
  }
})
