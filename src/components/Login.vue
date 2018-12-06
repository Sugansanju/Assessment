<template>
<div>
 <div class="login-screen"></div>
 <b-container style="margin-top:20px;">
   <b-container fluid>
     <b-row>
       <b-col cols="2">
       </b-col>
      <b-col style="margin-top: 10%;">
        <div class="login" style="background-color: #ffffff; padding: 2vh; border-radius: 10px; opacity: .9;">
          <form @submit.prevent="userLogin">
            <div class="text-center">
             <br>
             <img src="/static/images/exams.svg" width="400"/>
            <br><br>
            </div>
            <b-row style="margin-top:30px;">
            <b-col>
               <div class="text-center" style="padding:30px;" v-if="redirect">
                 <b><p style="color: royalblue">Login</p></b>
               <input  class="form-control input"
                type="text"
                autofocus
                v-model="user.contact"
                placeholder="Email/Mobile" />
                 <input  class="form-control input"
                type="password"
                autofocus
                v-model="user.password"
                placeholder="Password" />
                <div class="pull-right" style="color: royalblue;cursor:pointer;font-size:12px">
                <!-- <b><p @click="registerPage">Register</p></b> -->
                 <b><p @click="pageRedirect">Forget Password ?</p></b>
                </div>
                <b-button autofocus class="btn-sm btn-block login-btn" type="submit">
                  Login
                </b-button>
               </div>
            </b-col>
            <div style="margin-top:100px;padding:30px;margin-left:20px;">
            <i class="fa fa-hand-o-right fa-2x mt-2 Blink" style="color:blue;" aria-hidden="true"></i>
            </div>
            <b-col>
              <div class="text-center" style="margin-left:30px;margin-top:43px;padding:30px;padding-left:0px;">
              <b-button variant="outline-success" class="register mb-4" style="margin-left:-75px;">Register </b-button>
               <div class="g-signin2 mt-2" style="margin-left:25px;" data-onsuccess="handleSignInClick" data-theme="dark"></div>
               <br>
                <fb-signin-button class="loginBtn loginBtn--facebook mt-2" style="margin-left:25px;" :params="fbSignInParams" @success="onSignInSuccess" @error="onSignInError">Sign in </fb-signin-button>
               <div id="status"></div>
              </div>
            </b-col>
            </b-row>
            </form>
           </div>
      </b-col>
      <b-col cols="2">
      </b-col>
    </b-row>
   </b-container>
 </b-container>
</div>
  <!-- <b-container fluid style="margin-top:20px;">
    <b-row>
      <b-col style="margin-top: 10%;">
        <div class="login pull-right" style="background-color: #ffffff; padding: 2vh; border-radius: 10px; opacity: .9;">
          <form @submit.prevent="userLogin">
            <div class="text-center">
             <br>
             <img src="/static/images/exams.svg" width="100%"/>
            <br><br>
            </div>
            <div class="text-center" v-if="redirect">
                 <b><p style="color: royalblue">Login</p></b>
               <input  class="form-control input"
                type="text"
                autofocus
                v-model="user.contact"
                placeholder="Email/Mobile" />
                 <input  class="form-control input"
                type="password"
                autofocus
                v-model="user.password"
                placeholder="Password" />
                <div class="d-flex justify-content-between" style="color: royalblue;cursor:pointer;font-size:12px">
                <b><p @click="registerPage">Register</p></b>
                 <b><p @click="pageRedirect">Forget Password ?</p></b>
                </div>
                <b-button autofocus class="btn-sm btn-block login-btn" type="submit">
                  Login
                </b-button>
                <hr />
                <div class="text-center" style="color:#000;font-size:12px;"><b >Not a Member yet ? Sign Up Here ! </b><br><i class="fa fa-hand-o-down fa-2x mt-2 Blink" style="color:blue;" aria-hidden="true"></i></div>
               <div class="d-flex justify-content-between">
               <div class="g-signin2 mt-2" style="margin-left:25px;" data-onsuccess="handleSignInClick" data-theme="dark"></div>
                <fb-signin-button class="loginBtn loginBtn--facebook mt-2" :params="fbSignInParams" @success="onSignInSuccess" @error="onSignInError">Sign in </fb-signin-button>
               <div id="status"></div>
               </div>
            </div>
            </form>

           </div>
      </b-col>
    </b-row>
  </b-container> -->
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
      contact: "",
      password: "",
    },
    fbSignInParams: {
     scope: 'email,user_likes,public_profile ',
     return_scopes: true
   },
    redirect:true,
    back:true,
  }
},
methods:{
    pageRedirect:function(){
        this.$router.push('/password_reset');
      },
    registerPage:function(){
      this.$router.push('/candidate/register');
    },
      onSignInSuccess (response) {
     console.log("OAuth Code is ",response.authResponse.accessToken);
     AccountApi.faceBookStatus(response.authResponse.accessToken);
     var access_token = response.authResponse.accessToken;
    //  window.location.href = "#/account/activate/facebook/" + access_token;
    window.location.href = "#/account/facebook/" + access_token;
     FB.api('/me',dude => {
       console.log(`Good to see you, ${dude.name}.`)

     })

   },
   onSignInError (error) {
     console.log('OH NOES', error)
   },
userLogin:function(){
//  console.log('Login ', this.user);
    this.isLoading=true;
    AccountApi.userLogin(this.user)
      .then(response => {
        // console.log(response);
        this.$session.start();
        this.$session.set("access_token", response.data.access_token);
        this.$session.set("refresh_token", response.data.refresh_token);
        this.$session.set("contact", this.user.contact);
        toast({
          type: "success",
          title: "Signed in successfully"
        });
        this.isLoading=false;
          this.$router.replace(this.$route.query.redirect || "/candidate/dashboard");
      })
      .catch(err => {
        console.log(err);
        swal({
          type: "error",
          title: "Bad credentials"
        });
        return false;
      });

  },
 },
mounted(){
    if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }
  if(this.$session.exists()){
    this.$router.push('/candidate/dashboard');
  }
},
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
.fb-signin-button {
 /* This is where you control how the button looks. Be creative! */
 display: inline-block;
 padding: 4px 8px;
 border-radius: 3px;
 background-color: #4267b2;
 color: #fff;
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
    width: 800px;
    background-color: rgba(126, 123, 215, 0.2);
    /* color: #fff; */
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
.loginBtn {
  box-sizing: border-box;
  position: relative;
  margin: 0.2em;
  cursor:pointer;
  padding: 0 15px 0 46px;
  border: none;
  width:120px;
  text-align: center;
  line-height:37px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size:13px;
  font-weight:bold;
  color: #FFF;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0,0,0,0.1);
}


/* Facebook */
.loginBtn--facebook {
  background-color: #4C69BA;
  background-image: linear-gradient(#4C69BA, #3B55A0);
  /*font-family: "Helvetica neue", Helvetica Neue, Helvetica, Arial, sans-serif;*/
  text-shadow: 0 -1px 0 #354C8C;
}
.loginBtn--facebook:before {
  border-right: #364e92 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png') 6px 6px no-repeat;
}
.loginBtn--facebook:hover,
.loginBtn--facebook:focus {
  background-color: #5B7BD5;
  background-image: linear-gradient(#5B7BD5, #4864B1);
}
.register{
   width:120px;
   box-sizing: border-box;
  position: relative;
  margin: 0.2em;
  cursor:pointer;
  padding:0px;
  font-weight:bold;
  text-align: center;
  line-height:37px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size:13px;
}
</style>
