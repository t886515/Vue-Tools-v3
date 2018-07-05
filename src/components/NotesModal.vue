<template>
  <q-modal @keyup.esc.native="cancel" :content-css="css" class="noteModal">
    <h4>Notes for "{{todo.value}}"</h4>
    <q-item-separator />
      <q-input type="textarea" v-model="notes" :placeholder="notes" @keyup.enter="saveNotes" />
    <q-btn round icon="save" @click="saveNotes"><q-tooltip anchor="bottom middle" self="top middle">Add Notes</q-tooltip></q-btn>
    <q-btn round icon="cancel" @click="cancel"><q-tooltip anchor="bottom middle" self="top middle">Cancel</q-tooltip></q-btn>
  </q-modal>
</template>

<script>
export default {
  name: 'list-entry',
  data() {
    return {
      notes: this.todo.notes,
      css: {
        padding: '30px',
        'text-align': 'center',
      },
    };
  },
  props: {
    displayNoteModal: {
      type: Boolean,
    },
    todo: {
      type: Object,
    },
    toggleNoteModal: {
      type: Function,
    },
  },
  methods: {
    saveNotes() {
      addNote(this.todo.id, this.notes);
      this.toggleNoteModal();
    },
    cancel() {
      alert('You are going to exit without saving!');
      this.notes = '';
      this.toggleNoteModal();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
