<template>
<div>
    <b-navbar class="nav" type="light">
        <!-- <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle> -->
        <b-navbar-brand></b-navbar-brand>
        <b-collapse is-nav id="nav_text_collapse">
            <b-navbar-nav>
                <b-nav-text></b-nav-text>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    <!-- <div> -->
  <!-- <div class="wrapper">
<b-navbar class="nav" toggleable="md" type="dark"></b-navbar> -->

    <!-- <b-col cols="12" class="userInfo">
			<div class="system_info">
				<div class="system_name">
					<div id="sysName" class="name1">System Name :</div>
					<div class="details1">C001</div>
					<div style="font-size:15px;" class="details3">
						<a style="color: white; text-decoration: none; border: 0 none;" id="notMySystem">Contact invigilator if the Name and Photograph<br>displayed on the screen is not yours</a>
					</div>
				</div>
				<div align="center" class="user_pic"><img width="94" height="101" align="absmiddle" class="candidateImg" src="/static/ima"></div>
				<div class="user_name">
					<div id="indexCandName" class="name2">Candidate Name :</div>
					<div class="details2">
						<span title="John Smith " class="candOriginalName">John Smith </span>
					</div>
					<div style="margin-top:10px;text-align:right"><span class="name2" id="subName">Subject :</span><span style="font-size:15px;" class="details2">Mock Exam</span></div>
				</div>
				<div class="clear"></div>
			</div>
		</b-col> -->
<!-- <b-navbar  toggleable="sm" type="info">
  <b-navbar-brand>
    <div>
      <span>System name:</span>
    </div>
    <div>
      <span  >C001</span>
    </div>
    <div >
        <a>Contact invigilator if the Name and Photograph<br>displayed on the screen is not yours</a>
    </div>
  </b-navbar-brand>
<b-navbar-nav class="ml-auto">
<b-navbar-brand>
    <div>
      <span>Candidate name:</span>
    </div>
    <div>
      <span >Harish</span>
    </div>
    <div >
      <span >Subject :</span>
    <span >Mock Exam</span>
    </div>
</b-navbar-brand>
	<div align="center" class="user_pic"><img width="94" height="101" align="absmiddle" class="candidateImg" src="/static/images/8.png"></div>
    </b-navbar-nav>
</b-navbar>
  </div>
    </div>

    <b-container fluid="">
      <b-row>
        <b-col cols="4">
            <div>
      <span >System name:</span>
    </div>
    <div>
      <span >C001</span>
    </div>
    <div >
        <a>Contact invigilator if the Name and Photograph<br>displayed on the screen is not yours</a>
    </div>
        </b-col>
        <b-col cols="3">
        </b-col>

          <b-col cols="4">
            <div>
      <span >System name:</span>
    </div>
    <div>
      <span >C001</span>
    </div>
    <div >
        <a>Contact invigilator if the Name and Photograph<br>displayed on the screen is not yours</a>
    </div>
        </b-col>
        <b-col>
          <div align="center" class="user_pic"><img width="94" height="101" align="absmiddle" class="candidateImg" src="/static/images/8.png"></div>
        </b-col>
      </b-row>
    </b-container>-->
    <b-container style="margin-top:150px;">
      <b-row>
        <!-- <b-col cols="4">
        </b-col> -->
         <b-col>
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
       <b-button class="form-control" style="background-color:#00A9E5;color:white;margin-top:20px;">Sign In</b-button>
    </b-form>
            </div>
          </div>
          </div>
        </b-col>
         <!-- <b-col cols="4">
        </b-col> -->
      </b-row>
      </b-container>
</div>

</template>

<script>
export default {

}
</script>

<style scoped>
.nav{
  background-color:#1E70B2;
  height:50px;
}
</style>
