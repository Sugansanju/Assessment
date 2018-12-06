<template>
<div>
 <!-- <b-navbar toggleable="md" class="nav" >
     <b-nav-item href="#">
            <i class="fa fa-tachometer px-2" aria-hidden="true"></i><span>DashBoard</span>
        </b-nav-item>
         <b-nav-item-dropdown>
           <template slot="button-content">
              <i class="fa fa-pencil-square-o px-2 dropdown" aria-hidden="true"></i><span>Assessment</span>
        </template>
        <b-dropdown-item href="#/admin/addTest">Assessment</b-dropdown-item>
        <b-dropdown-item href="#">Question Bank</b-dropdown-item>
        <b-dropdown-item href="#">Self Practice Test</b-dropdown-item>
        <b-dropdown-item href="#">Tags</b-dropdown-item>
        <b-dropdown-item href="#">OMR</b-dropdown-item>
      </b-nav-item-dropdown>
        <b-nav-item href="#/admin/users">
            <i class="fa fa-users px-2" aria-hidden="true"></i><span>Account</span>
        </b-nav-item>
    </b-navbar> -->
     <b-navbar toggleable="md" class="nav" style="padding:3px;height:40px;" >

    <!-- <b-collapse is-nav id="nav_dropdown_collapse"> -->
   <b-navbar-nav>
     <b-nav-item v-for="item in items"
                 :href="item.link"
                 :key="item.name"
                 :class="item.active">
           <i :class="item.icon" aria-hidden="true"></i>{{item.name}}
        </b-nav-item>
   </b-navbar-nav>
    <!-- </b-collapse> -->
    </b-navbar>
</div>
</template>

<script>
export default {
name:'SubHeader',
props:['items']
}
</script>

<style scoped>
.nav{
  background-color:white;
  border:1px solid #eeee;
}

.show:hover + .list-assessment{
  max-height: inherit;
  opacity: 1;
}

.list-assessment{
  list-style-type: none;
  padding: 0px;
  margin: 0px;
  max-height: 0px;
  opacity: 0;
  overflow: hidden;
  transition: opacity 300ms ease;
}
.dropdown:hover>.dropdown-menu {
  display: block;
}

.dropdown>.dropdown-toggle:active {
    pointer-events: none;
}
.navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover{
  color:#17a2b8;
  cursor: pointer;
}
.navbar-light .navbar-nav .active>.nav-link, .navbar-light .navbar-nav .nav-link.active, .navbar-light .navbar-nav .nav-link.show, .navbar-light .navbar-nav .show>.nav-link {
    color: #17a2b8;
}
</style>
