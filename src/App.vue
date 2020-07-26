<template>
  <amplify-authenticator>
  <div id="app">
      <h1>Decision Journal</h1>
      <input type="text" v-model="decision" placeholder="Decision taken">
      <input type="text" v-model="size" placeholder="medium">
      <input type="date" v-model="checkDate" placeholder="date">
      <button v-on:click="createDecision">Create Decision</button>
    </div>
    <ul v-for="decision in decisions" :key="decision.id">
      <li>{{ decision.decision}}</li>
    </ul>
    <amplify-sign-out></amplify-sign-out>
  </amplify-authenticator>
</template>

<script>
import { API } from 'aws-amplify';
import { createDecision } from './graphql/mutations';
import { listDecisions } from './graphql/queries';
import { onCreateDecision } from './graphql/subscriptions';

export default {
  name: 'app',
  async created() {
    this.getDecisions();
    this.subscribe();
  },
  data() {
    return {
      decision: '',
      size: '',
      checkDate: '',
      decisions: []
    }
  },
  methods: {
    async createDecision() {
      const {decision, size, checkDate} = this;
      if (!decision || !size) return;
      const decisionTaken = {decision, size, checkDate};
      this.decisions = [...this.decisions, decisionTaken];
      await API.graphql({
        query: createDecision,
        variables: {input: decision},
      });
      this.decision = '';
      this.size = '';
      this.checkDate = '';
    },
    async getDecisions() {
      const decisions = await API.graphql({
        query: listDecisions
      });
      this.decisions = decisions.data.listDecisions.items;
    },
    subscribe() {
      API.graphhql({ query: onCreateDecision })
        .subscribe({
          next: (eventData) => {
            let decision = eventData.value.data.onCreateDecision;
            if (this.decisions.some(d => d.decision === decision.decision)) return;
            this.decisions = [...this.decisions, decision];
          }
        });
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
