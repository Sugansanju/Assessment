<template>
  <div>
    <b-modal id="subMenuEditModal"
              hide-footer
              hide-header
              no-close-on-backdrop
              no-close-on-esc
              v-model="showModal">
    <b-container>
         <b-row>
     <h5 class="col-12 modal-title mainfont" >
        <strong>Edit SubMenu Details</strong>
        <button type="button" class="close staffmodal-close" data-dismiss="modal" aria-label="Close" @click="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </h5>
    </b-row>
    <hr><br>
    <div style="padding-left:50px;padding-right:50px;">
      <form @submit.prevent="subMenuEdit">
        <!-- {{items.subMenuId}} -->
      <b-row>
      <b-col >
         <label style="font-weight:bold">SubMenu Name</label>
      <b-form-input type="text"
                      class="edit"
                      v-model="items.subMenuName"
                      v-bind:class="{error: $v.items.subMenuName.$error, valid: $v.items.subMenuName.$dirty && !$v.items.subMenuName.$invalid}">
      </b-form-input>
         <div v-if="$v.items.$dirty">
                  <p class="error-message" v-if="!$v.items.subMenuName.required">Field is required</p>
           </div>
      </b-col>
      </b-row>
      <br>
        <b-row>
          <b-col cols="8">
             <label style="font-weight:bold">Service Type</label>
              <b-form-select v-model="items.serviceType" :options="types" class="mb-3 edit"
                              v-bind:class="{error: $v.items.serviceType.$error, valid: $v.items.serviceType.$dirty && !$v.items.serviceType.$invalid}"/>
               <div v-if="$v.items.$dirty">
                  <p class="error-message" v-if="!$v.items.serviceType.required">Field is required</p>
           </div>
          </b-col>
        </b-row>
        <br>
        <b-row>
         <b-col cols="8">
          <label style="font-weight:bold">Domain Name</label>
          <b-form-input type="text"
                        class="edit"
                        v-model="items.domain"
                        v-bind:class="{error: $v.items.domain.$error, valid: $v.items.domain.$dirty && !$v.items.domain.$invalid}">
          </b-form-input>
          <div v-if="$v.items.$dirty">
                  <p class="error-message" v-if="!$v.items.domain.required">Field is required</p>
           </div>
         </b-col>
        </b-row>
        <br>
        <b-row>
         <b-col cols="8">
          <label style="font-weight:bold">URL </label>
          <b-form-input type="text"
                        class="edit"
                        v-model="items.url"
                         v-bind:class="{error: $v.items.url.$error, valid: $v.items.url.$dirty && !$v.items.url.$invalid}">
          </b-form-input>
          <div v-if="$v.items.$dirty">
                  <p class="error-message" v-if="!$v.items.url.required">Field is required</p>
           </div>
         </b-col>
        </b-row><br>
        <b-row>
        <b-col cols="9">
           <b-button class="btn-sm btn-edit" type="submit">Save</b-button>
           <div class="pull-right">
           <b-button class="btn-sm btn-edit" @click="close">Cancel</b-button>
          </div>
        </b-col>
    </b-row>
      </form>
    </div>
    </b-container>
  </b-modal>
  </div>
</template>

<script>
import { required, minLength,numeric } from "vuelidate/lib/validators";
export default {
  name: "menuEdit",
  props:['items','show'],
  components: {},
  validations: {
    items: {
      subMenuName: {
        required
      },
        serviceType:{
         required
       },
       domain:{
         required
       },
       url:{
         required
       },
    }
  },
async mounted(){

},
 computed: {
        showModal:{
            get:function getModal(){
            return this.show;
            console.log("import")
            },
            set: function setModal() {

            }
         }
 },
  methods: {
     close:function(){
      this.$emit("close");
    },
    subMenuEdit: function() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        // console.log("subMenuId",this.items.subMenuId)
        let data={
             subMenuId:this.items.subMenuId,
             subMenuName: this.items.subMenuName,
             serviceType: this.items.serviceType,
             domain: this.items.domain,
             url: this.items.url,
        };
        this.$emit("updateSubMenu",data);
         this.$emit("close");
      }
    }
  },
  data: function() {
    return {
      types: [
         { value: 'http', text: 'http' },
        { value: 'https', text: 'https' },
        ],
      headerBgVariant: "info",
      headerTextVariant: "light"
    };
  }
};
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
