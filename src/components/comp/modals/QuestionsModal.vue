<template>
<b-container>
    <b-modal id="questionsModal"
    hide-header
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    size="lg"
    centered
    v-model="showQuestionsModal">
        <b-container fluid style="padding:0 0 0 0;margin-top:-15px;">
            <b-row>
               <b-col style="background: #4285f4;">
                  <span style="font-size:15px;font-weight:bold;color:white;">Questions</span>
                <button type="button" class="close" @click="showQuestionsModal=false" aria-label="Close" style="margin-left:25px;margin-top:0px;" float-right>
                    <span aria-hidden="true">&times;</span>
                </button>
                </b-col>
            </b-row>
            <b-row>
               <b-col style="margin-top:30px;">
                 <span style="font-size:25px;color: rgb(47, 114, 183);">{{title}}</span>
                </b-col>
            </b-row>
            <b-container fluid style="overflow:auto;height:750px;margin-top:35px;">
            <b-row class="p-2" style="font-size:20px;" v-for="(question, index) in question" v-bind:key="index">
              <b-col>
              {{index+1}}.
              <span v-html="question.question!=null?question.question.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation):''" >

              </span>
              <!-- {{question.question}} -->
              <hr>
              </b-col>
            </b-row>
            </b-container>
        </b-container>
    </b-modal>
</b-container>
</template>
<script>
export default {
    name: 'QuestionsModal',
  props:['title','question'],
    components:{

    },
    data: function(){
        return{
            showQuestionsModal: false,
        }
    },
    methods:{

    },
};
</script>
<style>
</style>



