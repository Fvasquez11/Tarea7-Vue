<script>
import { useToDoerStore } from "@/stores/ToDoerStore";

export default {
  setup() {
    const toDoerStore = useToDoerStore();
    return {
      toDoerStore,
    };
  },

  data() {
    return {
      hovered: false,
      collapseButton: ">"
    };
  },

  methods: {
    handleHover(todo, hover) {
      this.toDoerStore.handleHover(todo, hover)
    },
    changeButton() {
      if(this.collapseButton == ">") {
        this.collapseButton = "v"
      }
      else {
        this.collapseButton = ">"
      }
    }
  },
};
</script>

<template>
  <div class="ToDoerContainer">
    <div class="Tittle"><h1>ToDoer</h1></div>
    <div class="Form">
      <b-form class="B-Form" @submit.prevent="this.toDoerStore.addTodo">
        <b-form-row>
          <b-col cols="10"><b-form-input v-model="this.toDoerStore.newTodo" placeholder="¿Qué quieres hacer hoy?..."></b-form-input ></b-col>
          <b-col cols="1"><b-button type="submit" variant="outline-primary">+</b-button></b-col>
        </b-form-row>
      </b-form>
    </div>
    <br/>
    <div class="Uncompleted">
      <ul>
        <li class="TodoItem" @mouseleave="handleHover(todo, false)" @mouseover="handleHover(todo, true)" v-for="todo in this.toDoerStore.todos" :key="todo.id">
          <b-form-textarea no-resize rows="1" plaintext :modelValue="todo.text"></b-form-textarea>
          <b-button v-if="todo.hover" @click="this.toDoerStore.completeTodo(todo)">✓</b-button>
          <b-button v-if="todo.hover" v-b-modal.modal-1>X</b-button>

          <b-modal id="modal-1" title="Adventencia" @ok="this.toDoerStore.removeTodo(todo)">
            <p class="my-4">¿Está seguto que quiere eliminar este item?</p>
          </b-modal>
        </li>
      </ul>
    </div>
    <div class="Completed">
      <b-button v-b-toggle.collapse-1 variant="outlined" @click="changeButton">{{ this.collapseButton }} Completadas</b-button>
      <b-collapse id="collapse-1">
        <ul>
        <li class="TodoItem" @mouseleave="handleHover(todo, false)" @mouseover="handleHover(todo, true)" v-for="todo in this.toDoerStore.completedTodos" :key="todo.id">
          <b-form-textarea no-resize rows="1" plaintext :modelValue="todo.text"></b-form-textarea>
          <b-button v-if="todo.hover" @click="this.toDoerStore.uncompleteTodo(todo)">↑</b-button>
          <b-button v-if="todo.hover" v-b-modal.modal-2>X</b-button>

          <b-modal id="modal-2" title="Warning" @ok="this.toDoerStore.removeCompletedTodo(todo)">
            <p class="my-4">¿Está seguto que quiere eliminar este item?</p>
          </b-modal>
        </li>
      </ul>
      </b-collapse>
    </div>
  </div>
</template>

<style>
.ToDoerContainer {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
}
.Tittle {
  padding: 5%;
}
.Form {
  width: 25%;
  /* border: solid; */
}
.Uncompleted {
  width: 25%;
  align-items: left;
}
.TodoItem {
  display: grid;
  grid-template-columns: 65% 15% 15%;
  border: solid;
  border-radius: 15px;
  border-color: rgba(0, 0, 0, 0.13);
  border-width: 2px;
}
.Completed {
  width: 25%;
  align-items: left;
}
</style>
