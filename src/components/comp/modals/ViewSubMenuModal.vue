<template>
<div>
<b-modal id="viewSubMenuModal"
              hide-footer
              hide-header
              no-close-on-backdrop
                no-close-on-esc
              v-model="showModal">
<b-container>
   <b-row>
  <h5 class="col-12 modal-title mainfont" >
        <strong>View SubMenu</strong>
        <button type="button" class="close staffmodal-close" data-dismiss="modal" aria-label="Close" @click="close">
            <span aria-hidden="true">&times;</span>
        </button>
    </h5>
    </b-row>
    <hr><br>
  <div v-for="item in subMenu"  v-bind:key="item.index">
   <b-form-checkbox-group  stacked id="check" name="SubMenuName" v-model="selected" >
        <b-form-checkbox :value="item.subMenuId"><span style="font-weight:bold;font-size:16px;">{{item.subMenuName}}</span></b-form-checkbox>
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
  name: "ViewSubMenuModal",
  props: ["item", "show","itemId"],
  components: {},
  watch: {
    item: function(value) {
      this.item = value;
      this.subMenu = this.item;
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
    },
  data: function() {
    return {
      selected:this.itemId,
      subMenu: this.item,
    };
  },
  async mounted(){
    // console.log("SubMenu",this.subMenuId)
  },
  methods: {
    addTest: function() {
      this.$emit("addSubMenuInMenu", this.selected);
      this.selected=this.itemId;
    },
    close:function(){
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
