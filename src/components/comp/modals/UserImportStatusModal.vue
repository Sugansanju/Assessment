<template>
<b-container>
    <b-modal id="questionsModal"
    hide-header
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    size="lg"
    centered
    v-model="showModal">
        <b-container fluid style="padding:10px;margin-top:-15px;">
            <b-row>
   <h5 class="col-12 modal-title mainfont" >
     <strong>User Import Status</strong>
   <button type="button" class="close staffmodal-close" data-dismiss="modal" aria-label="Close" @click="close">
   <span aria-hidden="true">&times;</span>
   </button>
 </h5>                
            </b-row>
            <!-- <b-row>
               <b-col style="background: #4285f4;">
                  <span style="font-size:15px;font-weight:bold;color:white;">User Import Status</span>
                <button type="button" class="close" @click="userImportStatusModal=false" aria-label="Close" style="margin-left:25px;margin-top:0px;" float-right>
                    <span aria-hidden="true">&times;</span>
                </button>
                </b-col>
            </b-row> -->
            <!-- <b-row>
               <b-col style="margin-top:30px;">
                 <span style="font-size:25px;color: rgb(47, 114, 183);">{{title}}</span>
                </b-col>
            </b-row> -->
            <b-table striped hover :items="items">
                
                <template slot="status" slot-scope="data">
                    <div v-if="data.item.status=='Success'" style="color: green">{{data.item.status}}</div>
                    <div v-if="data.item.status=='Failed'" style="color: red">{{data.item.status}}</div>
                </template>
            </b-table>
            <b-btn class="btn-sm pull-right" @click="close">Ok</b-btn>
        </b-container>
    </b-modal>
</b-container>
</template>
<script>
export default {
  name: 'UserImportStatusModal',
  props:['show','items'],
    components:{

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
    data: function(){
        return{
            userImportStatusModal: false,
            fields: {
                username: { label: "Username", sortable: false },
                contact: { label: "Contact", sortable: false },
                password: { label: "Password", sortable: false },
                status: { label: "Status", sortable: false },
                info: { label: "Info", sortable: false }
            }            
        }
    },
    methods:{
        close: function(){
            this.$emit("close");
        }
    },
};
</script>
<style>
</style>




