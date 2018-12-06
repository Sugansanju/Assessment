<template>
  <div>
     <b-modal id="addUserModal"
             :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
              hide-footer
              title="Add User"
              ref="addUserModal">
    <b-container style="margin-left:60px;padding:30px ">
      <form @submit.prevent="addUser">
      <b-row>
      <b-col cols="8">
         <label style="font-weight:bold">Username</label>
    <b-form-input type="text" class="edit"  v-model="user.name" v-bind:class="{error: $v.user.name.$error, valid: $v.user.name.$dirty && !$v.user.name.$invalid}"></b-form-input>
                  <div v-if="$v.user.$dirty">
                  <p class="error-message" v-if="!$v.user.name.required">Field is required</p>
                   <p class="error-message" v-if="$v.user.name.required && !$v.user.name.NameValidate">Invalid</p>
           </div>
      </b-col>
      </b-row>
      <br>
      <b-row >
      <b-col cols="8">
         <label style="font-weight:bold">Email/Mobile</label>
      <b-form-input type="text" class="edit" v-model="user.contact" v-bind:class="{error: $v.user.contact.$error, valid: $v.user.contact.$dirty && !$v.user.contact.$invalid}"></b-form-input>
            <div v-if="$v.user.contact.$dirty">
                  <p class="error-message" v-if="!$v.user.contact.required">Field is required</p>
                   <p class="error-message" v-if="$v.user.contact.required && !$v.user.contact.ContactValidate">Invalid</p>
           </div>
      </b-col>
      </b-row>
      <br>
      <b-row >
      <b-col cols="8">
         <label style="font-weight:bold">Password</label>
       <b-form-input type="text" class="edit" v-model="user.password"  v-bind:class="{error: $v.user.password.$error, valid: $v.user.password.$dirty && !$v.user.password.$invalid}">></b-form-input>
        <div class="pull-right">
        <b-link style="color:black;font-weight:bold;font-size:14px;text-decoration:underline;" @click="generate(6)">Generate</b-link>
      </div>
        <div v-if="$v.user.password.$dirty">
                  <p class="error-message" v-if="!$v.user.password.required">  Field is required</p>
                  <p class="error-message" v-if="!$v.user.password.minLength">Minimum 6 Characters</p>

           </div>
      </b-col>
      </b-row>
        <br>
        <b-row>
        <b-col cols="8">
           <b-button class="btn-sm btn-edit" type="submit">Add</b-button>
           <div class="pull-right">
           <b-button class="btn-sm btn-edit" @click="resetData">Reset</b-button>
           </div>
        </b-col>
    </b-row>
      </form>
    </b-container>
  </b-modal>
  </div>
</template>
<script>
import { required,minLength} from "vuelidate/lib/validators";
import ContactValidate from "@/validate/ContactValidate";
import NameValidate from "@/validate/NameValidate";
export default {
  name: "AddUserModal",
  components: {},
  validations: {
     user:{
       name:{
         NameValidate,
         required
       },
       contact:{
        ContactValidate,
         required,
       },
        password: {
                required,
                minLength:minLength(6),
      },
     }
  },
  data: function() {
    return {
      headerBgVariant: "info",
      headerTextVariant: "light",
      user:{
      name: "",
      contact: "",
      password: "",
      }
    };
  },
  methods: {
    resetData: function() {
        this.user.name='',
        this.user.contact='',
        this.user.password='',
         this.$v.$reset();
    },
    addUser: function() {
        this.$v.$touch();
       if (this.$v.$invalid){
       console.log("error");
       }else{
      let data = {
        "name": this.user.name,
        "contact": this.user.contact,
       "password": this.user.password,
        isActive:true
      };
      this.$emit("insert", data);
      this.resetData();
      this.$refs.addUserModal.hide();
       }
    },
    generate(length) {
      var chars = "abcdefghijklmnopqrstuvwxyz1234567890";
      var pass = "";
      for (var x = 0; x < length; x++) {
        var i = Math.floor(Math.random() * chars.length);
        pass += chars.charAt(i);
      }
      // console.log(pass);
      this.user.password = pass;
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
