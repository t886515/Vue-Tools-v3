<template>
  <div class="flex flex-center">
    <q-card class="col-5 q-ma-lg">

      <CreateTodoForm />

      <q-list separator>
        <ListEntry
          v-for="todo in Todos"
          :key="todo.id"
          :todo="todo"
          :unSetSelectedTodos="unSetSelectedTodos"
          :toggleOffCheckboxes="toggleOffCheckboxes"
          :updateSelectedTodos="updateSelectedTodos"
          />
      </q-list>

      <q-card-actions align="center">
        <q-btn
          color="dark"
          round
          icon="check"
          @click="completeTodo"
          >
          <q-tooltip>Mark As Complete</q-tooltip>
        </q-btn>

        <q-btn
          color="dark"
          round
          icon="delete"
          @click="removeTodo">
          <q-tooltip>Remove Selected</q-tooltip>
        </q-btn>
        <!-- <q-btn color="dark" round icon="delete sweep" @click="removeAllTodo"><q-tooltip>REMOVE ALL</q-tooltip></q-btn> -->
      </q-card-actions>
    </q-card>

    <q-card class="col-5 q-ma-lg text-center">
      <q-card-title>
        Todo's finish rates
      </q-card-title>

      <q-card-main>
        <PieChart :Todos="Todos" class="q-ma-lg"/>
      </q-card-main>
    </q-card>
    <q-card class="col-12 q-ma-lg text-center">
      <q-card-title>
        Todo's line chart
      </q-card-title>

      <q-card-main>
        <LineChart :Todos="Todos" class="q-ma-lg"/>
      </q-card-main>
    </q-card>
  </div>
</template>

<script>
import ListEntry from './ToDoEntry';
import PieChart from './PieChart';
import LineChart from './LineChart';
import CreateTodoForm from './CreateTodoForm';
import updateTodoQuery from '@/graphql/updateTodo.gql';
import removeTodoQuery from '@/graphql/removeTodo.gql';
import getTodosQuery from '@/graphql/getTodos.gql';

export default {
  name: 'list',
  components: {
    ListEntry, PieChart, CreateTodoForm, LineChart,
  },
  data() {
    return {
      selectedTodos: [],
      toggleOffCheckboxes: false,
    };
  },
  props: ['Todos'],
  methods: {
    unSetSelectedTodos() {
      this.selectedTodos = [];
    },
    updateSelectedTodos(selectedTodo) {
      const index = this.selectedTodos.indexOf(selectedTodo);
      !this.selectedTodos.includes(selectedTodo)
        ? this.selectedTodos.push(selectedTodo)
        : this.selectedTodos.splice(index, 1);
    },
    completeTodo() {
      this.selectedTodos.forEach((id, index) => {
        const input = { isComplete: true };
        this.$apollo
          .mutate({
            // Query
            mutation: updateTodoQuery,
            // Parameters
            variables: { id, input },
            // Update the cache with the result
            // The query will be updated with the optimistic response
            // and then with the real result of the mutation
            update: (store, { data }) => {
              if (index === this.selectedTodos.length - 1) {
                this.unSetSelectedTodos();
                this.toggleOffCheckboxes = !this.toggleOffCheckboxes;
              }

              // Read the data from our cache for this query.
              // const data = store.readQuery({ query: TAGS_QUERY });
              // // Add our tag from the mutation to the end
              // data.tags.push(newTag);
              // // Write our data back to the cache.
              // store.writeQuery({ query: TAGS_QUERY, data });
            },
            // Optimistic UI
            // Will be treated as a 'fake' result as soon as the request is made
            // so that the UI can react quickly and the user be happy
            // optimisticResponse: {
            //   __typename: 'Mutation',
            //   addTag: {
            //     __typename: 'Tag',
            //     id: -1,
            //     label: newTag,
            //   },
            // },
          })
          .then((data) => {})
          .catch((error) => {
            // Error
            console.error(error);
            // We restore the initial user input
            // this.newTag = newTag;
          });
      });
    },
    removeTodo() {
      this.selectedTodos.forEach((todoID, index) => {
        const id = todoID;
        this.$apollo.mutate({
          mutation: removeTodoQuery,
          variables: { id },
          update: (store, { data }) => {
            // if the last item in the selected todos is updated succesfully
            // this is assume mutation calls are fired synchronously...
            if (index === this.selectedTodos.length - 1) {
              const getTodoData = store.readQuery({ query: getTodosQuery });
              getTodoData.Todos = getTodoData.Todos.filter((todo) => {
                const _id = todo.id;
                return !this.selectedTodos.includes(_id);
              });
              store.writeQuery({ query: getTodosQuery, data: getTodoData });
              this.unSetSelectedTodos();
              this.toggleOffCheckboxes = !this.toggleOffCheckboxes;
            }
            //
          },
        });
      });
    },
    // removeAllTodo() {
    //   alert("You are going to remove all todo and you don't have a cancel button ^_^");
    // },
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
