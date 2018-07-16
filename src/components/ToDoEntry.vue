<template>
    <q-item class="q-pa-md">

      <q-item-side icon="check" v-if="todo.isComplete" />
      <q-item-main v-if="todo.isComplete" :label="todo.value" />

      <q-item-main v-if="!todo.isComplete">
        <!-- <q-checkbox v-model="selectedItems" @click.native="onCheckBoxClickTest" :val="todo.id" :label="todo.value"/> -->
        <q-checkbox v-model="selectedTodo" :val="todo.id" :label="todo.value"/>

        <NotesModal :displayNoteModal="displayNoteModal" :todo="todo" />

        <div class="notes">
          {{todo.notes}}
        </div>

      </q-item-main>
      <q-item-side>
        <q-btn round icon="list" @click="toggleTodoMenu">
          <q-popover anchor="bottom left" v-model="displayTodoMenu">
            <q-list @click="toggleTodoMenu">
              <q-item v-show="!todo.isComplete">
                <q-btn @click="toggleNoteModal">{{todo.notes === "" || todo.notes === undefined ? "Add Notes" : "Edit Notes"}}</q-btn>
              </q-item>
              <q-item v-show="!todo.isComplete">
                <q-btn @click="selectTodoAction">Mark As Complete</q-btn>
              </q-item>
              <q-item v-show="todo.isComplete">
                <q-btn @click="selectTodoAction">Mark As Incomplete</q-btn>
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
    // selectedItem: {
    //   type: Array,
    // },
    updateSelectedTodos: {
      type: Function,
    },
    removeTodo: {
      type: Function,
    },
  },
  methods: {
    // onCheckBoxClickTest() {
    //   updateSelectedTodos();
    //   // console.log(this.selectedItem)
    //   // console.log(this.selectedItem[0])
    //   // console.log(this.todo.id)
    // },
    toggleTodoMenu() {
      this.displayTodoMenu = !this.displayTodoMenu;
    },
    selectTodoAction() {
      this.todo.isComplete = !this.todo.isComplete;
    },
    deleteTodo(el, x) {
      this.removeTodo(el, x);
    },
    toggleNoteModal(el) {
      this.toggleTodoMenu();
      this.displayNoteModal = !this.displayNoteModal;
    },
  },
  watch: {
    selectedTodo(newSelectedTodo) {
      // console.log(newSelectedTodo);
      // console.log(this.selectedTodo);
      const { id } = this.todo;
      console.log(id);
      this.updateSelectedTodos(id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notes {
  color: gray;
  padding: 15px;
}
</style>
