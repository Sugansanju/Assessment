<template>
  <div>
    <b-container  class="" style="border-style:double;border-width:5px; margin-top:150px;padding:70px;padding-top:0px; ">
          <b-col  v-if="currentUser!=null" style="text-align:center;padding-top:20px;padding-bottom:100px;">
            <span style="font-size:20px;font-weight:bold;">Candidate Name  : </span><span style=";font-size:20px;">{{currentUser.username!=null?currentUser.username:(currentUser.email!=null?currentUser.email:'User')}}</span>
          </b-col>
         <b-row v-if="result!=null">
        <b-col cols="6">
           <div class="mr-5" style="text-decoration:underline;text-align:center;font-size:20px;font-weight:bold;">
            <b>Your Score : </b>
          </div>
          <div class="mt-4">
            <b-row>
               <b-col style="font-weight:bold;">
              <span>Percentage</span>
              </b-col>
              <b-col>
                <span style="font-weight:bold;">:&nbsp;{{result.marksPercentage | round}} %</span>
              </b-col>
            </b-row>
            <br>
              <b-row>
               <b-col style="font-weight:bold;">
              <span>+ve Marks Obtained</span>
              </b-col>
              <b-col>
                <span style="font-weight:bold;">:&nbsp;{{result.totalMarksObtained | round}}</span>
              </b-col>
            </b-row>
            <br>
              <b-row>
               <b-col style="font-weight:bold;">
              <span>-ve Marks Obtained</span>
              </b-col>
              <b-col>
                <span style="font-weight:bold;">:&nbsp;{{result.negativeMarksObtained | round}}</span>
              </b-col>
            </b-row>
              <b-row style=" font-size: 1.5em;">
               <b-col style="font-weight:bold;">
                 <br>
              <span>Total</span>
              </b-col>
              <b-col>
                <br>
                <span style="font-weight:bold;">:&nbsp;<span style="color: red;">{{(result.totalMarksObtained - result.negativeMarksObtained) | round}}</span> out of {{result.netMarks}}</span>
              </b-col>
            </b-row>
              <b-row style=" font-size: 1.5em;">
               <b-col style="font-weight:bold;">
                 <br>
              <span>Your Rank</span>
              </b-col>
              <b-col>
                <br>
                    <span style="font-weight:bold;">:&nbsp;<span style="color: red;">{{rank.rank}}</span> out of {{rank.outOf}} </span>
              </b-col>
            </b-row>
            <!-- <table class="font-edit">
              <tr>
                <td>Percentage</td>
                <td>:&nbsp;{{result.marksPercentage | round}} %</td>
              </tr>
              <br>
              <tr>
                <td>+ve Marks Obtained</td>
                <td>:&nbsp;{{result.totalMarksObtained}}</td>
              </tr>
              <br>
              <tr>
                <td>-ve Marks Obtained</td>
                <td>:&nbsp;{{result.negativeMarksObtained}}</td>
              </tr>
            </table> -->
          </div>
            <!-- <pie-chart :datasets="datasets" :labels="labels"></pie-chart>
            <pie-chart></pie-chart>
            <pie :labels="labels" :datasets="datasets"></pie> -->
        </b-col>
        <b-col cols="6">
          <div class="mr-5" style="text-decoration:underline;text-align:center;font-size:20px;font-weight:bold;">
            <b>Summary</b>
          </div>
          <div class="mt-4">
             <b-col class="diff_type_notation_area_inner" style="font-size:13px;">
               <b-row>
              <b-col class="font-edit">
              <span class="answered"></span>Answered
              </b-col>
              <b-col>
                <a class="font-edit">:&nbsp;{{result.answered}}</a>
              </b-col>
               </b-row>
            <br>
            <b-row>
              <b-col class="font-edit">
               <span class="not_answered"></span>Not Answered
              </b-col>
                <b-col>
                  <a class="font-edit">:&nbsp;{{result.notAnswered}}</a>
                </b-col>
           </b-row>
          <br>
          <b-row>
             <b-col class="font-edit">
                <span class="review"></span>Bookmarked
            </b-col>
            <b-col>
                  <a class="font-edit">:&nbsp;{{result.bookmarked}}</a>
                </b-col>
          </b-row>
          <br>
          <b-row>
             <b-col class="font-edit">
              <span class="not_visited"></span>Not Visited
            </b-col>
            <b-col>
                  <a class="font-edit">:&nbsp;{{result.notVisited}}</a>
                </b-col>
          </b-row>
          <br>
          <b-row>
             <b-col class="font-edit">
             <i class="fa fa-check fa-2x check" aria-hidden="true"></i>Correct Answer
            </b-col>
            <b-col>
                  <a class="font-edit">:&nbsp;{{result.correctAnswer}}</a>
                </b-col>
          </b-row>
          <br>
            <b-row>
             <b-col class="font-edit">
             <i class="fa fa-close fa-2x wrong" aria-hidden="true"></i>Wrong Answer
            </b-col>
            <b-col>
                  <a class="font-edit">:&nbsp;{{result.wrongAnswer}}</a>
                </b-col>
          </b-row>
          <!-- <b-col>
          <span class="review_marked">0</s  pan>Answered & Marked for Review(Will not be considered for evaluation)
        </b-col> -->
             </b-col>
          </div>
        </b-col>
    </b-row>
      <b-col style="padding-top:100px;text-align:center;">
        <b-btn class="btn-sm btn-edit" @click="redirect"><i class="fa fa-arrow-left mr-2" aria-hidden="true"></i>Back</b-btn>
        <!-- <b-button class="btn-sm preview btn-edit"  @click="reviewTest" ><i class="icon fa fa-eye px-2" aria-hidden="true"></i>Review </b-button> -->
      </b-col>
      <!-- <b-col style="padding-top:100px;text-align:center;">
        <b-btn class="btn-sm btn-edit"><i class="fa fa-arrow-left mr-2" aria-hidden="true"></i>Review Test</b-btn>
      </b-col>       -->
    </b-container>
  </div>
</template>

<script>
// import {PieChart} from "@/components/comp/candidate/vuechart/chartjs/PieChart.js";
import Global from "@/service/Global";
import AccountApi from "@/service/Account";
import swal from "sweetalert2";
import { Pie } from 'vue-chartjs'
const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});
const round=function(value){
  return value.toFixed(3);
};

export default {
name:'ResultPage',
props:['answerId','testId'],
filters: {
  round,
},
components:{
  Pie:{
   props:['labels', 'datasets'],
   mixins: [Pie],
    mounted() {
      this.renderChart(this.labels, this.datasets
        , { responsive: true, maintainAspectRatio: false })
    }
  },
},
async mounted() {
  // console.log("Getting refresh token");
  await Global.onPageRefresh(this.$session, this.$router);
  // console.log("Getting User info");
  await this.getUserInfo();
  // console.log('Getting test pack');
  await this.getResult();
  // console.log('Generating Rank');
  await this.getRank();
  // await this.generateChartData();
},
data:function(){
  return{
    result: null,
    rank:{
      rank:"",
      outOf:"",
    },
    currentUser: null,
    labels: ['Answered', 'Not Answered', 'Bookmarked', 'Not Visited'],
     datasets: [
          {
            backgroundColor: [
              'rgba(65, 184, 131, .8)',
              'rgba(228, 102, 81, .8)',
              'rgba(0, 216, 255, .8)',
              'rgba(155, 89, 182, .8)'
            ],
            borderWidth: 0,
            data: [10,2,1,1],
          }
        ],
  }
},
methods:{
    getResult: function(){
      return new Promise((resolve, reject) => {
        axios.get("test/session/result/"+this.answerId)
          .then((response) => {
            // console.log(response);
            this.result=response.data;
            resolve(response);
            toast({
              type: "success",
              title: "Result updated successfully"
            });
          })
          .catch((err) => {
            console.log(err);
            reject(err);
            toast({
              type: "error",
              title: "Result updation failed"
            });
          });
      });
    },
     getRank: function(){
        this.isLoading = true;
      let data = {
        testId: this.testId,
        userId:this.$session.get("current_user").id
      };
      let config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      return new Promise((resolve, reject) => {
        axios
          .post("test/rank", data, config)
          .then(response => {
            this.rank=response.data;
            resolve(response); 
            this.isLoading = false;
            // this.$router.push("/candidate/result/" + this.testPack.testId + this.testPack.answerId);
          })
          .catch(err => {
            console.log(err);
            reject(err);
             this.isLoading = false;
          });
      });
     },
    //   getRank:function(){
    //     return new Promise((resolve, reject) => {
    //     axios.post("test/rank",userId,testid)
    //       .then((response) => {
            // console.log(response);
    //         this.result=response.data;
    //         resolve(response);
    //         toast({
    //           type: "success",
    //           title: "Result updated successfully"
    //         });
    //       })
    //       .catch((err) => {
            // console.log(err);
    //         reject(err);
    //         toast({
    //           type: "error",
    //           title: "Result updation failed"
    //         });
    //       });
    //   });
    // },
    generateChartData: function(){
      this.datasets= [
        {
          backgroundColor: [
            'rgba(65, 184, 131, .8)',
            'rgba(228, 102, 81, .8)',
            'rgba(0, 216, 255, .8)',
            'rgba(155, 89, 182, .8)'
          ],
          borderWidth: 0,
          data: [
          this.result.answered,
          this.result.notAnswered,
          this.result.bookmarked,
          this.result.notVisited,
          ],
        }];
    },
    /*
    generateChartData: function(){
      this.datasets= [
        data= [
          this.result.answered,
          this.result.notAnswered,
          this.result.bookmarked,
          this.result.notVisited,
          ],
              // {
              //   label: 'Answered',
              //   backgroundColor: '#f87979',
              //   data: [this.result.answered]
              // }, {
              //   label: 'Not Answered',
              //   backgroundColor: '#f87979',
              //   data: [this.result.notAnswered]
              // }, {
              //   label: 'Bookmarked',
              //   backgroundColor: '#f87979',
              //   data: [this.result.bookmarked]
              // }, {
              //   label: 'Not Visited',
              //   backgroundColor: '#f87979',
              //   data: [this.result.notVisited]
              // }
            ];
    },
    */
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
    redirect:function(){
      window.close();
      this.$router.push("/candidate/dashBoard");
    },
    reviewTest:function(){
      // window.close();
      // window.open("/reviewtest/"+this.testId+"/"+this.answerId);
      this.$router.push("/reviewtest/"+this.testId+"/"+this.answerId);
    }    
}
}
</script>

<style scoped>
.font-edit{
  font-size:15px;
  font-weight:bold;
}
.heading{
  text-decoration: underline;
  text-decoration-style: dashed;
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
.double-border{
   display: block;
  clear: both;
  border: 2px solid black;
  outline: 3px solid black;
  transition: 0.7s all ease-in;
}
.check{
   cursor: pointer;
 height: 26px;
  line-height: 21px;
  margin-right: 10px;
  width: 29px;
  color:green;
}
.wrong{
   cursor: pointer;
 height: 26px;
 color:red;
  line-height: 21px;
  margin-right: 10px;
  width: 29px;
}
.btn-edit{
  width:100px;
  border-radius:20px;
  background-color:#00A1B5;
  font-size:15px;
  font-weight:bold;
}
</style>
