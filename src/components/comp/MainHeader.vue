<template>
<div>
  <b-navbar toggleable="md" class="nav" >

  <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">
       <!-- <b-img src="/static/images/logo.jpg" height="56" width="130"/> -->
       <b-img src="/static/images/exams.svg" height="56"/>
     </b-navbar-brand>
     <!-- <b-navbar-toggle target="nav_dropdown_collapse"></b-navbar-toggle> -->
    <b-collapse is-nav id="nav_dropdown_collapse" v-if="$session.exists('current_user')">
        <b-navbar-nav class="ml-auto"  >
             <!-- <div class="pull-right"> -->
          <b-nav-item-dropdown right>
            <template slot="button-content" v-if="currentUser!=null">
            {{currentUser.username!=null?currentUser.username:(currentUser.email!=null?currentUser.email:'User')}}
            </template>
            <div v-show="isAdmin">
             <b-dropdown-item @click="adminPage"  v-show="!menuToggle">
                <i class="fa fa-exchange px-2"  aria-hidden="true"></i>Login as admin
             </b-dropdown-item>
             <b-dropdown-item @click="candidatePage" v-show="menuToggle">
                <i class="fa fa-exchange px-2"  aria-hidden="true"></i>Login as candidate
             </b-dropdown-item>
            </div>

            <b-dropdown-item v-b-modal.userSetting>
                <i class="fa fa-cog px-2"  aria-hidden="true"></i>Settings
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
             <b-dropdown-item @click="logout">
             <i class="fa fa-sign-out px-2" aria-hidden="true" ></i>Logout
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <!-- </div> -->
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <user-setting-modal :currentUser="currentUser" :image="currentUser!=null?currentUser.avatar:null"></user-setting-modal>
    <loader v-if="isLoading"></loader>
</div>
</template>

<script>
import UserSettingModal from "@/components/comp/modals/UserSettingModal";
import Loader from "@/components/comp/Loader";
import swal from "sweetalert2";
import AccountApi from "@/service/Account";

const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});
export default {
  name: "MainHeader",
  components: {
    UserSettingModal,
    Loader
  },
  props: ["currentUser", 'image'],
  computed:{
    isAdmin: function(){
      if(this.currentUser != null){
        for(let i=0;i<this.currentUser.roles.length;i++){
          if(this.currentUser.roles[i].roleName=='ROLE_ADMIN'){
            return true;
          }
        }
        return false;
      }
    },
    menuToggle: function(){
      // console.log(this.$route.path.split('/')[1]);
      if(this.$route.path.split('/')[1]=='admin')
        return true;
     else
        return false;

    }
  },
  data: function(){
    return{
      isLoading: false,
    }
  },
  methods: {
    adminPage:function(){
       this.$router.replace(this.$route.query.redirect || "/admin/addTest");
    },
    candidatePage:function(){
       this.$router.replace(this.$route.query.redirect || "/candidate/dashboard");
    },
    logout: function() {
      // console.log(this.$session.id());
      this.isLoading = true;

      AccountApi.logout(this.$session.get("access_token"))
        .then(result => {
          toast({
            type: "success",
            title: "Signed Out successfully"
          });

// gapi.auth2.init({
//     'client_id': '281176553760-78goki7ni419ccqfvfhi1hp6ol6vfj9j.apps.googleusercontent.com',
//     'scope': 'profile email',
// })
// .then(function(a, b) {
//             var auth2 = gapi.auth2.getAuthInstance();
//             auth2.signOut().then(function () {
//               auth2.disconnect();
//               console.log('User signed out.');
//             });
//             auth2.disconnect();
// });
          handleSignOutClick();
          this.$session.clear();
          this.$session.destroy();

          window.location.href="#/";
          this.isLoading = false;

        })
        .catch(err => {
          console.log(err);
          toast({
            type: "error",
            title: "Signing Out failed"
          });
          this.isLoading = false;

        });

    }
  }
};
</script>

<style scoped>
.nav {
  background-color: white;
  border: 1px solid #eeee;
  /* background-color:#252f3e; */
  /* padding:0 0 0 0; */
}
</style>
