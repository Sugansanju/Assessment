<template>
<div>
  <b-breadcrumb class="font-edit" :items="items"/>
</div>
</template>

<script>
export default {
name:'BreadCrumb',
props:['items'],
components:{
},
data:function(){
  return{
  }
}
}
</script>

<style scoped>
.font-edit{
  font-size:13px;
}
.breadcrumb-item{
  font-size:14px;
  font-weight:bold;
}
a:visited{
  color:#17a2b8;
}
</style>