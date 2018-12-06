<template>
<div  style="margin-top:40px;">
    <b-container fluid  class="d-flex justify-content-center">
  <form style="width:350px;" @submit.prevent="securityUpdate">
      <div>
      <b-col>
         <label style="font-weight:bold">Old Password</label>
           <b-form-input type="password" class="box-edit" v-model="user.oldPassword" v-bind:class="{error: $v.user.oldPassword.$error, valid: $v.user.oldPassword.$dirty && !$v.user.oldPassword.$invalid}"></b-form-input>
                  <div v-if="$v.user.oldPassword.$dirty">
                  <p class="error-message" v-if="!$v.user.oldPassword.required">Field is required</p>
                   <p class="error-message" v-if="$v.user.oldPassword.required && !$v.user.oldPassword.minLength">Minimum 6 characters</p>
           </div>
      </b-col>
      </div>
      <br>
      <div >
      <b-col>
         <label style="font-weight:bold">New Password</label>
         <b-form-input type="password" class="box-edit" v-model="user.newPassword" v-bind:class="{error: $v.user.newPassword.$error, valid: $v.user.newPassword.$dirty && !$v.user.newPassword.$invalid}"></b-form-input>
                  <div v-if="$v.user.newPassword.$dirty">
                  <p class="error-message" v-if="!$v.user.newPassword.required">Field is required</p>
                   <p class="error-message" v-if="$v.user.newPassword.required && !$v.user.newPassword.minLength">Minimum 6 characters</p>
           </div>
      </b-col>
      </div>
      <br>
      <div >
      <b-col >
         <label style="font-weight:bold">Confirm Password</label>
       <b-form-input type="password" class="box-edit" v-model="user.cPassword" v-bind:class="{error: $v.user.cPassword.$error, valid: $v.user.cPassword.$dirty && !$v.user.cPassword.$invalid}"></b-form-input>
                  <div v-if="$v.user.cPassword.$dirty">
                  <!-- <p class="error-message" v-if="!$v.user.cPassword.required">Field is required</p> -->
                   <p class="error-message" v-if="!$v.user.cPassword.sameAsPassword">Password must be identical</p>
           </div>
      </b-col>
      </div>
        <br>
        <div>
        <b-col>
           <b-button class="btn-sm btn-edit" type="submit">Save</b-button>
           <!-- <div class="pull-right">
           <b-button class="btn-sm btn-edit" @click="clearuser">Reset</b-button>
           </div> -->
        </b-col>
    </div>
      </form>
  </b-container>
</div>
</template>

<script>
import { required,sameAs,minLength} from "vuelidate/lib/validators";
import AccountApi from "@/service/Account";
import swal from "sweetalert2";
const toast = swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer:5000
          });
export default {
name:'SecurityTab',
components:{

},
validations: {
     user:{
        oldPassword:{
         required,
         minLength:minLength(6)
         },
        newPassword:{
         required,
         minLength:minLength(6)
        },
         cPassword:{
          sameAsPassword: sameAs('newPassword')
        },
     }
  },
data:function(){
  return{
    user:{
      oldPassword:'',
      newPassword:'',
      cPassword:''
    }
  }
},
methods:{
  securityUpdate:function(){
   this.$v.$touch();
     if (this.$v.$invalid) {
        console.log("error");
      }else{
        let data={
        oldPassword:this.user.oldPassword,
        newPassword:this.user.newPassword,
        userId:this.$session.get("current_user").id
        }
        return new Promise((resolve, reject) => {
            // console.log("details",data);
            AccountApi.resetPassword(data)
              .then(response=>{
                  // console.log(response);
                    toast({
                         type: "success",
                         title: "Password Changed SuccessFully"
                        });
                        this.clearDetails();
                 resolve(response);
              })
              .catch(err=>{
                reject(err);
                console.log(err);
              });
           });
      }
  },
  clearDetails:function(){
    this.user.oldPassword='',
    this.user.newPassword='',
    this.user.cPassword='',
    this.$v.$reset();
  }
}
}
</script>

<style scoped>
.box-edit{
border:1px solid #00A1B5;
border-radius:18px;
}
.btn-edit{
  width:85px;
  border-radius:20px;
  background-color:#00A1B5;
  font-size:15px;
  font-weight:bold;
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
