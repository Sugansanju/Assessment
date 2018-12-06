<template>
  <div>
  <main-header :currentUser="currentUser"></main-header>
  <sub-header :items="subMenu"></sub-header>
  <bread-crumb :items="crumbItems"></bread-crumb>
  <b-container style="border:1px solid #eee;padding:0 0 0 0;">
    <b-row>
      <b-col style="height: 75vh;">
      <div class="navigation">
        <div class="navigation-filter">
          <input type="text" v-model="treeFilter" placeholder="Type to filter...">
        </div>
        <div class="navigation-tree" style="text-color: #000">
          <b-tree-view 
          :data="treeData"
          :contextMenuItems="contextMenuItems"
          :showIcons="true"
          :showIcon="true"></b-tree-view>
        </div>
      </div>

      </b-col>
    </b-row>

  </b-container>
  </div>
</template>
<script>
import MainHeader from "@/components/comp/MainHeader";
import SubHeader from "@/components/comp/admin/SubHeader";
import BreadCrumb from "@/components/comp/admin/BreadCrumb";
import AddUserModal from "@/components/comp/modals/AddUserModal";
import ImportModal from "@/components/comp/modals/ImportModal";
import UserImportStatusModal from "@/components/comp/modals/UserImportStatusModal";
import Loader from "@/components/comp/Loader.vue";
import Global from "@/service/Global";
import AccountApi from "@/service/Account";
import { bTreeView } from 'bootstrap-vue-treeview'
import swal from "sweetalert2";
const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});
export default {
  name: "NavigateTree",
  components: {
    MainHeader,
    SubHeader,
    BreadCrumb,
    Loader,
    bTreeView,
  },
  async mounted() {
    // console.log("Getting refresh token");
    await Global.onPageRefresh(this.$session, this.$router);
    // console.log("Getting User info");
    await this.getUserInfo();
  },
  watch:{
  },
  data: function() {
    return {
        count: 1,
        currentUser: null,
        subMenu: [
        {
          name: "DashBoard",
          link: "#/admin/addTest",
          icon: "fa fa-home px-2",
          active: ""
        },
        {
          name: "Assessment",
          link: "#/admin/assessment",
          icon: "fa fa-pencil-square-o px-2",
          active: ""
        },
        {
          name: "Account",
          link: "#/admin/users",
          icon: "fa fa-users px-2 ",
          active: "active"
        }
      ],
      crumbItems: [
        {
          text: "DashBoard",
          href: "#/admin/addTest",
          active: false
        },
        {
          text: "Tree",
          href: "#/tree",
          active: true
        }
      ],
      treeData: [{"id": 2, "name": "Venus" , "children": [{"id": 3, "name": "Neptune"}, {"id": 4, "name": "Stratus"} ] } ],
      selectedNode: null,
      treeFilter:'',
      contextMenuItems:[
        { code: 'ADD_CHILD_NODE', label: 'Add Child' },
        { code: 'DELETE_NODE', label: 'Delete node' },
        { code: 'RENAME_NODE', label: 'Rename node' },        
      ],
    }
  },
  methods: { 
    getUserInfo() {
      return new Promise((resolve, reject) => {
        if (this.$session.exists("contact")) {
          Global.getUserInfo(this.$session)
            .then(response => {
              this.$session.set("current_user", response.data);
              this.currentUser = response.data;
              resolve(response);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        }
      });
    }
  },
computed:{

}
};
</script>
 <style scoped>

      .hello {
        font-size: 1em;
        padding: 0;
        height: 80px;
        vertical-align: middle;
        box-sizing: border-box;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }

      .navigation {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 450px;
        overflow-y: scroll;
        background-color: #f9f9f9;
      }

      .navigation-filter {
        padding: 5px 10px;
      }

      .navigation-filter input {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        font-size: .875rem;
        background: #fff;
        border: 1px solid;
        border-color: #d2d2d2;
        border-radius: 3px;
        padding: 6px;
        box-sizing: border-box;
      }

      .content {
        overflow: auto;
        position: absolute;
        left: 280px;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .tree-arrow.has-child:after {
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfiBBQOCQ0YTpzfAAAAjklEQVQoz2NmYGBgYGAIdAw/LPHu6kUGDMAEoXjt+WXM5kck4VTAwMDAwMhoOgdTCRMyB5sSJlQuphImdCPRlTBhOgtVCRYFECWBjngUMDAwMDAy4VVwJnvdXjwKTmcvn47HDadzlk/D44szecun4gmHM/nLJuMJyTMFyyahm8gCoT4f+fz8ZtuyKZguAgDLtyS94NiAKwAAAABJRU5ErkJggg==')
;
        border: 0;
        width: 16px;
        height: 16px;
        background-repeat: no-repeat;
        transform: rotate(0deg) translateY(-50%) translateX(-2px);
      }

      .tree-arrow.expanded.has-child:after {
        transform: rotate(90deg) translateY(0%) translateX(-8px);
      }

      .tree-node.selected > .tree-content {
        background: #398df0;
      }

      .tree-node.selected > .tree-content > .tree-anchor {
        color: #fff;
      }

      .tree-content {
        padding: 2px 0;
      }

      .tree-scope {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .release {
        color: #a9a9a9;
      }
    </style>
            <!-- <div class="tree-scope" slot-scope="{ node }">
              <template v-if="node.data.isRoot">
                <span class="text">
                  {{ node.text }}
                </span>
              </template>
              <template v-else>
                <span class="text">
                    {{ node.text }}
                </span>
             </template>
            </div> -->
  <!-- <b-btn id="popoverButton-open" variant="primary">Button</b-btn>

  <b-popover show target="popoverButton-open" title="Popover">
    I start <strong>open</strong>
  </b-popover>             -->

                  <!-- <div slot-scope="{ node }"> -->
                <!-- <div class="node-text">{{ node.text }}</div>
                <div class="node-controls">
                  <b-btn size="sm" variant="primary" @mouseup.stop="editNode(node)"><i class="fa fa-edit"></i></b-btn>
                  <b-btn size="sm" variant="success" @mouseup.stop="addChildNode(node)"><i class="fa fa-plus"></i></b-btn>
                  <b-btn size="sm" variant="danger" @mouseup.stop="removeNode(node)"><i class="fa fa-trash"></i></b-btn>
              </div> -->

              <!-- <template v-if="!node.data.icon">
                  {{ node.text }}
                </template>

                <template v-else>
                  <i :class="fa-folder"></i>
                  {{ node.text }}
                </template>                  -->              