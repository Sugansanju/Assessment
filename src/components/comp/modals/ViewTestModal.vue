<template>
<div>
<b-modal id="viewTestModal"
              hide-footer
              hide-header
              no-close-on-backdrop
                no-close-on-esc
              v-model="showModal">
<b-container>
  <!-- <b-row>
      {{this.packId}}
  </b-row> -->
   <b-row>
  <h5 class="col-12 modal-title mainfont" >
        <strong>View All Test</strong>
        <button type="button" class="close staffmodal-close" data-dismiss="modal" aria-label="Close" @click="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </h5>
    </b-row>
    <hr><br>
  <div v-for="item in detail"  v-bind:key="item.index">
   <b-form-checkbox-group  stacked id="check" name="testName" v-model="selected" >
        <b-form-checkbox :value="item.testId"><span style="font-weight:bold;font-size:16px;">{{item.testName}}</span></b-form-checkbox>
        <hr>
      </b-form-checkbox-group>
  </div>
  <div class="text-right">
  <b-btn class="btn-sm btn-edit" @click="addTest">Add</b-btn>
  </div>
</b-container>
</b-modal>
</div>
</template>

<script>
export default {
  name: "ViewTestModal",
  props: ["tests", "show","packId"],
  components: {},
  watch: {
    tests: function(value) {
      this.tests = value;
      this.detail = this.tests;
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
        //  selectedTests:{
        //    get: function getSelectedTests(){
        //      this.selected.splice(0);
        //      if(this.packId!=null)
        //       for(let i=0;i<this.packId.length;i++){
        //           this.selected.push(this.packId[i].testId);
        //       }
        //       return this.selected;
        //    },
        //    set: function setSelectedTests(){
        //    }
        //  }
    },
  data: function() {
    return {
      // selected:["b2f5379a-13a8-4484-8ddf-65d7c725afe8","d66260b0-e0c3-4df3-b66e-e3e62da45d48"],
      selected:this.packId,
      detail: this.tests,
    };
  },
  async mounted(){
  },
  methods: {
    addTest: function() {
      this.$emit("addTest", this.selected);
      this.selected=this.packId;
      this.$emit("close");
    },
    close:function(){
      // this.selected=this.packId;
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
</style>
