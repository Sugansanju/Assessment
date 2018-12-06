<template>
<div  style="margin-top:40px;">
  <b-container fluid class="d-flex justify-content-center">
  <form style="width:350px;" @submit.prevent="updateContact">
        <b-row>
      <b-col>
            <label style="font-weight:bold">Email<i v-if="isEmail" class="fa fa-plus ml-2" aria-hidden="true" @click="isEmail=false"></i> </label>
            <!-- <div v-if="$session.exists('current_user').email"> -->
           <div v-for="(e, index) in $session.get('current_user').email" v-bind:key="index">
           <b-form-input type="text" class="edit" :value="e" readonly></b-form-input><br></div>
           <!-- </div> -->
            <b-form-input type="text" class="edit" v-if="!isEmail" v-model="contact"></b-form-input><br>
      </b-col>
        </b-row>
      <br>
        <b-row>
      <b-col>
         <label style="font-weight:bold">Mobile<i v-if="isMobile" class="fa fa-plus ml-2" aria-hidden="true" @click="isMobile=false"></i></label>
            <!-- <div v-if="$session.exists('current_user').mobile"> -->
           <div v-for="(e, index) in $session.get('current_user').mobile" v-bind:key="index">
           <b-form-input type="text" class="edit" :value="e" readonly></b-form-input><br>
           </div>
            <!-- </div> -->
         <b-form-input type="text" class="edit" v-if="!isMobile" v-model="contact"></b-form-input>
      </b-col>
        </b-row>
        <br>
        <br>
        <b-row>
        <b-col>
           <b-button class="btn-sm btn-edit" type="submit">Save</b-button>
           <!-- <div class="pull-right">
           <b-button class="btn-sm btn-edit" @click="clearContact">Reset</b-button>
           </div> -->
        </b-col>
    </b-row>
      </form>
  </b-container>
</div>
</template>

<script>
import { required,minLength} from "vuelidate/lib/validators";
import EmailValidate from "@/validate/EmailValidate";
import MobileValidate from "@/validate/MobileValidate";
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
name:'ContactTab',
components:{

},
// validations: {
//      contact:{
//        email:{
//          EmailValidate,
//          required
//          },
//         mobile:{
//           MobileValidate,
//           required
//         },

//      }
  // },
data:function(){

  return{
    contact:[],
    isMobile:true,
    isEmail:true
  }
},
methods:{
  updateContact:function(){
        let data={
        contact:this.contact,
        userId:this.$session.get("current_user").id
        }
        return new Promise((resolve, reject) => {
            // console.log("details",data);
            AccountApi.contactUpdate(data)
              .then(response=>{
                  // console.log(response);
                   toast({
                         type: "success",
                         title: "Success"
                        });
                 resolve(response);
                 this.getUserInfo();
                  this.$router.replace(this.$route.query.redirect || "/otp_verify");
              })
              .catch(err=>{
                 toast({
                         type: "error",
                         title: "Error"
                        });
                reject(err);
                console.log(err);
              });
           });
      // }
  },
  clearDetails:function(){

  },
   getUserInfo: function() {
      return new Promise((resolve, reject) => {
        if (this.$session.exists("contact")) {
          Global.getUserInfo(this.$session)
            .then(response => {
              this.$session.set("current_user", response.data);
              resolve(response);
              // console.log(this.currentUser);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        }
      });
    },
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
