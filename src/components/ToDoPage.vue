<template>
  <div class="flex flex-center">
    <q-card class="col-5 q-ma-lg">
      <q-card-title>
          <q-input v-model="addTodoValue" @keyup.enter="addTodo" type="textarea" float-label="Enter A Todo"><q-btn round class="add-button" icon="add" @click="addTodo"><q-tooltip >Add To-Do</q-tooltip></q-btn></q-input>
      </q-card-title>
      <q-list separator>

        <ListEntry v-for="todo in Todos" :todo="todo" :selectedItem="selectedItem" :removeTodo="removeTodo" :key="todo.id"/>
      </q-list>
      <q-card-actions align="center">
        <q-btn color="dark" round icon="check" @click="completeTodo"><q-tooltip>Mark As Complete</q-tooltip></q-btn>
        <q-btn color="dark" round icon="delete" @click="removeTodo"><q-tooltip>Remove Selected</q-tooltip></q-btn>
        <q-btn color="dark" round icon="delete sweep" @click="removeAllTodo"><q-tooltip>REMOVE ALL</q-tooltip></q-btn>
      </q-card-actions>
    </q-card>

    <q-card class="col-5 q-ma-lg text-center">
      <q-card-title>
        Todo's finish rates
      </q-card-title>

      <q-card-main>
        <PieChart class="q-ma-lg"/>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import ListEntry from './ToDoEntry';
import PieChart from './PieChart';

export default {
  name: 'list',
  components: { ListEntry, PieChart },
  data() {
    return {
      items: [
        {
          value: 'Make a to do list',
          id: 1,
          isComplete: false,
          notes:
            'Something that looks right Something that looks right Something that looks right Something that looks right',
        },
        { value: 'Do leetcode', id: 2, isComplete: false },
        { value: 'Sleep', id: 3, isComplete: false },
      ],
      selectedItem: [],
      addTodoValue: '',
    };
  },
  props: ['Todos'],
  methods: {
    addTodo(event) {
      if (this.addTodoValue.trim() === '') {
        alert('Please Enter Some Values');
        return;
      }
      dbAddToDo(this.addTodoValue, false, '');
      this.addTodoValue = '';
    },
    completeTodo(event) {
      this.items.forEach((x, i) => {
        if (this.selectedItem.includes(x.id)) {
          this.items[i].isComplete = true;
        }
      });
      this.selectedItem = [];
    },
    removeTodo(event, x) {
      for (const item of this.selectedItem) {
        dbRemoveToDo(item);
      }
      this.selectedItem = [];
    },
    removeAllTodo() {
      // prompt('Hi?')
      alert("You are going to remove all todo and you don't have a cancel button ^_^");
      dbRemoveAllTodo();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* .to-do-card {
  width: 50%;
  display: inline-block;
}

.add-button {
  width: 45px;
  height: 45px;
} */
</style>
