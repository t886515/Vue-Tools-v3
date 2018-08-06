<template>
  <ApolloMutation
    :mutation="createTodoQuery"
    :variables="newTodo"
    :update="updateTodoArray"
    @done="onDone"
    >
    <template slot-scope="{ mutate, loading, error }">
      <q-modal v-if="error">
        An error occured: {{ error }}
        <q-btn label="Ok."/>
      </q-modal>

      <q-card-title>
        <q-input v-model="todoValue" @keyup.enter="mutate()" float-label="Enter A Todo">
          <q-btn round color="dark" icon="add" @click="mutate()">
            <q-tooltip >Add To-Do</q-tooltip>
          </q-btn>
        </q-input>
      </q-card-title>
    </template>
  </ApolloMutation>
</template>

<script>
/* eslint-disable import/no-extraneous-dependencies */
import getTodosQuery from '@/graphql/getTodos.gql';
import createTodoQuery from '@/graphql/createTodo.gql';
import { Notify } from 'quasar';

export default {
  name: 'create-todo-form',
  data() {
    return {
      todoValue: '',
      createTodoQuery,
    };
  },
  props: ['belongDateIndex'],
  methods: {
    onDone({ data: { createTodo } }) {
      const { value } = createTodo;
      Notify.create({
        message: `A Todo "${value}" is created. `,
        timeout: 1000,
        position: 'center',
      });
    },
    updateTodoArray(
      store,
      {
        data: { createTodo },
      },
    ) {
      // this update function allows me to update the store's result based on
      // the returned value from the mutation query.
      // and the update in store will re-render components that depends on the
      // updated value

      // this functions has 2 parameters - first one is the apollo's ProxyData
      // that has functions to interact with the store.
      // The second parameter is for the result retrieved from mutation query.

      // reading Query using getTodos query
      const getTodoData = store.readQuery({ query: getTodosQuery });
      // retrieve the array of Todos from store
      const { Todos } = getTodoData;
      // add the retrieved data to the data retrieved from reading store
      Todos.push(createTodo);
      // write the updated data to the store
      store.writeQuery({ query: getTodosQuery, data: getTodoData });

      this.todoValue = '';
    },
  },
  computed: {
    // This function create a valid todo object based on todo input value.
    newTodo() {
      console.log(this.belongDateIndex);
      return {
        input: {
          isComplete: false,
          notes: '',
          value: this.todoValue,
          belongDateIndex: this.belongDateIndex,
        },
      };
    },
  },
};
</script>
