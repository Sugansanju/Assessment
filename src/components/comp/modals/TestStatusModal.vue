<template>
<b-container>
    <b-modal id="testStatusModal"
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
        <strong>Test Status</strong>
        <button type="button" class="close staffmodal-close" data-dismiss="modal" aria-label="Close" @click="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </h5>                
            </b-row>
            <div v-if="items.length!=0">
            <b-table striped hover :items="items" :fields="fields">
                <template slot="takenAt" slot-scope="data">
                <!-- {{data.value | moment("MMMM Do YYYY, h:mm:ss a") }} -->
                 {{data.value | moment("MM/DD/YYYY, h:mm a") }}
                </template>                
                <template slot="submitted" slot-scope="data">
                    <i class="fa fa-check" v-show="data.item.submitted" aria-hidden="true" style="color: green"></i>
                    <i class="fa fa-times" v-show="!data.item.submitted" aria-hidden="true" style="color: red"></i>
                </template>
            </b-table>
            </div>
            <div v-if="items.length==0" class="text-center">
                <h1 style="color: #9c9c9c">Nothing to show</h1>
            </div>
            <b-btn class="btn-sm pull-right" @click="close">Ok</b-btn>
        </b-container>
    </b-modal>
</b-container>
</template>
<script>
export default {
  name: 'TestStatusModal',
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
                userName: { label: "Username", sortable: true },
                testName: { label: "Test", sortable: true },
                positiveMarks: { label: "+ve Marks", sortable: false },
                negativeMarks: { label: "-ve Marks", sortable: false },
                netMarks: { label: "Net", sortable: false },
                takenAt: { label: "Taken At", sortable: true },
                submitted: { label: "Completed", sortable: true }
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




