<template>
<!-- <div>
  <b-container style="padding:px;">
     <div class="mainfont px-2">
          <strong>Active Devices</strong>
              <div class="pull-right">
                  <button class="button3 px-2"><b>View All</b></button>
                </div>
                </div>
                <div class="mainfont px-2 advancedsetting-instruction">
                  Click 'view all' to see a complete listing of devices You're currently logged in from.
                </div>

  </b-container>
</div> -->
<div>
  <b-container style="margin-top:40px;">
      <div class="mainfont px-2">
         <b-row>
           <b-col cols="10">
             <strong>Active Devices</strong>
           </b-col>
           <b-col cols="2">
             <button class="button3 px-2"><b>View All</b></button>
            </b-col>
           </b-row>
            <div class="mainfont px-2 advancedsetting-instruction">
                      Click 'view all' to see a complete listing of devices You're currently logged in from.
            </div>
         </div>
          <div class="mainfont px-2 advancedsetting-heading">
              <b-row>
                <b-col cols="10">
                     <strong>Allow Connection Request</strong>
                  </b-col>
                  <b-col cols="2">
                  <div class="flipswitch ">
                    <input type="checkbox" name="flipswitch" class="flipswitch-cb" id="fs" checked>
                    <label class="flipswitch-label" for="fs">
                            <div class="flipswitch-inner"></div>
                            <div class="flipswitch-switch"></div>
                    </label>
                  </div>
                  </b-col>
                </b-row>
                <div class="mainfont px-2 advancedsetting-instruction" style="margin-top:-10px;">
                  You will be requested to join other classes,institutes which you can either approve or decline.
                </div>
              </div>
                <div class="mainfont px-2 advancedsetting-heading">
                  <b-row>
                    <b-col cols="10">
                      <strong>Allow Notifications</strong>
                    </b-col>
                    <b-col cols="2">
                      <div class="flipswitch " >
                        <input type="checkbox" name="flipswitch" class="flipswitch-cb" id="fs1" checked>
                        <label class="flipswitch-label" for="fs1">
                                <div class="flipswitch-inner"></div>
                                <div class="flipswitch-switch"></div>
                              </label>
                      </div>
                    </b-col>
                  </b-row>
                <div class="mainfont px-2 advancedsetting-instruction" style="margin-top:-10px;">
                  You will be notified on new stories,chat messages, connection requests,etc.
                </div>
              </div>
                <div class="mainfont px-2 advancedsetting-heading">
                  <b-row>
                  <b-col cols="10">
                  <strong>Allow Email/Mobile Notifications</strong>
                  </b-col>
                  <b-col cols="2">
                  <div class="flipswitch ">
                    <input type="checkbox" name="flipswitch" class="flipswitch-cb" id="fs3" checked>
                    <label class="flipswitch-label" for="fs3">
                            <div class="flipswitch-inner"></div>
                            <div class="flipswitch-switch"></div>
                          </label>
                  </div>
                  </b-col>
                  </b-row>
                <div class="mainfont px-2 advancedsetting-instruction"  style="margin-top:-10px;">
                  Mails and SMS will be sent to your registered email and mobile number when you are not online.
                </div>
              </div>
                <div class="mainfont px-2 advancedsetting-heading">
                  <b-row>
                    <b-col cols="10">
                      <strong>Delete Your Account</strong>
                    </b-col>
                    <b-col cols="2">
                  <div class="" style="">
                    <button class="button2 px-2"><b>Delete</b></button>
                  </div>
                    </b-col>
                  </b-row>
                <div class="mainfont px-2 advancedsetting-instruction" >
                  This will be remove all notification about you,your classes, and your student.Once deleted,your account can't be
                </div>
              </div>
   </b-container>
 </div>
</template>

<script>
export default {

}
</script>

<style>
.option-switch{
margin-top:-25px;
}
.advancedsetting-heading{
  text-align: left;
  margin-top:20px;
}
.advancedsetting-instruction{
margin-top:8px;
text-align: left;
font-size:14px;
}
.advancedsetting-btn{
    /* border:2px solid red; */
  border:none;
margin-top:-20px;
}
.flipswitch {
  position: relative;
  width: 65px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
.flipswitch input[type=checkbox] {
  display: none;
}
.flipswitch-label {
  display: block;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid #00A1B5;
  border-radius: 50px;
}
.flipswitch-inner {

  width: 200%;
  margin-left: -100%;
  -webkit-transition: margin 0.3s ease-in 0s;
  -moz-transition: margin 0.3s ease-in 0s;
  -ms-transition: margin 0.3s ease-in 0s;
  -o-transition: margin 0.3s ease-in 0s;
  transition: margin 0.3s ease-in 0s;
}
.flipswitch-inner:before,
.flipswitch-inner:after {
  float: left;
  width: 50%;
  height: 28px;
  padding: 0;
  line-height: 28px;
  font-size: 13px;
  color: white;
  font-family: Trebuchet, Arial, sans-serif;
  font-weight: bold;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.flipswitch-inner:before {
  content: "ON";
  padding-left: 10px;
  background-color: #FFFFFF;
  color: var(--main-mainfont-color);
}
.flipswitch-inner:after {
  content: "OFF";
  padding-right: 10px;
  background-color: #fff;
  color: var(--main-mainfont-color);
  text-align: right;
}
.flipswitch-switch {
  width: 21px;
  margin: 3.5px;
  background:#00A1B5;
  border: 2px solid #00A1B5;
  border-radius: 50px;
  position: absolute;
  top: 0;
  bottom: 0;
  right:35px;
  -webkit-transition: all 0.3s ease-in 0s;
  -moz-transition: all 0.3s ease-in 0s;
  -ms-transition: all 0.3s ease-in 0s;
  -o-transition: all 0.3s ease-in 0s;
  transition: all 0.3s ease-in 0s;
}
.flipswitch-cb:checked+.flipswitch-label .flipswitch-inner {
  margin-left: 0;
}
.flipswitch-cb:checked+.flipswitch-label .flipswitch-switch {
  right: 0;
}
.button3 {
   background-color: #fff;
  color:#00A1B5;

  font-size:14px;
  /* border:2px solid red; */
  border:none;
}
.button2 {
  background-color: #fff;
  color: red;
    font-size:14px;
  /* border:2px solid red; */
  border:none;
}
</style>
