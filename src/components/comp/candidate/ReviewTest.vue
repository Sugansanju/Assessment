<template>
<div>
<div v-if="!loadTest">
    <question-loader v-if="true" :message="loaderMessage"></question-loader>
</div>
<div v-if="loadTest">
<b-container fluid class="noselect" oncontextmenu="return false;" style="overflow:hidden;">
  <b-row class="bg-dark">
    <b-col cols="9" class="p-1" >
       <span class="d-flex justify-content-center bg-dark text-white">{{testTitle}}</span>
    </b-col>
    <b-col cols="3" class="d-flex justify-content-between">
      <span class="p-1 bg-dark text-white " v-b-modal.questionsModal style="cursor:pointer;"><i class="fa fa-list-alt" aria-hidden="true"> Questions</i></span>
      <span class="p-1 bg-dark text-white" v-b-modal.instructionsModal style="cursor:pointer;"><i class="fa fa-info-circle" aria-hidden="true"> Instructions</i></span>
      <div>
      <button style=" " v-on:click="fontSize++">A<sup>+</sup></button>
      <button v-on:click="fontSize='7'">A</button>
      <button style=" " v-on:click="fontSize--">A<sup>-</sup></button>
      </div>
    </b-col>
    <!-- <b-button name="reSize" @click="resizeText(1)">+</b-button>
    <b-button name="reSize2" @click="resizeText(-1)">-</b-button> -->
  </b-row>
  <b-row style="background: #e5f6fd;">
    <b-col cols="9" style="background:white;">
      <b-row class="bg-light">
        <div class="breadcrumb"  >
          <a v-for="s in crumbSections"
            v-bind:class="{ active: s.isActive }"
            v-bind:key="s.sectionId" :href="'#/liveTest/'+testId"
            @click="switchToSection(s)">{{s.sectionName}}</a>
        </div>
      </b-row>
      <b-row class="d-flex justify-content-between p-3 bg-white" style="border:1px solid black;border-right:none;">

          <span><b>Question No :</b> {{question_index}}</span>
          <timer v-if="timeDuration!=0" :time="timeDuration" class="pull-right" @timeAlert="timeAlert"  @timeExpired="timeExpired"></timer>

      </b-row>
      <b-row>
        <b-container fluid  class="question-panel" v-bind:style="{ fontSize: fontSize* 0.2 +'em'}">
          <b-row >
            <b-col >
        <b-container fluid>
          <b-row>
            <b-col   style="padding:12px 1px 12px 10px;" >
              <div id="fontsize" v-html="questions[question_index-1].question!=null?questions[question_index-1].question.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation):''">
              </div>
          </b-col>
          </b-row>
        </b-container>
        <b-container fluid >
          <b-row>
            <b-col id="optionfontsize" style="margin-left:50px;">
              <b-form-radio-group v-model="questions[question_index-1].selected">
                <div v-for="(a, index) in  questions[question_index-1].answers" v-bind:key="index">
                    <b-form-radio disabled :value="a.value"> <div v-html="a.text!=null?a.text.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation):''"></div></b-form-radio>
                </div>
              </b-form-radio-group>
            </b-col>
          </b-row>
        </b-container>
        <b-container fluid >
          <b-row>
            <b-col id="optionfontsize" style="margin-left:50px;">
              <b>Correct Answer is :</b> {{questions[question_index-1].correctAnswer.answerNumber}}
                    <div v-html="questions[question_index-1].correctAnswer!=null?questions[question_index-1].correctAnswer.answer.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation):''"></div>
            </b-col>
          </b-row>
        </b-container>
            </b-col>
          </b-row>
        </b-container>
      </b-row>
    </b-col>
    <b-col cols="3"  style=" height: 95vh;border:1px solid black;">
      <b-row class="d-flex justify-content-around" style="height: 10vh;">
        <b-col style="" >
          <img width="70vh" height="70vh" src="/static/images/user.png">
          <span class="title name" style="font-weight:bold;font-size:30px;" id="tool">
            {{(currentUser!=null&& currentUser.username!=null)?currentUser.username:((currentUser!=null && currentUser.email!=null)?currentUser.email:'User')}}
          </span>
          <b-tooltip target="tool" placement="bottom">
            {{(currentUser!=null&& currentUser.username!=null)?currentUser.username:((currentUser!=null && currentUser.email!=null)?currentUser.email:'User')}}
          </b-tooltip>
        </b-col>
      </b-row>
     <b-row  style="height: 30vh;">
        <b-col class="diff_type_notation_area_inner" style="padding:right:0px;padding-top:6px;padding-left:6px;padding-bottom:0px;border:1px solid black;border-left:none;">
         <b-row style="font-size:0.9rem;">
            <b-col cols="5">
              <span class="answered">{{stats.answered}}</span>Answered
            </b-col>
            <b-col cols="7" style="padding:0 12px 12px 1px;">
            <span class="not_answered">{{stats.notAnswered}}</span>Not Answered
          </b-col>
            <b-col cols="5" >
              <span class="not_visited">{{stats.notVisited}}</span>Not Visited
            </b-col>
            <b-col cols="7" style="padding:0 12px 0px 1px; ">
              <span class="review">{{stats.bookmarked}}</span>Marked for Review
            </b-col>
              <b-col cols="12" style="padding-bottom:0px;padding-top:6px;" >
                <span class="review_marked mr-3">{{stats.answeredBookmarked}}</span>Answered & Marked for Review(Will be considered for evaluation)
              </b-col>
            </b-row>
        </b-col>
        <b-col cols="12" class="header1">
          <span>{{testTitle}}</span>
        </b-col>
        <b-col cols="12" class="header1" style="font-size:14px;font-weight:bold;background: #e5f6fd; color: #000;">
          <span>Choose a Question</span>
        </b-col>
      </b-row>
        <b-row class="answer-panel">
            <answer-button-panel :buttons="buttons" @clicked="viewQuestion($event)" :activeSection="activeSection"/>
        </b-row>
    </b-col>
  </b-row>
  <b-row>
      <div class="footer">
      <b-row>
        <b-col cols="9"  style="border:1px solid black;border-right:none;padding:3px 3px 3px 15px;">
          <b-row class="d-flex justify-content-start">
        <b-col>
          <!-- <b-button class="btn-sm mark-review-btn" disabled @click="markReview">Mark for review & next</b-button> -->
           <!-- <b-button class="btn-sm clear-btn" disabled @click="clearResponse">Clear Response</b-button> -->
        </b-col>
        <b-col class="d-flex justify-content-end">
           <!-- <b-button class="btn-sm save-btn" disabled @click="saveAnswer">Save & Next</b-button> -->
        </b-col>
          </b-row>
          </b-col>
        <b-col cols="3" class="d-flex justify-content-center" style="padding:3px 0 3px 0;border:1px solid black;background: #e5f6fd;">
           <b-button class="btn-sm submit-btn" @click="showModal">Back</b-button>
          </b-col>
      </b-row>
      </div>
  </b-row>
   <b-modal ref="myModalRef" hide-footer @hidden="onHidden">
     <b-row class="mx-auto" style="height: 30vh;">
        <b-col class="diff_type_notation_area_inner " style="padding:right:0px;padding-top:6px;padding-left:6px;padding-bottom:0px;border-left:none;">
            <b-col >
              <span class="answered">{{stats.answered}}</span>Answered
            </b-col><br>
            <b-col >
            <span class="not_answered">{{stats.notAnswered}}</span>Not Answered
          </b-col><br>
            <b-col >
              <span class="not_visited">{{stats.notVisited}}</span>Not Visited
            </b-col><br>
            <b-col >
              <span class="review">{{stats.bookmarked}}</span>Marked for Review
            </b-col><br>
              <b-col  style="padding-bottom:0px;padding-top:6px;" >
                <span class="review_marked mr-3">{{stats.answeredBookmarked}}</span>Answered & Marked for Review(Will be considered for evaluation)
              </b-col>
        </b-col>
     </b-row>
     <b-row>
       <b-col>
         <hr>
       </b-col>
     </b-row>
     <b-row>
     <b-col class="d-flex justify-content-end">
    <b-btn disabled @click="submit">Proceed to Submit</b-btn>
    </b-col>
     </b-row>
  </b-modal>
<questions-modal :title="testTitle" :question="questions"></questions-modal>
 <instructions-modal></instructions-modal>

</b-container>
</div>
</div>
</template>

<script>
import QuestionsModal from "@/components/comp/modals/QuestionsModal.vue";
import InstructionsModal from "@/components/comp/modals/InstructionsModal.vue";
import AnswerButtonPanel from "@/components/comp/AnswerButtonPanel";
import Timer from "@/components/comp/Timer";
import BreadCrumb from "@/components/comp/candidate/BreadCrumb";
import Global from "@/service/Global";
import QuestionLoader from "@/components/comp/QuestionLoader";
import swal from "sweetalert2";
const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});

export default {
  name: "Question",
  props: ["testId","answerId"],
  components: {
    AnswerButtonPanel,
    QuestionsModal,
    InstructionsModal,
    Timer,
    BreadCrumb,
    QuestionLoader
  },
  created() {
    window.onload = function() {
      document.onkeydown = function(e) {
        return (e.which || e.keyCode) != 116 ;
      };
    }

  },
  data() {
    return {
      fontSize:7,
      isLoading: false,
      loaderMessage: "",
      loaderProcess: true,
      loadTest: false,
      selected: "chennai",
      visited: null,
      currentUser: null,
      review: null,
      answered: null,
      timeDuration: 0,
      testPack: null,
      testTitle: "",
      title: [],
      activeSection: null,
      crumbSections: [],
      section: [],
      stats: {
        answered: 0,
        notAnswered: 0,
        notVisited: 0,
        bookmarked: 0,
        answeredBookmarked: 0
      },
      questions: [
        {
          questionNumber: "",
          question: null,
          answers: ["", "", "", ""],
          selected: null,
          takenAt: null,
          submittedAt: null,
          updatedAt: null
        }
      ],
      answerState: null,
      buttons: [
        { index: "1", visited: true, bookmarked: false, answered: false }
      ],

      question: null,
      answers: [],
      question_no: null,
      question_index: 1,
      is_answer_marked: false
    };
  },
  async mounted() {
    this.viewQuestion(0);
    // console.log("Getting refresh token");
    await Global.onPageRefresh(this.$session, this.$router);
    // console.log("Getting User info");
    await this.getUserInfo();
    // console.log("Getting test pack");
    var self = this;
    if(this.answerId==null){
      await this.setLoaderMessage('Getting your test pack');
      await this.getTestPack();
      await this.setLoaderMessage('Test pack recieved');
      await this.setLoaderMessage('Preparing the test');
      await this.prepareTest();
      await this.setLoaderMessage('Almost There!');
      this.loadTest = true;
    }else{
      await this.setLoaderMessage('Resuming the test');
      await this.resumeTest();
      await this.setLoaderMessage('Getting answer state');
      await this.getAnswerState();
      await this.setLoaderMessage('Answer state recieved');
      await this.setLoaderMessage('Preparing test for review');
      await this.prepareTestState();
      await this.setLoaderMessage('Almost There!');
      this.loadTest = true;
    }
  },
  watch: {
    question_index: function(newValue, oldValue) {
      // console.log("Old index is ", oldValue);
      // console.log("Current index is ", newValue);
      if (
        this.questions[oldValue - 1].sectionId !=
        this.questions[newValue - 1].sectionId
      ) {
        this.activeSection = this.questions[newValue - 1].sectionId;
        let newSection = this.questions[newValue - 1].sectionId;
        this.crumbSections.forEach(function(e) {
          if (e.sectionId == newSection) e.isActive = true;
          else e.isActive = false;
        });
      }
      // this.saveUpdateAnswer(oldValue);
    }
  },
  methods: {
    setLoaderMessage(message){
      this.loaderMessage=message;
      return new Promise((resolve, reject) => {
        let wait = setTimeout(() => {
          resolve();
        }, 1750)
      });
    },
    // resizeText(multiplier) {
    //   var elem = document.getElementById("fontsize");
    //   console.log("call")
    //   var currentSize = elem.style.fontSize || 1;
    //   console.log(elem);
    //   console.log(currentSize);
    //   elem.style.fontSize = parseFloat(currentSize) + multiplier * 0.2 + "em";
    //   console.log(elem.style.fontSize);
    // },
  showModal () {
    // this.$refs.myModalRef.show()
    this.$router.push("/candidate/dashboard");
  },
    hideModal () {
    this.$root.$emit('bv::hide::modal','modal1')
  },
    onHidden (evt) {
    // Return focus to our Open Modal button
    // See accessibility below for additional return-focus methods
    this.$refs.btnShow.$el.focus()
  },
    switchToSection: function(section) {
      this.crumbSections.forEach(function(e) {
        e.isActive = false;
      });
      section.isActive = true;
      this.activeSection = section.sectionId;
      let count = 0;
      for (; count < this.questions.length; count++) {
        if (this.questions[count].sectionId == section.sectionId) break;
      }
      toast({
        type: "info",
        title: "Section changed " + section.sectionName
      });
      this.viewQuestion(count);
    },
    submit: function() {
        this.$refs.myModalRef.hide()
      swal({
        title: "Are you sure?",
        text: "You won't be able to continue the test!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Submit test!"
      }).then(result => {
        if (result.value) {
          this.submitTest();
        }
      });
    },
    submitTest: function() {
      this.isLoading = true;
      let data = {
        answerId: this.testPack.answerId,
        testId: this.testPack.testId,
        // userId: this.currentUser.id,
        userName: this.currentUser.username,
        // userId: this.testPack.userId
      };
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      return new Promise((resolve, reject) => {
        axios
          .post("test/session/submit", data, config)
          .then(response => {
            resolve(response);
            toast({
              type: "success",
              title: "Answers submitted successfully"
            });
            this.isLoading = false;
            this.$router.push("/candidate/result/" + this.testPack.testId +"/"+ this.testPack.answerId);
          })
          .catch(err => {
            console.log(err);
            reject(err);
            toast({
              type: "error",
              title: "Saving answer failed"
            });
            this.isLoading = false;
          });
      });
    },
    processStats: function() {
      this.stats = {
        answered: 0,
        notAnswered: 0,
        notVisited: 0,
        bookmarked: 0,
        answeredBookmarked: 0
      };
      for (let i = 0; i < this.buttons.length; i++) {
        let b = this.buttons[i];
        if (b.answered) this.stats.answered++;
        else this.stats.notAnswered++;

        if (b.visited) this.stats.visited++;
        else this.stats.notVisited++;
        if (b.answered && b.bookmarked) this.stats.answeredBookmarked++;
        if (b.bookmarked) this.stats.bookmarked++;
      }
    },
    saveUpdateAnswer: function(index) {
      // this.isLoading=true;
      index = index - 1;
      let data = {
        answerId: this.testPack.answerId,
        testId: this.testPack.testId,
        userId: this.testPack.userId,
        answerData: {
          sectionId: this.questions[index].sectionId,
          questionNumber: this.questions[index].questionNumber,
          question: this.questions[index].question,
          answerNumber:
            this.questions[index].selected != null
              ? this.questions[index].selected.answerNumber
              : null,
          answer:
            this.questions[index].selected != null
              ? this.questions[index].selected.answer
              : null,
          answered: this.buttons[index].answered,
          bookmarked: this.buttons[index].bookmarked,
          visited: this.buttons[index].visited,
          state: false,
          takenAt: this.questions[index].takenAt,
          submittedAt: new Date(),
          updatedAt: null
        }
      };
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      return new Promise((resolve, reject) => {
        axios
          .post("test/session/answer/save", data, config)
          .then(response => {
            this.processStats();
            resolve(response);
            // toast({
            //   type: "success",
            //   title: "Answer saved successfully"
            // });
            this.isLoading=false;
          })
          .catch(err => {
            console.log(err);
            reject(err);
            toast({
              type: "error",
              title: "Saving answer failed"
            });
            // this.isLoading=false;
          });
      });
      console.log("Answer sent : ", data);
    },
    timeAlert: function() {
      toast({
        type: "info",
        title: "Only 5 minutes left"
      });
    },
    timeExpired: function() {
      swal({
        title: "Time Expired!",
        text: "You won't be able to continue the test!",
        type: "warning",
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Yes, Submit test!"
      }).then(result => {
        if (result.value) {
          this.submitTest();
          this.$router.push("/candidate/result/" + this.testPack.testId+"/"+ this.testPack.answerId);
        }
      });
    },
    getTestPack: function() {
      this.isLoading = true;
      let data = {
        testId: this.testId,
        userId: this.currentUser.id,
        userName: this.currentUser.username,
      };
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      console.log("The Test data is ", data);
      console.log("The Test data is ", this.currentUser);
      return new Promise((resolve, reject) => {
        axios
          .post("test/session/start", data, config)
          .then(response => {
            this.testPack = response.data;
            resolve(response);
            // toast({
            //   type: "success",
            //   title: "Test pack received successfully"
            // });
            this.isLoading = false;
          })
          .catch(err => {
            console.log(err);
            reject(err);
            toast({
              type: "error",
              title: "Receiving test pack failed"
            });
            this.isLoading = false;
          });
      });
    },
    prepareTest: function() {
      this.isLoading = true;
      this.title.splice(0);
      this.title.push({
        text: this.testPack.sections[0].testName,
        active: true
      });
      this.testTitle = this.testPack.sections[0].testName;
      this.section.splice(0);
      this.questions.splice(0);
      this.buttons.splice(0);
      this.crumbSections.splice(0);
      this.timeDuration = this.testPack.timeDuration * 60;
      for (let i = 0; i < this.testPack.sections.length; i++) {
        // this.timeDuration += this.testPack.sections[i].timeDuration * 60;
        let sectionData = {
          sectionName: this.testPack.sections[i].sectionName,
          sectionId: this.testPack.sections[i].sectionId,
          isActive: false
        };
        // this.crumbSections.push(this.testPack.sections[i].sectionName);
        this.crumbSections.push(sectionData);
        let s = this.testPack.sections[i];
        this.section.push({
          text: s.sectionName,
          to: { name: s.testName },
          active: true
        });
        for (let j = 0, count = 1; j < s.questionData.length; j++) {
          let q = s.questionData[j];
          let t = {
            sectionId: s.sectionId,
            questionNumber: q.questionNumber,
            question: q.question,
            // answers: q.answers,
            answers: [],
            correctAnswer: q.correctAnswer,
            selected: null
          };
          for (let k = 0; k < q.answers.length; k++) {
            // t.answers.push({text: q.answers[k].answer, value: q.answers[k].answerNumber})
            t.answers.push({ text: q.answers[k].answer, value: q.answers[k] });
          }
          this.questions.push(t);
          this.buttons.push({
            id: s.sectionId,
            index: count++,
            visited: false,
            bookmarked: false,
            answered: false
          });
        }
      }
      this.buttons[0].visited = true;
      this.crumbSections[0].isActive = true;
      this.activeSection = this.crumbSections[0].sectionId;
      this.isLoading = false;
    },
    resumeTest: function() {
      this.isLoading = true;
      let data = {
        testId: this.testId,
        answerId: this.answerId,
        userId: this.currentUser.id,
        // userName: this.currentUser.username,
      };
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      return new Promise((resolve, reject) => {
        axios
          .post("test/session/preview/resume", data, config)
          .then(response => {
            this.testPack = response.data;
            resolve(response);
            // toast({
            //   type: "success",
            //   title: "Test pack received successfully"
            // });
            this.isLoading = false;
          })
          .catch(err => {
            console.log(err);
            reject(err);
            toast({
              type: "error",
              title: "Receiving test pack failed"
            });
            this.isLoading = false;
          });
      });
    },
    getAnswerState: function() {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        axios
          .get("test/session/state/"+this.answerId)
          .then(response => {
            this.answerState = response.data;
            resolve(response);
            this.isLoading = false;
          })
          .catch(err => {
            console.log(err);
            reject(err);
            toast({
              type: "error",
              title: "Receiving answer state failed"
            });
            this.isLoading = false;
          });
      });
    },
    prepareTestState: function() {
      this.isLoading = true;
      this.title.splice(0);
      this.title.push({
        text: this.testPack.sections[0].testName,
        active: true
      });
      this.testTitle = this.testPack.sections[0].testName;
      this.section.splice(0);
      this.questions.splice(0);
      this.buttons.splice(0);
      this.crumbSections.splice(0);
      // this.timeDuration = this.testPack.timeDuration * 60;
      this.timeDuration =0;
      for (let i = 0; i < this.testPack.sections.length; i++) {
        // this.timeDuration += this.testPack.sections[i].timeDuration * 60;
        let sectionData = {
          sectionName: this.testPack.sections[i].sectionName,
          sectionId: this.testPack.sections[i].sectionId,
          isActive: false
        };
        // this.crumbSections.push(this.testPack.sections[i].sectionName);
        this.crumbSections.push(sectionData);
        let s = this.testPack.sections[i];
        this.section.push({
          text: s.sectionName,
          to: { name: s.testName },
          active: true
        });
        for (let j = 0, count = 1; j < s.questionData.length; j++) {
          let q = s.questionData[j];
          let t = {
            sectionId: s.sectionId,
            questionNumber: q.questionNumber,
            question: q.question,
            // answers: q.answers,
            answers: [],
            selected: null
          };
          for (let k = 0; k < q.answers.length; k++) {
            // t.answers.push({text: q.answers[k].answer, value: q.answers[k].answerNumber})
            t.answers.push({ text: q.answers[k].answer, value: q.answers[k] });
          }
          t.correctAnswer = q.correctAnswer;
          this.questions.push(t);
          this.buttons.push({
            id: s.sectionId,
            index: count++,
            visited: false,
            bookmarked: false,
            answered: false
          });
        }

      }
        for(let i=0;i<this.answerState.length;i++){
          let a=this.answerState[i];
          for(let j=0;j<this.questions.length;j++){
            let q=this.questions[j];
            if(a.sectionId==q.sectionId && a.question==q.question && a.questionNumber==q.questionNumber){
              this.buttons[j].visited=a.visited;
              this.buttons[j].answered=a.answered;
              this.buttons[j].bookmarked=a.bookmarked;
              if(a.answered){
                // console.log('The Question is answered')
                this.questions[j].selected={
                  answer: a.answer,
                  answerNumber: a.answerNumber,
                };
              }
            }
          }
        }

      this.buttons[0].visited = true;
      this.crumbSections[0].isActive = true;
      this.activeSection = this.crumbSections[0].sectionId;
      this.isLoading = false;

      // if(this.answerState!=null && this.answerState.length!=0){
      //   if(this.answerState[0].hasOwnProperty('submittedAt')){
      //   let a=new Date(this.answerState[0].submittedAt).getTime();
      //   let b=new Date(this.answerState[this.answerState.length-1].submittedAt).getTime();
      //   console.log('Submitted At 1 ',new Date(this.answerState[0].submittedAt));
      //   console.log('Submitted At 2 ',Date(this.answerState[this.answerState.length-1].submittedAt));
      //   console.log('Start ' , a);
      //   console.log('End ' , b);
      //   console.log('Diff ' , (b-a));
      //     this.timeDuration -= ((b-a)/1000);
      //   }
      // }
      this.timeDuration = 0;



      this.processStats();
    },
    getUserInfo: function() {
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
    viewQuestion: function(index) {
      if (!this.buttons[this.question_index - 1].answered)
        this.questions[this.question_index - 1].selected = null;
      if (index == this.questions.length) {
        index = 0;
      }
      this.question_index = index + 1;
      this.question_no = this.questions[index].questionNumber;
      this.questions[index].takenAt = new Date();
      this.setAnswer(this.questions[index].answers);
      this.setQuestion(this.questions[index].question);
      this.buttons[index].visited = true;
      return this.buttons[index].visited;
    },
    markReview: function() {
      this.buttons[this.question_index - 1].bookmarked = true;
      if (this.questions[this.question_index - 1].selected != null)
        this.buttons[this.question_index - 1].answered = true;
      this.viewQuestion(this.question_index);
    },
    saveAnswer: function() {
      if (this.questions[this.question_index - 1].selected != null)
        this.buttons[this.question_index - 1].answered = true;
      this.buttons[this.question_index - 1].bookmarked = false;
      this.viewQuestion(this.question_index);
    },
    clearResponse() {
      this.questions[this.question_index - 1].selected = null;
      this.buttons[this.question_index - 1].answered = false;
      this.buttons[this.question_index - 1].bookmarked = false;
    },
    setQuestion(question) {
      this.question = question;
    },
    setAnswer(answers) {
      this.answers.splice(0);
      var count = 0;
      answers.forEach(element => {
        let data = {
          text: element,
          value: count++
        };
        this.answers.push(data);
      });
    }
  }
};
</script>

<style scoped>
.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 0 0 0 0;
  background-color: #fff;
  width: 100%;
  z-index: 999;
}
.header {
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  z-index: 999;
}
.sticky-top {
  position: -websskit-sticky;
  position: sticky;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
}
.nav1 {
  height: 35px;
  border: 1px solid black;
  /* background: #eeeeee; */
}
.link {
  font-size: 22px;
  font-weight: bold;
  background: #eeeeee;
  /* background-color: #38a9eb; */
}
/* ::-webkit-scrollbar{
  display:none;
} */
.link1 {
  color: black;
  font-size: 18px;
  font-weight: bold;
  background-color: #fff;
}
.header1 {
  background: #4e85c5 none repeat scroll 0 0;
  color: #fff;
  height: 31px;
  font-weight: bold;
  line-height: 31px;
  padding-left: 10px;
}
.diff_type_notation_area_inner span {
  background: url("/static/images/questions-sprite.png") no-repeat;
  color: #262626;
  line-height: 15px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1em;
}
.diff_type_notation_area_inner span.answered {
  background-position: -7px -55px;
  float: left;
  cursor: pointer;
  height: 26px;
  line-height: 20px;
  margin-right: 10px;
  width: 29px;
  color: #fff;
  padding-top: 3px;
}
.diff_type_notation_area_inner span.review {
  background-position: -75px -54px;
  float: left;
  cursor: pointer;
  height: 28px;
  line-height: 18px;
  margin-right: 10px;
  width: 28px;
  color: #fff;
  padding-top: 5px;
}
.diff_type_notation_area_inner span.review_answered {
  background-position: -9px -87px;
  float: left;
  cursor: pointer;
  height: 29px;
  line-height: 15px;
  margin-right: 10px;
  width: 28px;
  color: #fff;
  padding-top: 5px;
}
.diff_type_notation_area_inner span.review_marked {
  background-position: -172px -55px;
  float: left;
  cursor: pointer;
  height: 28px;
  line-height: 15px;
  margin-right: 10px;
  width: 30px;
  color: #fff;
  padding-top: 5px;
}
.diff_type_notation_area_inner span.not_answered {
  background-position: -42px -56px;
  float: left;
  cursor: pointer;
  height: 26px;
  line-height: 22px;
  margin-right: 10px;
  width: 29px;
  color: #fff;
}
.diff_type_notation_area_inner span.visited {
  background-position: -138px -56px;
  cursor: pointer;
  float: left;
  height: 26px;
  line-height: 21px;
  margin-right: 10px;
  width: 29px;
  color: #fff;
  padding-top: 2px;
}
.diff_type_notation_area_inner span.not_visited {
  background-position: -107px -56px;
  float: left;
  cursor: pointer;
  height: 26px;
  line-height: 21px;
  margin-right: 10px;
  width: 29px;
  color: #000;
  padding-top: 2px;
}
.mark-review-btn {
  background-color: #452483;
  color: white;
  border: none;
}
.mark-review-btn:hover {
  background-color: #452483;
  color: white;
  border: none;
}
.clear-btn {
  background-color: white;
  color: black;
}
.clear-btn:hover {
  background-color: white;
  color: black;
}
.save-btn {
  background-color: #22baa0;
  border: none;
}
.save-btn:hover {
  background-color: #229cba;
  border: none;
}
.submit-btn {
  background-color: #4e85c5;
  border: none;
}
.submit-btn:hover {
  background-color: #4e85c5;
  border: none;
}
.btn-secondary:active {
  background-color: #452483;
  color: white;
  border: none;
}

.nav {
  background: #363636;
  font-family: Arial, Helvetica, sans-serif;
  height: 30px;
  border: 1px solid black;
  padding: 0;
}
.nav_left {
  color: white;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}
.nav_left:hover {
  text-decoration-line: underline;
}

.questionpaper_icon {
  background: url("/static/images/Icon-sprite.png") no-repeat -188px -8px;
  width: 18px;
  height: 18px;
  margin-right: 7px;
  margin-top: 5px;
  float: left;
}
.instruction_icon {
  background: url("/static/images/Icon-sprite.png") no-repeat -140px -7px;
  width: 18px;
  height: 18px;
  margin-right: 7px;
  margin-top: 5px;
  float: left;
}
.breadcrumb {
  overflow: hidden;
  text-transform: uppercase;
  counter-reset: flag;
}
.breadcrumb a {
  text-decoration: none;
  outline: none;
  display: block;
  float: left;
  font-size: 12px;
  line-height: 36px;
  color: white;
  padding: 0 10px 0 60px;
  background: #666;
  background: linear-gradient(#666, #333);
  position: relative;
}
.breadcrumb a:first-child {
  padding-left: 46px;
  border-radius: 5px 0 0 5px;
}
.breadcrumb a:first-child:before {
  left: 14px;
}
.breadcrumb a:last-child {
  border-radius: 0 5px 5px 0;
  padding-right: 20px;
}
.breadcrumb a.active,
.breadcrumb a:hover {
  background: #333;
  background: linear-gradient(#333, #000);
}
.breadcrumb a.active:after,
.breadcrumb a:hover:after {
  background: #333;
  background: linear-gradient(135deg, #333, #000);
}
.breadcrumb a:after {
  content: "";
  position: absolute;
  top: 0;
  right: -18px;
  width: 36px;
  height: 36px;
  transform: scale(0.707) rotate(45deg);
  z-index: 1;
  background: #666;
  background: linear-gradient(135deg, #666, #333);
  box-shadow: 2px -2px 0 2px rgba(0, 0, 0, 0.4),
    3px -3px 0 2px rgba(255, 255, 255, 0.1);
  border-radius: 0 5px 0 50px;
}
.breadcrumb a:last-child:after {
  content: none;
}
.breadcrumb a:before {
  content: counter(flag);
  counter-increment: flag;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 8px 0;
  position: absolute;
  top: 0;
  left: 30px;
  background: #444;
  background: linear-gradient(#444, #222);
  font-weight: bold;
}

.flat a,
.flat a:after {
  background: white;
  color: black;
  transition: all 0.5s;
}
.flat a:before {
  background: white;
  box-shadow: 0 0 0 1px #ccc;
}
.flat a:hover,
.flat a.active,
.flat a:hover:after,
.flat a.active:after {
  background: #9eeb62;
}
/*=======================================================================*/
.question-panel {
  overflow: auto;
  height: 70vh;
  padding-bottom: 50px;
}
.answer-panel {
  height: 50vh;
  overflow-y: auto;
  background: #e5f6fd;
  margin-left: 15px;
}
/* .question-panel:hover{
  overflow-y:auto;
   height: 75vh;
   padding-bottom: 50px;
} */
.title{
    display:inline-block;
    width:160px;
    white-space: nowrap;
    overflow:hidden !important;
    text-overflow: ellipsis;
}
</style>
