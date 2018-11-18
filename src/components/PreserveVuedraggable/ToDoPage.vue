<template>
  <div class="flex flex-center">
    <!-- <q-card class="col-5 q-ma-lg"> -->
    <q-card class="col-12">

      <CreateTodoForm :belongDateIndex="belongDateIndex"/>

      <q-card-main separator>
        <q-timeline color="secondary">
          <!-- <q-timeline-entry heading>
            Timeline Subject
          </q-timeline-entry> -->

          <q-timeline-entry
            v-for="(dateObject, index) in sortedTodos"
            :key="index"
            :subtitle="dateObject.date"
            side="right"
          >

        <!-- <div v-for="(dateObject, index) in sortedTodos" :key="index" > -->
          <!-- {{dateObject.date}} -->
          <draggable
            v-if="true"
            v-model="dateObject.todos"
            class="drag-area"
            :options="options"
            @change="onBelongDateChange"
            >
            <div v-for="todo in dateObject.todos">
              {{todo.value}}
            </div>

            <!-- <ListEntry
              v-for="todo in dateObject.todos"
              :date="dateObject.date"
              :key="todo.id"
              :todo="todo"
              :unSetSelectedTodos="unSetSelectedTodos"
              :toggleOffCheckboxes="toggleOffCheckboxes"
              :updateSelectedTodos="updateSelectedTodos"
              /> -->

          </draggable>

          <!-- <q-list v-if="false" separator>
          <ListEntry
            v-for="todo in dateObject.todos"
            :date="dateObject.date"
            :key="todo.id"
            :todo="todo"
            :unSetSelectedTodos="unSetSelectedTodos"
            :toggleOffCheckboxes="toggleOffCheckboxes"
            :updateSelectedTodos="updateSelectedTodos"
            />
          </q-list> -->

        <!-- </div> -->
            </q-timeline-entry>

        </q-timeline>

        <!-- <draggable
          v-model="draggableTodos"
          :value="Todos"
          :options="options"
          >
          {{sortTodoByCreateDate}}
          <ListEntry
            v-for="todo in draggableTodos"
            :key="todo.id"
            :todo="todo"
            :unSetSelectedTodos="unSetSelectedTodos"
            :toggleOffCheckboxes="toggleOffCheckboxes"
            :updateSelectedTodos="updateSelectedTodos"
            />

        </draggable> -->

      </q-card-main>


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

      </q-card-actions>
    </q-card>

    <!-- <q-card class="col-5 q-ma-lg text-center">
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
    </q-card> -->
  </div>
</template>

<script>
import updateTodoQuery from '@/graphql/updateTodo.gql';
import removeTodoQuery from '@/graphql/removeTodo.gql';
import getTodosQuery from '@/graphql/getTodos.gql';
import ListEntry from './ToDoEntry.vue';
import PieChart from './PieChart.vue';
import LineChart from './LineChart.vue';
import CreateTodoForm from './CreateTodoForm.vue';
import '../draggable/vuedraggable.js';

// TODO issue with

export default {
  name: 'list',
  components: {
    ListEntry,
    PieChart,
    CreateTodoForm,
    LineChart,
  },
  data() {
    return {
      selectedTodos: [],
      toggleOffCheckboxes: false,
      sortedTodos: [],
      options: {
        // chosenClass: 'choosen-item', // Class name for the chosen item
        // dragClass: 'choosen-item',
        // ghostClass: 'choosen-item',
        group: 'todo',
        // disabled: true,
      },
      belongDateIndex: null,
    };
  },
  props: ['Todos'],
  mounted() {
    this.sortTodoByCreateDate();
  },
  watch: {
    Todos() {
      this.sortTodoByCreateDate();
    },
  },
  methods: {
    onBelongDateChange(e) {
      // store the data of those "changed date"
      // for future uses

      // remember to collect this data from moved, added and removed

      // so all these changes are all temporary untill "saved"

      // TODO
      // onStartDrag - allow draggable

      // TODO
      // onSave - read from the "changed date",
      // take the dataObject datamodel to get the
      // dates that has the array, loop through array,
      // collect mutation request from those

      // do a bulk batchRequest
      // updateing apolloClient's cache
      const { removed, added, moved } = e;
      if (removed) {
        // console.log('do nothing');
      }
      if (added) {
        const { attributes, newIndex } = added;
      }
      if (moved) {
        // TODO once its moved to a new index, need to
        // also get all the todo item's
        // const { newIndex } = moved;
        // console.log('update just the belongDateIndex...');
      }
      // console.log(this.sortedTodos, '===in belongdatechange');
    },
    sortTodoByCreateDate() {
      // console.log(this.Todos);
      let firstItemToday = true;
      const dateObjects = this.Todos.reduce((acc, todo) => {
        const { _createDate } = todo;
        const date = new Date(_createDate);
        const justDate = date.toDateString();
        acc[justDate] ? acc[justDate] : (acc[justDate] = []);
        acc[justDate].push(todo);
        return acc;
      }, {});
      const reformatted = Object.keys(dateObjects).map((date) => {
        const todos = dateObjects[date];
        const today = new Date();
        const todayString = today.toDateString();
        if (todayString === date) {
          this.belongDateIndex = todos.length;
          firstItemToday = false;
        }
        return {
          date,
          todos,
        };
      });
      console.log(reformatted);
      firstItemToday && (this.belongDateIndex = 0);
      this.sortedTodos = reformatted;
    },
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
          .then((data) => {
            data;
          })
          .catch((error) => {
            // Error
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
  computed: {
    // sortTodoByCreateDate() {
    //   console.log(this.Todos);
    //
    //   const dateObjects = this.Todos.reduce((acc, todo) => {
    //     const { _createDate } = todo;
    //     const date = new Date(_createDate);
    //     const justDate = date.toDateString();
    //     acc[justDate] ? acc[justDate] : (acc[justDate] = []);
    //     acc[justDate].push(todo);
    //     return acc;
    //   }, {});
    //   const reformatted = Object.keys(dateObjects).map(date => {
    //     const todos = dateObjects[date];
    //     return {
    //       date,
    //       todos,
    //     };
    //   });
    //   return reformatted;
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.drag-area {
  min-height: 50px;
  min-width: 50px;
}
/* .to-do-card {
  width: 50%;
  display: inline-block;
}

.add-button {
  width: 45px;
  height: 45px;
} */
</style>
