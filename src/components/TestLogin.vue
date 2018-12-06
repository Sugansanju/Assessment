<template>
<div>
  <div class="wrapper">
<b-navbar class="nav" toggleable="md" type="dark"></b-navbar>
<b-navbar class="nav2" toggleable="sm" type="dark">
  <b-navbar-brand>
    <div>
      <span class="name1" >System name:</span>
    </div>
    <div>
      <span class="details1">C001</span>
    </div>
    <div style="font-size:15px;" class="details3">
        <a style="color: white;border:none;">Contact invigilator if the Name and Photograph<br>displayed on the screen is not yours</a>
    </div>
  </b-navbar-brand>
<b-navbar-nav class="ml-auto" v-if="$session.exists('current_user')">
<b-navbar-brand >
    <div>
      <span class="name2">Candidate name:</span>
    </div>
    <div  v-if="currentUser!=null">
      <span class="details1">  {{currentUser.username!=null?currentUser.username:(currentUser.email!=null?currentUser.email:'User')}}</span>
    </div>
    <div style="margin-top:10px;text-align:right">
      <span class="name2">Subject :</span>
    <span style="font-size:15px;" class="details2">Mock Exam</span>
    </div>
</b-navbar-brand>
	<div align="center" class="user_pic"><img width="94" height="101" align="absmiddle" class="candidateImg" src="/static/images/user.png"></div>
    </b-navbar-nav>
</b-navbar>
  </div>
<b-container>
      <b-row>
        <b-col cols="4">
        </b-col>
        <b-col style="margin-top:5%">
          <div class="card">
            <div class="card form-header" style="text-align:left;background-color:#DCDCDC;border-radius:5px 5px 0 0 ;">
              <span style="">Login</span>
            </div>
          <div class="card card-style" style="background:#F5F5F5;border-radius: 0 0 5px 5px;">
            <div class="card-body text-center">
                    <b-form style="margin-top:12px;">
                        <b-input-group>
                            <b-input-group-text slot="prepend">
                                <i class="fa fa-user" aria-hidden="true"></i>
                              </b-input-group-text>
                              <b-input-group-text slot="append"  style="cursor:pointer;">
                                <i class="fa fa-keyboard-o" aria-hidden="true"></i>
                              </b-input-group-text>
                              <b-form-input class="input-active" style="background:#EAEAE4;color:#A8ACBC;" placeholder="1111"> </b-form-input>
                            </b-input-group>
                        <br>
                <b-input-group>
                  <b-input-group-text slot="prepend">
                      <i class="fa fa-lock" aria-hidden="true"></i>
                    </b-input-group-text>
                    <b-input-group-text slot="append" style="cursor:pointer;">
                      <i class="fa fa-keyboard-o" aria-hidden="true"></i>
                    </b-input-group-text>
                    <b-form-input class="input-active" style="background:#EAEAE4;color:#A8ACBC;" placeholder="*****"> </b-form-input>
                </b-input-group>
              <br>
              <b-col>
                 <b-button class="form-control" style="background-color:#00A9E5;color:white;margin-top:20px;" @click="liveTest(packId)">Sign In</b-button>
              </b-col>
            </b-form>
            </div>
          </div>
          </div>
        </b-col>
         <b-col cols="4">
        </b-col>
      </b-row>
    </b-container>

</div>
</template>

<script>
import Global from "@/service/Global";
import swal from "sweetalert2";
const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});
export default {
name:'LoginPage',
components:{

},
props:['packId'],
data:function(){
  return{
    currentUser:null,

  }
},
async mounted() {
        this.isLoading = true;
        // console.log("Getting refresh token");
        await Global.onPageRefresh(this.$session, this.$router);
        // console.log("Getting User info");
        await this.getUserInfo();
        this.isLoading = false;
      },
methods:{
  liveTest:function(packId){
       this.$router.push('/candidate/pack/'+ this.packId);
    window.open("/#/livetest/"+packId, "newWin", "width="+screen.availWidth+",height="+screen.availHeight)
  },
  getUserInfo() {
      return new Promise((resolve, reject) => {
        if (this.$session.exists("contact")) {
          Global.getUserInfo(this.$session)
            .then(response => {
              this.$session.set("current_user", response.data);
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
    }
}
}
</script>

<style  scoped>
.nav{
  height:40px;
  background-color: #1E70B2;
}
.nav2{
  height:150px;
  background-color: #666666;
}
.wrapper {
  display: flex;
  align-items: stretch;
  flex-direction:column;
}
.system{
  text-align: left;
   color:white;
}
.candidate{
  text-align: right;
  color:white;
}
.detail-container{
  background-color:#666666;
  height:150px;
}
.title{
   white-space: nowrap;
  font-size:20px;
}
.name{
  font-size:40px;
  color:yellow;
}
.form-header{
    background: none repeat scroll 0 0 #DDD;
    border: 1px solid #dbdbdb;
    border-radius: 5px 5px 0 0;
    color: #444;
    font-size: 14px;
    font-weight: bold;
    padding: 8px 22px;
}
 .system_info {
  background: #666;
  height: 149px;
	border-bottom: 1px solid #444;
}
 .system_name {
    float: left;
}
.name1 {
    color: #ffffff;
    font-size: 18px;
    margin-left: 20px;
    margin-top: 5px;
    text-align: left;
}
 .details1 {
    color: #fff200;
    font-size: 44px;
    margin-left: 20px;
    text-align: left;
}
 .details3 {
    color: #fff200;
    font-size: 34px;
    margin-left: 20px;
    text-align: left;
}
 .user_pic {
    background: #fafbfc none repeat scroll 0 0;
    border-bottom: 1px solid #444;
    padding:0 0 0 0;
    vertical-align: middle;
    width: 137px;
}
.user_pic img {
    border: 1px solid #000;
    padding:0 0 0 0;
    margin-top: 20px;
}
.input-active{
  outline:none;
  box-shadow: none !important;
}
input:focus{
  outline:none;
}
 .user_name {
    float: right;
    padding-right: 10px;
}
 .name2 {
    color: #ffffff;
    font-size: 10px;
    margin-left: 20px;
    margin-top: 10px;
    text-align: right;
}
 .details2 {
    color: #fff200;
    font-size: 34px;
 }
.form-header{
    color: #444;
    font-size: 14px;
    font-weight: bold;
}
</style>
