<template>
<div>
 <div class="login-screen"></div>
  <b-container fluid style="margin-top:20px;">
    <b-row>
      <b-col cols="5">
      </b-col>
      <b-col style="margin-top: 10%;">
        <div class="login align-self-center" style="background-color: #ffffff; padding: 2vh; border-radius: 10px; opacity: .9;">
          <form @submit.prevent="changePassword">
            <div class="text-center">
             <br>
             <img src="/static/images/exams.svg" width="100%"/>
            <br><br>
            </div>
            <div class="text-center">
                 <b><p style="color: royalblue">OTP Verify</p></b>
                 <div >
                    <!-- <p style="color:#a4a4a4;">{{username}} </p> -->
                 </div><br>
               <input  class="form-control input"
                type="password"
                autofocus
                v-model="user.otp"
                placeholder="OTP">
                 <!-- <input  class="form-control input"
                type="password"
                autofocus
                v-model="user.confirmPassword"
                placeholder="Confirm Password"
                 v-bind:class="{error: $v.user.confirmPassword.$error, valid: $v.user.confirmPassword.$dirty && !$v.user.confirmPassword.$invalid}">
                     <div v-if="$v.user.$dirty">
                  <p class="error-message" v-if="!$v.user.confirmPassword.sameAsPassword">Passwords must be identical.</p>
           </div>
                <br> -->
                 <!-- <b><p class="" style="color: royalblue;cursor:pointer;text-align:right;font-size:12px" @click="redirect=false">Forget Password ?</p></b> -->
                <b-button autofocus class="btn-sm btn-block login-btn" type="submit">
                Verify
                </b-button>
            </div>
            </form>
           </div>
      </b-col>
      <b-col cols="5">
      </b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import { required} from 'vuelidate/lib/validators'
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
    user:{
      otp:''
    }
}
},
validations: {
    user:{
      otp: {
      required,
    },
    }
  },
methods:{
   changePassword:function(user){
         this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      }else{

      }
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
    /* background: rgba(0,0,0, 0.5); */
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.login-btn{

   background-color:#0766EB;

   color:#ffff;
   border-radius: 25px;
   border-color: #0000;
  font-weight:bold;
  font-size:18px;
}
.login {
    width: 320px;
    color: #fff;
    border:2px solid royalblue;
    /* text-align:center; */
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
error {
  border-color: red;
}
.error-focus {
  border-color: red;
}
.error-message {
  color: red;
  font-size: 13px;
  margin: 5px 0 0 5px;
}
</style>
