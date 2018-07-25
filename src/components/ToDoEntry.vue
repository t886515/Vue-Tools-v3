<template>
    <q-item class="q-pa-md">

      <q-item-side icon="check" v-if="todo.isComplete" />
      <q-item-main v-if="todo.isComplete" :label="todo.value" />

      <q-item-main v-if="!todo.isComplete">
        <q-checkbox v-model="selectedTodo" :val="todo.id" :label="todo.value"/>

        <NotesModal :displayNoteModal="displayNoteModal" :todo="todo" />

        <q-item>
          <q-item-tile>
          {{todo.notes}}
          </q-item-tile>
        </q-item>

      </q-item-main>
      <q-item-side>
        <q-btn round icon="list" @click="toggleTodoMenu">
          <q-popover anchor="bottom left" v-model="displayTodoMenu">
            <q-list @click="toggleTodoMenu">
              <q-item v-show="!todo.isComplete">
                <q-btn @click="toggleNoteModal">{{todo.notes === "" || todo.notes === undefined ? "Add Notes" : "Edit Notes"}}</q-btn>
              </q-item>

              <q-item v-show="!todo.isComplete">
                <q-btn @click="markTodoStatus(true)">Mark As Complete</q-btn>
              </q-item>

              <q-item v-show="todo.isComplete">
                <q-btn @click="markTodoStatus(false)">Mark As Incomplete</q-btn>
              </q-item>

              <q-item-separator/>

              <q-item>
                <q-btn @click="deleteTodo">Delete</q-btn>
              </q-item>

            </q-list>
          </q-popover>
        </q-btn>
      </q-item-side>
    </q-item>

</template>

<script>
import NotesModal from './NotesModal';
import updateTodoQuery from '@/graphql/updateTodo.gql';
import removeTodoQuery from '@/graphql/removeTodo.gql';
import getTodosQuery from '@/graphql/getTodos.gql';

export default {
  name: 'list-entry',
  components: {
    NotesModal,
  },
  data() {
    return {
      displayTodoMenu: false,
      displayNoteModal: false,
      notes: this.todo.notes,
      selectedTodo: false,
    };
  },
  props: {
    todo: {
      type: Object,
      default() {
        return { value: 'default', id: 0, isComplete: false };
      },
    },
    updateSelectedTodos: {
      type: Function,
    },
    toggleOffCheckboxes: {
      type: Boolean,
    },
    unSetSelectedTodos: {
      type: Function,
    },
  },
  methods: {
    toggleTodoMenu() {
      this.displayTodoMenu = !this.displayTodoMenu;
    },
    markTodoStatus(isComplete) {
      const { id } = this.todo;
      const input = {
        isComplete,
      };
      this.$apollo.mutate({
        mutation: updateTodoQuery,
        variables: { id, input },
        update: (store, { data }) => {
          this.selectedTodo = false;
          this.unSetSelectedTodos();
        },
      });
    },
    deleteTodo() {
      const { id } = this.todo;
      this.$apollo.mutate({
        mutation: removeTodoQuery,
        variables: { id },
        update: (store, { data }) => {
          const getTodoData = store.readQuery({ query: getTodosQuery });
          getTodoData.Todos = getTodoData.Todos.filter((todo) => {
            const _id = todo.id;
            return id !== _id;
          });
          store.writeQuery({ query: getTodosQuery, data: getTodoData });
          this.selectedTodo = false;
        },
      });
    },
    toggleNoteModal() {
      this.toggleTodoMenu();
      this.displayNoteModal = !this.displayNoteModal;
    },
  },
  watch: {
    selectedTodo(newSelectedTodo) {
      const { id } = this.todo;
      this.updateSelectedTodos(id);
    },
    toggleOffCheckboxes() {
      this.selectedTodo = false;
    },
  },
};
</script>
