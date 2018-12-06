<template>
<div>
<b-modal id="addSubMenuModal"
             :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
              hide-footer
              title="Add SubMenu"
              ref="addSubMenuModal">
    <b-container style="margin-left:60px;">
      <form @submit.prevent="addSubMenu">
        <b-row>
         <b-col cols="8">
          <label style="font-weight:bold">SubMenu Name</label>
           <b-form-input type="text"
                         class="edit"
                         v-model="menu.subMenuName"
                         v-bind:class="{error: $v.menu.subMenuName.$error, valid: $v.menu.subMenuName.$dirty && !$v.menu.subMenuName.$invalid}">
            </b-form-input>
             <div v-if="$v.menu.$dirty">
                  <p class="error-message" v-if="!$v.menu.subMenuName.required">Field is required</p>
                   <!-- <p class="error-message" v-if="$v.menu.subMenuName.required && !$v.menu.subMenuName.NameValidate">Invalid</p> -->
           </div>
         </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col cols="8">
             <label style="font-weight:bold">Service Type</label>
              <b-form-select v-model="menu.serviceType" :options="types" class="mb-3 edit"
                              v-bind:class="{error: $v.menu.serviceType.$error, valid: $v.menu.serviceType.$dirty && !$v.menu.serviceType.$invalid}"/>
               <div v-if="$v.menu.$dirty">
                  <p class="error-message" v-if="!$v.menu.serviceType.required">Field is required</p>
           </div>
          </b-col>
        </b-row>
        <br>
        <b-row>
         <b-col cols="8">
          <label style="font-weight:bold">Domain Name</label>
          <b-form-input type="text"
                        class="edit"
                        v-model="menu.domainName"
                        v-bind:class="{error: $v.menu.domainName.$error, valid: $v.menu.domainName.$dirty && !$v.menu.domainName.$invalid}">
          </b-form-input>
          <div v-if="$v.menu.$dirty">
                  <p class="error-message" v-if="!$v.menu.domainName.required">Field is required</p>
           </div>
         </b-col>
        </b-row>
        <br>
        <b-row>
         <b-col cols="8">
          <label style="font-weight:bold">URL </label>
          <b-form-input type="text"
                        class="edit"
                        v-model="menu.url"
                         v-bind:class="{error: $v.menu.url.$error, valid: $v.menu.url.$dirty && !$v.menu.url.$invalid}">
          </b-form-input>
          <div v-if="$v.menu.$dirty">
                  <p class="error-message" v-if="!$v.menu.url.required">Field is required</p>
           </div>
         </b-col>
        </b-row><br>
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
    <!-- <hr><br>
  <div class="text-right">
  <b-btn class="btn-sm btn-edit" @click="addSubMenu">Add</b-btn>
  </div> -->
</b-modal>
</div>
</template>

<script>
import { required,minLength} from "vuelidate/lib/validators";
import NameValidate from "@/validate/NameValidate";
export default {
  name: "subMenuModal",
  props: [ "show"],
  components: {},
    validations: {
     menu:{
       subMenuName:{
         required
       },
       serviceType:{
         required
       },
       domainName:{
         required
       },
       url:{
         required
       },

     }
  },
    computed: {
        showModal:{
            get:function getModal(){
            return this.show;
            console.log("import")
            },
            set: function setModal() {

            }
         },
    },
  data: function() {
    return {
      headerBgVariant: "info",
      headerTextVariant: "light",
      menu:{
        subMenuName:'',
        serviceType:null,
        domainName:'',
        url:''

      },
      // selected:null,
        types: [
         { value: 'http', text: 'http' },
        { value: 'https', text: 'https' },
        ],
    };
  },
  mounted(){
  },
  methods: {
    addSubMenu: function() {
         this.$v.$touch();
       if (this.$v.$invalid){
       console.log("error");
       }else{
      let data ={
        subMenuName: this.menu.subMenuName,
        serviceType: this.menu.serviceType,
        domain: this.menu.domainName,
        url: this.menu.url,
      }
       this.$emit("subMenu", data);
             this.resetData();
      this.$refs.addSubMenuModal.hide();

    }
    },
    resetData:function(){
        this.menu.subMenuName='',
        this.menu.serviceType='',
        this.menu.domainName='',
        this.menu.url='',
         this.$v.$reset();
    },
    close:function(){
      this.$emit("close");
    },
  }
};
</script>

<style scoped>
.btn-edit {
  width: 85px;
  border-radius: 20px;
  background-color: #00a1b5;
  font-size: 15px;
  font-weight: bold;
}
.edit {
  border: 1px solid #00a1b5;
  border-radius: 18px;
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
