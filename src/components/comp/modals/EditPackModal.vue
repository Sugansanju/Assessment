<template>
  <div>
    <b-modal id="editPackModal"
              hide-footer
              hide-header
              no-close-on-backdrop
              no-close-on-esc
              v-model="showModal">
    <b-container>
         <b-row>
     <h5 class="col-12 modal-title mainfont" >
        <strong>Edit Pack Details</strong>
        <button type="button" class="close staffmodal-close" data-dismiss="modal" aria-label="Close" @click="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </h5>
    </b-row>
    <hr><br>
    <div style="padding-left:50px;padding-right:50px;">
      <form @submit.prevent="addPack">
      <b-row>
      <b-col >
         <label style="font-weight:bold">Pack Name</label>
      <b-form-input type="text"
                      class="edit"
                      v-model="items.packName"
                      v-bind:class="{error: $v.items.packName.$error, valid: $v.items.packName.$dirty && !$v.items.packName.$invalid}">
      </b-form-input>
         <div v-if="$v.items.$dirty">
                  <p class="error-message" v-if="!$v.items.packName.required">Field is required</p>
           </div>
      </b-col>
      </b-row>
      <br>
    <b-row>
      <b-col>
         <label style="font-weight:bold">Pack Description</label>
          <b-form-textarea
                     class="edit"
                     v-model="items.packDescription"
                     :rows="3"
                     :max-rows="6"
                     v-bind:class="{error: $v.items.packDescription.$error, valid: $v.items.packDescription.$dirty && !$v.items.packDescription.$invalid}">
         </b-form-textarea>
         <div v-if="$v.items.$dirty">
                  <p class="error-message" v-if="!$v.items.packDescription.required">Field is required</p>
           </div>
      </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col>
          <label style="font-weight:bold">Pack Price</label>
          <b-form-input type="text"
                        class="edit"
                        v-model="items.packPrice"
                        v-bind:class="{error: $v.items.packPrice.$error, valid: $v.items.packPrice.$dirty && !$v.items.packPrice.$invalid}">
          </b-form-input>
         <div v-if="$v.items.$dirty">
                  <p class="error-message" v-if="!$v.items.packPrice.required">Field is required</p>
                  <p class="error-message" v-if="!$v.items.packPrice.numeric">Only Numeric values</p>
           </div>
        </b-col>
        </b-row>
        <br>
        <br>
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
  name: "editPack",
  props:['items','show'],
  components: {},
  validations: {
    items: {
      packName: {
        required
      },
      packDescription:{
        required
      },
      packPrice:{
        required,
        numeric
      }
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
    addPack: function() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        let data={
            packId:this.items.packId,
            packName:this.items.packName,
            packDescription:this.items.packDescription,
            packPrice:this.items.packPrice
        };
        this.$emit("editPack",data);
         this.$emit("close");
      }
    }
  },
  data: function() {
    return {
      pack: {
        packName: "",
        // timeDuration: 60,
        packDescription:"",
        isActive: true
      },
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
