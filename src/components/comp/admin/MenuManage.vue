<template>
  <div>
    <main-header :currentUser="currentUser"></main-header>
    <sub-header :items="subMenu"></sub-header>
    <bread-crumb :items="crumbItems"></bread-crumb>
    <b-container style="border:1px solid #eee;padding:0 0 0 0;">
      <div style="padding-bottom: 15px;background:#00A1B5;color: #fff;padding: 50px 0px 2px 0px;">
        <div class="pull-left" style="margin-top:-40px;margin-left:10px;">
          <span style="font-size:20px;font-weight:bold;">Menu Management</span>
        </div>
        <div class="pull-right" style="padding:12px;margin-top:-50px;">
          <b-btn class="btn-sm add-btn" v-b-modal.addMenuModal style>
            <i class="fa fa-plus px-2" style="font-weight:bold;" aria-hidden="true">
              <span style="font-weight:bold;margin-left:12px;">Add Menu</span>
            </i>
          </b-btn>
          <b-btn class="btn-sm add-btn" v-b-modal.addSubMenuModal style>
            <i class="fa fa-plus px-2" style="font-weight:bold;" aria-hidden="true">
              <span style="font-weight:bold;margin-left:12px;">Add SubMenu</span>
            </i>
          </b-btn>
        </div>
      </div>
      <br>
      <b-tabs card>
        <b-tab title="Menu">
          <b-table
            striped
            hover
            responsive
            :items="menuItems"
            :fields="menuTableFields"
            :current-page="currentPage"
            :per-page="perPage"
          >
            <template slot="MenuName" slot-scope="data">
              <b-link>{{data.item.menuName}}</b-link>
            </template>
            <template slot="action" slot-scope="data">
              <b-btn
                class="btn-sm"
                style="background-color:slateblue;border:none;"
                @click="viewSubMenu(data.item.menuId,activePack=data.item)"
              >
                <span style="font-size:15px;">
                  <i class="fa fa-plus" aria-hidden="true"></i>
                </span>
              </b-btn>
              <b-btn
                class="btn-sm"
                @click="showEditModal(data.item)"
                style="background-color:green;border:none;"
              >
                <span style="font-size:15px;">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
              </b-btn>
              <b-btn
                class="btn-sm"
                @click="removeMenu(data.item)"
                style="background-color:red;border:none;"
              >
                <span style="font-size:15px;">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </span>
              </b-btn>
            </template>
          </b-table>
        </b-tab>
        <b-tab title="SubMenu">
          <b-table
            striped
            hover
            responsive
            :items="subMenuItems"
            :fields="subMenuTableFields"
            :current-page="currentPage"
            :per-page="perPage"
          >
            <template slot="subMenuName" slot-scope="data">
              <b-link>{{data.item.subMenuName}}</b-link>
            </template>
            <template slot="action" slot-scope="data">
              <b-btn
                class="btn-sm"
                @click="subMenuEditModal(data.item)"
                style="background-color:green;border:none;"
              >
                <span style="font-size:15px;">
                  <i class="fa fa-pencil" aria-hidden="true"></i>
                </span>
              </b-btn>
              <b-btn
                class="btn-sm"
                @click="removeSubMenu(data.item)"
                style="background-color:red;border:none;"
              >
                <span style="font-size:15px;">
                  <i class="fa fa-trash" aria-hidden="true"></i>
                </span>
              </b-btn>
            </template>
          </b-table>
        </b-tab>
      </b-tabs>
    </b-container>
    <loader v-if="isLoading"></loader>
    <add-menu-modal @insert="addMenu"></add-menu-modal>
    <sub-menu-modal @subMenu="addSubMenu"></sub-menu-modal>
    <sub-menu-edit-modal
      :items="subMenuDetails"
      :show="showSubMenuEditModal"
      @updateSubMenu="updateSubMenu"
      @close="closeSubMenuEditModal"
    ></sub-menu-edit-modal>
    <menu-edit-modal
      :items="menuDetails"
      :show="showMenuEditModal"
      @updateMenu="updateMenu"
      @close="closeMenuEditModal"
    ></menu-edit-modal>
    <view-sub-menu-modal
      :item="subMenuItems"
      :itemId="subMenuInMenu"
      :show="showSubMenu"
      @addSubMenuInMenu="addSubMenuInMenu"
      @close="closeSubMenu"
    ></view-sub-menu-modal>
  </div>
</template>
<script>
import MainHeader from "@/components/comp/MainHeader";
import SubHeader from "@/components/comp/admin/SubHeader";
import BreadCrumb from "@/components/comp/admin/BreadCrumb";
import AddMenuModal from "@/components/comp/modals/AddMenuModal";
import SubMenuModal from "@/components/comp/modals/SubMenuModal";
import ViewSubMenuModal from "@/components/comp/modals/ViewSubMenuModal";
import MenuEditModal from "@/components/comp/modals/MenuEditModal";
import SubMenuEditModal from "@/components/comp/modals/SubMenuEditModal";
import Loader from "@/components/comp/Loader.vue";
import Global from "@/service/Global";
import AccountApi from "@/service/Account";
import swal from "sweetalert2";
const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});
export default {
  name: "MenuManage",
  components: {
    MainHeader,
    SubHeader,
    BreadCrumb,
    SubMenuModal,
    AddMenuModal,
    ViewSubMenuModal,
    MenuEditModal,
    SubMenuEditModal,
    Loader
  },
  data: function() {
    return {
      isLoading: false,
      currentUser: null,
      menuItems: [],
      menuDetails: [],
      subMenuDetails: [],
      showMenuEditModal: false,
      showSubMenuEditModal: false,
      subMenuInMenu: [],
      activePack: null,
      showSubMenu: false,
      subMenuItems: [],
      currentPage: 1,
      perPage: 10,
      menuTableFields: {
        menuName: { label: "Menu Name", sortable: true },
        action: { label: "Action", sortable: false }
      },
      subMenuTableFields: {
        subMenuName: { label: "SubMenu Name", sortable: true },
        action: { label: "Action", sortable: false }
      },
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
          active: ""
        },
        {
          name: "Menu",
          link: "#/admin/addMenu",
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
          text: "Add Menu",
          href: "#/admin/addMenu",
          active: true
        }
      ]
    };
  },
  async mounted() {
    this.isLoading = true;
    await Global.onPageRefresh(this.$session, this.$router);
    await this.getUserInfo();
    await this.getAllMenu();
    await this.getAllSubMenu();
    this.isLoading = false;
  },
  methods: {
    viewSubMenu: function(menuId) {
      return new Promise((resolve, reject) => {
        axios
          .get("/menu/get/" + menuId)
          .then(response => {
            this.subMenuInMenu.splice(0);
            // console.log(response.data)
            for (let i = 0; i < response.data.length; i++) {
              this.subMenuInMenu.push(response.data[i].subMenuId);
            }
            this.showSubMenu = true;
            this.getAllMenu();
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
    closeSubMenu: function() {
      this.showSubMenu = false;
    },
    showEditModal: function(menuItem) {
      this.menuDetails = menuItem;
      this.showMenuEditModal = true;
    },
    closeMenuEditModal: function() {
      this.showMenuEditModal = false;
    },
    subMenuEditModal: function(subMenuItem) {
      this.subMenuDetails = subMenuItem;
      this.showSubMenuEditModal = true;
    },
    closeSubMenuEditModal: function() {
      this.showSubMenuEditModal = false;
    },

    // Add Menu

    addMenu: function(data) {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("menu/create", data, config)
          .then(response => {
            this.isLoading = false;
            this.getAllMenu();
            resolve(response);
            toast({
              type: "success",
              title: "menu created successfully"
            });
            this.isLoading = false;
          })
          .catch(err => {
            console.log(err);
            reject(err);
            toast({
              type: "error",
              title: "Menu creation failed"
            });
          });
      });
      this.isLoading = false;
    },

    //Update Menu

    updateMenu: function(data) {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("menu/update", data, config)
          .then(response => {
            this.isLoading = false;
            this.getAllMenu();
            resolve(response);
            toast({
              type: "success",
              title: "menu updated successfully"
            });
            this.isLoading = false;
          })
          .catch(err => {
            console.log(err);
            reject(err);
            toast({
              type: "error",
              title: "Menu updation failed"
            });
          });
      });
      this.isLoading = false;
    },

    //Remove Menu

    removeMenu: function(menu) {
      this.isLoading = true;
      let data = {
        menuId: menu.menuId,
        menuName: menu.menuName
      };
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("menu/delete", data, config)
          .then(response => {
            this.getAllMenu();
            resolve(response);
            toast({
              type: "success",
              title: "Menu removed successfully"
            });
            this.isLoading = false;
          })
          .catch(err => {
            reject(err);
            console.log(err);
            toast({
              type: "error",
              title: "Menu removed failed"
            });
          });
      });
    },

    //Add SubMenu

    addSubMenu: function(data) {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("submenu/create", data, config)
          .then(response => {
            this.isLoading = false;
            this.getAllSubMenu();
            // window.location.reload();
            resolve(response);
            toast({
              type: "success",
              title: "SubMenu created successfully"
            });
            this.isLoading = false;
          })
          .catch(err => {
            console.log(err);
            reject(err);
            toast({
              type: "error",
              title: "SubMenu creation failed"
            });
          });
      });
      this.isLoading = false;
    },

    //Update SubMenu

    updateSubMenu: function(data) {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("submenu/update", data, config)
          .then(response => {
            this.isLoading = false;
            this.getAllSubMenu();
            resolve(response);
            toast({
              type: "success",
              title: "SubMenu updated successfully"
            });
            this.isLoading = false;
          })
          .catch(err => {
            console.log(err);
            reject(err);
            toast({
              type: "error",
              title: "SubMenu updated failed"
            });
          });
      });
      this.isLoading = false;
    },

    //Remove SubMenu

    removeSubMenu: function(subMenu) {
      let data = {
        subMenuId: subMenu.subMenuId,
        subMenuName: subMenu.subMenuName,
        serviceType: subMenu.serviceType,
        domain: subMenu.domain,
        url: subMenu.url
      };
      // console.log(data)
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("submenu/delete", data, config)
          .then(response => {
            // console.log("Response Received", response.data);
            // this.getAllMenu();
            this.getAllSubMenu();
            resolve(response);
            toast({
              type: "success",
              title: "SubMenu removed successfully"
            });
          })
          .catch(err => {
            reject(err);
            console.log(err);
            toast({
              type: "error",
              title: "SubMenu removed failed"
            });
          });
      });
    },

    //SubMenu In Menu

    addSubMenuInMenu: function(selectedsubmenu) {
      this.isLoading = true;
      // console.log("SubMenu Details",selectedsubmenu)
      let data = {
        menuId: this.activePack.menuId,
        menuName: this.activePack.menuName,
        subMenus: selectedsubmenu
      };
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("/menu/submenu/bulkadd", data, config)
          .then(response => {
            this.isLoading = false;
            this.getAllMenu();
            this.getAllSubMenu();
            resolve(response);
            toast({
              type: "success",
              title: "SubMenus added to Menu successfully"
            });
            this.showSubMenu = false;
          })
          .catch(err => {
            this.isLoading = false;
            console.log(err);
            toast({
              type: "error",
              title: "Adding SubMenus to the Menu failed"
            });
          });
      });
    },
    getAllMenu: function() {
      this.isLoading = false;
      return new Promise((resolve, reject) => {
        axios
          .get("menu/all")
          .then(response => {
            this.isLoading = false;
            this.menuItems.splice(0);
            for (var i = 0; i < response.data.length; i++)
              this.menuItems.push(response.data[i]);
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "Getting menus failed"
            });
            reject(err);
          });
      });
    },
    getAllSubMenu: function() {
      this.isLoading = false;
      return new Promise((resolve, reject) => {
        axios
          .get("submenu/all")
          .then(response => {
            this.isLoading = false;
            this.subMenuItems.splice(0);
            for (var i = 0; i < response.data.length; i++)
              this.subMenuItems.push(response.data[i]);
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            toast({
              type: "error",
              title: "Getting menus failed"
            });
            reject(err);
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
  }
};
</script>

<style scoped>
.add-btn-edit {
  background-color: teal;
}
.add-btn-edit:hover {
  background-color: teal;
}
.btn {
  border-radius: 20px;
}
.btn-size {
  width: 100px;
}
.add-btn:active {
  background-color: #000;
  color: #fff;
}
.add-btn {
  background-color: #00a1b5;
  border: 1px solid #00a1b5;
}
.add-btn:hover {
  background-color: #00a1b5;
  color: white;
  border: 1px solid #00a1b5;
}
</style>
