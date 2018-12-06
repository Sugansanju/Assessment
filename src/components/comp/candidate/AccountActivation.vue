<template>
    <b-container style="margin-top: 20vh;" class="text-center">
        <b-row v-show="!isUserActivated && isUserActivated!=null">
            <b-col class="d-flex justify-content-center">

                <form @submit.prevent="userRegister">
                    <div>
               <img src="/static/images/exams.svg" width="200vh"/>
               <hr>
               <b style="color:royalblue;">Set account password</b>
              </div>
                 <input  class="form-control input"
                type="password"
                autofocus
                v-model="user.password"
                placeholder="Password">
                 <input  class="form-control input"
                type="password"
                autofocus
                v-model="user.confirmPassword"
                placeholder="Confirm Password">
                <b-button autofocus class="btn-sm btn-block login-btn" type="submit">
                  Register
                </b-button>
                </form>
            </b-col>
        </b-row>
        <b-row v-show="isUserActivated">
            <b-col>
                <h1>Loging to your account !</h1>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import Account from "@/service/Account";
import swal from "sweetalert2";
const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});
export default {
    props:['gtoken'],
    async mounted(){
        this.user.gtoken = this.gtoken;
        await this.checkUserStatus();
    },
    data: function(){
        return{
            isUserActivated: null,
            user:{
                contact: "",
                password:"",
                confirmPassword:"",
                gtoken:"",
            }
        }
    },
    methods:{
        checkUserStatus: function(){
            // console.log("Checking user status");
            return new Promise((resolve, reject) => {
            Account.googleStatus(this.gtoken)
                .then(response => {
                    if(response.data!=null && response.data!=""){
                        if(response.data.password!=null && response.data.password!=""){
                            this.isUserActivated = true;
                            this.user.contact = response.data.username;
                            this.user.password = response.data.password;
                            this.loginUser();
                        }else{
                            this.isUserActivated = false;
                        }
                    }else{
                        this.isUserActivated = false;
                    }
                resolve(response);
                // console.log('Success : ', response)
                })
                .catch(err => {
                reject(err);
                console.log('Error : ',err);
                });
            });
        },
        userRegister: function(){
            if(this.user.password==this.user.confirmPassword){
            return new Promise((resolve, reject) => {
            Account.googleRegister(this.user)
                .then(response => {
                    if(response.data!=null && response.data!=""){
                        this.isUserActivated = true;
                        this.user.contact = response.data.contact;
                        this.user.password = response.data.password;
                        this.loginUser();
                    }
                resolve(response);
                // console.log('Success : ', response)
                })
                .catch(err => {
                reject(err);
                console.log('Error : ',err);
                });
            });
            }else{
            toast({
                type: "error",
                title: "The passwords are not matching!"
                });
            }

        },
        loginUser: function(){
            return new Promise((resolve, reject) => {
            Account.login(this.user)
                .then(response => {
                    this.$session.start();
                    this.$session.set("access_token", response.data.access_token);
                    this.$session.set("refresh_token", response.data.refresh_token);
                    this.$session.set("contact", this.user.contact);
                    this.$router.replace(this.$route.query.redirect || "/candidate/dashboard");
                    resolve(response);
                    // console.log('Success : ', response)
                })
                .catch(err => {
                reject(err);
                console.log('Error : ',err);
                });
            });
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
/* .login {
    width: 320px;
    color: #fff;
} */
.btn-secondary:hover {
    color: #ffff;
    background: #0766EB;
    border-color: #0000;
}
</style>

