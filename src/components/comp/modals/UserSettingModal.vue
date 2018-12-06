<template>
 <div>
  <b-modal  id="userSetting"
            :header-bg-variant="headerBgVariant"
            :header-text-variant="headerTextVariant"
            title="User Settings"
            no-close-on-backdrop
            no-close-on-esc
            hide-footer
            centered
            size="md"
            ref="userSetting">
  <template slot="modal-title">
    <span style="font-weight:bold;font-size:20px;">User Settings</span>
  </template>
  <b-container fluid style="padding:0 0 0 0;">
   <b-container fluid>
     <div class="d-flex justify-content-center">
       <b-row>
        <b-col>
          <div class="form-group"
               style="text-align: center">
           <label style="display:block;" for="avatar">
              <!-- <img :src="'data:image/jpeg;base64,'+image" class="profileUpload"> -->
              <!-- <img :src="image" class="profileUpload"> -->
              <img :src="image!=null?image:'/static/images/user96.png'" />
           </label>
            <!-- <div class="col-md-6">
              <input type="file" class="form-control" id="avatar" style="display: none" @change="onFileChange" >
             </div> -->
           </div>
          </b-col>
         </b-row>
        </div>
     </b-container>
     <b-container fluid style="padding:0 0 0 0;">
       <div>
         <b-row>
           <b-col>
             <b-tabs card style="padding:0 0 0 0;border:none;">
              <b-tab title="Profile" v-if="currentUser!=null">
                <profile-tab @close="close" :fname="currentUser.firstName" :lname="currentUser.lastName"></profile-tab>
               </b-tab>
               <b-tab title="Security">
                 <security-tab></security-tab>
                </b-tab>
                <b-tab title="Contact">
                 <contact-tab></contact-tab>
                </b-tab>
               </b-tabs>
              </b-col>
            </b-row>
          </div>
        </b-container>
  </b-container>
 </b-modal>
 </div>
</template>

<script>
import ProfileTab from "@/components/comp/modals/tabs/ProfileTab";
import ContactTab from "@/components/comp/modals/tabs/ContactTab";
import SecurityTab from "@/components/comp/modals/tabs/SecurityTab";
import AccountApi from "@/service/Account"
import GlobalApi from "@/service/Global";
// import AdvancedTab from '@/components/comp/modals/tabs/AdvancedTab';
export default {
  name: "UserSettingModal",
  props: ['currentUser', 'image'],
  components: {
    ProfileTab,
    ContactTab,
    SecurityTab
    // AdvancedTab
  },
  data: function() {
    return {
      headerBgVariant: "info",
      headerTextVariant: "light",
      // image: this.$session.get('avatar'),
          // image:'http://localhost:9088/uploads/avatars/'+this.$session.get('current_user').avatar,
          // imageUrl:'http://localhost:9088/uploads/avatars/'+this.$session.get('current_user').avatar,
    };
  },
  mounted(){

  },
  methods: {

    onFileChange(e) {
      let imageFile = e.target.files || e.dataTransfer.files;
      GlobalApi.uploadImage(imageFile, this.$session.get("current_user").id);
      // this.createImage(this.image,e);
      // GlobalApi.onPageRefresh(this.$session);

    },
    // createImage(file,e) {
    //   const image = e.target.files[0];
    //   const reader = new FileReader();
    //   reader.readAsDataURL(image);
    //   console.log(image.name);
    //    reader.onload = e =>{
    //                 this.image = e.target.result;
    //             };
    //   },
    // avatarUpload:function(Iname){
    //   console.log("Image",Iname);
    //  AccountApi.profileImage(Iname,this.$session.get("access_token"))
    //     .then(response => {
    //       console.log(response);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
     close: function() {
      this.$refs.userSetting.hide();
      this.clearDetails();
    }
  }
};
</script>

<style>
.modal-content {
  border-radius: 1.3rem;
}
.profileUpload {
  width: 100px;
  height: 100px;
  -moz-border-radius: 50px;
  -webkit-border-radius: 50px;
  border-radius: 50px;
  background-image: url("/static/images/uploadimg.png");
  background-size: 100px 100px;
  cursor: pointer;
}
.nav-link {
  display: block;
  /* padding: 0rem 1.2rem; */
  padding: 0rem 2rem;
  font-size: 17px;
  font-weight: bold;
  /* padding: 0.5rem 1.1rem; */
}
.nav-tabs .nav-link {
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}
.card-header {
  padding: 0.5rem 0rem 0.5rem 3.5rem;
  margin-bottom: 0;
  background-color: white;
  border-bottom: none;
}
.nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  color: #00a1b5;
  border: none;
  border-bottom: 2px solid #00a1b5;
  border-color: #00a1b5 #00a1b5 00a1b5 #fff;
}
a {
  color: black;
  text-decoration: none;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}
.btn-edit {
  width: 100px;
  margin-right: 30px;
  border-radius: 20px;
  background-color: #00a1b5;
  font-size: 15px;
  font-weight: bold;
}
</style>
