<template>
  <div>
  <main-header :currentUser="currentUser"></main-header>
  <sub-header :items="subMenu"></sub-header>
  <bread-crumb :items="crumbItems"></bread-crumb>
  <b-container style="border:1px solid #eee;padding:10px;" fluid>
    <!-- <b-row>
      <b-col>
        <div>
          <b-btn size="sm" variant="primary" v-b-modal.viewTestModal>Import Test</b-btn>
        </div>
      </b-col>
    </b-row> -->
    <b-row>
      <b-col cols="3" style="height: 75vh;">
      <div class="navigation">
        <div class="navigation-filter">
          <input type="text" v-model="treeFilter" placeholder="Type to filter...">
        </div>
        <div class="navigation-tree" style="text-color: #000" v-if="treeData.length!=0">
          <liquor-tree :data="treeData" :options="treeOptions" :filter="treeFilter" v-model="selectedNode">
            <div slot-scope="{ node }" class="node-container">
              <span class="node-text" :id="'pop'+node.text+Math.random">
                  <i class="fa fa-folder" style="color: teal"></i>
                  {{ node.text }}                
              </span>
              <!-- <span class="node-text" :id="'pop'+node.text+Math.random" >
                  <i class="fa fa-file-o" style="color: grey"></i>
                  {{ node.text }}                
              </span>               -->
              <b-popover :target="'pop'+node.text+Math.random" title="Actions" placement="rightbottom">
                  <b-btn size="sm" variant="primary" @mouseup.stop="editNode(node)"><i class="fa fa-edit"></i></b-btn>
                  <b-btn size="sm" variant="success" @mouseup.stop="addChildNode(node)"><i class="fa fa-plus"></i></b-btn>
                  <b-btn size="sm" variant="warning" @mouseup.stop="importTestToNode(node)"><i class="fa fa-download"></i></b-btn>
                  <b-btn size="sm" variant="danger" @mouseup.stop="removeNode(node)"><i class="fa fa-trash"></i></b-btn>
              </b-popover>
              </div>
          </liquor-tree>
        </div>
      </div>
      </b-col>
      <b-col>
      <!-- <div class="content"> -->
        <div v-if="selectedNode!=null">
        {{selectedNode.tree.model}}
        <br>
        {{nodeData}}

        </div>
        <!-- <div v-if="!selectedNode || selectedNode.hasChildren()">Welcome!</div>-->
      <!-- </div> -->
      </b-col>
    </b-row>
      <b-modal id="viewTestModal"
                    hide-footer
                    hide-header
                    no-close-on-backdrop
                    no-close-on-esc
                    v-model="showTestModal">
      <b-container>
        <b-row>
        <h5 class="col-12 modal-title mainfont" >
              <strong>View All Test</strong>
              <button type="button" class="close staffmodal-close" data-dismiss="modal" aria-label="Close" @click="showTestModal=!showTestModal">
                  <span aria-hidden="true">&times;</span>
              </button>              
          </h5>
          </b-row>
          <hr><br>
        <div v-for="item in testItems"  v-bind:key="item.index">
        <b-form-checkbox-group  stacked id="check" name="testName" v-model="selected" >
              <b-form-checkbox :value="item.id"><span style="font-weight:bold;font-size:16px;">{{item.text}}</span></b-form-checkbox>
              <hr>
            </b-form-checkbox-group>
        </div>
        <div class="text-right">
        <b-btn class="btn-sm btn-edit" @click="addTest">Add</b-btn>
        </div>
      </b-container>
      </b-modal>
  
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
import LiquorTree from 'liquor-tree'
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
    LiquorTree
  },
  async mounted() {
    // console.log("Getting refresh token");
    await Global.onPageRefresh(this.$session, this.$router);
    // console.log("Getting User info");
    await this.getUserInfo();

    await this.getAllPacks();

    await this.getAllTests();
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
showPopOver: false,
showTestModal: false,
selectedNode: null,
treeFilter: '',
currentNode: null,
treeOptions: {
    multiple: false,
    filter: {
    plainList: true
    }
},
selected: null,
packItems:[],
testItems: [],
treeData: [ { "text": "Sample Pack", "data": { "text": "Sample Pack" }, "state": { "selected": false, "selectable": true, "checked": false, "expanded": true, "disabled": false, "visible": true, "indeterminate": false, "matched": false, "editable": true }, "children": [ { "text": "New Node 8020", "data": { "text": "New Node 8020" }, "state": { "selected": false, "selectable": true, "checked": false, "expanded": false, "disabled": false, "visible": true, "indeterminate": false, "matched": false, "editable": true }, "children": [] }, { "text": "New Node 6549", "data": { "text": "New Node 6549" }, "state": { "selected": false, "selectable": true, "checked": false, "expanded": true, "disabled": false, "visible": true, "indeterminate": false, "matched": false, "editable": true }, "children": [ { "text": "New Node 2044", "data": { "text": "New Node 2044" }, "state": { "selected": false, "selectable": true, "checked": false, "expanded": false, "disabled": false, "visible": true, "indeterminate": false, "matched": false, "editable": true }, "children": [] }, { "text": "New Node 5725", "data": { "text": "New Node 5725" }, "state": { "selected": false, "selectable": true, "checked": false, "expanded": false, "disabled": false, "visible": true, "indeterminate": false, "matched": false, "editable": true }, "children": [] }, { "text": "New Node 164", "data": { "text": "New Node 164" }, "state": { "selected": false, "selectable": true, "checked": false, "expanded": false, "disabled": false, "visible": true, "indeterminate": false, "matched": false, "editable": true }, "children": [] } ] } ] }, { "text": "Demo Pack 2", "data": { "text": "Demo Pack 2" }, "state": { "selected": false, "selectable": true, "checked": false, "expanded": true, "disabled": false, "visible": true, "indeterminate": false, "matched": false, "editable": true }, "children": [ { "text": "New Node 3119", "data": { "text": "New Node 3119" }, "state": { "selected": false, "selectable": true, "checked": false, "expanded": false, "disabled": false, "visible": true, "indeterminate": false, "matched": false, "editable": true }, "children": [] }, { "text": "New Node 2197", "data": { "text": "New Node 2197" }, "state": { "selected": true, "selectable": true, "checked": false, "expanded": true, "disabled": false, "visible": true, "indeterminate": false, "matched": false, "editable": true }, "children": [ { "text": "New Node 6486", "data": { "text": "New Node 6486" }, "state": { "selected": false, "selectable": true, "checked": false, "expanded": false, "disabled": false, "visible": true, "indeterminate": false, "matched": false, "editable": true }, "children": [] }, { "text": "New Node 1463", "data": { "text": "New Node 1463" }, "state": { "selected": false, "selectable": true, "checked": false, "expanded": false, "disabled": false, "visible": true, "indeterminate": false, "matched": false, "editable": true }, "children": [] } ] }, { "text": "New Node 4860", "data": { "text": "New Node 4860" }, "state": { "selected": false, "selectable": true, "checked": false, "expanded": false, "disabled": false, "visible": true, "indeterminate": false, "matched": false, "editable": true }, "children": [] } ] } ] ,
nodeData: [],
// treeData : [
//           {  text: 'Disc C:', state: { expanded: true }, children: [
//             { text: 'PerfLogs' },
//             { text: 'Users', children: [
//               { text: 'User 1' },
//               { text: 'User 2' },
//               { text: 'User 3' }
//             ]},
//             { text: 'tomcat' },
//             { text: 'sysCache' },
//             { text: 'Program Files', children: [
//               { text: 'Intel' },
//               { text: 'Internet Explorer' },
//               { text: 'Opera' },
//               { text: 'Oracle' }
//             ]},
//         ]}
//       ],
    }
  },
  watch: {
    selectedNode: function(nvalue, oValue){
      console.log(nvalue);
    }
  },
  methods: {
          editNode(node, e) {
            node.startEditing();
            this.showPopOver = false;
          },

          removeNode(node) {
            if (confirm('Are you sure?')) {
              node.remove();
              this.showPopOver = false;
            }
          },
          importTestToNode(node){
            this.showTestModal = true;  
            this.currentNode = node;
          },
          addTest(){
            console.log(this.selected);
            for(let i=0;i<this.testItems.length;i++){
              if(this.selected[i]==this.testItems[i].id)
                this.currentNode.append(this.testItems[i].text);
            }
            this.selected.splice(0);
            this.showTestModal = false;
          },
          addChildNode(node) {
            if (node.enabled()) {
              node.append('New Node ' + Math.round((Math.random()*10000)));
              this.showPopOver = false;
            }
          },

          initEventViewer(event) {
            const events = this.events

            return function (node, newNode) {
              let nodeText = '-'
              let targetNode = newNode && newNode.text ? newNode : node

              if (targetNode && targetNode.text) {
                nodeText = targetNode.text
              }

              events.push(
                Object.assign(
                  {},
                  event,
                  { time: new Date, nodeText, id: key++ }
                )
              )

              // console.log(event, arguments)
            }
          },
    getAllPacks: function() {
      // console.log("Get all Packs");
      this.isLoading = false;
      return new Promise((resolve, reject) => {
        axios
          .get("pack/all")
          .then(response => {
            this.isLoading = false;
            this.packItems.splice(0);
            this.treeData.splice(0);
            for (var i = 0; i < response.data.length; i++){
              this.packItems.push(response.data[i]);
              this.treeData.push(
                {
                  id: response.data[i].packId,
                  text: response.data[i].packName,                  
                  children:[],
                }
              );
            }              
            // console.log("Response Received",response.data);
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
           toast({
              type: "error",
              title: "Getting packs failed"
            });
            reject(err);
          });
      });
    },
        getAllTests: function(){
      // console.log('Get all tests');
      this.isLoading=false;
      return new Promise((resolve, reject) => {
        axios.get("test/all")
          .then((response) => {
            // this.tests=response.data;
            this.testItems.splice(0);
            for (var i = 0; i < response.data.length; i++)
              this.testItems.push({
                id: response.data[i].testId,
                text: response.data[i].testName,
                indeterminate: true,
              });
            resolve(response);
          })
          .catch((err) => {
            console.log(err);
            reject(err);
            toast({
              type: "error",
              title: "Receiving tests failed"
            });
            this.isLoading=false;
          });
      });
    },          
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
/*
            // do not judge me :)
            computeTreeData: function(){
              	const items = {}

                this.treeData.forEach(item => {
                  const { name } = item;

                  if (false === (name in items)) {
                    items[name] = []
                  }

                  let treeItem = {
                    text: item.version ? `${item.name} ${item.version}` : item.name,
                    data: item
                  }

                  items[name].push(treeItem)
                })

                let o = Object.keys(items).reduce((a, b) => {
                  let children = items[b]
                  let item

                  if (children.length > 1) {
                    item = {
                      text: children[0].data.name,
                      data: Object.assign({}, children[0].data),
                      children
                    }
                  } else {
                    item = children[0]
                    item.data
                  }

                  if (!item.data) {
                    item.data = {
                      type: children[0].data.type,
                      isRoot: true
                    }
                  } else {
                    item.data.isRoot = true
                  }

                  a.push(item)

                  return a
                }, [])

                return items;
            }
*/
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
        /* left: 280px; */
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
