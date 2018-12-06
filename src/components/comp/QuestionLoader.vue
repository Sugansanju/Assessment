<template>
<!-- begin loader -->
<div id="loader"  class="d-flex justify-content-center">
    <div class="d-flex flex-column"> 
        <img src="/static/images/exams.svg" width="200px"/>
        <br><br>
        <h4  class="d-flex justify-content-center" style="color: #fff;">{{message}}</h4>
        <br><br>
        <pulse-loader  class="d-flex justify-content-center" color="#ffffff" size="25px"></pulse-loader>        
    </div>    
</div>
<!-- finish loader -->
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default{
    name:"Loader",
    props :['message'],
    components:{
        PulseLoader,
    }
};
</script>
<style>
  #loader {
    position: fixed;
    padding-top: 15%;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    /* z-index: 99999; */
    background: #99ddff;
    /* text-align: center; */
    /* opacity: .5; */
  }
</style>
