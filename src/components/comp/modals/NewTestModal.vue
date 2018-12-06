<template>
  <div>
    <b-modal id="newTestModal"
             :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
             hide-footer
             title="Custom Test"
             ref="addTestModal">
    <b-container style="margin-left:60px;padding:30px ">
      <form @submit.prevent="save">
        <b-row>
         <b-col cols="8">
          <label style="font-weight:bold">Test Name</label>
           <b-form-input type="text"
                         class="edit"
                         v-model="test.testName"
                         v-bind:class="{error: $v.test.testName.$error, valid: $v.test.testName.$dirty && !$v.test.testName.$invalid}">
            </b-form-input>
            <div v-if="$v.test.$dirty">
                  <p class="error-message" v-if="!$v.test.testName.required">Field is required</p>
           </div>
         </b-col>
        </b-row>
        <br>
        <b-row>
          <b-col cols="8">
              <b-form-checkbox v-model="test.published" style="font-weight:bold">Publish Test</b-form-checkbox>
                <br><br>
              <b-form-checkbox v-model="test.locked" style="font-weight:bold">Lock Test</b-form-checkbox>
                <br><br>
              <b-form-checkbox v-model="test.coming" style="font-weight:bold">Coming At</b-form-checkbox>
                 <br><br>
              <b-form-input v-if="test.coming==true" v-model="test.comingAt"  class="edit" type="date" ></b-form-input>
          </b-col>
        </b-row>
        <br>
        <b-row>
         <b-col cols="8">
          <label style="font-weight:bold">Minutes</label>
          <b-form-input type="number"
                        class="edit"
                        v-model="test.timeDuration"
                        v-bind:class="{error: $v.test.timeDuration.$error, valid: $v.test.timeDuration.$dirty && !$v.test.timeDuration.$invalid}">
          </b-form-input>
          <div v-if="$v.test.$dirty">
                    <p class="error-message" v-if="!$v.test.timeDuration.required">Field is required</p>
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
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "NewTestModal",
  components: {},
  validations: {
    test: {
      testName: {
        required
      },
      timeDuration: {
        required
      }
    }
  },
  methods: {
    save: function() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("error");
      } else {
        let data = {
          testName: this.test.testName,
          timeDuration: this.test.timeDuration,
          published:this.test.published,
          locked:this.test.locked,
          comingAt:this.test.comingAt!=""?moment(this.test.comingAt).format('DD/MM/YYYY'):null,
          // comingAt:moment(this.test.comingAt).format('DD/MM/YYYY'),
        };
        this.$emit("save", data);
        this.$refs.addTestModal.hide();
        this.clearDetails();
      }
    },
    clearDetails: function() {
      this.test.testName = "";
      this.test.timeDuration = 60;
      this.$v.$reset();
    },
    close: function() {
      this.$refs.addTestModal.hide();
      this.clearDetails();
    },
  },
  data: function() {
    return {
      test: {
        testName: "",
        timeDuration: 60,
        // languages:1,
        published:true,
        locked:true,
        coming:false,
        comingAt:"",
        isActive: true
      },
      // option: [
      //   { value: 1, text: "Tamil" },
      //   { value: 2, text: "English" },
      //   { value: 3, text: "Hindi" },
      //   { value: 4, text: "Malayalam" },
      //   { value: 5, text: "Telgu" }
      // ],
      headerBgVariant: "info",
      headerTextVariant: "light"
    };
  }
};
</script>

<style scoped>
.edit {
  border: 1px solid #00a1b5;
  border-radius: 18px;
}
.btn-edit {
  width: 85px;
  border-radius: 20px;
  background-color: #00a1b5;
  font-size: 15px;
  font-weight: bold;
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
