<template>
<div>
   <b-modal id="previewModal"
             :header-bg-variant="headerBgVariant"
             :header-text-variant="headerTextVariant"
             hide-footer
              title="Assessment Details">
    <b-container style="margin-left:60px;padding:30px ">
      <b-row >
      <!-- <b-col cols="8">
         <label style="font-weight:bold">Test Name</label>
      <b-form-input type="text"
                      placeholder="Enter The Test Name"
                      v-model="name"></b-form-input>
      </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col cols="3">
          <label style="font-weight:bold">Minutes</label>

          <b-form-input type="number"
                      v-model="mins"></b-form-input>
        </b-col>
        </b-row>
        <br>
        <b-row>
        <b-col>
           <b-button class="btn-sm save-btn">Save & Continue</b-button>
           <b-button class="btn-sm cancel-btn">Cancel</b-button>
        </b-col> -->
    </b-row>
    </b-container>
   </b-modal>
</div>
</template>

<script>
export default {
name:'PreviewModal',
components:{

},
data:function(){
  return{
      headerBgVariant: 'info',
    headerTextVariant: 'light',
  }
}
}
</script>

<style>

</style>
