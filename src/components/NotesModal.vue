<template>
  <q-modal v-model="noteModalState" @keyup.esc.native="cancel" :content-css="css" >
    <ApolloMutation
    :mutation="require('@/graphql/updateTodo.gql')"
    :variables="newTodo"
    :update="updateTodoNotes"
    @done="doneUpdateTodoNotes"
    >
      <template slot-scope="{ mutate, loading, error }">
        <h4>Notes for "{{todo.value}}"</h4>
        <q-item-separator />
          <q-input type="textarea" v-model="notes" :placeholder="notes" @keyup.enter="mutate" />
        <q-btn round icon="save" @click="mutate"><q-tooltip anchor="bottom middle" self="top middle">Add Notes</q-tooltip></q-btn>
        <q-btn round icon="cancel" @click="cancel"><q-tooltip anchor="bottom middle" self="top middle">Cancel</q-tooltip></q-btn>
      </template>
    </ApolloMutation>
  </q-modal>
</template>

<script>
import getTodos from '@/graphql/getTodos.gql';

export default {
  name: 'list-entry',
  data() {
    return {
      notes: this.todo.notes,
      css: {
        padding: '30px',
        'text-align': 'center',
      },
      noteModalState: false,
    };
  },
  props: {
    displayNoteModal: {
      type: Boolean,
    },
    todo: {
      type: Object,
    },
  },
  methods: {
    toggleNoteModal() {
      this.noteModalState = !this.noteModalState;
    },
    cancel() {
      const alertObj = {
        title: 'Warning',
        message: 'You are quitting without saving your notes!',
        ok: true,
        cancel: true,
      };
      this.$q.dialog(alertObj).then(() => {
        this.toggleNoteModal();
      });
    },
    updateTodoNotes(
      proxy,
      {
        data: { updateTodo },
      },
    ) {
      console.log(updateTodo);
      // const getTodoData = proxy.readQuery({ query: getTodos });
      // const { Todos } = getTodoData;
      // console.log(Todos);
      // // Todos.push(updateTodo);
      // proxy.writeQuery({ query: getTodos, data: getTodoData });
    },
    doneUpdateTodoNotes() {
      this.toggleNoteModal();
    },
  },
  computed: {
    newTodo() {
      return {
        id: this.todo.id,
        input: {
          notes: this.notes,
          value: this.todo.value,
          isComplete: this.todo.isComplete,
        },
      };
    },
  },
  watch: {
    displayNoteModal() {
      this.noteModalState = !this.noteModalState;
    },
  },
};
</script>
