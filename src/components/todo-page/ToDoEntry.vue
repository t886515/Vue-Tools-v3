<template>
    <q-item class="q-pa-md">

     <q-item-main>
        <q-item >
          <q-item-side v-if="!todo.isComplete">
            <q-checkbox v-model="selectedTodo" :val="todo.id"/>
          </q-item-side>
          <q-item-side v-if="todo.isComplete" icon="check" color="positive" />

          <q-item-main>
            <q-item-tile color="primary">
              <span @click="enableTodoTitleEditMode" v-if="!isEditMode" class="text-display-mod">{{todo.value}}</span>

              <q-input
                @blur="disableTodoTitleEditMode"
                v-if="isEditMode"
                autofocus
                v-model="todoTextHolder"
              />

            </q-item-tile>
          </q-item-main>
        </q-item>

        <q-item v-if="todo.notes">
          <q-item-tile color="dark">
            {{todo.notes}}
          </q-item-tile>
        </q-item>

     </q-item-main>

      <q-item-side right>
        <q-btn color="dark" round icon="list" @click="toggleTodoMenu">
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

      <NotesModal :displayNoteModal="displayNoteModal" :todo="todo" />


    </q-item>

</template>

<script>
import completeTodoQuery from '@/graphql/completeTodo.gql';
import removeTodoQuery from '@/graphql/removeTodo.gql';
import getTodosQuery from '@/graphql/getTodos.gql';
import NotesModal from './NotesModal.vue';

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
      todoTextHolder: '',
      isEditMode: false,
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
  mounted() {
    this.todoTextHolder = this.todo.value;
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
        mutation: completeTodoQuery,
        variables: { id, input },
        update: () => {
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
        update: (store) => {
          const getTodoData = store.readQuery({ query: getTodosQuery });
          getTodoData.Todos = getTodoData.Todos.filter((todo) => {
            const allTodosId = todo.id;
            return id !== allTodosId;
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
    enableTodoTitleEditMode() {
      console.log('on focus?');
      this.isEditMode = !this.isEditMode;
    },
    disableTodoTitleEditMode() {
      console.log('lose focus?');
      this.isEditMode = !this.isEditMode;
    },
  },
  watch: {
    selectedTodo() {
      const { id } = this.todo;
      this.updateSelectedTodos(id);
    },
    toggleOffCheckboxes() {
      this.selectedTodo = false;
    },
    todoTextHolder() {
      // send request to update local apollo store + send request to database.
    },
  },
};
</script>

<style>
.text-display-mod {
  overflow: hidden;
  word-wrap: break-word;
}
</style>
