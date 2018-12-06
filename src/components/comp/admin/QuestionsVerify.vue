<template>
<div style="background-color:#eeee; ">
  <main-header :currentUser="currentUser"></main-header>
  <sub-header :items="subMenu"></sub-header>
  <bread-crumb :items="crumbItems"></bread-crumb>
   <!-- <b-container v-if="test!=null" style="background-color:white;">
     <b-row v-for="(q, index) in test[0]" v-bind:key="index">
       <b-col>
           <b-card no-body class="mb-1" style="background-color:#9ee1f7;">
              <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-container fluid block href="#"  style="background-color:#9ee1f7;color:black; padding:10px 10px 10px 10px;cursor:pointer;">
                    <b-row v-b-toggle="'question1'+sindex+''+q.questionNumber">
                      <b-col  class="">
                        <div class="d-flex jusitfy-content-start">
                        {{q.questionNumber}})&nbsp;&nbsp;&nbsp;&nbsp;<div v-html="q.question.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                        </div>
                      </b-col>
                      <div class="pull-right" style="padding:0 12px 0 0;">
                        <b-btn class="edit-btn btn-sm" @click="editQuestion(sindex, q)"><i class="fa fa-pencil" aria-hidden="true"></i></b-btn>
                        <b-btn class="close-btn btn-sm" @click="deleteQuestion(sindex, q)"><i class="fa fa-close" aria-hidden="true"></i></b-btn>
                      </div>
                    </b-row>
                  </b-container>
              </b-card-header>
           </b-card>
       </b-col>
     </b-row>
   </b-container> -->
   <b-container v-if="questions!=null" style="margin-top:15px;border:1px solid #eeee;background-color:#EEEEEE;height:400px;  overflow: hidden; overflow-y: scroll;">
     <div v-for="(q, sindex) in questions" v-bind:key="sindex">
     <b-row >
       <b-col>
            <b-card no-body class="mb-1" style="background-color:#9ee1f7;">
              <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-container fluid block href="#"  style="background-color:#9ee1f7;color:black; padding:10px 10px 10px 10px;cursor:pointer;">
                    <b-row v-b-toggle="'question1'+sindex+''+q.questionNumber">
                      <b-col  class="">
                        <div class="d-flex jusitfy-content-start">
                        {{q.questionNumber}})&nbsp;&nbsp;&nbsp;&nbsp;<div v-html="q.question.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                        </div>
                      </b-col>
                      <div class="pull-right" style="padding:0 12px 0 0;">
                        <b-btn class="edit-btn btn-sm" @click="editQuestion(sindex, q)"><i class="fa fa-pencil" aria-hidden="true"></i></b-btn>
                        <b-btn class="close-btn btn-sm" @click="deleteQuestion(sindex, q)"><i class="fa fa-close" aria-hidden="true"></i></b-btn>
                      </div>
                    </b-row>
                  </b-container>
              </b-card-header>
          <b-collapse :id="'question1'+sindex+''+q.questionNumber"  accordion="my-accordion" role="tabpanel">
            <b-card-body style="background-color:#eeeeee;">
              <table class="table" >
                <thead>
                    <tr>
                    </tr>
                </thead>
              <tbody>
                  <tr>
                    <td class="text-nowrap" style="font-weight:bold;">Options</td>
                    <td>
                      <b-row v-for="(a, a_index) in q.answers" v-bind:key="a_index">
                        {{a.answerNumber}})&nbsp;<div v-html="a.answer.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                      </b-row>
                      </td>
                  </tr>
                  <tr>
                    <td class="text-nowrap" style="font-weight:bold;">Correct Answer :</td>
                    <td>
                      <b-row v-if="q.correctAnswer!=null">
                          {{q.correctAnswer.answerNumber}})&nbsp;<div v-html="q.correctAnswer.answer.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                      </b-row>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-nowrap" style="font-weight:bold;">Solution:</td>
                    <td>
                      <b-row v-if="q.solution!=null">
                          <div v-html="q.solution.description"></div>
                      </b-row>
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-card-body>
          </b-collapse>
        </b-card>
       </b-col>
     </b-row>
     </div>
     <b-modal
    hide-header
    hide-footer
    no-close-on-esc
    centered
    size="lg"
    ref="editQuestionModal">
        <b-container fluid style="padding:0 0 0 0;margin-top:-15px;">
            <b-container fluid style="overflow:auto;">
              <b-col v-if="question!=null" >
                <b-table :items="question" stacked :fields="['question', 'answers', 'correctAnswer', 'solution']" style="marigin-top: 100px;">
                  <template slot="question" slot-scope="data">
                    <div class="row">
                    <editor :id="'qn'+data.item.questionNumber" :target="'qn'+data.item.questionNumber" :html="data.item.questionNumber" v-model="data.item.questionNumber" />)&nbsp;
                    <editor :id="'q'+data.item.questionNumber" :target="'q'+data.item.questionNumber" :html="data.item.question.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)" v-model="data.item.question" />
                    </div>
                  </template>
                  <template slot="answers" slot-scope="data">
                    <div class="row row-container" contenteditable="true" v-for="(a, aindex) in data.item.answers" v-bind:key="aindex" :id="'ca'+data.item.questionNumber+aindex">
                          <editor :id="'an'+data.item.questionNumber+aindex" :target="'an'+data.item.questionNumber+aindex" :html="a.answerNumber" v-model="a.answerNumber" />)&nbsp;
                          <editor :id="'a'+data.item.questionNumber+aindex" :target="'a'+data.item.questionNumber+aindex" :html="a.answer.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)" v-model="a.answer" />
                     <b-popover :target="'ca'+data.item.questionNumber+aindex" triggers="focus">
                        <div>
                          <i class="fa fa-plus" style="color: green" @click="add(data.item, aindex)" v-b-tooltip.hover title="Add new answser"></i>
                          <i class="fa fa-trash" style="color: red" @click="trash(data.item, aindex)" v-b-tooltip.hover title="Delete this answser"></i>
                          <i class="fa fa-check" style="color: purple" @click="check(data.item, aindex)" v-b-tooltip.hover title="Mark as Correct answser"></i>
                        </div>
                        </b-popover>
                    </div>
                  </template>
                  <template slot="correctAnswer" slot-scope="data">
                    <div v-if="data.item.correctAnswer!=null">
                    {{data.item.correctAnswer.answerNumber}}) <div v-html="data.item.correctAnswer.answer.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                    </div>
                  </template>
                </b-table>
              </b-col>
            </b-container>
        </b-container>
        <hr>
        <b-container>
          <b-row>
            <b-col>

        <div class="d-flex justify-content-between">
          <div>
            <span class="fa fa-info" style="color: red">&nbsp;Click the contents to edit contents</span><br>
          </div>
          <button class="btn btn-info" @click="$refs.editQuestionModal.hide()">Close</button>
        </div>
            </b-col>
          </b-row>
        </b-container>
    </b-modal>
     <b-modal
    hide-header
    hide-footer=""
    no-close-on-esc
    centered
    size="lg"
    ref="wysiwygEditor">
      <b-container>
        <b-row>
          <b-col>
        <!-- <vue-editor v-model="wysiwygContent" :editor-toolbar="[[{ 'list': 'ordered'}, { 'list': 'bullet' }],['image', 'formula'],['clean']]" />            -->
            <wysiwyg v-model="wysiwygContent" />
          </b-col>
        </b-row>
      <hr>
      <b-row>
        <b-col>
          <b-button @click="$refs.wysiwygEditor.hide()">Cancel</b-button>
          <b-button @click="handleEditorOk">Ok</b-button>
        </b-col>
      </b-row>
      </b-container>
  </b-modal>
   </b-container>
  <loader v-if="isLoading"></loader>
</div>
</template>
<script>
import Global from "@/service/Global";
import LabelEdit from "label-edit";
import MainHeader from "@/components/comp/MainHeader";
import SubHeader from "@/components/comp/admin/SubHeader";
import BreadCrumb from "@/components/comp/admin/BreadCrumb";
import Loader from "@/components/comp/Loader";
import Editable from "@/components/comp/Editable";
import swal from "sweetalert2";
const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});

export default {
  name: "CustomTest",
  props: ["testId","items"],
  components: {
    MainHeader,
    SubHeader,
    BreadCrumb,
    LabelEdit,
    Loader,
    Editable,
    Editor: {
      props: ["id", "target", "html"],
      watch: {
        html: function(value) {
          this.content = value;
        }
      },

      data() {
        return {
          content: this.html,
          popoverShow: false,
          editorOptions: {
            hideModules: {
              bold: true,
              italic: true,
              underline: true,
              justifyLeft: false,
              justifyCenter: false,
              justifyRight: true,
              headings: true,
              link: true,
              code: false,
              orderedList: false,
              unorderedList: false,
              image: false,
              table: false,
              removeFormat: false,
              separator: true
            }
            // maxHeight: "500px",
          }
        };
      },
      methods: {
        onOk: function() {
          this.$emit("input", this.content);
          this.popoverShow = false;
        }
      },
      template: `
                       <div :id="id" class="content-container">
                        <div class="" v-html="html"></div>
                        <b-popover :target="target" triggers="click"  :show.sync="popoverShow" style="width: 100%">
                        <div >
                            <wysiwyg v-model="content" @input="$emit('input',html)" :options="editorOptions"/>
                        </div>
                        <b-btn @click="popoverShow=false" size="sm" variant="danger">Cancel</b-btn>
                        <b-btn @click="onOk" size="sm" variant="primary">Ok</b-btn>
                        </b-popover>
                       </div>
    `
    }
    //  'vue-mathjax': VueMathjax
  },
  //=============================ending of components============================================
  data: function() {
    return {
      title: "Zen",
      isLoading: false,
      question: [],
      editRef: {
        data: null,
        section: {
          index: 0
        },
        question: {
          index: 0
        },
        answer: {
          index: 0
        }
      },
      wysiwygContent: "",
      formula:
        '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">  <mi>x</mi>  <mo>=</mo>  <mrow class="MJX-TeXAtom-ORD">    <mfrac>      <mrow>        <mo>&#x2212;<!-- − --></mo>        <mi>b</mi>        <mo>&#x00B1;<!-- ± --></mo>        <msqrt>          <msup>            <mi>b</mi>            <mn>2</mn>          </msup>          <mo>&#x2212;<!-- − --></mo>          <mn>4</mn>          <mi>a</mi>          <mi>c</mi>        </msqrt>      </mrow>      <mrow>        <mn>2</mn>        <mi>a</mi>      </mrow>    </mfrac>  </mrow>  <mo>.</mo></math>           ',
      // sections:[
      //   {
      //     testId: this.testId,
      //     sectionName: "GENERIC",
      //     noOfQuestions: "0",
      //     timeDuration: "30",
      //     totalMarks: "100.00",
      //     marksForIndividualQuestions: "1.0",
      //     negativeMarksForIndividualQuestions: "0.5",
      //     questionData: null,
      //   },
      // ],
      questions: [],
      // test: {
      //   testId:"",
      //   testName: "",
      //   timeDuration: "",
      //   createdAt: "",
      //   updatedAt: "",
      //   minimumMarksRequired: "",
      // },
      error: false,
      isCreateMode: false,
      files: null,
      selectedSection: null,
      currentUser: null,
      subMenu: [
        {
          name: "DashBoard",
          link: "#/admin/addTest",
          icon: "fa fa-home px-2",
          active: "active"
        },
        {
          name: "Assessment",
          link: "#/admin/assessment",
          icon: "fa fa-pencil-square-o px-2",
          active: ""
        },
        {
          name: "Account",
          link: "#/admin/users",
          icon: "fa fa-users px-2",
          active: ""
        },
         {
          name: "Menu",
          link: "#/admin/addMenu",
          icon: "fa fa-users px-2 ",
          active: ""
        }
      ],
      crumbItems: [
        // {
        //   text: "Home",
        //   href: ""
        // },
        {
          text: "DashBoard",
          href: "#/admin/addTest",
          active: false
        },

        {
          text: "Custom Test",
          href: "#/admin/customTest",
          active: true
        }
      ],
      testType: [
        { value: null, text: "select section" },
        { value: "1", text: "Generic" }
      ]
    };
  },
  // created(){
  //     this.getTest();
  // },
  async mounted() {
    this.questions.push(this.$store.state.section)
    this.isLoading = true;
    // console.log(this.test)
    // console.log("Getting refresh token");
    await Global.onPageRefresh(this.$session, this.$router);
    // console.log("Getting User info");
    await this.getUserInfo();
    // this.$store.commit();
    // console.log("Getting test");
    // await this.getTest();
    // console.log("Processing test");
    // await this.processTest();
    this.isLoading = false;
  },
  methods: {
     getUserInfo() {
      return new Promise((resolve, reject) => {
        if (this.$session.exists("contact")) {
          Global.getUserInfo(this.$session)
            .then(response => {
              this.$session.set("current_user", response.data);
              this.currentUser = response.data;
              resolve(response);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        }
      });
    },
  editQuestion:function(sindex, q){
    this.editRef.section.index=sindex;
    this.question.splice(0);
    this.question.push(q);
    this.$refs.editQuestionModal.show();
  },
   deleteQuestion: function(sindex, q){
    this.test[0][sindex].splice(this.findIndex(q), 1);
  },
  showWsyiwygEditor: function(content){
    this.wysiwygContent=content;
    this.$refs.editQuestionModal.hide();
    this.$refs.wysiwygEditor.show();
  },
  add: function(question, aindex){
    // console.log('Add '+ this.findIndex(question) + ' ' + aindex );
    let data={
      answer: "Fill in ur answer",
      answerNumber:"x",
    };
    this.test.sections[this.editRef.section.index].questionsData[this.findIndex(question)].answers.splice(aindex+1, 0, data);
    // this.questions[this.findIndex(question)].answers.push(data);
  },
  trash: function(question, aindex){
    this.test.sections[this.editRef.section.index].questionsData[this.findIndex(question)].answers.splice(aindex, 1);
  },
  check: function(question, aindex){
    this.test.sections[this.editRef.section.index].questionsData[this.findIndex(question)].correctAnswer=question.answers[aindex];
  },
  edit: function(question, aindex){
    let content=this.questions[this.findIndex(question)].answers[aindex].answer;
    this.editRef.question.index=this.findIndex(question);
    this.editRef.answer.index=aindex;
    this.editRef.data=question;
    this.showWsyiwygEditor(this.questions[this.findIndex(question)].answers[aindex].answer);
  },
  findIndex: function(question){
    for(let count=0; count<this.test[0][this.editRef.section.index].question.length; count++){
      let e=this.test[0][this.editRef.section.index].questionsData[count];
      if(e.questionNumber==question.questionNumber)
        return count;
    }
    return -1;
  },
  handleEditorOk: function(evt){
    // console.log('Calling fine...', this.editRef);
    evt.preventDefault();
    // this.question[this.editRef.question.index].answers[this.editRef.answer.index].answer=this.wysiwygContent;
    // console.log('Wysiwyg content ', this.wysiwygContent);
    // console.log('Before content ', this.questions[this.editRef.answer.index].answers[this.editRef.answer.index].answer);
    this.questions[this.editRef.answer.index].answers[this.editRef.answer.index].answer=this.wysiwygContent;
    // console.log('After content ', this.questions[this.editRef.answer.index].answers[this.editRef.answer.index].answer);
    this.editQuestion(this.questions[this.editRef.answer.index]);
    this.$refs.editQuestionModal.show();

  },
  saveEditedQuestion: function(question){
    this.questions[this.editRef.question.index]=question;
    this.$refs.editQuestionModal.hide();
  },
    //     getTest: function() {
    //   this.isLoading = true;
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get("/test/get/" + this.testId)
    //       .then(response => {
    //         console.log("Response Received", response.data);
    //         this.$nextTick(function() {
    //           this.test = response.data;
    //         });
    //         this.isLoading = false;
    //         resolve(response);
    //       })
    //       .catch(err => {
    //         reject(err);
    //         console.log(err);
    //         alert("Upload Error occured");
    //       });
    //   });
    //   this.isLoading = false;
    // },
  }
};
</script>

<style scoped>
i {
  cursor: pointer;
}
.row-container {
  overflow-x: auto;
  /* border: 1px solid #9c9c9c; */
  padding: 2px;
  cursor: pointer;
}
.row-container:hover {
  overflow-x: auto;
  /* border: 1px solid #9c9c9c; */
  cursor: pointer;
  padding: 3px;
  box-shadow: 0 5px 5px #666;
}
.content-container {
  overflow-x: auto;
  /* border: 1px solid #9c9c9c; */
  padding: 2px;
  cursor: pointer;
}
.content-container:hover {
  overflow-x: auto;
  /* border: 1px solid #9c9c9c; */
  cursor: pointer;
  padding: 3px;
  box-shadow: 0 5px 5px #666;
}
.add-btn-edit {
  background-color: teal;
}
.add-btn-edit:hover {
  background-color: teal;
}
.submit-btn-edit {
  background-color: slateblue;
}
.submit-btn-edit:hover {
  background-color: slateblue;
}
.close-btn-edit {
  margin-top: 5px;
  border: none;
  background-color: crimson;
}
.close-btn-edit:hover {
  border: none;
  background-color: crimson;
}
.save-btn-edit {
  margin-top: 5px;
  border: none;
  background-color: green;
}
.save-btn-edit:hover {
  border: none;
  background-color: green;
}
.add1-btn-edit {
  margin-top: 5px;
  border: none;
  background-color: rebeccapurple;
}
.add1-btn-edit:hover {
  border: none;
  background-color: rebeccapurple;
}
.editable-container.editable-inline {
  display: inline-block;
  vertical-align: middle;
  width: auto;
  zoom: 1;
}
.exam-name {
  text-decoration: underline;
  font-size: 24px;
  color: rgb(144, 153, 156);
  margin-left: 20px;
}
.exam-type {
  text-decoration: underline;
  font-size: 20px;
  color: rgb(144, 153, 156);
  /* margin-left: 12px; */
}
.upload-btn-edit {
  background-color: #22baa0;
  border: none;
}
.upload-btn-edit:hover {
  background-color: #22baa0;
  border: none;
}
.back-btn-edit {
  background-color: #7a6fbe;
  border: none;
}
.back-btn-edit:hover {
  background-color: #7a6fbe;
  border: none;
}

/* ::-webkit-scrollbar { width: 0 !important } */

/* .container-fluid { -ms-overflow-style: none; }
.container-fluid { overflow: -moz-scrollbars-none; }

.container { -ms-overflow-style: none; }
.container { overflow: -moz-scrollbars-none; } */
</style>
