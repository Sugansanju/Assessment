<template>
  <div>
     <b-modal id="addMenuModal"
             :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
              hide-footer
              title="Add Menu"
              ref="addMenuModal">
    <b-container style="margin-left:60px;padding:30px ">
      <form @submit.prevent="addMenu">
      <b-row>
      <b-col cols="8">
         <label style="font-weight:bold">Menu Name</label>
    <b-form-input type="text" class="edit"  v-model="menu.name" v-bind:class="{error: $v.menu.name.$error, valid: $v.menu.name.$dirty && !$v.menu.name.$invalid}"></b-form-input>
                  <div v-if="$v.menu.$dirty">
                  <p class="error-message" v-if="!$v.menu.name.required">Field is required</p>
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
import NameValidate from "@/validate/NameValidate";
export default {
  name: "AddMenuModal",
  components: {},
  validations: {
     menu:{
       name:{
         required
       },
     }
  },
  data: function() {
    return {
      headerBgVariant: "info",
      headerTextVariant: "light",
      menu:{
      name: "",
      }
    };
  },
  methods: {
    resetData: function() {
        this.menu.name='',
         this.$v.$reset();
    },
    addMenu: function() {
        this.$v.$touch();
       if (this.$v.$invalid){
       console.log("error");
       }else{
      let data ={
        menuName: this.menu.name,
      }
      console.log(data)
      this.$emit("insert", data);
      this.resetData();
      this.$refs.addMenuModal.hide();

       }
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
