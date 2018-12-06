<template>
<div>
 <div class="login-screen"></div>
  <b-container fluid style="margin-top:20px;">
    <b-row>
      <b-col style="margin-top: 10%;">
        <div class="login pull-right" style="background-color: #ffffff; padding: 2vh; border-radius: 10px; opacity: .9;">
          <form @submit.prevent="passwordReset">
            <div class="text-center">
             <br>
             <img src="/static/images/exams.svg" width="100%"/>
            <br><br>
            </div>
            <div class="text-center" v-if="redirect" >
                 <b><p style="color: royalblue">Reset Password</p></b><br>
               <input  class="form-control input"
                type="text"
                autofocus
                v-model="user.contact"
                placeholder="Email">
                <br>
                <b-button autofocus class="btn-sm btn-block login-btn" @click="passwordReset">
                  Reset
                </b-button>
            </div>
            <div class="text-center" v-if="!redirect">
                 <b><p style="color:#a8acbc;">Check your email for a link to reset your password</p></b>
                <b-button autofocus class="btn-sm btn-block login-btn" @click="login">
                    Back to Login
                </b-button>
            </div>
            </form>
           </div>
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
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
      contact: ""
    },
    redirect:true,
    back:true,
  }
},
methods:{
  login:function(){
    this.$router.push('/');
  },
  passwordReset:function(){
    AccountApi.passwordReset(this.user)
    .then(response=>{
      this.$session.start();
      this.$session.set("contact",this.user.contact);
      this.redirect=false;
    })
  }
}
}
</script>

<style scoped>
.input {
  font-size: 15px;
  margin: 15px 0;
  padding: 10px 20px;
  border-color: none;
  border-radius: 25px;
  background-color: #eee;
}
.login-screen {
    background-image: url('/static/images/exam-success.jpg');
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
  /* background-color:#3ec0da; */
   /* background: #1b5a7c; */
   background-color:#0766EB;
   /* color:#1b5a7c; */
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
    color: #ffff;
    background: #0766EB;
    border-color: #0000;
}
.Blink {
  animation: blinker 0.5s cubic-bezier(.5, 0, 1, 1) infinite alternate;
}
@keyframes blinker {
  from { opacity: 1; }
  to { opacity: 0; }
}
</style>
