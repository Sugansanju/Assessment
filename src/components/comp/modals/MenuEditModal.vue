<template>
  <div>
    <b-modal id="menuEditModal"
              hide-footer
              hide-header
              no-close-on-backdrop
              no-close-on-esc
              v-model="showModal">
    <b-container>
         <b-row>
     <h5 class="col-12 modal-title mainfont" >
        <strong>Edit Menu Details</strong>
        <button type="button" class="close staffmodal-close" data-dismiss="modal" aria-label="Close" @click="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </h5>
    </b-row>
    <hr><br>
    <div style="padding-left:50px;padding-right:50px;">
      <form @submit.prevent="menuEdit">
      <b-row>
      <b-col >
         <label style="font-weight:bold">Menu Name</label>
      <b-form-input type="text"
                      class="edit"
                      v-model="items.menuName"
                      v-bind:class="{error: $v.items.menuName.$error, valid: $v.items.menuName.$dirty && !$v.items.menuName.$invalid}">
      </b-form-input>
         <div v-if="$v.items.$dirty">
                  <p class="error-message" v-if="!$v.items.menuName.required">Field is required</p>
           </div>
      </b-col>
      </b-row>
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
  name: "menuEdit",
  props:['items','show'],
  components: {},
  validations: {
    items: {
      menuName: {
        required
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
    menuEdit: function() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        let data={
            menuId:this.items.menuId,
            menuName:this.items.menuName,
        };
        this.$emit("updateMenu",data);
         this.$emit("close");
      }
    }
  },
  data: function() {
    return {

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
