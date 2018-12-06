<template>
  <div>
    <!-- <div class="login-screen"></div> -->
    <main-header :currentUser="currentUser"></main-header>
    <sub-header :items="menuItems"></sub-header>
    <bread-crumb :items="crumbItems"></bread-crumb>

    <b-container v-show="!testStatusSet">
      <loader v-if="isLoading" />
    </b-container>

    <b-container fluid style="padding:10px;" v-show="testStatusSet">
      <div style="background-color:white">
      <!-- <b-table striped hover responsive :items="packItems" :fields="testTableFields" >
        <template slot="actions" slot-scope="data">
            <b-button v-show="isTestSubmitted(data.item)" class="btn-sm review btn-active mt-2" @click="reportPage(data.item)">Report</b-button>
            <b-button v-show="isTestTaken(data.item) && !isTestSubmitted(data.item)" class="btn-sm resume btn-active mt-2" @click="resumeTest(data.item)">Resume Test</b-button>
            <b-button v-show="!isTestTaken(data.item)"  :disabled="!data.item.locked" class="btn-sm launch btn-active mt-2" @click="takeTest(data.item)">Launch</b-button>
        </template>
        </b-table> -->
         <!-- <b-container style="padding:0 0 0 0;">
             <b-row>
          <div class="flex flex-center" v-for="(test, index) in packItems" v-bind:key="index">
                <b-card class="pack-card title" style="width: 300px; height:150px;margin : 10px; border-radius:12px;border:2px solid #2699E5;">
                  <b-row >
                  <template slot="header" class="title" style=" font-style: italic;font-weight:bold;font-size:20px;">{{test.testName}}</template>
                  <b-badge pill class="Blink" v-if="test.comingAt!=null" style="background-color:yellow;color:red;border:1px solid red;">Coming Soon<br>{{test.comingAt|moment('DD-MM-YYYY') }}</b-badge><br>
                  </b-row>
                    {{test.testDescription}}
                  <div class="text-center" style="margin-top:50px;">
                   <b-button v-show="isTestSubmitted(test)" class="btn-sm review btn-active mt-2" @click="reportPage(test)">Report</b-button>
                   <b-button v-show="isTestTaken(test) && !isTestSubmitted(test)" class="btn-sm resume btn-active mt-2" @click="resumeTest(test)">Resume Test</b-button>
                   <b-button v-show="!isTestTaken(test)"  :disabled="!test.locked" class="btn-sm launch btn-active mt-2" @click="takeTest(test)">Launch</b-button>
                  </div>
                </b-card>
            </div>
             </b-row></b-container> -->
             <b-container style="padding:0 0 0 0;">
         <b-row>
           <b-card v-for="(test, index) in packItems" v-bind:key="index"
                  class="bg-light text-dark pack-card mb-4 ml-4"
                   style="cursor: pointer;border-radius:10px;width:280px;">
                   <p>
                   {{test.testName}}
                     </p>
                    <b-badge class="Blink"  v-if="test.comingAt!=null "  v-show="test.locked" variant="danger">Coming Soon</b-badge><br>
                    <b-badge class=""  v-if="test.comingAt!=null" v-show="test.locked" variant="info">{{test.comingAt|moment('DD-MM-YYYY') }}</b-badge>
              <em slot="footer">
                 <div class="text-center">
                   <b-button v-show="isTestSubmitted(test)" class="btn-sm review btn-active mt-2" @click="reportPage(test)">Report</b-button>
                   <b-button v-show="isTestSubmitted(test)" class="btn-sm btn-active mt-2 success" @click="reviewPage(test)">Review Test</b-button>
                   <b-button v-show="isTestTaken(test) && !isTestSubmitted(test)" class="btn-sm resume btn-active mt-2" @click="resumeTest(test)">Resume Test</b-button>
                   <b-button v-show="!isTestTaken(test)"  :disabled="test.locked" class="btn-sm launch btn-active mt-2" @click="takeTest(test)">Launch</b-button>
                 </div>
              </em>
          </b-card>
      </b-row>
    </b-container>
      </div>
            <loader v-if="isLoading" />
    </b-container>
  </div>
</template>

<script>
import MainHeader from "@/components/comp/MainHeader";
import SubHeader from "@/components/comp/candidate/SubHeader";
import BreadCrumb from "@/components/comp/candidate/BreadCrumb";
import Global from "@/service/Global";
import Loader from "@/components/comp/Loader";
import swal from "sweetalert2";

const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});
export default {
  name: "TestCenter",
  props: ["packId","testId"],
  components: {
    MainHeader,
    SubHeader,
    BreadCrumb,
    Loader
  },
  async mounted() {
    this.isLoading = true;
    // console.log("Getting refresh token");
    await Global.onPageRefresh(this.$session, this.$router);
    // console.log("Getting User Info");
    await this.getUserInfo();
    await this.getAllMenu();
    // console.log("Getting test pack");
    await this.getAllTestsInPack();
    await this.getAllReports();
    await this.getTestsStatus();
    //  console.log("Getting test");
    await this.getAllTests();
    this.isLoading = false;
  },
  methods: {
    isTestSubmitted(packItem) {
      for (let i = 0; i < this.testStatusItems.length; i++) {
        if (packItem.testId == this.testStatusItems[i].testId) {
          if (this.testStatusItems[i].submittedAt != null) return true;
        }
      }
      return false;
    },
    isTestTaken: function(packItem) {
      for (let i = 0; i < this.testStatusItems.length; i++) {
        if (packItem.testId == this.testStatusItems[i].testId) return true;
      }
      return false;
    },
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
            // console.log("Response Received",response.data);
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            reject(err);
          });
      });
   },
    getAllTests: function() {
      // console.log("Get all tests");
      this.isLoading = false;
      return new Promise((resolve, reject) => {
        axios
          .get("test/all")
          .then(response => {
            this.isLoading = false;
            this.content.splice(0);
            // console.log('The received response of tests ',response.data);
            for (var i = 0; i < response.data.length; i++){
                this.content.push(response.data[i]);
                this.content.sort(
                  function (a, b) {
                    let at=new Date(a.createdAt).getTime();
                    let bt=new Date(b.createdAt).getTime();
                    if (at === bt) {
                        return 0;
                    }
                    else {
                        return (at < bt) ? -1 : 1;
                    }
                }
                  );
            }


                this.itemList.splice(0)
                if(!this.showArchived){
                  for(let i=0;i<this.content.length;i++){
                    if(!this.content[i].archived){
                      this.itemList.push(this.content[i]);
                    }
                  }
                }else{
                  for(let i=0;i<this.content.length;i++){
                    if(this.content[i].archived){
                      this.itemList.push(this.content[i]);
                    }
                  }
                }
            // console.log("Response Received", this.content);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "Receiving tests failed"
            });
            reject(err);
          });
      });
    },
    getAllReports: function() {
      // console.log(
      //   "The current user id is ",
      //   this.$session.get("current_user").id
      // );
      let currentUserId = this.$session.get("current_user").id;
      return new Promise((resolve, reject) => {
        axios
          .get("/report/all/" + currentUserId)
          .then(response => {
            this.isLoading = false;
            this.reportItems.splice(0);
            for (var i = 0; i < response.data.length; i++)
              this.reportItems.push(response.data[i]);
            // console.log("Response Received for reports", this.reportItems);
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "Getting reports failed"
            });
            reject(err);
          });
      });
    },
    getAllTestsInPack: function() {
      // console.log("Get all Tests");
      this.isLoading = true;
      this.testStatusSet = false;
      return new Promise((resolve, reject) => {
        axios
          .get("/pack/get/" + this.packId)
          .then(response => {
            this.packItems.splice(0);
            for (var i = 0; i < response.data.length; i++){
            if(response.data[i].published)
              this.packItems.push(response.data[i]);
              // console.log(response.data[i]);
            }
                this.packItems.sort(
                  function (a, b) {
                    let at=new Date(a.createdAt).getTime();
                    let bt=new Date(b.createdAt).getTime();
                    if (at === bt) {
                        return 0;
                    }
                    else {
                        return (at < bt) ? -1 : 1;
                    }
                }
                );
            // console.log("PackItems ", this.packItems);
            this.isLoading = false;
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "Getting packs failed"
            });
            reject(err);
          });
      });
    },
    getTestsStatus: function() {
      // console.log("Get all Tests status");
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        axios
          .get("/test/status/" + this.$session.get("current_user").id)
          .then(response => {
            this.isLoading = false;
            this.testStatusItems.splice(0);
            for (var i = 0; i < response.data.length; i++)
              this.testStatusItems.push(response.data[i]);
            // console.log(
            //   "Response Received for test status",
            //   this.testStatusItems
            // );
            this.testStatusSet = true;
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "Getting tests status failed"
            });
            reject(err);
          });
      });
    },
    takeTest: function(data) {
      // this.$router.push("/");
      // // location.reload();
      swal({
        title: "Have u submitted the test?",
        text: "You won't be able to take another test before submitting!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Show available tests!"
      }).then(result => {
        if (result.value) {
          location.reload();
        }
      });
      window.open(
        "/#/instruction/" + data.testId,
        "newWin",
        "width=" + screen.availWidth/1+ ",height=" + screen.availHeight/1.1,
      );
    },
    resumeTest: function(item) {
      swal({
        title: "Have u submitted the test?",
        text: "You won't be able to continue ur test if u click Yes!",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Show available tests!"
      }).then(result => {
        if (result.value) {
          location.reload();
        }
      });
      for (let i = 0; i < this.reportItems.length; i++) {
        if (item.testId == this.reportItems[i].testId) {
          window.open(
            "/#/livetest/" + item.testId + "/" + this.reportItems[i].answerId,
            "newWin",
            "width=" + screen.availWidth/1+ ",height=" + screen.availHeight/1.1
          );
          return;
        }
      }
      toast({
        type: "error",
        title: "Something went wrong! Test cannot be resumed!"
      });
    },
    revisePage: function() {
      this.$router.push("/candidate/report");
    },
    reportPage: function(item) {
      for (let i = 0; i < this.reportItems.length; i++) {
        if (item.testId == this.reportItems[i].testId) {
          this.$router.push(
            "/candidate/result/" + this.reportItems[i].testId+"/"+this.reportItems[i].answerId
          );
          return;
        }
      }
      toast({
        type: "error",
        title: "Something went wrong! Report not found!"
      });
    },
    reviewPage: function(item) {
      for (let i = 0; i < this.reportItems.length; i++) {
        if (item.testId == this.reportItems[i].testId) {
          this.$router.push(
            "/reviewtest/" + this.reportItems[i].testId+"/"+this.reportItems[i].answerId
          );
          return;
        }
      }
      toast({
        type: "error",
        title: "Something went wrong! Report not found!"
      });
    }
  },
  data: function() {
    return {
      isLoading: false,
      currentUser: null,
      itemList:[],
      content:[],
      packItems: [],
      reportItems: [],
      testStatusItems: [],
      testStatusSet: false,
      menuItems:[],
      crumbItems: [
        {
          text: "DashBoard",
          href: "#/candidate/dashboard",
          active: false
        },
        {
          text: "PREP Zone",
          href: "#/candidate/pack",
          active: true
        }
      ],
      testTableFields: {
        testName: { label: "Assessment", sortable: true },
        timeDuration: { label: "Duration/mins", sortable: true },
        actions: { label: "Actions", sortable: false }
      }
    };
  }
};
</script>

<style scoped>
.px-sta {
  padding: 20px;
  margin: 0 auto 32px auto;
  max-width: 360px;
}
.card-edit {
  color: #fff;
  background-color: #f0669a;
  border-radius: 12px;
  margin: 45px;
  cursor: pointer;
}
.review {
  border: none;
  background-color: slateblue;
}
.review:hover {
  border: none;
  background-color: slateblue;
  color: white;
}
.view-report {
  border: none;
  background-color: #08a7c3;
}
.view-report:hover {
  border: none;
  background-color: #08a7c3;
  color: white;
}
.launch {
  border: none;
  background-color: #22baa0;
}
.launch:hover {
  border: none;
  color: white;
  background-color: #22baa0;
}
.resume {
  border: none;
  background-color: #e8bf40;
}
.resume:hover {
  border: none;
  color: white;
  background-color: #e8bf40;
}
.btn-active {
  outline: none;
  box-shadow: none !important;
}
.title{
    display:inline-block;
    width:160px;
    white-space: nowrap;
    overflow:hidden !important;
    text-overflow: ellipsis;
}
.Blink {
  animation: blinker 0.5s cubic-bezier(.5, 0, 1, 1) infinite alternate;
}
@keyframes blinker {
  from { opacity: 1; }
  to { opacity: 0; }
}
.px-sta {
    padding: 20px;
    margin: 0 auto 32px auto;
    max-width: 360px;
}
.pack-card:hover {
 box-shadow: 5px 8px 15px  #888888;
}
.card-footer{
  border-top:1px solid black;
}
.login-screen {
    background-color:#555;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
.login-screen:before {
    content: "";
    background: rgba(0,0,0, 0.5);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
</style>

