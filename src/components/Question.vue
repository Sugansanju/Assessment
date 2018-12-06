<template>
<b-container fluid>
      <b-row>
        <b-col cols="10" style="padding:0 0 0 0;">
          <b-navbar class="nav">
                <b-breadcrumb class="link">
                  ALP-Techinician
                </b-breadcrumb>
          </b-navbar>
        </b-col>
        <b-col cols="2" style="padding:0 0 0 0;border:1px solid black;">
          <b-row>
          <b-col class="user_pic">
            <img width="94" height="101" src="/static/images/8.png">
            </b-col>
          <b-col style="font-weight:bold;margin-left:-80px;">
            <span>
              John Smith
            </span>
          </b-col>
          </b-row>
        </b-col>
      </b-row>
         <b-row>
        <b-col cols="10" style="padding:0 0 0 0;border:1px solid black;height:780px;">
        <b-col style="border:1px solid black;font-weight:bold;">
          <span>Question no:</span>
        </b-col>
        <b-col style="padding:12px 10px 0px;">
           <img  src="/static/images/qno1.jpg">
        </b-col>
        <b-col>
      <b-form-radio-group v-model="selected"
                          :options="options"
                          plain
                          stacked
                          name="plainStacked" />
        </b-col>
        <!-- <b-col>
           <img  src="/static/images/qno1.jpg">
        </b-col> -->
        </b-col>
        <b-col cols="2" style="padding:0 0 0 0;border:1px solid black;">
        <b-col class="diff_type_notation_area_inner" style="padding:10px 10px 10px 10px;font-size:13px;">
          <b-row style="">
            <b-col>
              <span class="answered">0</span>Answered
            </b-col>
            <b-col style="padding:0 12px 12px 1px; ">
          <span class="not_answered">1</span>Not Answered
          </b-col>
          </b-row>
          <b-row>
            <b-col>
              <span class="not_visited">74</span>Not Visited
            </b-col>
            <b-col>
          <span class="review_marked">0</span>Marked for Review
            </b-col>
            </b-row>
          <span class="review_answered">0</span>Answered & Marked for Review(Will not be considered for evaluation)
        </b-col>
        <b-col class="header1">
          <span>ALP & Techinician</span>
        </b-col>
        <b-col style="font-size:14px;font-weight:bold;background: #e5f6fd;">
          <br><span>Choose a Question</span><div class="clearfix"></div>
          <b-container style="height:570px;overflow-y:scroll;display:block;margin-top:12px;">
            <b-row>
            <b-col class="diff_type_notation_area_inner1" v-for="(item,index) in numbers" v-bind:key="item.no">
              <span class="not_visited" v-if="!item.visited" @click="changeClass(index)">{{item.no}}</span>
               <span class="not_answered" v-else>{{item.no}}</span>
            </b-col>
            </b-row>
            <div class="clearfix"></div><br>
          </b-container>
          <!-- <question-number :number="numbers"></question-number> -->
        </b-col>
        </b-col>
      </b-row>
      <b-row style="height:80px;">
        <b-col cols="10" style="border:1px solid black;">
          <b-row style="margin-top:8px;">
        <b-col cols="11">
          <b-btn style="background-color:white;color:black;">Mark for review & next</b-btn>
           <b-btn style="background-color:white;color:black;">Clear Response</b-btn>
        </b-col>
        <b-col cols="1">
           <b-btn style="background-color: #0c7cd5;">save & Next</b-btn>
        </b-col>
          </b-row>
        </b-col>
        <b-col cols="2" style="border:1px solid black;background: #e5f6fd;">
          <b-row>
          <b-col cols="5"></b-col>
          <b-col cols="6">
           <b-btn style="margin-top:8px;background-color:#0c7cd5;">Submit</b-btn>
          </b-col>
          </b-row>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
// import QuestionNumbers from'@/components/QuestionNumbers'
export default {
name:'Question',
components:{
// QuestionNumbers
},
data(){
  return{
     selected: 'first',
      visited:null,
      options: [
        { text: 'First radio', value: 'first' },
        { text: 'Second radio', value: 'second'},
        { text: 'Third radio', value: 'third' }
      ],
      numbers:[
        {no:'1',visited:true},
        {no:'2',visited:false},
        {no:'3',visited:false},
        {no:'4',visited:false},
        {no:'5',visited:false},
        {no:'6',visited:false},
        {no:'7',visited:false},
        {no:'8',visited:false},
        {no:'9',visited:false},
        {no:'10',visited:false},
        {no:'11',visited:false},
        {no:'12',visited:false},
        {no:'13',visited:false},
        {no:'14',visited:false},
        {no:'15',visited:false},
        {no:'16',visited:false},
        {no:'17',visited:false},
        {no:'18',visited:false},
        {no:'19',visited:false},
        {no:'20',visited:false},
        {no:'21',visited:false},
        {no:'22',visited:false},
        {no:'23',visited:false},
        {no:'24',visited:false},
        {no:'25',visited:false},
        {no:'26',visited:false},
        {no:'27',visited:false},
        {no:'28',visited:false},
        {no:'29',visited:false},
        {no:'30',visited:false},
        {no:'31',visited:false},
        {no:'32',visited:false},
        {no:'33',visited:false},
        {no:'34',visited:false},
        {no:'35',visited:false},
        {no:'36',visited:false},
        {no:'37',visited:false},
        {no:'38',visited:false},
        {no:'39',visited:false},
        {no:'40',visited:false}
      ]
  }
  },
  methods:{
    changeClass:function(index){
      // console.log(this.numbers[index]);
      return this.numbers[index].visited=true;
    },

  }
}
</script>

<style>
.nav{
    background: #eeeeee;
}
.link{
    background-color: #38a9eb;
    height:px;
    color: #fff;
    border: 1px solid #38a9eb;
}
.header1{
    background: #4e85c5 none repeat scroll 0 0;
    color: #fff;
    height: 31px;
    font-weight:bold;
    line-height: 31px;
    padding-left: 10px;
}
.diff_type_notation_area_inner span {
background: url('/static/images/questions-sprite.png') no-repeat;
	color: #262626;
	line-height: 15px;
	text-align: center;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 1em;
}
.diff_type_notation_area_inner span.answered {
	background-position: -7px -55px;
	float: left;
  cursor: pointer;
	height: 26px;
	 line-height: 20px;
	margin-right: 10px;
	width: 29px;
	color: #fff;
	padding-top: 3px;
}
.diff_type_notation_area_inner span.review {
	background-position: -75px -54px;
	float: left;
  cursor: pointer;
	height: 28px;
	 line-height: 18px;
	margin-right: 10px;
	width: 28px;
	color: #fff;
	padding-top: 5px;
}
.diff_type_notation_area_inner span.review_answered {
	background-position: -9px -87px;
	float: left;
  cursor: pointer;
	height: 29px;
	 line-height: 15px;
	margin-right: 10px;
	width: 28px;
	color: #fff;
	padding-top: 5px;
}
.diff_type_notation_area_inner span.review_marked {
	background-position: -172px -55px;
	float: left;
  cursor: pointer;
	height: 28px;
	 line-height: 15px;
	margin-right: 10px;
	width: 30px;
	color: #fff;
	padding-top: 5px;
}
.diff_type_notation_area_inner span.not_answered {
	background-position: -42px -56px;
	float: left;
  cursor: pointer;
	height: 26px;
	line-height:22px;
	margin-right: 10px;
	width: 29px;
	color: #fff;
}
.diff_type_notation_area_inner span.visited {
	background-position:-138px -56px;
  cursor: pointer;
	float: left;
	height: 26px;
	 line-height: 21px;
	margin-right: 10px;
	width: 29px;
	color: #fff;
	padding-top: 2px;
}
.diff_type_notation_area_inner span.not_visited {
	background-position: -107px -56px;
	float: left;
  cursor: pointer;
	height: 26px;
	 line-height: 21px;
	margin-right: 10px;
	width: 29px;
	color: #000;
	padding-top: 2px;
}
.diff_type_notation_area_inner1 span {
    background: url('/static/images/questions-sprite.png') no-repeat;
    color: #fff;
    cursor: pointer;
    float: left;
    font-size: 1.417em;
    font-weight: normal;
    height: 43px;
    line-height: 42px;
    margin-bottom: 10px;
    margin-right: 2px;
    text-align: center;
    width: 50px;
}
.diff_type_notation_area_inner1 span.not_visited {
    background-position: -157px -4px;
    color: #474747;
    height: 43px;
    line-height: 43px;
}
.diff_type_notation_area_inner1 span.not_answered{
    background-position: -57px -6px;
    width: 49px;
    height: 43px;
}
/* .diff_type_notation_area_inner1 span.answered {
	background-position: -7px -55px;
	float: left;
  cursor: pointer;
	height: 26px;
	 line-height: 20px;
	margin-right: 10px;
	width: 29px;
	color: #fff;
	padding-top: 3px;
}
.diff_type_notation_area_inner1 span.review {
	background-position: -75px -54px;
	float: left;
  cursor: pointer;
	height: 28px;
	 line-height: 18px;
	margin-right: 10px;
	width: 28px;
	color: #fff;
	padding-top: 5px;
}
.diff_type_notation_area_inner1 span.review_answered {
	background-position: -9px -87px;
	float: left;
  cursor: pointer;
	height: 29px;
	 line-height: 15px;
	margin-right: 10px;
	width: 28px;
	color: #fff;
	padding-top: 5px;
}
.diff_type_notation_area_inner1 span.review_marked {
	background-position: -172px -55px;
	float: left;
  cursor: pointer;
	height: 28px;
	 line-height: 15px;
	margin-right: 10px;
	width: 30px;
	color: #fff;
	padding-top: 5px;
}
.diff_type_notation_area_inner1 span.not_answered {
	background-position: -42px -56px;
	float: left;
  cursor: pointer;
	height: 26px;
	line-height:22px;
	margin-right: 10px;
	width: 29px;
	color: #fff;
}
.diff_type_notation_area_inner1 span.visited {
	background-position:-138px -56px;
  cursor: pointer;
	float: left;
	height: 26px;
	 line-height: 21px;
	margin-right: 10px;
	width: 29px;
	color: #fff;
	padding-top: 2px;
} */

</style>
