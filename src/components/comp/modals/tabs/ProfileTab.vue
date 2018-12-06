<template>
<div  style="margin-top:40px;">
  <b-container fluid class="d-flex justify-content-center">
  <form style="width:350px;" @submit.prevent="updateDetails">
        <b-row>
      <b-col>
         <label style="font-weight:bold">First Name </label>
           <b-form-input type="text" class="edit"  v-model="user.firstName" v-bind:class="{error: $v.user.firstName.$error, valid: $v.user.firstName.$dirty && !$v.user.firstName.$invalid}"></b-form-input>
                  <div v-if="$v.user.firstName.$dirty">
                  <p class="error-message" v-if="!$v.user.firstName.required">Field is required</p>
                   <p class="error-message" v-if="$v.user.firstName.required && !$v.user.firstName.NameValidate">Invalid</p>
           </div>
      </b-col>
        </b-row>
      <br>
        <b-row>
      <b-col>
         <label style="font-weight:bold">Last Name</label>
         <b-form-input type="text" class="edit"  v-model="user.lastName" v-bind:class="{error: $v.user.lastName.$error, valid: $v.user.lastName.$dirty && !$v.user.lastName.$invalid}"></b-form-input>
                  <div v-if="$v.user.$dirty">
                  <p class="error-message" v-if="!$v.user.lastName.required">Field is required</p>
                   <p class="error-message" v-if="$v.user.lastName.required && !$v.user.lastName.NameValidate">Invalid</p>
           </div>
      </b-col>
        </b-row>
        <br>
    <!-- <b-row>
      <b-col>
         <label style="font-weight:bold">Display Name</label>
         <b-form-input type="text" class="edit"  v-model="user.dname" v-bind:class="{error: $v.user.dname.$error, valid: $v.user.dname.$dirty && !$v.user.dname.$invalid}"></b-form-input>
                  <div v-if="$v.user.dname.$dirty">
                  <p class="error-message" v-if="!$v.user.dname.required">Field is required</p>
                   <p class="error-message" v-if="$v.user.dname.required && !$v.user.dname.NameValidate">Invalid</p>
           </div>
      </b-col>
        </b-row>
        <br>
     <b-row>
      <b-col>
         <label style="font-weight:bold">Gender</label>
          <b-form-radio-group v-model="selected"
                          :options="options"
                          name="radioInline" style="margin-left:20px;font-size:18px;">
      </b-form-radio-group>
      </b-col>
        </b-row>
        <br> -->
        <b-row>
        <b-col>
           <b-button class="btn-sm btn-edit" type="submit">Save</b-button>
           <!-- <div class="pull-right">
           <b-button class="btn-sm btn-edit" @click="clearDetails()">Reset</b-button>
           </div> -->
        </b-col>
    </b-row>
      </form>
  </b-container>
</div>
</template>

<script>
import NameValidate from "@/validate/NameValidate";
import AccountApi from "@/service/Account";
import { required,minLength} from "vuelidate/lib/validators";
import swal from "sweetalert2";
const toast = swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer:5000
          });
export default {
props:['fname', 'lname'],
name:'ProfileTab',
components:{

},
validations: {
     user:{
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
data:function(){
  return{
     user:{
       firstName:this.fname,
       lastName:this.lname,
     },
  }
},

methods:{
  updateDetails:function(user){
     this.$v.$touch();
     if (this.$v.$invalid) {
        console.log("error");
      }else{
        let data={
        firstName:this.user.firstName,
        lastName:this.user.lastName,
        userId:this.$session.get("current_user").id
        }
        return new Promise((resolve, reject) => {
            // console.log("details",data);
            AccountApi.nameUpdate(data)
              .then(response=>{
                  // console.log(response);
                   toast({
                         type: "success",
                         title: "Success"
                        });
                  // this.clearDetails();
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
    this.user.firstName='',
    this.user.lastName='',
    // this.user.dname='',
    this.$v.$reset();
  }
}
}
</script>

<style scoped>
.edit{
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
