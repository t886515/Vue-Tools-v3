<template>
  <div class="flex flex-center">
    <q-card class="col-8 q-ma-lg round-edge" color="primary">

      <CreateTodoForm/>

      <q-card-separator />
      <div
        v-for="dateObject in sortTodoByDate"
        :key="dateObject.createDate"
        class="q-ma-lg bg-tertiary"
      >
        <q-item>{{dateObject.createDate}}</q-item>
        <q-card
          color="secondary"
        >
          <ListEntry
            v-for="todo in dateObject.todos"
            :key="todo.id"
            :date="todo.createDate"
            :todo="todo"
            :unSetSelectedTodos="unSetSelectedTodos"
            :toggleOffCheckboxes="toggleOffCheckboxes"
            :updateSelectedTodos="updateSelectedTodos"
          />
        </q-card>
      </div>


      <q-card-separator />

      <q-card-actions align="center" class="bg-secondary">
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
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import { date } from 'quasar';
import completeTodoQuery from '@/graphql/completeTodo.gql';
import removeTodoQuery from '@/graphql/removeTodo.gql';
import getTodosQuery from '@/graphql/getTodos.gql';
import ListEntry from './ToDoEntry.vue';
import CreateTodoForm from './CreateTodoForm.vue';

export default {
  name: 'list',
  components: {
    ListEntry,
    CreateTodoForm,
  },
  data() {
    return {
      selectedTodos: [],
      toggleOffCheckboxes: false,
    };
  },
  props: ['Todos'],
  mounted() {},
  watch: {},
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
            mutation: completeTodoQuery,
            // Parameters
            variables: { id, input },
            // Update the cache with the result
            // The query will be updated with the optimistic response
            // and then with the real result of the mutation

            // FIXME keeping data deconstruction as a reminder - the second param of mutation's update
            // is queryResult from the mutation query. data allows you access result.
            // eslint-disable-next-line
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
          .then((data) => {
            // TODO could do certain option once the mutation is finished
            // eslint-disable-next-line
            data;
          })
          .catch((error) => {
            // TODO could do certain option once the mutation failed
            // eslint-disable-next-line
            error;
            // console.error(error);
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
          update: (store) => {
            // if the last item in the selected todos is updated succesfully
            // this is assume mutation calls are fired synchronously...
            if (index === this.selectedTodos.length - 1) {
              const getTodoData = store.readQuery({ query: getTodosQuery });
              getTodoData.Todos = getTodoData.Todos.filter((todo) => {
                const allTodosId = todo.id;
                return !this.selectedTodos.includes(allTodosId);
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
  },
  computed: {
    // This function takes a list of todos, sort into objects that has a property of createDate and an array of todos
    // created under that createdDate.
    sortTodoByDate() {
      const sortIntoObjectsByDate = [];
      const hashDatePosition = [];
      this.Todos.forEach((todo) => {
        const { createDate } = todo;
        const formattedCreateDate = date.formatDate(createDate, 'MMM Do, YYYY');
        let indexInFinalArray;
        if (hashDatePosition.includes(formattedCreateDate)) {
          indexInFinalArray = hashDatePosition.indexOf(formattedCreateDate);
          sortIntoObjectsByDate[indexInFinalArray] &&
            sortIntoObjectsByDate[indexInFinalArray].todos &&
            sortIntoObjectsByDate[indexInFinalArray].todos.push(todo);
        } else {
          hashDatePosition.push(formattedCreateDate);
          indexInFinalArray = hashDatePosition.length - 1;
          sortIntoObjectsByDate[indexInFinalArray] = {
            createDate: formattedCreateDate,
            todos: [todo],
          };
        }
      });
      console.log(sortIntoObjectsByDate);
      return sortIntoObjectsByDate;

      // const sortedTodosObject = this.Todos.reduce((acc, todo) => {
      //   const { createDate } = todo;
      //   const formattedCreateDate = date.formatDate(createDate, 'MMM Do, YYYY');
      //   acc[formattedCreateDate]
      //     ? acc[formattedCreateDate].push(todo)
      //     : (acc[formattedCreateDate] = [todo]);
      //   return acc;
      // }, {});
      // console.log(sortedTodosObject);
      // return sortedTodosObject;
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

.round-edge {
  border-radius: 15px;
}
</style>
