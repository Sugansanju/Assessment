<template>
<div>
 <b-navbar toggleable="md" class="nav" style="padding:3px;height:40px;color:#ff9600;" >
   <b-navbar-nav  style="color:#ff9600;">
      <b-nav-item href="#/candidate/dashboard">
            <i class="fa fa fa-home px-2" ></i>
            <span>DashBoard</span>
        </b-nav-item>
        <!-- <div  v-for="item in items" v-bind:key="item.index">
         <b-nav-item-dropdown  :text="item.menuName" center >
            <b-dropdown-item  v-for="i in item.subMenus" v-bind:key="i.index" :href="i.serviceType+'://'+i.domain+'/'+i.url">{{i.subMenuName}}</b-dropdown-item>
         </b-nav-item-dropdown>
        </div> -->
    </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
import Global from "@/service/Global"
export default {
name:'SubMenu',
props:['items'],
components:{
},
data:function(){
  return{

  }
},
methods:{


}
}
</script>

<style scoped>
.nav{
 background-color:#444;
 /* border:2px solid #252f3e; */
    /* background-color:#26323F; */
}
.navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover{
  /* color:#17a2b8; */
  color:#ff9600;
  cursor: pointer;
}
.navbar-light .navbar-nav .active>.nav-link, .navbar-light .navbar-nav .nav-link.active, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .show>.nav-link {
    color:#17a2b8;
}
.navbar-light .navbar-nav .nav-link {
    color: white;
}
.navbar-text {
  display: inline-block;
  color:#ff9600;
}
</style>
