<template>
<div>
  <div style="background-color:#eeee;">
  <main-header :currentUser="currentUser"></main-header>
  <sub-header :items="subMenu"></sub-header>
  <bread-crumb :items="crumbItems"></bread-crumb>
  <b-container fluid>
    <b-row>
      <b-col cols="1"></b-col>
    <b-col cols="4" class="Chart">
       <h2 >Linechart</h2>
          <line-chart></line-chart>
    </b-col>
    <b-col cols="2"></b-col>
    <b-col cols="4" class="Chart">
       <h2>BarChart</h2>
          <bar-chart></bar-chart>
    </b-col>
    </b-row>
    <b-row>
    <b-col cols="1"></b-col>
    <b-col cols="4" class="Chart">
       <h2>PieChart</h2>
          <pie-chart></pie-chart>
    </b-col>
    <b-col cols="2"></b-col>
    <b-col cols="4" class="Chart">
       <h2>DoughNut</h2>
          <dough-nut></dough-nut>
    </b-col>
    </b-row>
    <b-col align-self="center" class="Chart">
       <h2>BubbleChart</h2>
          <bubble-chart></bubble-chart>
    </b-col>
  </b-container>

</div>
</div>
  <!-- <div class="container fluid d-flex justify-content-start" >
      <b-col cols="4" class="Chart__lis pull-left" >
        <div class="Chart">
          <h2>Linechart</h2>
          <line-chart></line-chart>
        </div>
      </b-col>
          <b-col cols="4" class="Chart__lis pull-left" >
        <div class="">
          <h2>Linechart</h2>
          <line-chart></line-chart>
        </div>
      </b-col>
  </div> -->
</template>

<script>
  import MainHeader from "@/components/comp/MainHeader";
  import SubHeader from "@/components/comp/candidate/SubHeader";
  import BreadCrumb from "@/components/comp/candidate/BreadCrumb";
  import LineChart from "@/components/comp/candidate/vuechart/chartjs/LineChart.js";
  import BarChart from "@/components/comp/candidate/vuechart/chartjs/BarChart.js";
  import PieChart from "@/components/comp/candidate/vuechart/chartjs/PieChart.js";
  import BubbleChart from "@/components/comp/candidate/vuechart/chartjs/BubbleChart.js";
  import DoughNut from "@/components/comp/candidate/vuechart/chartjs/DoughNut.js";
  import Global from "@/service/Global";
  export default {
    components: {
      MainHeader,
      SubHeader,
      BreadCrumb,
      LineChart,
      BarChart,
      PieChart,
      DoughNut,
      BubbleChart
    },
      async mounted() {
        this.isLoading = true;
        console.log("Getting refresh token");
        await Global.onPageRefresh(this.$session, this.$router);
        console.log("Getting User info");
        await this.getUserInfo();
        this.isLoading = false;
      },
    data () {
      return {
        currentUser:null,
        subMenu:[
        { name:"DashBoard",
          link:"#/candidate/dashboard",
          icon:"fa fa-home px-2",
          active:""
          },
        // { name:"PREP Zone",
        //   link:"#",
        //   icon:"fa fa-pencil-square-o px-2",
        //   active:""
        //   },
        { name:"Revise",
          link:"#/candidate/report",
          icon:"fa fa-refresh px-2",
          active:""
          },
        // { name:"Test Analytics",
        //   link:"#/candidate/analytics",
        //   icon:"fa fa-bar-chart px-2 ",
        //   active:"active"
        //   },
        // { name:"Downloads",
        //   link:"#",
        //   icon:"fa fa-download px-2",
        //   active:""
        //   },
        // { name:"News",
        //   link:"#",
        //   icon:"fa fa-newspaper-o px-2",
        //   active:""
        //   },
        // { name:"Slots Booking",
        //   link:"#",
        //   icon:"fa fa-rss px-2",
        //   active:""
        //   }
    ],
    crumbItems: [
      // {
      //   text: 'Home',
      //   href: '#'
      // },
      {
        text: 'DashBoard',
        href:'#/candidate/dashboard',
        active: false
      },
      {
        text: 'Test Analysis',
        href:'#/candidate/analytics',
        active: true
      }],
      }
    },
    methods:{
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
    },
    }

  }
</script>

<style scoped>
@keyframes colorchange
{
  0%   {background: #9b59b6;}
  25%  {background: #f1c40f;}
  50%  {background: #3498db;}
  75%  {background: #1abc9c;}
  100% {background: #9b59b6;}
}
 .container {
  max-width: 800px;
  /* margin:  0 auto; */
  color:  rgba(155, 89, 182, 1);
}
.Chart {
  background: #ffff;
  border-radius: 15px;
  box-shadow: 0px 2px 15px rgba(25, 25, 25, 0.27);
  /* border:2px solid black; */
  margin:  25px 0;
}
.Chart h2 {
  margin-top: 0;
  padding: 15px 0;
  color:  rgba(255, 0,0, 0.5);
  border-bottom: 1px solid #323d54;
}
</style>
