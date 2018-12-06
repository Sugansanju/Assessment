<template>
   <!-- <div class="editable" i style="margin-left: 10px; ">       
                <div  v-show = "edit == false">
                    <label @click = "edit = true"> {{content}} </label>
                </div>                
                <input type="text" v-show = "edit == true" v-model = "content" 
                @blur = "edit=false;"
                @keyup.enter = "edit=false;"               
                :text="content" @input="$emit('input',content)" />
    </div> -->
    <div >
        <div :id="id" @click="show">
            <label class="editable"> {{content}} </label>
        </div>         
        <b-popover :target="id" triggers="click"  :show.sync="showPopover" style="width: 100%">
            <div >
                <input type="text" v-model="textInput" placeholder="Enter..." @keyup.enter="onOk" />                
            </div>
            <div class="pull-right" style="padding: 5px;">
            <b-btn @click="showPopover=false" size="sm" variant="danger"><i class="fa fa-times"></i></b-btn>
            <b-btn @click="onOk" size="sm" variant="primary"><i class="fa fa-check"></i></b-btn>            
            </div>                                         
        </b-popover>                         
    </div>
</template>

<script>
export default {
    name: 'Editable',
    props:['id','text'],
    components:{
    },
    watch:{
      text: function(value){
          this.content=value;
          this.textInput=this.content;
      }
    },    
    data(){
        return{
            content: this.text, 
            showPopover: false, 
            textInput:this.text,         
        }
    },
    methods: {
        show: function(){
            this.textInput=this.content;
            this.showPopover=true;
        },
        onOk: function(){
            this.content=this.textInput;
            this.$emit('input',this.content);
            this.showPopover=false;
        }
    }
}
</script>

<style scoped>
.editable{
    padding: 10px;    
    cursor: pointer;
    text-decoration: underline;
     text-transform: uppercase;
}
.editable:hover{
    padding: 10px;
    font-weight: bold;    
    cursor: pointer;
}


    /* label{
        text-decoration: underline;
        font-size: 20px;
        color: rgb(144, 153, 156);
    }
    input[type=text]{
        font-size: 20px;
        color: rgb(144, 153, 156);        
    } */
</style>


