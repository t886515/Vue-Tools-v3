<!-- <template>
  <div class="flex flex-center">
      {{dateObject.date}}
      <draggable
        v-model="newTodos"
        :value="newTodos"
        :options="options"
        >
        <ListEntry
          v-for="todo in newTodos"
          :key="todo.id"
          :todo="todo"
          :unSetSelectedTodos="unSetSelectedTodos"
          :toggleOffCheckboxes="toggleOffCheckboxes"
          :updateSelectedTodos="updateSelectedTodos"
          />

      </draggable>

  </div>
</template>

<script>
import ListEntry from './ToDoEntry.vue';

import draggable from '../draggable/vuedraggable.js';

export default {
  name: 'time-entry',
  components: {
    ListEntry,
  },
  data() {
    return {};
  },
  props: ['dateObject'],
  updated() {
    console.log(this.tempTodos);
  },
  computed: {

  },
};
</script> -->
