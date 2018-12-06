<template>
  <div>
  <main-header :currentUser="currentUser"></main-header>
  <sub-header :items="subMenu"></sub-header>
  <bread-crumb :items="crumbItems"></bread-crumb>
  <b-container style="border:1px solid #eee;padding:0 0 0 0;">
    <div  style="padding-bottom: 15px;background:#00A1B5;color: #fff;padding: 50px 0px 2px 0px;">
      <div class="pull-left" style="margin-top:-40px;margin-left:10px;">
        <span style="font-size:20px;font-weight:bold;">Account Management</span>
      </div>
      <div class="pull-right" style="padding:12px;margin-top:-50px;">
        <b-btn class="btn-sm add-btn" v-b-modal.addUserModal style="">
          <i class="fa fa-plus px-2" style="font-weight:bold;" aria-hidden="true">
          <span style="font-weight:bold;margin-left:12px;">Add User</span>
          </i>
          </b-btn>
         <vue-xlsx-table @on-select-file="handleSelectedFile">
           <i class="fa fa-file-o px-2" style="font-size:1.2em;font-weight:bold;" aria-hidden="true">
             <span style="margin-left:12px;">Bulk import</span>
            </i>
         </vue-xlsx-table>
      </div>
    </div>

    <!-- <b-form-input v-model="userFilter" placeholder="Type to Search" />
     <b-table striped hover responsive
     :filter="userFilter"
     :items="userItems"
     :fields="fields"
     :per-page="perPage"
     :current-page="currentPage"
     > -->
  <b-container fluid style="padding: 10px;">
    <form @submit.prevent="searchContact">
    <b-row>
      <b-col>
        <b-form-input autofocus v-model="searchField" placeholder="Type Name/Email/Mobile to Search" />
      </b-col>
      <b-col>
        <b-button autofocus variant="success">Search</b-button>
      </b-col>
    </b-row>
    </form>
  </b-container>
     <b-table striped hover responsive
     :items="userItems"
     :fields="fields"
     :per-page="perPage"
     :current-page="currentPage"
     >
     <!-- @filtered="onFiltered"> -->
        <!-- <template slot="testName" slot-scope="data">
        <b-link :href="'#/admin/customTest/'+data.item.testId"> {{data.item.testName}}</b-link>
        </template> -->

        <template slot="status" slot-scope="data">
          <b-btn class="btn-sm deactivate-btn" v-if="data.item.enabled" @click="deactivateUser(data.item.id)">Deactivate</b-btn>
          <b-btn class="btn-sm activate-btn" v-if="!data.item.enabled" @click="activateUser(data.item.id)">Activate</b-btn>
        </template>
      <template slot="actions" slot-scope="data">
         <i class="fa fa-trash px-2" v-b-tooltip.hover title="Delete" aria-hidden="true"  @click="deleteUser(data.item.id)" style="font-size:1.2em;color:red;cursor:pointer;"></i>
      </template>
     </b-table>

    <b-pagination align="center" size="lg" :total-rows="userItems.length" v-model="currentPage" :per-page="perPage">
    </b-pagination>


      <!-- <table class="table borderless table-hover table-space" style="background-color:#eee;">
       <tr>
         <td colspan="2">
             <strong>Username</strong>
       </td>
       <td colspan="2">
         <strong>Email/Mobile Number</strong>
       </td>
       <td colspan="2">
         <strong>Status</strong>
       </td>
       <td colspan="2">
         <strong>Action</strong>
       </td>
       </tr>
       <tr  v-for="(user,index) in userItems" v-bind:key="index">
         <td  colspan="2">
           {{user.username}}
       </td>
       <td  colspan="2">
           {{user.email[0] || user.mobile[0] }}
       </td>
        <td colspan="2" >
         <b-btn class="btn-sm deactivate-btn" v-if="user.enabled" @click="deactivateUser(user.id)">Deactivate</b-btn>
         <b-btn class="btn-sm activate-btn" v-if="!user.enabled" @click="activateUser(user.id)">Activate</b-btn>
       </td>
        <td colspan="2">
          <i class="fa fa-trash px-2" v-b-tooltip.hover title="Delete" aria-hidden="true"  @click="deleteUser(user.id)" style="font-size:1.2em;color:red;cursor:pointer;"></i>
       </td>
       </tr>
     </table> -->
     </b-container>
     <loader v-if="isLoading"></loader>
     <add-user-modal @insert="userInsert"></add-user-modal>
     <import-modal :show="showImportModal" :list="importList" @import="listImport" @close="close"></import-modal>
    <user-import-status-modal :show="showUserImportStatusModal" :items="userImportStatus" @close="showUserImportStatusModal=false;"></user-import-status-modal>
  </div>
</template>
<script>
import MainHeader from "@/components/comp/MainHeader";
import SubHeader from "@/components/comp/admin/SubHeader";
import BreadCrumb from "@/components/comp/admin/BreadCrumb";
import AddUserModal from "@/components/comp/modals/AddUserModal";
import ImportModal from "@/components/comp/modals/ImportModal";
import UserImportStatusModal from "@/components/comp/modals/UserImportStatusModal";
import Loader from "@/components/comp/Loader.vue";
import Global from "@/service/Global";
import AccountApi from "@/service/Account";
import swal from "sweetalert2";
const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});
export default {
  name: "UserImport",
  components: {
    MainHeader,
    SubHeader,
    BreadCrumb,
    AddUserModal,
    ImportModal,
    UserImportStatusModal,
    Loader,
  },
  data: function() {
    return {
      userImportStatus:[],
      showUserImportStatusModal: false,
      userFilter: null,
      searchField: '',
      userItems: [],
      fields: {
        username: { label: "Username", sortable: true },
        email: { label: "Email", sortable: true },
        mobile: { label: "Mobile", sortable: true },
        status:{ label: 'Status', sortable: false},
        actions: { label: "Actions", sortable: false }
      },
      currentPage: 1,
      perPage: 10,
      importList: [],
      isLoading: false,
      currentUser: null,
      showImportModal: false,
      subMenu: [
        {
          name: "DashBoard",
          link: "#/admin/addTest",
          icon: "fa fa-home px-2",
          active: ""
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
          icon: "fa fa-users px-2 ",
          active: "active"
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
          text: "User Import",
          href: "#/import",
          active: true
        }
      ]
    };
  },
  async mounted() {
    // this.$root.$children.find(child => { return child.$options.name === "name"; });
    // console.log("Images ", this.$refs["images[0]"].src);
    // this.$refs["images[0]"].src="100.png"
    // console.log("Images ", this.$refs["images[0]"].src);
    this.isLoading = true;
    // console.log("Getting refresh token");
    await Global.onPageRefresh(this.$session, this.$router);
    // console.log("Getting User info");
    await this.getUserInfo();
    // console.log("Get All Users");
    // await this.getAllUsers();
    this.isLoading = false;
  },
  watch:{
    // userFilter: function(){
    //   if(this.userFilter!='' || this.userFilter!=null){
    //   this.perPage = 10;
    //   this.currentPage = 1
    //   }
    // }
  },
  methods: {
    searchContact: function(){
      this.isLoading=true;
      return new Promise((resolve, reject) => {
          Global.getUserInfo(this.searchField)
            .then(response => {
              this.isLoading=false;
              if(response.data.length==0){
                toast({
                  type: "info",
                  title: "User not found!"
                });
              }else{
                this.userItems.splice(0);
                this.userItems.push(response.data);
              }
              resolve(response);
            })
            .catch(err => {
              this.isLoading=false;
              toast({
                type: "error",
                title: "User Not found!"
              });
              reject(err);
            });
      });
    },
    onFiltered (filteredItems) {
      this.perPage = filteredItems.length
      this.currentPage = 1
    },
    deleteUser(userId){
      // console.log('Delete User');
      return new Promise((resolve, reject) => {
        swal({
          title: "Are you sure?",
          text: "You wants to delete this user!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Submit test!"
        }).then(result => {
          if (result.value) {
              this.isLoading=true;
              AccountApi.deleteUser(userId)
                  .then((response) => {
                    toast({
                      type: "success",
                      title: response.data
                    });
                    this.isLoading=false;
                    // this.getAllUsers();
                     this.userItems.splice(0);
                    this.searchContact();
                    resolve(response);
                  })
                  .catch((err) => {
                    toast({
                      type: "error",
                      title: "Deleting the user failed!"
                    });
                    this.isLoading=false;
                    reject(err);
                  });
          }
        });
      });
    },
    activateUser(userId){
      // console.log('Activate User');
      this.isLoading=true;
      return new Promise((resolve, reject) => {
        AccountApi.activateUser(userId)
          .then(response => {
            toast({
              type: "success",
              title: response.data
            });
            this.isLoading = false;
            // this.getAllUsers();
            this.searchContact();
            resolve(response);
          })
          .catch(err => {
            toast({
              type: "error",
              title: "User Activation failed!"
            });
            this.isLoading = false;
            reject(err);
          });
      });
    },
    deactivateUser(userId) {
      // console.log("Activate User");
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        AccountApi.deactivateUser(userId)
          .then(response => {
            toast({
              type: "success",
              title: response.data
            });
            this.isLoading = false;
            // this.getAllUsers();
            this.searchContact();
            resolve(response);
          })
          .catch(err => {
            toast({
              type: "error",
              title: "User deactivation failed!"
            });
            this.isLoading = false;
            reject(err);
          });
      });
    },
    remove(index) {
      toast({
        type: "success",
        title: "User Deleted"
      });
      this.userItems.splice(index, 1);
    },
    handleSelectedFile(convertedData) {
      // console.log(convertedData);
      this.importList.splice(0);
      if (convertedData && convertedData.body) {
        var userData = convertedData.body;
        if (
          userData[0].hasOwnProperty("Name") &&
          userData[0].hasOwnProperty("Contact") &&
          userData[0].hasOwnProperty("Password")
        ) {
          for (var i = 0; i < userData.length; i++) {
            this.importList.push({
              username: userData[i].Name,
              contact: userData[i].Contact,
              password: userData[i].Password,
            });
          }
          this.showImportModal = true;
          // console.log("import");
        } else {
          toast({
            type: "error",
            title: "File does not matches the given format"
          });
        }
      }
    },
    // showBulkImport(importList){
    //  this.data.list=importList;
    //  this.showImportModal=true;
    // },
    listImport: function(data) {
      this.isLoading == true;
      // for (let i = 0; i < data.length; i++) {
        AccountApi.bulkImport(data)
          .then(response => {
            toast({
              type: "success",
              title: "User Inserted Successfully"
            });
            console.log(response);
            this.userImportStatus=response.data;
            // this.getAllUsers();
            this.showUserImportStatusModal=true;

            // swal({
            //     title: "Import Status",
            //     // text: "You wants to delete this user!",
            //     text: Json.stringresponse.data,
            //     type: "info",
            //     showCancelButton: false,
            //     confirmButtonColor: "#3085d6",
            //     // cancelButtonColor: "#d33",
            //     confirmButtonText: "Ok"
            //   }).then(result => {
            //     if (result.value) {
            //       this.getAllUsers();
            //       this.isLoading = false;
            //     }
            //   });


          })
          .catch(err => {
            toast({
              type: "error",
              title: err.response.data
            });
            console.log(err);
            this.isLoading = false;
          });
      // }
      this.showImportModal = false;
    },
    userInsert: function(data) {
      // console.log("user signed up");
      this.isLoading = true;
      // this.userItems.push(data);
      // this.searchField=data.username;
      AccountApi.register(data)
        .then(response => {
          toast({
            type: "success",
            title: "User Inserted Successfully"
          });
          // console.log(response);
          // this.getAllUsers();
          // this.searchContact();
          this.isLoading = false;
        })
        .catch(err => {
          toast({
            type: "error",
            title: err.response.data
          });
          console.log(err);
          this.isLoading = false;
        });
    },
    getAllUsers: function() {
      // console.log("Get all Users");
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        AccountApi.getAllUsers()
          .then(response => {
            this.isLoading = false;
            this.userItems.splice(0);
            for (var i = 0; i < response.data.length; i++)
              this.userItems.push(response.data[i]);
              // this.userItems.sort(
              //   function (a, b) {
              //     return a.username.localeCompare(b.username);
              // }
              // );
              this.isLoading=false;
            // console.log("Response Received", this.userItems);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "Receiving Users failed"
            });
            reject(err);
          });
      });
    },
    close: function() {
      this.showImportModal = false;
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

<style >
.deactivate-btn {
  background-color: firebrick;
  border: none;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
}
.trash-btn {
  background-color: firebrick;
  border: none;
  border-radius: 20px;
  font-weight: bold;
}
.activate-btn {
  background-color: teal;
  border: none;
  border-radius: 20px;
  font-size: 13px;
  font-weight: bold;
}
.is-isActive {
  display: none;
}
.add-btn {
  background-color: #00a1b5;
  border: 1px solid #00a1b5;
}
.add-btn:hover {
  background-color: #00a1b5;
  color: white;
  border: 1px solid #00a1b5;
}
.xlsx-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid #00a1b5;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: 0;
  margin: 0;
  padding: 7px 9px;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
  background-color: #00a1b5;
}
</style>
