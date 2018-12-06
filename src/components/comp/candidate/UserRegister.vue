<template>
<div>
 <div class="login-screen"></div>
  <b-container fluid style="margin-top:20px;">
    <b-row>
      <b-col style="margin-top: 10%;">
        <div class="login pull-right" style="background-color: #ffffff; padding: 2vh; border-radius: 10px; opacity: .9;">
          <form @submit.prevent="userRegister">
            <div class="text-center">
             <br>
             <img src="/static/images/exams.svg" width="100%"/>
            <br><br>
            </div>
            <div class="text-center"   v-if="redirect">
                 <b><p style="color: royalblue">Register</p></b><br>
              <input  class="form-control input"
                type="text"
                autofocus
                v-model="user.contact"
                placeholder="Email/Mobile" v-bind:class="{error: $v.user.contact.$error, valid: $v.user.contact.$dirty && !$v.user.contact.$invalid}">
                <div v-if="$v.user.contact.$dirty">
                  <p class="error-message" v-if="!$v.user.contact.required">Field is required</p>
                   <p class="error-message" v-if="$v.user.contact.required && !$v.user.contact.ContactValidate">Invalid</p>
           </div>
               <input  class="form-control input"
                type="text"
                autofocus
                v-model="user.username"
                placeholder="User Name" v-bind:class="{error: $v.user.username.$error, valid: $v.user.username.$dirty && !$v.user.username.$invalid}">
               <div v-if="$v.user.username.$dirty">
                  <p class="error-message" v-if="!$v.user.username.required">Field is required</p>
                   <p class="error-message" v-if="$v.user.username.required && !$v.user.username.NameValidate">Invalid</p>
              </div>
              <input  class="form-control input"
                type="text"
                autofocus
                v-model="user.firstName"
                placeholder="First Name" v-bind:class="{error: $v.user.firstName.$error, valid: $v.user.firstName.$dirty && !$v.user.firstName.$invalid}">
               <div v-if="$v.user.firstName.$dirty">
                  <p class="error-message" v-if="!$v.user.firstName.required">Field is required</p>
                   <p class="error-message" v-if="$v.user.firstName.required && !$v.user.firstName.NameValidate">Invalid</p>
              </div>
              <input  class="form-control input"
                type="text"
                autofocus
                v-model="user.lastName "
                placeholder="Last Name" v-bind:class="{error: $v.user.lastName.$error, valid: $v.user.lastName.$dirty && !$v.user.lastName.$invalid}">
                   <div v-if="$v.user.lastName.$dirty">
                  <p class="error-message" v-if="!$v.user.lastName.required">Field is required</p>
                   <p class="error-message" v-if="$v.user.lastName.required && !$v.user.lastName.NameValidate">Invalid</p>
              </div>
                <br>
                <b-button autofocus class="btn-sm btn-block login-btn" type="submit">
                  Register
                </b-button>
            </div>
              <div class="text-center" v-if="mailLogin">
                 <b><p style="color:#a8acbc;">Check your email for a link to reset your password</p></b>
                <b-button autofocus class="btn-sm btn-block login-btn" @click="login">
                    Back to Login
                </b-button>
            </div>
             <div class="text-center" v-if="otpLogin">
                 <b><p style="color:#a8acbc;">Check your mobile for a OTP to reset your password</p></b>
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
import NameValidate from "@/validate/NameValidate";
import AccountApi from "@/service/Account";
import ContactValidate from "@/validate/ContactValidate";
import EmailValidate from "@/validate/EmailValidate";
import { required,minLength} from "vuelidate/lib/validators";
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
      username:"",
      firstName:"",
      lastName:""
    },
  redirect:true,
  mailLogin:false,
  otpLogin:false,
  }
},
validations: {
     user:{
       contact:{
        ContactValidate,
         required,
       },
       username:{
         NameValidate,
         required
         },
       firstName:{
         NameValidate,
         required
         },
        lastName:{
          NameValidate,
         required
        },

     }
  },
methods:{
  userRegister: function() {
  this.isLoading = true;
   this.$v.$touch();
    if (this.$v.$invalid){
    console.log("error");
   }else{
    let data = {
      "contact": this.user.contact,
      "username": this.user.username,
      "firstName": this.user.firstName,
      "lastName": this.user.lastName,
      }
      console.log(data)
      AccountApi.userRegister(data)
        .then(response => {
          console.log(response.data)
          toast({
            type: "success",
            title: "User Inserted Successfully"
          });
          console.log(this.user.contact)
          if(/^([a-z0-9_\-.])+@([a-z0-9_\-.])+\.([a-z]{2,4})$/.test(this.user.contact))
          {
            this.redirect=false;
            this.mailLogin=true;
          }else {
            this.redirect=false;
            // this.otpLogin=true;
             this.$router.push("/otp_verify");
            console.log("mobile")
          }
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
   }
    },
     login:function(){
    this.$router.push('/');
  },
  // userRegister:function(){
  //   this.$v.$touch();
  //   if (this.$v.$invalid){
  //   console.log("error");
  //  }else{
  //   let data = {
  //     "contact": this.user.contact,
  //     "username": this.user.uname,
  //     "firstName": this.user.fname,
  //     "lastName": this.user.lname,
  //     }
  //     let config = {
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     };
  //     return new Promise((resolve, reject) => {
  //       axios.post("account/userRegister", data, config)
  //         .then((response) => {
  //           resolve(response);
  //           toast({
  //             type: "success",
  //             title: "Register successfully"
  //           });
  //           this.isLoading=false;
  //           // this.$router.push("/candidate/result");
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           reject(err);
  //           toast({
  //             type: "error",
  //             title: "Register failed"
  //           });
  //           this.isLoading=false;
  //         });
  //     });
  //   }
  // }
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
.error {
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
