<template>
  <div class="apollo-todos">
    <!-- Apollo watched Graphql query -->
    <ApolloQuery
      :query="require('../../graphql/getTodos.gql')"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <q-page v-if="loading" class="loading apollo">
          {{apolloLoadingSpinner()}}
        </q-page>

        <!-- Error -->
        <q-page v-else-if="error" class="error apollo">
          {{stopLoading()}}
          An error occured
        </q-page>

        <!-- Result -->
        <q-page padding v-else-if="data">
          {{stopLoading()}}
          <ToDoPage :Todos="data.Todos" />

        </q-page>

        <!-- No result -->
        <q-page v-else class="apollo-else">
          {{apolloLoadingSpinner()}}
        </q-page>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import ToDoPage from '@/components/ToDoPage.vue';

export default {
  name: 'apollo-todos',
  components: {
    ToDoPage,
  },
  methods: {
    apolloLoadingSpinner() {
      this.$q.loading.show({
        message: 'Waiting for response from server..',
        delay: 0,
      });
    },
    stopLoading() {
      this.$q.loading.hide();
    },
  },
};
</script>
