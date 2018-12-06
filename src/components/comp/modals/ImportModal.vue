<template>
    <b-modal id="importModal"
    hide-header
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    centered
    size="lg"
    v-model="showModal">
<div class="modal-dialog modal-lg">
 <div class="modal-content modalbg modaltop">
   <div class="modal-header staffmodal-header">
   <h5 class="col-12 modal-title mainfont" >
     <strong>Confirm your import</strong>
   <button type="button" class="close staffmodal-close" data-dismiss="modal" aria-label="Close" @click="close">
   <span aria-hidden="true">&times;</span>
   </button>
 </h5>
   </div>
   <div class="modal-body">
     <div class="table-responsive">
     <table class="table borderless table-hover table-space">
       <tr>
         <td colspan="2"></td>
         <td colspan="2">

         </td>
         <td colspan="2">

       </td>
       <td >

       </td>
       </tr>
       <tr v-for="(item, index) in $v.list.$each.$iter" v-bind:key="index">
         <td colspan="2" class="">
            <b-form-input type="text" class="edit" v-model="item.username.$model"></b-form-input>
              <div class="error-message" v-if="!item.username.required">name is required.</div>
              <div class="error-message" v-if="!item.username.nameValidate">Invalid name</div>
         </td>
         <td  colspan="2" class="">
             <b-form-input type="text" class="edit" v-model="item.contact.$model" size="15"/>
             <div class="error-message" v-if="!item.contact.required">contact is required.</div>
             <div class="error-message" v-if="item.contact.required && !item.contact.contactValidate">Ivalid contact</div>
       </td>
       <td  colspan="2" class="" >
           <b-form-input type="text" class="edit" v-model="item.password.$model" size="15"/>
             <div class="error-message" v-if="!item.password.required">password is required.</div>
             <div class="error-message" v-if="item.password.required && !item.password.minLength">Minimum 6 Characters</div>
       </td>
       <td>
       <i class="fa fa-trash close" aria-hidden="true"  @click="remove(index)" style="font-size:1.2em;color:red;"></i>
       </td>
       </tr>
       </table>
    </div>
       </div>
   </div>
    <p class="valid">Please select and edit the fields as you need</p>
</div>
   <div class="modal-footer">
     <div class="importfooter-content">
       <p>Please select and correct the errors/missings to import properly.<br>The items with errors could not be imported.</p>
       <div class="float-right">
       <b-btn class="btn-sm btn-edit" @click="close">Cancel</b-btn>
       <b-btn class="btn-sm btn-edit" @click="userImport">Import</b-btn>
     </div>
   </div>
   </div>
  </b-modal>
  </template>
<script>
import {required,minLength,maxLength} from "vuelidate/lib/validators";
import swal from "sweetalert2";
import contactValidate from "@/validate/ContactValidate";
import nameValidate from "@/validate/NameValidate";
const toast = swal.mixin({
              toast: true,
              position: "top",
              showConfirmButton: false,
              timer: 3000
   });

export default {

    props:['show', 'list'],
    data(){
        return{
          details:this.list,
     }
    },
    computed: {
       showModal:{
         get:function getModal(){
           return this.show;
          //  console.log("import")
         },
         set: function setModal() {

        }
       }
      },
  validations : {
    list:{
      $each:{
        username:{
          required,
         nameValidate
        },
        contact:{
          required,
         contactValidate
        },
        password:{
           required,
                minLength:minLength(6)
        }
      }
   }
 },
 methods:{
    remove(index){
        this.details.splice(index,1);
      },
      close(){
        this.$emit('close');
      },
      userImport(){
         this.$v.$touch();
       if (this.$v.$invalid){
         toast({
            type: "error",
            title: "Please Fill Your Details Correctly"
          });
       }else{
      var data=[];
        this.details.forEach(e => {
          if(e.username!='' && e.contact!='' && e.password!=''){
            data.push(e);
          }
        });
        if(this.details.length!=data.length){
          toast({
            type: "error",
            title: "Not all the data are imported, data with empty/error are ommitted"
          });
        }else{
            this.$emit('import',data);
        }

      // this.$refs.importModal.hide()
      }
 }
}
}
</script>
<style scoped>
.borderless td, .borderless td {
    border: none;
 }
 .table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
  background-color:none;
 }
 .table-space tbody td{
  white-space: nowrap;
 }
 .btn-edit{
  width:85px;
  border-radius:20px;
  background-color:#00A1B5;
  font-size:15px;
  font-weight:bold;
}
 .student-detail{
   padding:0 0 0 0px;
 }
.error-message {
  color: red;
  font-size:13px;
  margin: 5px 0 0 5px;
}
.error{
 border-color:red;
}
.valid{
 color:green;
 text-align: center;
}
.invalid{
 color:red;
}
.importfooter-content{
 color:red;
 font-size:13px;
}
.edit{
border:1px solid #00A1B5;
border-radius:18px;
}
</style>
