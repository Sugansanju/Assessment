<template>
  <div>
    <main-header :currentUser="currentUser"></main-header>
    <sub-header :items="menuItems"></sub-header>
    <bread-crumb :items="crumbItems"></bread-crumb>
      <div role="tablist" class="d-flex justify-content-center"  v-for="(q, index) in questions" v-bind:key="index">
        <b-col cols="8">
         <b-card no-body class="mb-1" style="background-color:#9ee1f7;">
          <b-card-header header-tag="header" class="p-1" role="tab">
               <b-container fluid block href="#" v-b-toggle="'question1'+q.questionNumber" style="background-color:#9ee1f7;color:black; padding:10px 10px 10px 10px;cursor:pointer;">
                <b-row>
                  <b-col  class="">
                    <div class="d-flex jusitfy-content-start">
                    {{q.questionNumber}})&nbsp;&nbsp;&nbsp;&nbsp;<div v-html="q.question"></div>
                    </div>
                  </b-col>
                  <div class="pull-right" style="padding:0 12px 0 0;">
                    <b-btn class="edit-btn btn-sm" @click="editQuestion(q)"><i class="fa fa-pencil" aria-hidden="true"></i></b-btn>
                    <b-btn class="close-btn btn-sm"><i class="fa fa-close" aria-hidden="true"></i></b-btn>
                  </div>
                </b-row>
                <!-- {{q.questionNumber}})&nbsp;&nbsp;&nbsp;<span v-html="q.question"></span> -->
               </b-container>
           </b-card-header>
      <b-collapse :id="'question1'+ q.questionNumber"  accordion="my-accordion" role="tabpanel">
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
                    {{a.answerNumber}})&nbsp;<div v-html="a.answer"></div>
                  </b-row>
                  </td>
              </tr>
              <tr>
                <td class="text-nowrap" style="font-weight:bold;">Your Answer:</td>
                <td><b-row v-if="q.yourAnswer!=null">
            {{q.yourAnswer.answerNumber}})&nbsp;<div v-html="q.yourAnswer.answer"></div>
          </b-row></td>
              </tr>
              <tr>
                <td class="text-nowrap" style="font-weight:bold;">Correct Answer :</td>
                <td>
                  <b-row v-if="q.correctAnswer!=null">
                      {{q.correctAnswer.answerNumber}})&nbsp;<div v-html="q.correctAnswer.answer"></div>
                  </b-row>
                </td>
              </tr>
              <tr>
                <td class="text-nowrap" style="font-weight:bold;">Solution:</td>
                <td>
                  <b-row v-if="q.solution!=null">
                    <!-- <b-col cols=""> -->
                      <div v-html="q.solution.description"></div>
                    <!-- </b-col> -->
                  </b-row>
                </td>
              </tr>
            </tbody>
          </table>
        </b-card-body>
      </b-collapse>
    </b-card>
   </b-col>
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
                      <!-- {{data.item}}
                      {{data.item.questionNumber}}) {{data.item.question}} -->
                    <!-- <editable :text="data.item.questionNumber" v-model="data.item.questionNumber"></editable>) <editable :text="data.item.question" v-model="data.item.question" ></editable> -->
                    <editor :id="'qn'+data.item.questionNumber" :html="data.item.questionNumber" v-model="data.item.questionNumber" />)&nbsp;
                    <editor :id="'q'+data.item.questionNumber" :html="data.item.question" v-model="data.item.question" />
                    </div>
                  </template>
                  <template slot="answers" slot-scope="data">
                    <div class="row" contenteditable="true" v-for="(a, aindex) in data.item.answers" v-bind:key="aindex" :id="'ca'+data.item.questionNumber+aindex">
                          <editor :id="'an'+data.item.questionNumber+aindex" :target="'an'+data.item.questionNumber+aindex" :html="a.answerNumber" v-model="a.answerNumber" />)&nbsp;
                          <editor :id="'a'+data.item.questionNumber+aindex" :target="'a'+data.item.questionNumber+aindex" :html="a.answer" v-model="a.answer" />
                     <b-popover :target="'ca'+data.item.questionNumber+aindex" triggers="focus">
                        <div>
                          <i class="fa fa-plus" style="color: green" @click="add(data.item, aindex)" v-b-tooltip.hover title="Add new answser"></i>
                          <i class="fa fa-edit" style="color: orange" @click="edit(data.item, aindex)" v-b-tooltip.hover title="Edit this answser"></i>
                          <i class="fa fa-trash" style="color: red" @click="trash(data.item, aindex)" v-b-tooltip.hover title="Delete this answser"></i>
                          <i class="fa fa-check" style="color: purple" @click="check(data.item, aindex)" v-b-tooltip.hover title="Mark as Correct answser"></i>
                        </div>
                        </b-popover>
                    </div>
                  </template>
                  <template slot="correctAnswer" slot-scope="data">
                    {{data.item.correctAnswer.answerNumber}}) {{data.item.correctAnswer.answer}}
                  </template>
                  <template slot="solution" slot-scope="data">
                    <!-- {{data.item.solution.description}} -->
                    <editor :id="'s'+data.item.questionNumber" :target="'s'+data.item.questionNumber" :html="data.item.solution.description" v-model="data.item.solution.description" />
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
          <span class="fa fa-info" style="color: red">Click the contents to edit</span><br>
          <!-- <button class="btn btn-info" @click="saveEditedQuestion(question[0])">Save</button> -->
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
      <!-- <b-container>
        <b-row>
          <b-col>
            <wysiwyg v-model="wysiwygContent" />
          </b-col>
        </b-row>
      </b-container>         -->
  </div>
</template>
<script>
import MainHeader from "@/components/comp/MainHeader";
import SubHeader from "@/components/comp/candidate/SubHeader";
import BreadCrumb from "@/components/comp/candidate/BreadCrumb";
// import ReportEditModal from '@/components/comp/modals/ReportEditModal'
import Editable from "@/components/comp/Editable";
import { VueEditor } from "vue2-editor";
import Global from "@/service/Global";
// import func from './vue-temp/vue-editor-bridge';

export default {
  name: "Reports",
  components: {
    MainHeader,
    SubHeader,
    BreadCrumb,
    // ReportEditModal,
    Editable,
    VueEditor,
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
          currentUser:null,
          editorOptions: {
            hideModules: {
              bold: false,
              italic: false,
              underline: false,
              justifyLeft: false,
              justifyCenter: false,
              justifyRight: true,
              headings: true,
              link: true,
              code: true,
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
  },
    async mounted() {
        this.isLoading = true;
        // console.log("Getting refresh token");
        await Global.onPageRefresh(this.$session, this.$router);
        // console.log("Getting User info");
        await this.getUserInfo();
        await this.getAllMenu();
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
              // console.log(this.currentUser);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        }
      });
    },
       getAllMenu: function() {
      this.isLoading = false;
      return new Promise((resolve, reject) => {
        axios
          .get("menu/all")
          .then(response => {
            this.isLoading = false;
            this.menuItems.splice(0);
            for (var i = 0; i < response.data.length; i++)
            this.menuItems.push(response.data[i]);
            console.log("Response Received",response.data);
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            reject(err);
          });
      });
   },
    editQuestion: function(q) {
      this.question.splice(0);
      this.question.push(q);
      this.$refs.editQuestionModal.show();
    },
    showWsyiwygEditor: function(content) {
      this.wysiwygContent = content;
      this.$refs.editQuestionModal.hide();
      this.$refs.wysiwygEditor.show();
    },
    add: function(question, aindex) {
      console.log('Add '+ this.findIndex(question) + ' ' + aindex );
      let data = {
        answer: "Fill in ur answer",
        answerNumber: "x"
      };
      this.questions[this.findIndex(question)].answers.splice(
        aindex + 1,
        0,
        data
      );
      // this.questions[this.findIndex(question)].answers.push(data);
    },
    trash: function(question, aindex) {
      this.questions[this.findIndex(question)].answers.splice(aindex, 1);
    },
    check: function(question, aindex) {
      this.questions[this.findIndex(question)].correctAnswer =
        question.answers[aindex];
    },
    edit: function(question, aindex) {
      let content = this.questions[this.findIndex(question)].answers[aindex]
        .answer;
      this.editRef.question.index = this.findIndex(question);
      this.editRef.answer.index = aindex;
      this.editRef.data = question;
      this.showWsyiwygEditor(
        this.questions[this.findIndex(question)].answers[aindex].answer
      );
    },
    findIndex: function(question) {
      for (let count = 0; count < this.questions.length; count++) {
        let e = this.questions[count];
        if (e.questionNumber == question.questionNumber) return count;
      }
      return -1;
    },
    handleEditorOk: function(evt) {
      // console.log("Calling fine...", this.editRef);
      evt.preventDefault();
      // this.question[this.editRef.question.index].answers[this.editRef.answer.index].answer=this.wysiwygContent;
      // console.log("Wysiwyg content ", this.wysiwygContent);
      // console.log(
      //   "Before content ",
      //   this.questions[this.editRef.answer.index].answers[
      //     this.editRef.answer.index
      //   ].answer
      // );
      this.questions[this.editRef.answer.index].answers[
        this.editRef.answer.index
      ].answer = this.wysiwygContent;
      // console.log(
      //   "After content ",
      //   this.questions[this.editRef.answer.index].answers[
      //     this.editRef.answer.index
      //   ].answer
      // );
      this.editQuestion(this.questions[this.editRef.answer.index]);
      this.$refs.editQuestionModal.show();
    },
    saveEditedQuestion: function(question) {
      this.questions[this.editRef.question.index] = question;
      this.$refs.editQuestionModal.hide();
    }
  },
  data: function() {
    return {
      showIcon: false,
      question: [],
      currentUser:null,
      editRef: {
        data: null,
        question: {
          index: 0
        },
        answer: {
          index: 0
        }
      },
      props:['testId'],
      wysiwygContent: "",
      menuItems:[],

      crumbItems: [
        {
          text: "DashBoard",
          href: "#/candidate/dashboard",
          active: false
        },
      //    {
      //   text: 'PREP Zone',
      //    href:'javascript:history.go(-1)',
      //   active: false
      // },
        {
          text: "Revise",
          href: "#/candidate/report",
          active: true
        }
      ],
      fields: ["test_name", "time_allocated", "score", "action"],
      packs: [
        {
          test_name: "RRB Model Question Paper-I",
          time_allocated: "30",
          score: "-",
          action: ""
        },
        {
          test_name: "RRB Model Question Paper-I",
          time_allocated: "30",
          score: "-",
          action: ""
        },
        {
          test_name: "RRB Model Question Paper-I",
          time_allocated: "30",
          score: "-",
          action: ""
        },
        {
          test_name: "RRB Model Question Paper-I",
          time_allocated: "30",
          score: "-",
          action: ""
        },
        {
          test_name: "RRB Model Question Paper-I",
          time_allocated: "30",
          score: "-",
          action: ""
        },
        {
          test_name: "RRB Model Question Paper-I",
          time_allocated: "30",
          score: "-",
          action: ""
        },
        {
          test_name: "RRB Model Question Paper-I",
          time_allocated: "30",
          score: "-",
          action: ""
        },
        {
          test_name: "RRB Model Question Paper-I",
          time_allocated: "30",
          score: "-",
          action: ""
        },
        {
          test_name: "RRB Model Question Paper-I",
          time_allocated: "30",
          score: "-",
          action: ""
        }
      ],
      questions: [
        {
          question: "3, 5, 11, 14, 17, 21",
          questionNumber: "Q.1",
          answers: [
            {
              answer: "21",
              answerNumber: "a"
            },
            {
              answer: "	17",
              answerNumber: "b"
            },
            {
              answer: "14",
              answerNumber: "c"
            },
            {
              answer: "3",
              answerNumber: "d"
            }
          ],
          correctAnswer: {
            answer: "14",
            answerNumber: "c"
          },
          yourAnswer: {
            answer: "17",
            answerNumber: "b"
          },
          solution: {
            description: `Each of the numbers except 14 is an odd number.
                    The number '14' is the only EVEN number.`
          }
        },
        {
          question:
            "Senators from urban areas are very concerned about assuring that there will be funding for a new international airport. Senators from rural areas refuse to fund anything until money for agricultural subsidies is appropriated. If the legislature funds these two programs, on which of the following could they spend the rest of the money?",
          questionNumber: "Q.2",
          answers: [
            {
              answer: "the school music program and national radio",
              answerNumber: "a"
            },
            {
              answer: "hurricane preparedness",
              answerNumber: "b"
            },
            {
              answer: "harbor improvements and the school music program",
              answerNumber: "c"
            },
            {
              answer: "small business loan program",
              answerNumber: "d"
            }
          ],
          yourAnswer: {
            answer: "small business loan program",
            answerNumber: "d"
          },
          correctAnswer: {
            answer: "the school music program and national radio",
            answerNumber: "a"
          },
          solution: {
            description: `The total cost of the school music program and national radio is $1 million, the amount left after the international airport and agricultural subsidies are funded.
                            International airport + Agricultural subsidy program
                            $4 million + $2 million = $6 million
                            school music program and national radio is $1 million.
                            Hence, Total $7 million.`
          }
        },
        {
          question: "Which is known as “Sundew Plant”?",
          questionNumber: "Q.3",
          answers: [
            {
              answer: "Cuscuta",
              answerNumber: "a"
            },
            {
              answer: "Drosera",
              answerNumber: "b"
            },
            {
              answer: "Vanda",
              answerNumber: "c"
            },
            {
              answer: "Viscum",
              answerNumber: "d"
            }
          ],
          yourAnswer: {
            answer: "Viscum",
            answerNumber: "d"
          },
          correctAnswer: {
            answer: "Drosera",
            answerNumber: "b"
          },
          solution: {
            description: `The total cost of the school music program and national radio is $1 million, the amount left after the international airport and agricultural subsidies are funded.
                            International airport + Agricultural subsidy program
                            $4 million + $2 million = $6 million
                            school music program and national radio is $1 million.
                            Hence, Total $7 million.`
          }
        },
        {
          question: "Odometer is to mileage as compass is to",
          questionNumber: "Q.4",
          answers: [
            {
              answer: "	speed",
              answerNumber: "a"
            },
            {
              answer: "hiking",
              answerNumber: "b"
            },
            {
              answer: "needle",
              answerNumber: "c"
            },
            {
              answer: "direction",
              answerNumber: "d"
            }
          ],
          yourAnswer: {
            answer: "direction",
            answerNumber: "d"
          },
          correctAnswer: {
            answer: "direction",
            answerNumber: "d"
          },
          solution: {
            description: `An odometer is an instrument used to measure mileage. A compass is an instrument used to determine direction. Choices a, b, and c are incorrect because none is an instrument.`
          }
        },
        {
          question: "Marathon is to race as hibernation is to",
          questionNumber: "Q.5",
          answers: [
            {
              answer: "	winter",
              answerNumber: "a"
            },
            {
              answer: "	bear",
              answerNumber: "b"
            },
            {
              answer: "dream",
              answerNumber: "c"
            },
            {
              answer: "sleep",
              answerNumber: "d"
            }
          ],
          yourAnswer: {
            answer: "bear",
            answerNumber: "b"
          },
          correctAnswer: {
            answer: "sleep",
            answerNumber: "d"
          },
          solution: {
            description: `A marathon is a long race and hibernation is a lengthy period of sleep. The answer is not choice a or b because even though a bear and winter are related to hibernation, neither completes the analogy. (Choice c) is incorrect because sleep and dream are not synonymous.`
          }
        }
      ]
    };
  }
};
</script>

<style scoped>
/* @import "vue-wysiwyg/dist/vueWysiwyg.css"; */
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
.tooltip {
  display: inline-block;
  position: relative;
  border-bottom: 1px dotted #666;
  text-align: left;
}

.tooltip h3 {
  margin: 12px 0;
}

.tooltip .right {
  min-width: 200px;
  max-width: 400px;
  top: 50%;
  left: 100%;
  margin-left: 20px;
  transform: translate(0, -50%);
  padding: 0;
  color: #eeeeee;
  background-color: #444444;
  font-weight: normal;
  font-size: 13px;
  border-radius: 8px;
  position: absolute;
  z-index: 99999999;
  box-sizing: border-box;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.8s;
}

.tooltip:hover .right {
  visibility: visible;
  opacity: 1;
}

.tooltip .right img {
  width: 400px;
  border-radius: 8px 8px 0 0;
}
.tooltip .text-content {
  padding: 10px 20px;
}

.tooltip .right i {
  position: absolute;
  top: 50%;
  right: 100%;
  margin-top: -12px;
  width: 12px;
  height: 24px;
  overflow: hidden;
}
.tooltip .right i::after {
  content: "";
  position: absolute;
  width: 12px;
  height: 12px;
  left: 0;
  top: 50%;
  transform: translate(50%, -50%) rotate(-45deg);
  background-color: #444444;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
}

.hr-line {
  border: 1px solid black;
}
.edit-btn {
  background-color: mediumseagreen;
  border-radius: 15px;
  border: none;
}
.edit-btn:hover {
  background-color: mediumseagreen;
  border: none;
}
.close-btn {
  background-color: indianred;
  border-radius: 15px;
  border: none;
}
.close-btn:hover {
  background-color: indianred;
  border: none;
}
.edit-btn:hover,
.close-btn:hover {
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
}
.edit-btn .close-btn {
  -webkit-transform: scale(0.8);
  -moz-transform: scale(0.8);
  -o-transform: scale(0.8);
  -webkit-transition-duration: 0.5s;
  -moz-transition-duration: 0.5s;
  -o-transition-duration: 0.5s;
}
</style>
