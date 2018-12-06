<template>
<div>
<main-header :currentUser="currentUser"></main-header>
<sub-header :items="subMenu"></sub-header>
<bread-crumb :items="crumbItems" ></bread-crumb>
<b-container fluid style="border:1px solid #eeee;">
  <b-container fluid >
    <b-row>
      <b-col>
        <b-button class="add-btn-edit btn-sm pull-right" v-show="!showArchived" @click="showArchived=!showArchived"><i class="fa fa-eye px-2" aria-hidden="true"></i>Archived</b-button>
        <b-button class="add-btn-edit btn-sm pull-right" v-show="showArchived" @click="showArchived=!showArchived"><i class="fa fa-eye-slash px-2" aria-hidden="true"></i>Hide Archived</b-button>
       <b-button class="add-btn-edit btn-sm pull-right" v-show="!showArchived" v-b-modal.newTestModal  ><i class="fa fa-plus-circle px-2" aria-hidden="true"></i>Add New Test</b-button>
      </b-col>
    </b-row>
      <test-detail-table :items="itemList"
      @previewTest="previewTest"
      @removeTest="removeTest"
      @unremoveTest="removeTest"
      @lockTest="lockTest"
      @unlockTest="unlockTest"
      @cloneTest="cloneTest"
      @showStatus="showStatus"
      @publishTest="publishTest"
      @unpublishTest="unpublishTest"
      :showArchived="showArchived">
      </test-detail-table>
   <b-row>
    <b-col cols="7"></b-col>
    <b-col>
    </b-col>
   </b-row>
  </b-container>
</b-container>
<loader v-if="isLoading"></loader>
<new-test-modal @save="saveTest" ></new-test-modal>
<test-status-modal :items="testStatusItems" :show="showTestStatusModal" @close="closeTestStatusModal"></test-status-modal>
</div>
</template>

<script>
import MainHeader from "@/components/comp/MainHeader";
import SubHeader from "@/components/comp/admin/SubHeader";
import BreadCrumb from "@/components/comp/admin/BreadCrumb";
import TestDetailTable from "@/components/comp/table/TestDetailTable";
import NewTestModal from "@/components/comp/modals/NewTestModal";
import TestStatusModal from "@/components/comp/modals/TestStatusModal";
import Loader from "@/components/comp/Loader.vue";
import Global from "@/service/Global";
import swal from "sweetalert2";
// import AccountApi from "@/service/Account";
const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});
export default {
  name: "AddTest",
  components: {
    MainHeader,
    SubHeader,
    BreadCrumb,
    TestDetailTable,
    NewTestModal,
    TestStatusModal,
    Loader
  },

  data: function() {
    return {
      isLoading: false,
      status: null,
      pack: null,
      currentUser: null,
      showArchived: false,
      showTestStatusModal: false,
      testStatusItems: [],
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
          icon: "fa fa-users px-2",
          active: ""
        }
      ],
      crumbItems: [
        {
          text: "DashBoard",
          href: "#/admin/addTest",
          active: true
        }
      ],
      testStatus: [
        { value: null, text: "Select Test Status" },
        { value: "a", text: "All" },
        { value: "b", text: "Active" },
        { value: "c", text: "InActive" }
      ],
      testPack: [
        { value: null, text: "Select TestPack" },
        { value: "1", text: "RRB" },
        { value: "2", text: "Group-2" },
        { value: "3", text: "SBI Clerk" },
        { value: "4", text: "Gropu-4" },
        { value: "5", text: "Blood Reltionship" },
        { value: "6", text: "Simplification" },
        { value: "7", text: "Reading Comprehension" },
        { value: "8", text: "History" },
        { value: "9", text: "Physics" },
        { value: "10", text: "Chemistry" },
        { value: "11", text: "Tamil" },
        { value: "12", text: "Botony" },
        { value: "13", text: "Current Affairs" },
        { value: "14", text: "Profit & Loss" },
        { value: "15", text: "Averge" },
        { value: "16", text: "Number System" },
        { value: "17", text: "Jumbled Sentences" },
        { value: "18", text: "Problem Solving" },
        { value: "19", text: "Aptitude" },
        { value: "20", text: "Percentage" },
        { value: "21", text: "Venn Diagram" },
        { value: "22", text: "Time & Work" },
        { value: "23", text: "Simple & Interest" }
      ],
      content: [],
      itemList: [],

    };
  },
  watch: {
    showArchived: function(){
    // console.log('Watch working');
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
  },
  },
  async mounted() {
    this.isLoading = true;
    // console.log("Getting refresh token");
    await Global.onPageRefresh(this.$session, this.$router);
    // console.log("Getting User info");
    await this.getUserInfo();
    // console.log("Getting test");
    await this.getAllTests();
    this.isLoading = false;
  },
  methods: {
    closeTestStatusModal: function(){
      this.showTestStatusModal=false;
    },
    previewTest: function(testId){
      console.log('Preview');
      window.open(
        "/#/admin/previewtest/" + testId,
        "newWin",
        "width=" + screen.availWidth/1+ ",height=" + screen.availHeight/1.1,
      );
    },
    showStatus: function(testId){
    //  console.log("Test Status Report");
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        axios
          .get("test/report/"+testId)
          .then(response => {
            this.isLoading = false;
            this.testStatusItems.splice(0);
            for(let i=0;i<response.data.length; i++){
              this.testStatusItems.push(response.data[i]);
              // console.log(this.testStatusItems)
            }
            toast({
              type: "success",
              title: "Test status received successfully"
            });
            this.showTestStatusModal=true;
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "Receving test status failed"
            });
            reject(err);
          });
      });

    },
    cloneTest: function(testId){
    //  console.log("Clone Test");
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        axios
          .get("question/clone/"+testId)
          .then(response => {
            this.isLoading = false;
            toast({
              type: "success",
              title: "Test cloned successfully"
            });
            this.getAllTests();
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "Cloning test failed"
            });
            reject(err);
          });
      });
    },
    lockTest: function(testId){
    //  console.log("Lock Test");
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        axios
          .get("question/lock/"+testId)
          .then(response => {
            this.isLoading = false;
            toast({
              type: "success",
              title: "Test locked successfully"
            });
            this.getAllTests();
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "Locking test failed"
            });
            reject(err);
          });
      });
    },
    unlockTest: function(testId){
    //  console.log("Unlock Test");
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        axios
          .get("question/unlock/"+testId)
          .then(response => {
            this.isLoading = false;
            toast({
              type: "success",
              title: "Test unlocked successfully"
            });
            this.getAllTests();
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "Unlocking test failed"
            });
            reject(err);
          });
      });
    },
     publishTest: function(testId){
    //  console.log("publish Test");
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        axios
          .get("question/publish/"+testId)
          .then(response => {
            this.isLoading = false;
            toast({
              type: "success",
              title: "Test published successfully"
            });
            this.getAllTests();
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "publishing test failed"
            });
            reject(err);
          });
      });
    },
     unpublishTest: function(testId){
    //  console.log("unpublish Test");
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        axios
          .get("question/unpublish/"+testId)
          .then(response => {
            this.isLoading = false;
            toast({
              type: "success",
              title: "Test unpublished successfully"
            });
            this.getAllTests();
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "unpublishing test failed"
            });
            reject(err);
          });
      });
    },
    removeTest: function(testId){
    //  console.log("Remove Test");
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        axios
          .get("question/delete/"+testId)
          .then(response => {
            this.isLoading = false;
            toast({
              type: "success",
              title: "Test Archived successfully"
            });
            this.getAllTests();
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "Archiving test failed"
            });
            reject(err);
          });
      });
    },
    unremoveTest: function(testId){
    //  console.log("Unremove Test");
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        axios
          .get("question/undelete/"+testId)
          .then(response => {
            this.isLoading = false;
            toast({
              type: "success",
              title: "Test Unarchived successfully"
            });
            this.getAllTests();
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "Unarchiving test failed"
            });
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
            for (var i = 0; i < response.data.length; i++)
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
    saveTest: function(data) {
      // console.log("Saving Test");
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("test/create", data, config)
          .then(response => {
            // console.log("Response Received", response.data);
            this.getAllTests();
            resolve(response);
            toast({
              type: "success",
              title: "Test created successfully"
            });
          })
          .catch(err => {
            console.log(err);
            reject(err);
            toast({
              type: "error",
              title: "Test creation failed"
            });
          });
      });
      this.isLoading = false;
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
    }
  }
};
</script>

<style scoped>
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
.pagination .page-item.active .page-link {
  background-color: #22baa0;
}
.btn {
  border-radius: 20px;
}
</style>
