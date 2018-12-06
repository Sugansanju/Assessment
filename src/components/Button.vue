<template>
  <div>
    <b-container>
      <b-row >
     <b-col class="d-flex justify-content-center ">
    <b-button style="background-color:#4accec;border:none;margin-top:30%;" @click="newTab">
     TAKE TEST
     </b-button>
     </b-col>
     </b-row>
      </b-container>
  </div>
</template>

<script>
export default {
name:'Button',
components:{

},
data:function(){
  return{

  }
},
methods:{
  newTab:function(){
//   var window_dimensions = "toolbars=no,menubar=no,location=no,scrollbars=yes,resizable=no,status=no"
// window.opener=self
// window.close()
// window.moveTo(0,0);
// window.resizeTo(screen.width-1,screen.height-1);
// window.open("/#/livetest","_blank",  window_dimensions);
// window.open('/#/livetest','winname','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=1920,height=1028');
    //  window.open('/#/livetest','popup',"scrollbars,status");\
    window.open("/#/livetest", "newWin", "width="+screen.availWidth+",height="+screen.availHeight)
  }
}
}
</script>

<style>

</style>
