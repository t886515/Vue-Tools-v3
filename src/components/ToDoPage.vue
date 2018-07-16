<template>
  <div class="flex flex-center">
    <q-card class="col-5 q-ma-lg">
      <CreateTodoForm />

      <q-list separator>

        <ListEntry v-for="todo in Todos" :todo="todo" :updateSelectedTodos="updateSelectedTodos" :removeTodo="removeTodo" :key="todo.id"/>
      </q-list>
      <!-- <ApolloMutation
        :mutation="createTodoQuery"
        :variables="newTodo"
        :update="updateTodoArray"
        @done="onDone"
        >
        <template slot-scope="{ mutate, loading, error }"> -->
      <q-card-actions align="center">
        <q-btn color="dark" round icon="check" @click="completeTodo(mutate)"><q-tooltip>Mark As Complete</q-tooltip></q-btn>
        <q-btn color="dark" round icon="delete" @click="removeTodo(mutate)"><q-tooltip>Remove Selected</q-tooltip></q-btn>
        <q-btn color="dark" round icon="delete sweep" @click="removeAllTodo"><q-tooltip>REMOVE ALL</q-tooltip></q-btn>
      </q-card-actions>
        <!-- </template>
      </ApolloMutation> -->
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
import CreateTodoForm from './CreateTodoForm';
import updateTodoQuery from '@/graphql/updateTodo.gql';
import removeTodoQuery from '@/graphql/removeTodo.gql';

export default {
  name: 'list',
  components: { ListEntry, PieChart, CreateTodoForm },
  data() {
    return {
      items: [],
      updateTodoQuery,
      removeTodoQuery,
      selectedTodos: [],
    };
  },
  props: ['Todos'],
  methods: {
    updateSelectedTodos(selectedTodo) {
      console.log(selectedTodo);
      const index = this.selectedTodos.indexOf(selectedTodo);
      !this.selectedTodos.includes(selectedTodo)
        ? this.selectedTodos.push(selectedTodo)
        : this.selectedTodos.splice(index, 1);
      // this.selectedTodos = selectedTodos;
      console.log(this.selectedTodos);
    },
    completeTodo(mutate) {
      // this.items.forEach((x, i) => {
      //   if (this.selectedItem.includes(x.id)) {
      //     this.items[i].isComplete = true;
      //   }
      // });
      // this.selectedItem = [];
    },
    removeTodo(mutate) {
      // for (const item of this.selectedItem) {
      //   dbRemoveToDo(item);
      // }
      // this.selectedItem = [];
    },
    removeAllTodo() {
      // prompt('Hi?')
      alert("You are going to remove all todo and you don't have a cancel button ^_^");
      dbRemoveAllTodo();
    },
  },
  computed: {},
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
