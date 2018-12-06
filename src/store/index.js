import Vue from 'vue';
import Vuex from 'vuex';
import { stat } from 'fs';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    questions:[],
    section: [],

  },
  actions: {
    addQuestions(context, data){
        // console.log('Updating questions in vuex');
        context.commit('updateQuestions', data);
    },
    addSection(context, data){
        // console.log('Updating section in vuex');
        context.commit('updateSection', data);
    },
  },
  mutations: {
    updateQuestions: function(state, data){
        // console.log('Mutating vuex state');
        state.questions.splice(0);
        for(var i=0; i<data.length; i++)
        state.questions.push(data[i]);
        // console.log("store",state.questions);
    },
    updateSection: function(state, data){
        // console.log('Mutating vuex state');
        state.section.splice(0);
        state.section.push(data);
    },
 }
});
export default store;
