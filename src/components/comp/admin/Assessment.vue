<template>
<div>
  <main-header :currentUser="currentUser"></main-header>
  <sub-header :items="subMenu"></sub-header>
  <bread-crumb :items="crumbItems"></bread-crumb>
  <loader v-if="isLoading"></loader>
  <b-container fluid style="border:1px solid #eeee;">
    <b-container fluid>
      <b-row>
        <b-col>
        <b-button class="add-btn-edit btn-sm pull-right" v-b-modal.newPackModal><i class="fa fa-plus-circle px-2" aria-hidden="true"></i>Add Pack</b-button>
        </b-col>
    </b-row>
    <!-- <pack-detail-table :items="packItems"></pack-detail-table> -->
    <b-table striped hover responsive :items="packItems" :fields="packTableFields" :current-page="currentPage" :per-page="perPage">
      <template slot="packName" slot-scope="data">
          <b-link> {{data.item.packName}}</b-link>
      </template>
      <template slot="packPrice" slot-scope="data">
        <span>RS.</span>{{data.item.packPrice}}
      </template>
      <template slot="action" slot-scope="data">
        <b-btn class="btn-sm" style="background-color:slateblue;border:none;" @click="showAddModal(data.item.packId,activePack=data.item)">
          <span style="font-size:15px;"><i class="fa fa-plus" aria-hidden="true"></i></span>
        </b-btn>
         <b-btn class="btn-sm"  @click="showEditModal(data.item)" style="background-color:green;border:none;">
          <span style="font-size:15px;"><i class="fa fa-pencil" aria-hidden="true"></i></span>
        </b-btn>
         <b-btn class="btn-sm" @click="removePack(data.item)" style="background-color:red;border:none;">
          <span style="font-size:15px;"><i class="fa fa-trash" aria-hidden="true"></i></span>
        </b-btn>
      </template>
    </b-table>
    <b-pagination align="center" size="lg" :total-rows="packItems.length" v-model="currentPage" :per-page="perPage">
    </b-pagination>
   <b-row>
    <b-col cols="7">
    </b-col>
    <b-col>
    </b-col>
   </b-row>
  </b-container>
</b-container>
<loader v-if="isLoading"></loader>
<add-new-pack @addPack="savePack"></add-new-pack>
<edit-pack-modal :items="packDetails" :show="showEditPackModal" @editPack="updatePack" @close="closeEditPackModal"></edit-pack-modal>
<view-test-modal :tests="detail" :packId="testsInPack" :show="showAddTestModal" @close="closeAddTestModal" @addTest="addTest"></view-test-modal>
</div>
</template>
<script>
import MainHeader from "@/components/comp/MainHeader";
import SubHeader from "@/components/comp/admin/SubHeader";
import BreadCrumb from "@/components/comp/admin/BreadCrumb";
import AddNewPack from "@/components/comp/modals/AddNewPack";
import ViewTestModal from "@/components/comp/modals/ViewTestModal";
import EditPackModal from "@/components/comp/modals/EditPackModal";
import Loader from "@/components/comp/Loader";
import Global from "@/service/Global";
import swal from "sweetalert2";
const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});
export default {
  name: "Assessment",
  components: {
    MainHeader,
    SubHeader,
    BreadCrumb,
    Loader,
    AddNewPack,
    ViewTestModal,
    EditPackModal
  },
  data: function() {
    return {
      isLoading: false,
      currentUser: null,
      testsInPack: [],
      packDetails:[],
      // testsInPack:null,
      detail:null,
      currentPage: 1,
      perPage: 10,
      packItems: [],
      showEditPackModal:false,
      showAddTestModal:false,
      tests: [],
      activePack:null,
      packTableFields: {
        packName: { label: "PackName", sortable: true },
        packDescription: { label: "PackDescription", sortable: false },
        packPrice: { label: "PackPrice", sortable: true },
        action: { label: "Action", sortable: false }
      },
      subMenu: [
        {
          name: "DashBoard",
          link: "#/admin/addTest",
          icon: "fa fa-home px-2",
          active: ""
        },
        {
          name: "Assessment",
          link: "#",
          icon: "fa fa-pencil-square-o px-2",
          active: "active"
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
        {
          text: "DashBoard",
          href: "#/admin/addTest",
          active: false
        },
        {
          text: "Assessment",
          href: "#/admin/assessment",
          active: true
        }
      ]
    };
  },

  computed:{
    getTests: function(){
      get:{
        return this.tests;
      }
      set:{
this.packItems.splice(0);
      }
    }
  },
  async mounted() {
    this.isLoading = true;
    // console.log("Getting refresh token");
    await Global.onPageRefresh(this.$session, this.$router);
    // console.log("Getting user info");
    await this.getUserInfo();
    // console.log("Getting packs");
    await this.getAllPacks();
    // console.log("Getting tests");
    await this.getAllTests();
    this.isLoading = false;
  },
  methods: {
    showAddModal:function(packId){
     return new Promise((resolve, reject) => {
        axios
          .get("/pack/get/" + packId)
          .then(response => {
            this.testsInPack.splice(0);
           for(let i=0;i<response.data.length;i++){
             this.testsInPack.push(response.data[i].testId)
           }
            this.showAddTestModal=true;
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
       showEditModal:function(packItem){
           this.packDetails=packItem;
            this.showEditPackModal=true;
    },
      closeAddTestModal: function(){
      this.showAddTestModal=false;
    },
    closeEditPackModal:function(){
      this.showEditPackModal=false;
    },
    getAllTests: function(){
      this.isLoading=false;
      return new Promise((resolve, reject) => {
        axios.get("test/all")
          .then((response) => {
            this.tests.splice(0);
            for (var i = 0; i < response.data.length; i++)
              this.tests.push(response.data[i]);
                this.tests.sort(
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
            resolve(response);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
            toast({
              type: "error",
              title: "Receiving tests failed"
            });
            this.isLoading=false;
          });
      });
    },
    getAllPacks: function() {
      this.isLoading = false;
      return new Promise((resolve, reject) => {
        axios
          .get("pack/all")
          .then(response => {
            this.isLoading = false;
            this.packItems.splice(0);
            for (var i = 0; i < response.data.length; i++)
              this.packItems.push(response.data[i]);
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
    savePack: function(data){
      this.isLoading=true;
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("/pack/create", data, config)
          .then(response => {
            this.isLoading=false;
            this.getAllTests();
            this.getAllPacks();
            resolve(response);
            toast({
              type: "success",
              title: "Pack saved successfully"
            });
          })
          .catch(err => {
            this.isLoading=false;
            console.log(err);
            toast({
              type: "error",
              title: "Pack saving failed"
            });
          });
      });
    },
      updatePack: function(data){
      this.isLoading=true;
     console.log("Updated")
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("/pack/update", data, config)
          .then(response => {
            this.isLoading=false;
            this.getAllTests();
            this.getAllPacks();
            // window.location.reload();
            resolve(response);
            toast({
              type: "success",
              title: "Pack updated successfully"
            });
          })
          .catch(err => {
            this.isLoading=false;
            console.log(err);
            toast({
              type: "error",
              title: "Pack updated failed"
            });
          });
      });
    },
    removePack: function(pack) {
      console.log("pack",pack)
      this.isLoading = true;
      let data = {
        packId:pack.packId,
        packName:pack.packName,
        packDescription:pack.packDescription,
        packPrice: pack.packPrice,
      };
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("pack/delete", data, config)
          .then(response => {
            this.getAllPacks();
            resolve(response);
            toast({
              type: "success",
              title: "Pack removed successfully"
            });
            this.isLoading = false;
          })
          .catch(err => {
            reject(err);
            console.log(err);
            toast({
              type: "error",
              title: "Pack removed failed"
            });
          });
      });
    },
    addTest: function(selectedtests){
      console.log("Test Details",selectedtests)
      this.isLoading=true;
      let data={
        packId:this.activePack.packId,
        packName:this.activePack.packName,
        packDescription:this.activePack.packDescription,
        packPrice: this.activePack.packPrice,
        tests:selectedtests
      };
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("/pack/save", data, config)
          .then(response => {
            this.isLoading=false;
            resolve(response);
            toast({
              type: "success",
              title: "Tests added to pack successfully"
            });
            // this.closeAddTestModal=false;
          })
          .catch(err => {
            this.isLoading=false;
            console.log(err);
            toast({
              type: "error",
              title: "Adding tests to the Pack failed"
            });
          });
      });
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
    getAllTests: function() {
      // console.log("Get all tests");
      this.isLoading = false;
      return new Promise((resolve, reject) => {
        axios
          .get("test/all")
          .then(response => {
            this.detail = response.data;
          })
          .catch(err => {
            console.log(err);
            reject(err);
            alert("Receiving Tests failed");
            this.isLoading = false;
          });
      });
    },
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
.btn {
  border-radius: 20px;
}
</style>
