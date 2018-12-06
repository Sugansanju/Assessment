<template>
  <div>
    <b-modal id="newPackModal"
             :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
              hide-footer
              title="Add Pack"
              ref="addPackModal">
    <b-container style="margin-left:60px;padding:30px ">
      <form @submit.prevent="addPack">
      <b-row>
      <b-col cols="8">
         <label style="font-weight:bold">Pack Name</label>
      <b-form-input type="text"
                      class="edit"
                      v-model="pack.packName"
                      v-bind:class="{error: $v.pack.packName.$error, valid: $v.pack.packName.$dirty && !$v.pack.packName.$invalid}">
      </b-form-input>
         <div v-if="$v.pack.$dirty">
                  <p class="error-message" v-if="!$v.pack.packName.required">Field is required</p>
           </div>
      </b-col>
      </b-row>
      <br>
    <b-row>
      <b-col cols="8">
         <label style="font-weight:bold">Pack Description</label>
          <b-form-textarea
                     class="edit"
                     v-model="pack.packDescription"
                     :rows="3"
                     :max-rows="6"
                     v-bind:class="{error: $v.pack.packDescription.$error, valid: $v.pack.packDescription.$dirty && !$v.pack.packDescription.$invalid}">
    </b-form-textarea>
         <div v-if="$v.pack.$dirty">
                  <p class="error-message" v-if="!$v.pack.packDescription.required">Field is required</p>
           </div>
      </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col cols="8">
          <b-form-checkbox v-model="pack.coming" style="font-weight:bold">Coming At</b-form-checkbox>
                 <br><br>
              <b-form-input v-if="pack.coming==true" v-model="pack.comingAt"  class="edit" type="date" ></b-form-input>
                <br>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="8">
          <label style="font-weight:bold">Pack Price</label>
          <b-form-input type="text"
                        class="edit"
                        v-model="pack.packPrice"
                        v-bind:class="{error: $v.pack.packPrice.$error, valid: $v.pack.packPrice.$dirty && !$v.pack.packPrice.$invalid}">
          </b-form-input>
         <div v-if="$v.pack.$dirty">
                  <p class="error-message" v-if="!$v.pack.packPrice.required">Field is required</p>
                  <p class="error-message" v-if="!$v.pack.packPrice.numeric">Only Numeric values</p>
           </div>
        </b-col>
        </b-row>
        <br>
        <br>
        <b-row>
        <b-col cols="9">
           <b-button class="btn-sm btn-edit save-btn" type="submit">Save</b-button>
           <div class="pull-right">
           <b-button class="btn-sm btn-edit cancel-btn" @click="close">Cancel</b-button>
          </div>
        </b-col>
    </b-row>
      </form>
    </b-container>
  </b-modal>
  </div>
</template>

<script>
import moment from 'moment';
import { required, minLength,numeric } from "vuelidate/lib/validators";
export default {
  name: "AddNewPack",
  components: {},
  validations: {
    pack: {
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
  methods: {
    addPack: function() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        let data={
            packName:this.pack.packName,
            packDescription:this.pack.packDescription,
            packPrice:this.pack.packPrice,
            comingAt:moment(this.pack.ComingAt).format('dd/MM/yyyy')
        };
        this.$emit("addPack",data);
        // console.log(data);
        this.clearDetails();
        this.$refs.addPackModal.hide();

      }
    },
    clearDetails: function() {
      this.pack.packName = "";
      this.pack.packDescription="";
      this.pack.packPrice="";
      this.$v.$reset();
    },
    close: function() {
      this.$refs.addPackModal.hide();
      this.clearDetails();
    }
  },
  data: function() {
    return {
      pack: {
        packName: "",
        packDescription:"",
        coming:false,
        comingAt:"",
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
