<template>
<b-container>
    <b-modal id="instructionsModal"
    hide-header
    hide-footer
    no-close-on-backdrop
    no-close-on-esc
    size="lg"
    centered
    v-model="showInstructionsModal">
        <b-container fluid style="padding:0 0 0 0;margin-top:-15px;">
            <b-row>
                <b-col style="background: #4285f4;">
                  <span style="font-size:15px;font-weight:bold;color:white;">Instructions</span>
                <button type="button" class="close" @click="showInstructionsModal=false" aria-label="Close" style="margin-left:25px;margin-top:0px;color:white;" float-right>
                    <span aria-hidden="true">&times;</span>
                </button>
                </b-col>
            </b-row>
            <b-row>
                <div id="content" style="text-align:left;">
                   <div class="heading">
            <span style="color: rgb(47, 114, 183);">Instructions</span><br>
          </div>
          <div class="heading" style="margin-top:35px;">
            <span>Please read the instructions carefully</span><br>
            <span>कृपया निम्नलिखित निर्देशों को ध्यान से पढ़ें</span>
          </div>
            <div style="margin-top:10px;">
              <div class="sub-heading">
              <span>General Instructions :</span>
              <br>
              <br>
                 <span>सामान्य अनुदेश :</span>
              </div>
              <div style="margin-top:20px;margin-left:45px;">
                <ol>
            <li>Total duration of examination is 60 minutes.<br>
              सभी प्रश्नों को हल करने के लिए आपको 60 मिनट का समय दिया जाएगा।</li><br>
            <li>The clock will be set at the server. The countdown timer in the top right corner of screen will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will end by itself. You will not be required to end or submit your examination.<br>
                सर्वर पर घड़ी लगाई गई है तथा आपकी स्क्रीन के दाहिने कोने में शीर्ष पर काउंटडाउन टाइमर में आपके लिए परीक्षा समाप्त करने के लिए शेष समय प्रदर्शित होगा। परीक्षा समय समाप्त होने पर, आपको अपनी परीक्षा बंद या जमा करने की जरूरत नहीं है । यह स्वतः बंद या जमा हो जाएगी।</li><br>
            <li>The Question Palette displayed on the right side of screen will show the status of each question using one of the following symbols:
              <br>स्क्रीन के दाहिने कोने पर प्रश्न पैलेट, प्रत्येक प्रश्न के लिए निम्न में से कोई एक स्थिति प्रकट करता है:<br>
              <div class="instruction_area">
                <span class="not_visited" title="Not Visited">1</span>You have not visited the question yet.<br>आप अभी तक प्रश्न पर नहीं गए हैं।
                <div class="clearfix"></div>
                <span class="not_answered" title="Not Answered">2</span>You have not answered the question.<br>आपने प्रश्न का उत्तर नहीं दिया है।
                  <div class="clearfix"></div>
                <span class="answered" title="Answered">3</span>You have answered the question.<br>आप प्रश्न का उत्तर दे चुके हैं।
                 <div class="clearfix"></div>
                <span class="review" title="Marked for Review">4</span>You have NOT answered the question, but have marked the question for review.<br>आपने प्रश्न का उत्तर नहीं दिया है पर प्रश्न को पुनर्विचार के लिए चिन्हित किया है।
                  <div class="clearfix"></div>
                <span class="review_marked" title="Answered &amp; Marked for Review">5</span>The question(s) "Marked for Review" will be not be considered for evaluation. Hence, no marks will be allocated for the same.<br>प्रश्न "समीक्षा के लिए चिह्नित" की जांच नहीं की जाएगी, इसलिए अंक आवंटित नहीं किए जाएंगे।
              </div>
            </li>
            <br>
                <p>The Marked for Review status for a question simply indicates that you would like to look at that question again.<br>पुनर्विचार के लिए चिह्नित (Marked for Review) स्थिति सामान्यतः अनुस्मारक के रूप में कार्य करती है जिसे आपने प्रश्न को दुबारा देखने के लिए सेट किया है।</p><br>

            <li>You can click on the ">" arrow which appears to the left of question palette to collapse the question palette thereby maximizing the question window. To view the question palette again, you can click on " " which appears on the right side of question window.<br>
              आप प्रश्न पैलेट को छुपाने के लिए, ">" चिन्ह पर क्लिक कर सकते है, जो प्रश्न पैलेट के बाईं ओर दिखाई देता है, जिससे प्रश्न विंडो सामने आ जाएगा. प्रश्न पैलेट को फिर से देखने के लिए, "  " चिन्ह पर क्लिक कीजिए जो प्रश्न विंडो के दाईं ओर दिखाई देता है।
            </li><br>
            <li>You can click on your "Profile" image on top right corner of your screen to change the language during the exam for entire question paper. On clicking of Profile image you will get a drop-down to change the question content to the desired language.<br>
            सम्पूर्ण प्रश्नपत्र की भाषा को परिवर्तित करने के लिए आप को अपने स्क्रीन के ऊपरी दाहिने सिरे पर स्थित प्रोफाइल इमेज पर क्लिक करना होगा। प्रोफाइल इमेज को क्लिक करने पर आपको प्रश्न के अंतर्वस्तु को इच्छित भाषा में परिवर्तित करने के लिए ड्राप-डाउन मिलेगा ।</li>
            <br>
            <li>You can click on <i class="fa fa-arrow-circle-down fa-2x" style="color: rgb(47, 114, 183);" aria-hidden="true"></i> to navigate to the bottom and <i class="fa fa-arrow-circle-up fa-2x" style="color: rgb(47, 114, 183);" aria-hidden="true"></i>to navigate to the top of the question area, without scrolling.<br>
            आपको अपने स्क्रीन के निचले हिस्से को स्क्रॉलिंग के बिना नेविगेट करने के लिए  <i class="fa fa-arrow-circle-down fa-2x" style="color: rgb(47, 114, 183);" aria-hidden="true"></i> और ऊपरी हिस्से को नेविगेट करने के लिए  <i class="fa fa-arrow-circle-up fa-2x" style="color: rgb(47, 114, 183);" aria-hidden="true"></i>पर क्लिक करना होगा ।</li>
            <br>
            <div class="sub-heading" style="margin-left:-80px;">
              <span>Navigating to a Question:</span>
              <br><br>
              <span>किसी प्रश्न पर जाना : </span>
            </div>
            <br>
            <li>To answer a question, do the following:<br>उत्तर देने हेतु कोई प्रश्न चुनने के लिए, आप निम्न में से कोई एक कार्य कर सकते हैं:<br>
              <ol type="a">
                <li>Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that using this option does NOT save your answer to the current question.<br>
                    स्क्रीन के दायीं ओर प्रश्न पैलेट में प्रश्न पर सीधे जाने के लिए प्रश्न संख्या पर क्लिक करें। ध्यान दें कि इस विकल्प का प्रयोग करने से मौजूदा प्रश्न के लिए आपका उत्तर सुरक्षित नहीं होता है।
                </li>
                <br>
                <li>Click on <b>Save & Next</b> to save your answer for the current question and then go to the next question.<br>
                    वर्तमान प्रश्न का उत्तर सुरक्षित करने के लिए और क्रम में अगले प्रश्न पर जाने के लिए <b>Save and Next</b> पर क्लिक करें।
                </li>
                <br>
                <li>Click on<b> Mark for Review & Next </b>to save your answer for the current question, mark it for review, and then go to the next question.<br>
                    वर्तमान प्रश्न का उत्तर सुरक्षित करने के लिए, पुनर्विचार के लिए चिह्नित करने और क्रम में अगले प्रश्न पर जाने के लिए <b>Mark for Review and Next</b> पर क्लिक करें।
                </li>
              </ol>
            </li>
            <br>
            <div class="sub-heading" style="margin-left:-80px;">
              <span>Answering a Question :</span>
              <br><br>
              <span>प्रश्नों का उत्तर देना : </span>
            </div>
            <br>
            <li>Procedure for answering a multiple choice type question:<br>
                बहुविकल्प प्रकार प्रश्न के लिए:<br>
                <ol type="a">
                <li>To select your answer, click on the button of one of the options<br>
                अपना उत्तर चुनने के लिए, विकल्प के बटनों में से किसी एक पर क्लिक करें।</li><br>
                <li>To deselect your chosen answer, click on the button of the chosen option again or click on the<b> Clear Response</b> button<br>
                चयनित उत्तर को अचयनित करने के लिए, चयनित विकल्प पर दुबारा क्लिक करें या <b>Clear Response</b> बटन पर क्लिक करें।</li><br>
                <li>To change your chosen answer, click on the button of another option<br>
                अपना उत्तर बदलने के लिए, अन्य वांछित विकल्प बटन पर क्लिक करें।</li><br>
                <li>To save your answer, you MUST click on the <b>Save & Next </b>button<br>
                अपना उत्तर सुरक्षित करने के लिए, आपको <b>Save & Next</b> पर क्लिक करना जरूरी है।</li><br>
                <li>To mark the question for review, click on the <b>Mark for Review & Next </b>button.<br>
                किसी प्रश्न को पुनर्विचार के लिए चिह्नित करने हेतु<b> Mark for Review & Next </b>बटन पर क्लिक करें।</li><br>
                </ol>
            </li>
            <li>To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure for answering that type of question.<br>
              किसी प्रश्न का उत्तर बदलने के लिए, पहले प्रश्न का चयन करें, फिर नए उत्तर विकल्प पर क्लिक करने के बाद <b>Save & Next</b>बटन पर क्लिक करें।</li><br>
           <div class="sub-heading" style="margin-left:-80px;">
              <span>Navigating through sections:</span>
              <br><br>
              <span> अनुभागों द्वारा प्रश्न पर जाना:</span>
            </div>
            <br>
            <li>Sections in this question paper are displayed on the top bar of the screen. Questions in a section can be viewed by clicking on the section name. The section you are currently viewing is highlighted.<br>
                इस प्रश्नपत्र में स्क्रीन के शीर्ष बार पर अनुभाग (Sections) प्रदर्शित हैं। किसी अनुभाग के प्रश्न, उस अनुभाग के नाम पर क्लिक करके देखे जा सकते हैं। आप वर्तमान में जिस अनुभाग का उत्तर दे रहे हैं, वह अनुभाग हाइलाइट होगा।</li><br>
             <li>After clicking the <b>Save & Next button </b>on the last question for a section, you will automatically be taken to the first question of the next section.<br>
                किसी अनुभाग के लिए अंतिम प्रश्न के <b>Save & Next</b> बटन पर क्लिक करने के बाद, आप स्वचालित रूप से अगले अनुभाग के प्रथम प्रश्न पर पहुंच जाएंगे।</li><br>
            <li>You can shuffle between sections and questions anytime during the examination as per your convenience only during the time stipulated.<br>
                आप परीक्षा में निर्धारित समय के दौरान किसी भी समय प्रश्नावलियों और प्रश्नों के बीच अपनी सुविधा के अनुसार आ-जा (शफल कर) सकते हैं।</li><br>
            <li>Candidate can view the corresponding section summary as part of the legend that appears in every section above the question palette.<br>
                परीक्षार्थी संबंधित सेक्शन की समीक्षा को लीजेन्ड के भाग के रूप में देख सकते हैं ।</li><br>
            <div class="sub-heading" style="margin-left:-80px;">
              <span>Instruction for images:</span>
              <br><br>
              <span>छवियों के लिए निर्देश:</span>
            </div><br>
            <li>To zoom the image provided in the question roll over it.<br>
                प्रश्न में दी गई छवि को झूम करने के लिए उस पर माउस से रोल करें ।</li>
            </ol>
            </div>
            </div>
            <div style="margin-top:50px;">
              <div class="heading">
                <span style="color: rgb(47, 114, 183);">Other Important Instructions</span><br>
              </div>
              <div class="sub-heading1" style="margin-top:35px;">
                <span>Other Important Instructions</span><br>
              </div>
              <div style="margin-top:50px;">
                <ol>
                  <li>
                    You will be given <b>60 minutes</b> to attempt these questions.
                  </li><br>
                  <li>
                    1/3rd mark will be deducted for every wrong answer.
                  </li><br>
                  <li>
                   One question will be displayed on the screen at a time. You are requested to be aware of the amount of time you spend per question. Do not spend too much time on any question.
                  </li><br>
                  <li>
                    Each question will have 4 alternatives, out of which only one will be the correct answer.
                  </li><br>
                  <li>
                    The Candidate can view the Question Paper in the language opted for, at the time of filling the Application and in English Language.In case of any discrepancy between the English and other versions of a question, the English version will prevail.
                  </li><br>
                  <li>
                    This is a Mock test. The Question paper displayed is for practice purposes only. Under no circumstances should this be presumed as a sample paper.
                  </li>
                </ol>
              </div>
            </div>
        </div>
            </b-row>
        </b-container>
    </b-modal>
</b-container>
</template>
<script>
import InstructionsModal from "@/components/comp/modals/InstructionsModal.vue";
export default {
    name: 'InstructionsModal',

    components:{

    },
    data: function(){
        return{
            showInstructionsModal: false,
        }
    },
    methods:{

    },
};
</script>
<style>
  #content{
      height:800px;
     overflow:auto;
     padding: 20px;
     padding-bottom: 30px;
  }
.heading{
  font-size:17px;
    font-weight: bold;
 font-style:italic;
text-align: center
}
.sub-heading{
font-size:15px;
    font-weight: bold;
     text-decoration: underline;
 font-style:italic;
}
.sub-heading1{
font-size:15px;
font-weight: bold;
text-decoration: underline;
text-align: center;
font-style:italic;
}
p{
  text-align: justify;
      list-style-position: outside;
}
.instruction_area span.not_visited {
    background: url('/static/images/questions-sprite.png') no-repeat scroll 0 0 transparent;
    color: #FFFFFF;
    cursor: pointer;
    float: left;
    font-weight: bold;
    height: 38px;
    line-height: 42px;
    /* margin: 3px; */
    text-align: center;
    width: 34px;
    background-position: -105px -49px;
    color: #474747;
}
.instruction_area span.not_answered {
    background: url('/static/images/questions-sprite.png') no-repeat scroll 0 0 transparent;
    color: #FFFFFF;
    cursor: pointer;
    float: left;
    font-weight: bold;
    height: 38px;
    line-height: 42px;
    /* margin: 3px; */
    text-align: center;
    width: 34px;
    background-position: -39px -48px;
}
.instruction_area span.answered {
    background: url('/static/images/questions-sprite.png') no-repeat scroll 0 0 transparent;
    color: #FFFFFF;
    cursor: pointer;
    float: left;
    font-weight: bold;
    height: 38px;
    line-height: 42px;
    /* margin: 3px; */
    text-align: center;
    width: 34px;
    background-position: -5px -48px;
}
.instruction_area span.review {
    background: url('/static/images/questions-sprite.png') no-repeat scroll 0 0 transparent;
    color: #FFFFFF;
    cursor: pointer;
    float: left;
    font-weight: bold;
    height: 38px;
    line-height: 42px;
    /* margin: 3px; */
    text-align: center;
    width: 34px;
    background-position: -72px -48px;
}
.instruction_area span.review_marked {
    background: url('/static/images/questions-sprite.png') no-repeat scroll 0 0 transparent;
    color: #FFFFFF;
    cursor: pointer;
    float: left;
    font-weight: bold;
    height: 38px;
    /* margin: 3px !important; */
    text-align: center;
    width: 34px;
    line-height: 42px;
    background-position: -169px -49px;
}
/* .modal_screen{
  overflow-y:scroll;
  height:500px;
  width:800px;
} */
</style>



