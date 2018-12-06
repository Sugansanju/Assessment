<template>
<div>
  <div class="login-screen"></div>
  <b-container fluid style="margin-top:20px;">
    <b-row>
      <b-col style="margin-top: 10%;">
        <div class="login pull-right" style="background-color: #ffffff; padding: 2vh; border-radius: 10px; opacity: .9;">
          <form @submit.prevent="login()">
            <div class="text-center">
             <!-- <h2><b>Dexter Academy</b></h2> -->
             <!-- <img src="/static/images/da-logo.png" /> -->
             <br>
             <img src="/static/images/exams.png" />
            <br><br>
                 <b><p style="color: royalblue">Login</p></b>
                 </div>
               <input  autofocus class="form-control input" type="text"  placeholder="Email/Mobile" v-model="user.contact">
               <input  class="form-control input" type="password" autofocus placeholder="Password" v-model="user.password">
                <b-button autofocus class="btn-sm btn-block login-btn" type="submit">
                  Login
                </b-button>
          </form>
           </div>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import Global from "@/service/Global";
import AccountApi from "@/service/Account";
import swal from "sweetalert2";
const toast = swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer:5000
          });
export default {
data:function(){
  return{
    user: {
      contact: "",
      password: "",
    },
    currentUser:null,
  }
},
mounted(){
  if(this.$session.exists()){
    this.$router.push('/admin/addTest');
  }
},
methods:{
login:function(){
    // console.log('Login ', this.user);
    this.isLoading=true;
  return new Promise((resolve, reject) => {
    AccountApi.login(this.user)
      .then(response => {
        // console.log(response);
        this.$session.start();
        this.$session.set("access_token", response.data.access_token);
        this.$session.set("refresh_token", response.data.refresh_token);
        this.$session.set("contact", this.user.contact);
        this.getUserInfo()
        toast({
          type: "success",
          title: "Signed in successfully"
        });
        this.isLoading=false;
        resolve(response);
      })
      .catch(err => {
        console.log(err);
        swal({
          type: "error",
          title: "Bad credentials"
        });
        reject(err);
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
            this.$router.replace(this.$route.query.redirect || "/admin/addTest");
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      }
    });
  }

 }
}
</script>

<style>
.input {
  font-size: 15px;
  margin: 15px 0;
  padding: 10px 20px;
  border-color: none;
  border-radius: 25px;
  background-color: #eee;
}
.login-screen {
    background-image: url('/static/images/admin.jpeg');
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
.login-btn{
  background-color:#0766EB;
   /* background: #1b5a7c; */
   color:#ffff;
   border-radius: 25px;
   border-color: #0000;
  font-weight:bold;
  font-size:18px;
}
.login {
    width: 320px;
    color: #fff;
}
.btn-secondary:hover {
    color:#ffff;
    background: #0766EB;
    border-color: #0000;
}
</style>
