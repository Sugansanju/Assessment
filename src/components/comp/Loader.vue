<template>
<!-- begin loader -->
<div id="loader">
    <pulse-loader class="d-flex justify-content-center"  color="#ffffff" size="25px"></pulse-loader>
</div>
<!-- finish loader -->
</template>
<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default{
    name:"Loader",
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
    z-index: 99999;
    background: #99ddff;
    opacity: .5;
  }
</style>
