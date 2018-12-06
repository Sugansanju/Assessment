<template>
  <div>
    <!-- <div class="login-screen"></div> -->
    <main-header :currentUser="currentUser"></main-header>
    <sub-header :items="menuItems"></sub-header>
    <bread-crumb :items="crumbItems"></bread-crumb>
    <b-container fluid style="padding:10px;">
    <!-- <div style="background-color:#eeee;">
      <div class="pull-right">
      <b-col style="margin-top:-75px;">
       <b-dropdown  text="RRB Model Question Paper" variant="info" class="m-2">
                       <b-dropdown-item>Class Test</b-dropdown-item>
                        <b-dropdown-item>SBI Prelims Clerk Model Test</b-dropdown-item>
                        <b-dropdown-item>RRB Model Question Paper</b-dropdown-item>
                        <b-dropdown-item>Sample 2018</b-dropdown-item>
        </b-dropdown>
      </b-col>
      </div>
    </div> -->
    <b-container fluid style="padding:0 0 0 0;margin-left:80px;">
      <b-row >
           <!-- <b-card v-for="(pack, index) in packItems" v-bind:key="index"
                  eader="featured"
                  img-src="https://placekitten.com/450/150"
                  header-tag="header"
                  :title="pack.packName"
                  class="bg-light text-dark pack-card mb-4 ml-4 "
                  @click="questionPack(pack.packId)"
                  style="cursor: pointer;border-radius:5px;">
              <p class="card-text">
                  <span style="font-size:14px;">{{pack.packDescription}}</span>
              </p>
              <em slot="footer">
                      <span>
                        <i class="fa fa-check-circle px-2" aria-hidden="true"></i>
                        click here to get started
                        <i class="bg-con px-go-ico fa fa-angle-right px-4 " aria-hidden="true"></i>
                      </span>
              </em>
          </b-card> -->
            <b-card
                  eader="featured"
                  img-src="https://picsum.photos/600/200/?image=25"
                   style="cursor: pointer;border-radius:20px;background-color:#eee;width:380px;"
                  class="bg-light  text-dark pack-card ">
                  <div slot="header" class="text-center" style="font-weight:bold;font-size:20px;margin-left:-50px;padding:0px;">
                    <span>Numeric</span></div>

                 <div class="card-text" style="margin-top:20px;">
                  <span style="font-size:16px;"> IBPS Model Question</span>
                  </div>
                  <em slot="footer">
                    <div class="d-flex justify-content-between">
                      <div style="margin-top:14px;">
                        <i class="fa fa-eye px-2" aria-hidden="true"></i>20</div>
                        <div>
                         <b-button  class="btn-sm launch btn-active mt-2"><b>Launch</b></b-button>
                        <!-- <i class="bg-con px-go-ico fa fa-angle-right px-4 " aria-hidden="true"></i> -->
                      </div>
                    </div>
              </em>
          </b-card>
           <b-card
                  eader="featured"
                  img-src="https://picsum.photos/600/200/?image=36"
                   style="cursor: pointer;border-radius:20px;background-color:#eee;width:380px;margin-left:20px;"
                  class="bg-light  text-dark pack-card ">
                  <div slot="header" class="text-center" style="font-weight:bold;font-size:20px;margin-left:-50px;padding:0px;">
                    <span>General Knowledge</span></div>

                 <div class="card-text" style="margin-top:20px;">
                  <span style="font-size:16px;">Current Events </span>
                  </div>
                  <em slot="footer">
                    <div class="d-flex justify-content-between">
                      <div style="margin-top:14px;">
                        <i class="fa fa-eye px-2" aria-hidden="true"></i>50</div>
                        <div>
                         <b-button  class="btn-sm launch btn-active mt-2"><b>Launch</b></b-button>
                        <!-- <i class="bg-con px-go-ico fa fa-angle-right px-4 " aria-hidden="true"></i> -->
                      </div>
                    </div>
              </em>
          </b-card>
           <b-card
                  eader="featured"
                  img-src="https://picsum.photos/600/200/?image=37"
                   style="cursor: pointer;border-radius:20px;background-color:#eee;width:380px;margin-left:20px;"
                  class="bg-light  text-dark pack-card ">
                  <div slot="header" class="text-center" style="font-weight:bold;font-size:20px;margin-left:-50px;padding:0px;">
                    <span>Aptitute</span></div>

                 <div class="card-text" style="margin-top:20px;">
                  <span style="font-size:16px;">Latest Updates</span>
                  </div>
                  <em slot="footer">
                    <div class="d-flex justify-content-between">
                      <div style="margin-top:14px;">
                        <i class="fa fa-eye px-2" aria-hidden="true"></i>5</div>
                        <div>
                         <b-button  class="btn-sm launch btn-active mt-2"><b>Launch</b></b-button>
                        <!-- <i class="bg-con px-go-ico fa fa-angle-right px-4 " aria-hidden="true"></i> -->
                      </div>
                    </div>
              </em>
          </b-card>
      </b-row>
    </b-container>
    </b-container>
    <loader v-if="isLoading"></loader>
  </div>
</template>

<script>
import MainHeader from '@/components/comp/MainHeader';
import SubHeader from '@/components/comp/candidate/SubHeader';
import BreadCrumb from '@/components/comp/candidate/BreadCrumb';
import Global from "@/service/Global";
import AccountApi from "@/service/Account";
import swal from "sweetalert2";
import Loader from "@/components/comp/Loader";
const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});
export default {
name:'TestCenter',
components:{
  MainHeader,
  SubHeader,
  BreadCrumb,
  Loader
},
props:['testId'],
async mounted() {
  this.isLoading = true;
  // console.log("Getting refresh token");
   await Global.onPageRefresh(this.$session, this.$router);
  // console.log("Getting User Info");
  await this.getUserInfo();

  await this.getAllMenu();
  // console.log("Getting packs");
  await this.getAllPacks();
  this.isLoading = false;
},
data:function(){
  return{
    isLoading: false,
    currentUser:null,
    menuItems:[],
    crumbItems: [
      {
        text: 'DashBoard',
        href:'#/candidate/dashboard',
        active: true
      }],
    packItems:[],
  }
},
methods:{
  getUserInfo() {
      return new Promise((resolve, reject) => {
        if (this.$session.exists("contact")) {
          Global.getUserInfo(this.$session)
            .then(response => {
              // this.$session.set("current_user", response.data);
              this.currentUser = response.data;
              resolve(response);
              // console.log(this.currentUser);
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        }
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
            // console.log("Response Received",response.data);
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            this.isLoading = false;
            reject(err);
          });
      });
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
            for (var i = 0; i < response.data.length; i++)
              this.packItems.push(response.data[i]);
            // console.log("Response Received", this.packItems);
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
  questionPack:function(packId){
    this.$router.push('/candidate/pack/'+packId);
  }
}
}
</script>

<style scoped>
.px-sta {
    padding: 20px;
    margin: 0 auto 32px auto;
    max-width: 360px;
}
.pack-card:hover {
  width:500px;
 box-shadow: 5px 8px 15px  #888888;
}
.card-footer{
  border-top:1px solid black;
}
.login-screen {
    background-color:#555;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    -moz-background-size: cover;
    -webkit-background-size: cover;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
}
.login-screen:before {
    content: "";
    background: rgba(0,0,0, 0.5);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
.card-header {
    padding: 0.5rem 0rem 0.5rem 3.5rem;
    margin-bottom: 0;
    /* border-top-left-radius:20px; */
     /* border-top-left-radius:20px; */
    background-color:#eee;
    border-bottom: none;
}
.launch{
  background-color:#ec7211;
  border-color:#ec7211;
}
.card-img {
    width: 100%;
    border-top-left-radius:20px;
     border-top-right-radius:20px;
}
</style>
