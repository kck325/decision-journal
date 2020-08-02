<template>
  <amplify-authenticator>
  <div id="app">
      <h1>Decision Journal</h1>
      <b-container fluid>
        <b-row class="my-1">
          <b-col sm="9">
            <b-form-textarea v-model="decision" placeholder="Decision taken" rows="3"></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3"><b-form-select v-model="size" :options="decision_sizes"></b-form-select></b-col>
          <b-col sm="3"><b-form-datepicker v-model="checkDate" placeholder="date"></b-form-datepicker></b-col>
          <b-col sm="3"><b-button pill variant="success" v-on:click="createDecision">Create Decision</b-button></b-col>
        </b-row>
      </b-container>
    </div>
    <div>
      <b-table striped hover :items="decisions" :fields="headers">
      </b-table>
    </div>
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
      size: 'small',
      checkDate: '',
      decisions: [],
      headers: ["decision", "size", "checkDate", "deicsionScore"],
      decision_sizes: [
        { value: 'trivial', text: 'Trivial'},
        { value: 'small', text: 'Material'},
        { value: 'medium', text: 'Significant'},
        { value: 'large', text: 'Life changing'},
      ]
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
