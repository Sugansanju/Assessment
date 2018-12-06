<template>
<div style="">
  <main-header :currentUser="currentUser"></main-header>
  <sub-header :items="subMenu"></sub-header>
  <bread-crumb :items="crumbItems"></bread-crumb>
    <b-container fluid style="padding:10px 10px 30px 10px;">
    <b-container fluid style="background-color:white;border:1px solid #eeee;padding:10px 10px 10px 10px;" v-if="!isCreateMode && test!=null">
        <b-row v-show="!isEditMode">
          <b-col cols="10" style="margin-top:8px;">
            <b-row >
              <editable id="testName" :text="test.testName" v-model="test.testName" style="text-decoration: underline;font-size: 20px;color: rgb(144, 153, 156);"></editable>
              <span style="font-size:20px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px">&nbsp;|&nbsp;</span>
              <editable id="testDuration" :text="test.timeDuration" v-model="test.timeDuration" style="text-decoration: underline;font-size: 20px;color: rgb(144, 153, 156);"></editable>
           <span style="font-size:20px;color:rgb(144, 153, 156);margin-left:4px;margin-top:10px;font-weight:bold;" >mins</span>
            </b-row>
          </b-col>
          <b-col>
            <div>
            <b-dropdown  text="Settings" right variant="info" class="m-2 pull-right">
                    <b-dropdown-item><i class="fa fa-cogs px-2" aria-hidden="true"></i>Advanced Settings</b-dropdown-item>
                    <b-dropdown-item><i class="fa fa-info-circle px-2" aria-hidden="true"></i>Test Instructions</b-dropdown-item>
                    <b-dropdown-item><i class="fa fa-exchange px-2" aria-hidden="true"></i>Publish Test</b-dropdown-item>
                    <b-dropdown-item><i class="fa fa-check-square-o px-2" aria-hidden="true"></i>Try Test</b-dropdown-item>
                    <b-dropdown-item><i class="fa fa-tags px-2" aria-hidden="true"></i>Map Products</b-dropdown-item>
                    <b-dropdown-item><i class="fa fa-camera px-2" aria-hidden="true"></i>Proctor</b-dropdown-item>
                    <b-dropdown-item><i class="fa fa-random px-2" aria-hidden="true"></i>Pass Pharse</b-dropdown-item>
            </b-dropdown>
            <b-button variant="success" class="m-2 pull-right" @click="saveTest"><i class="fa fa-save"></i></b-button>
            <b-button variant="btn btn-outline-success sm" class="m-2 pull-right" @click="addSection"><i class="fa fa-plus"></i> Section</b-button>
                </div>
        </b-col>
          </b-row>
         <!-- <b-container v-if="(test.sections.length!=0 || test.sections!=null) && !isEditMode " fluid>
          <div v-for="(section, sindex) in test.sections" v-bind:key="sindex" style="margin-top:15px;border:1px solid #eeee;background-color:white;height:400px;  overflow: hidden; overflow-y: scroll;">
          <b-row class="sticky-top" style="background-color: #fff; padding: 5px 30px 5px 30px; z-index: 900;">
            <b-col>
              <b-row class="d-flex justify-content-between">
                <div class="d-flex justify-content-between">
                  <editable :id="'sectionName'+sindex" :text="section.sectionName" v-model="section.sectionName" style="text-decoration: underline; font-size: 18px;color: rgb(144, 153, 156);"></editable>
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px">&nbsp;|&nbsp;</span>
                  <editable :id="'sectionDuration'+sindex" :text="section.timeDuration" v-model="section.timeDuration" style="text-decoration: underline; font-size: 18px;color: rgb(144, 153, 156);"></editable>&nbsp;
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px">mins</span>
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px; margin-left: 5px;">&nbsp;|&nbsp;</span>
                  <editable :id="'pveMark'+sindex" :text="section.marksForIndividualQuestion" v-model="section.marksForIndividualQuestion" style="text-decoration: underline; font-size: 18px;color: rgb(144, 153, 156);"></editable>&nbsp;
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px;">+ve mark/question</span>
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px; margin-left: 5px;">&nbsp;|&nbsp;</span>
                  <editable :id="'nveMark'+sindex" :text="section.negativeMarksForIndividualQuestion" v-model="section.negativeMarksForIndividualQuestion" style="text-decoration: underline; font-size: 18px;color: rgb(144, 153, 156);"></editable>&nbsp;
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px">-ve mark/question</span>

                </div>
                <div>
                    <b-button variant="outline-success sm" @click="startCreateMode($event, sindex)" style="height: 40px; "><i class="fa fa-plus"></i> Question</b-button>
                    <b-button variant="danger"  @click="removeSection(sindex)"><i class="fa fa-times" aria-hidden="true"></i></b-button>
                    <b-button variant="success" @click="saveSection(sindex)"><i class="fa fa-save" aria-hidden="true" ></i></b-button>
                </div>
              </b-row>
            </b-col>
          </b-row>
              <b-row>
                <b-col>
                <b-container fluid v-if="section.questionsData!=null">
                      <div role="tablist" class="d-flex justify-content-center"  v-for="(q, index) in section.questionsData" v-bind:key="index">
                        <b-col cols="8">
                        <b-card no-body class="mb-1" style="background-color:#9ee1f7;">
                          <b-card-header header-tag="header" class="p-1" role="tab">
                              <b-container fluid block href="#" v-b-toggle="'question1'+sindex+''+q.questionNumber" style="background-color:#9ee1f7;color:black; padding:10px 10px 10px 10px;cursor:pointer;">
                                <b-row>
                                  <b-col  class="">
                                    <div class="d-flex jusitfy-content-start">
                                    {{q.questionNumber}})&nbsp;&nbsp;&nbsp;&nbsp;<div v-html="q.question.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                                    </div>
                                  </b-col>
                                  <div class="pull-right" style="padding:0 12px 0 0;">
                                    <b-btn class="edit-btn btn-sm" @click="editQuestion(sindex, q)"><i class="fa fa-pencil" aria-hidden="true"></i></b-btn>
                                    <b-btn class="close-btn btn-sm" @click="deleteQuestion(sindex, q)"><i class="fa fa-close" aria-hidden="true"></i></b-btn>
                                  </div>
                                </b-row>
                              </b-container>
                          </b-card-header>
                      <b-collapse :id="'question1'+sindex+''+q.questionNumber"  accordion="my-accordion" role="tabpanel">
                        <b-card-body style="background-color:#eeeeee;">
                          <table class="table" >
                            <thead>
                                <tr>
                                </tr>
                            </thead>
                          <tbody>
                              <tr>
                                <td class="text-nowrap" style="font-weight:bold;">Options</td>
                                <td>
                                  <b-row v-for="(a, a_index) in q.answers" v-bind:key="a_index">
                                    {{a.answerNumber}})&nbsp;<div v-html="a.answer.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                                  </b-row>
                                  </td>
                              </tr>
                              <tr>
                                <td class="text-nowrap" style="font-weight:bold;">Correct Answer :</td>
                                <td>
                                  <b-row v-if="q.correctAnswer!=null">
                                      {{q.correctAnswer.answerNumber}})&nbsp;<div v-html="q.correctAnswer.answer.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                                  </b-row>
                                </td>
                              </tr>
                              <tr>
                                <td class="text-nowrap" style="font-weight:bold;">Solution:</td>
                                <td>
                                  <b-row v-if="q.solution!=null">
                                      <div v-html="q.solution.description"></div>
                                  </b-row>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                  </b-col>
                  </div>
                </b-container>
                </b-col>
              </b-row>
          </div>
        </b-container> -->
 <b-container v-if="(test.sections.length!=0 || test.sections!=null) && !isEditMode " fluid >
   <div v-for="(section, sindex) in test.sections" v-bind:key="sindex" >
    <b-card no-body class="mb-1">
     <b-card-header header-tag="header" class="p-1" role="tab">
      <!-- <p block href="#" >GENERIC</p> -->
          <b-row  v-b-toggle="'section'+sindex+''+section.sectionId" variant="info"  class="sticky-top" style="background-color: #fff; padding: 5px 30px 5px 30px; z-index: 900;">
            <b-col v-bind:class="{not_saved: section.sectionId==null}">
              <b-row class="d-flex justify-content-between">
                <div class="d-flex justify-content-between">
                  <editable :id="'sectionName'+sindex" :text="section.sectionName" v-model="section.sectionName" style="text-decoration: underline; font-size: 18px;color: rgb(144, 153, 156);"></editable>
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px">&nbsp;|&nbsp;</span>
                  <editable :id="'sectionDuration'+sindex" :text="section.timeDuration" v-model="section.timeDuration" style="text-decoration: underline; font-size: 18px;color: rgb(144, 153, 156);"></editable>&nbsp;
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px">mins</span>
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px; margin-left: 5px;">&nbsp;|&nbsp;</span>
                  <editable :id="'pveMark'+sindex" :text="section.marksForIndividualQuestion" v-model="section.marksForIndividualQuestion" style="text-decoration: underline; font-size: 18px;color: rgb(144, 153, 156);"></editable>&nbsp;
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px;">+ve mark/question</span>
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px; margin-left: 5px;">&nbsp;|&nbsp;</span>
                  <editable :id="'nveMark'+sindex" :text="section.negativeMarksForIndividualQuestion" v-model="section.negativeMarksForIndividualQuestion" style="text-decoration: underline; font-size: 18px;color: rgb(144, 153, 156);"></editable>&nbsp;
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px">-ve mark/question</span>
                </div>
                <div>
                    <b-button variant="outline-success sm" @click="startCreateMode($event, sindex)" style="height: 40px; ">
                      <i class="fa fa-plus"></i> Question</b-button>
                    <b-button variant="danger" v-if="section.sectionId!=null" @click="removeSection(sindex)">
                      <i class="fa fa-times" aria-hidden="true"></i>
                    </b-button>
                    <b-button variant="danger workartea" v-if="section.sectionId==null" @click="discardSection(sindex)"><i class="fa fa-times" aria-hidden="true"></i></b-button>
                    <b-button variant="success" @click="saveSection(sindex)">
                      <i class="fa fa-save" aria-hidden="true" ></i>
                    </b-button>
                </div>
              </b-row>
            </b-col>
          </b-row>
      </b-card-header>
       <b-collapse :id="'section'+sindex+''+section.sectionId"  accordion="section" role="tabpanel">
         <b-card-body>
             <b-row>
                <b-col>
                <b-container fluid v-if="section.questionsData!=null" style="height:400px;  overflow: hidden; overflow-y: scroll;">
                      <div role="tablist" class="d-flex justify-content-center"  v-for="(q, index) in section.questionsData" v-bind:key="index">
                        <b-col cols="8">
                        <b-card no-body class="mb-1" style="background-color:#9ee1f7;">
                          <b-card-header header-tag="header" class="p-1" role="tab">
                              <b-container fluid block href="#" v-b-toggle="'question1'+sindex+''+q.questionNumber" style="background-color:#9ee1f7;color:black; padding:10px 10px 10px 10px;cursor:pointer;">
                                <b-row>
                                  <b-col  class="">
                                    <div class="d-flex jusitfy-content-start">
                                    {{q.questionNumber}})&nbsp;&nbsp;&nbsp;&nbsp;<div v-html="q.question.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                                    </div>
                                  </b-col>
                                  <div class="pull-right" style="padding:0 12px 0 0;">
                                    <b-btn class="edit-btn btn-sm" @click="editQuestion(sindex, q)"><i class="fa fa-pencil" aria-hidden="true"></i></b-btn>
                                    <b-btn class="close-btn btn-sm" @click="deleteQuestion(sindex, q)"><i class="fa fa-close" aria-hidden="true"></i></b-btn>
                                  </div>
                                </b-row>
                              </b-container>
                          </b-card-header>
                      <b-collapse :id="'question1'+sindex+''+q.questionNumber"  accordion="my-accordion" role="tabpanel">
                        <b-card-body style="background-color:#eeeeee;">
                          <table class="table" >
                            <thead>
                                <tr>
                                </tr>
                            </thead>
                          <tbody>
                              <tr>
                                <td class="text-nowrap" style="font-weight:bold;">Options</td>
                                <td>
                                  <b-row v-for="(a, a_index) in q.answers" v-bind:key="a_index">
                                    {{a.answerNumber}})&nbsp;<div v-html="a.answer.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                                  </b-row>
                                  </td>
                              </tr>
                              <tr>
                                <td class="text-nowrap" style="font-weight:bold;">Correct Answer :</td>
                                <td>
                                  <b-row v-if="q.correctAnswer!=null">
                                      {{q.correctAnswer.answerNumber}})&nbsp;<div v-html="q.correctAnswer.answer.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                                  </b-row>
                                </td>
                              </tr>
                              <tr>
                                <td class="text-nowrap" style="font-weight:bold;">Solution:</td>
                                <td>
                                  <b-row v-if="q.solution!=null">
                                      <div v-html="q.solution.description"></div>
                                  </b-row>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </b-card-body>
                      </b-collapse>
                    </b-card>
                  </b-col>
                  </div>
                </b-container>
                </b-col>
              </b-row>
            </b-card-body>
          </b-collapse>
      </b-card>
   </div>
 </b-container>
<!-- EDIT MODE -->
    <b-container fluid v-if="isEditMode">
  <div  style="background:#f9f9f9;padding:10px 10px 30px 10px; height: 75%" >
    <h5 class="d-flex justify-content-center" style="font-weight:bold;">EDIT MODE</h5>
      <b-container fluid style="background-color:white;border:1px solid #eeee;padding:10px 10px 10px 10px;">
         <b-container v-if="test.sections.length!=0 || test.sections!=null" fluid>
           <div v-for="(section, sindex) in test.sections" v-bind:key="sindex" >
            <div v-show="!section.hasOwnProperty('sectionId')" style="margin-top:15px;border:1px solid #eeee;background-color:white;">
             <b-row  class="sticky-top" style="background-color: #fff; padding: 5px 30px 5px 30px; z-index: 900;">
             <b-col>
             <b-row class="d-flex justify-content-between">
              <div class="d-flex justify-content-between">
                <editable :id="'sectionName'+sindex" :text="section.sectionName" v-model="section.sectionName" style="text-decoration: underline; font-size: 18px;color: rgb(144, 153, 156);"></editable>
                 <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px">&nbsp;|&nbsp;</span>
                  <editable :id="'sectionDuration'+sindex" :text="section.timeDuration" v-model="section.timeDuration" style="text-decoration: underline; font-size: 18px;color: rgb(144, 153, 156);"></editable>&nbsp;
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px">mins</span>
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px; margin-left: 5px;">&nbsp;|&nbsp;</span>
                  <editable :id="'pveMark'+sindex" :text="section.marksForIndividualQuestion" v-model="section.marksForIndividualQuestion" style="text-decoration: underline; font-size: 18px;color: rgb(144, 153, 156);"></editable>&nbsp;
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px;">+ve mark/question</span>
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px; margin-left: 5px;">&nbsp;|&nbsp;</span>
                  <editable :id="'nveMark'+sindex" :text="section.negativeMarksForIndividualQuestion" v-model="section.negativeMarksForIndividualQuestion" style="text-decoration: underline; font-size: 18px;color: rgb(144, 153, 156);"></editable>&nbsp;
                  <span style="font-size:17px;color:rgb(144, 153, 156);font-weight:bold; margin-top: 10px">-ve mark/question</span>
                </div>
                <div>
                   <b-button variant="danger"  @click="discardSection(sindex)"><i class="fa fa-times" aria-hidden="true"></i></b-button>
                    <b-button variant="success" @click="saveSection(sindex)"><i class="fa fa-save" aria-hidden="true" ></i></b-button>
                </div>
              </b-row>
            </b-col>
          </b-row>
              <b-row v-if="!section.hasOwnProperty('sectionId')">
                <b-col >
                <b-container fluid v-if="section.questionsData!=null">
          <div role="tablist" class="d-flex justify-content-center"  v-for="(q, index) in section.questionsData" v-bind:key="index">
            <b-col cols="8">
            <b-card no-body class="mb-1" style="background-color:#9ee1f7;">
              <b-card-header header-tag="header" class="p-1" role="tab">
                  <b-container fluid block href="#" v-b-toggle="'question1'+sindex+''+q.questionNumber" style="background-color:#9ee1f7;color:black; padding:10px 10px 10px 10px;cursor:pointer;">
                    <b-row>
                      <b-col  class="">
                        <div class="d-flex jusitfy-content-start">
                        {{q.questionNumber}})&nbsp;&nbsp;&nbsp;&nbsp;<div v-html="q.question.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                        </div>
                      </b-col>
                      <div class="pull-right" style="padding:0 12px 0 0;">
                        <b-btn class="edit-btn btn-sm" @click="editQuestion(sindex, q)"><i class="fa fa-pencil" aria-hidden="true"></i></b-btn>
                        <b-btn class="close-btn btn-sm" @click="deleteQuestion(sindex, q)"><i class="fa fa-close" aria-hidden="true"></i></b-btn>
                      </div>
                    </b-row>
                  </b-container>
              </b-card-header>
            <b-collapse :id="'question1'+sindex+''+q.questionNumber"  accordion="my-accordion" role="tabpanel">
            <b-card-body style="background-color:#eeeeee;">
              <table class="table" >
                <thead>
                    <tr>
                    </tr>
                </thead>
              <tbody>
                  <tr>
                    <td class="text-nowrap" style="font-weight:bold;">Options</td>
                    <td>
                      <b-row v-for="(a, a_index) in q.answers" v-bind:key="a_index">
                        {{a.answerNumber}})&nbsp;<div v-html="a.answer.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                      </b-row>
                      </td>
                  </tr>
                  <tr>
                    <td class="text-nowrap" style="font-weight:bold;">Correct Answer :</td>
                    <td>
                      <b-row v-if="q.correctAnswer!=null">
                          {{q.correctAnswer.answerNumber}})&nbsp;<div v-html="q.correctAnswer.answer.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                      </b-row>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-nowrap" style="font-weight:bold;">Solution:</td>
                    <td>
                      <b-row v-if="q.solution!=null">
                          <div v-html="q.solution.description"></div>
                      </b-row>
                    </td>
                        </tr>
                      </tbody>
                    </table>
                  </b-card-body>
                </b-collapse>
                </b-card>
               </b-col>
              </div>
             </b-container>
            </b-col>
           </b-row>
          </div>
         </div>
        </b-container>
      </b-container>
     </div>
    </b-container>
   </b-container>

<!--  Start of File Upload -->

    <div  style="background:#f9f9f9;height:400px;padding:10px 10px 30px 10px;" v-if="isCreateMode">
    <b-row>
    <b-col cols="9"></b-col>
    <b-col  cols="2">
      <!-- <b-form-select v-model="section" :options="testType" ></b-form-select> -->
      <b-form-select :options="testType" ></b-form-select>
    </b-col>
    <b-col cols="1">
      <b-button class="btn-sm back-btn-edit" @click="cancelCreateMode($event)">
        <i class="fa fa-arrow-left px-1" aria-hidden="true"></i>
        Back
        </b-button>
    </b-col>
  </b-row>
  <b-row>
  <b-col cols="4"></b-col>
  <b-col cols="4" style="text-align:center;margin-top:70px;">
    <a class="btn btn-danger bg-active active">
      <i class="fa fa-file-word-o" style="font-size: 58px;"></i>
     </a><br>
     <label for="QuestionPaper" style="margin-top: 18px;font-size: 21px;font-weight: bold">Upload Question Paper</label><br>
      <span style="font-size:14px;">(Tags, Solutions - Optional)</span><br>
      <b-container>
      <b-form v-on:submit.prevent="onUploadQuestion">
        <b-row>
          <b-col>
            <b-form-file accept=".docx" @change="fileSelected"  :state="Boolean(files)" placeholder="Choose a file..."></b-form-file>
            <!-- <input type="file" @change="fileSelected" placeholder="Choose a file..." /> -->
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <!-- <b-button type="submit" class="btn-sm upload-btn-edit">Upload File</b-button> -->
            <b-button type="submit" variant="primary">Upload File</b-button>
          </b-col>
        </b-row>
      </b-form>
      </b-container>
    </b-col>
  <b-col cols="4"></b-col>
  </b-row>
  </div>

  <!--  End of File Upload -->
<!-- Modal for editing the question -->

<b-modal
    hide-header
    hide-footer
    no-close-on-esc
    centered
    size="lg"
    ref="editQuestionModal">
        <b-container fluid style="padding:0 0 0 0;margin-top:-15px;">
            <b-container fluid style="overflow:auto;">
              <b-col v-if="question!=null" >
                <b-table :items="question" stacked :fields="['question', 'answers', 'correctAnswer', 'solution']" style="marigin-top: 100px;">
                  <template slot="question" slot-scope="data">
                    <div class="row">
                    <editor :id="'qn'+data.item.questionNumber" :target="'qn'+data.item.questionNumber" :html="data.item.questionNumber" v-model="data.item.questionNumber" />)&nbsp;
                    <editor :id="'q'+data.item.questionNumber" :target="'q'+data.item.questionNumber" :html="data.item.question.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)" v-model="data.item.question" />
                    </div>
                  </template>
                  <template slot="answers" slot-scope="data">
                    <div class="row row-container" contenteditable="true" v-for="(a, aindex) in data.item.answers" v-bind:key="aindex" :id="'ca'+data.item.questionNumber+aindex">
                          <editor :id="'an'+data.item.questionNumber+aindex" :target="'an'+data.item.questionNumber+aindex" :html="a.answerNumber" v-model="a.answerNumber" />)&nbsp;
                          <editor :id="'a'+data.item.questionNumber+aindex" :target="'a'+data.item.questionNumber+aindex" :html="a.answer.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)" v-model="a.answer" />
                     <b-popover :target="'ca'+data.item.questionNumber+aindex" triggers="focus">
                        <div>
                          <i class="fa fa-plus" style="color: green" @click="add(data.item, aindex)" v-b-tooltip.hover title="Add new answser"></i>
                          <i class="fa fa-trash" style="color: red" @click="trash(data.item, aindex)" v-b-tooltip.hover title="Delete this answser"></i>
                          <i class="fa fa-check" style="color: purple" @click="check(data.item, aindex)" v-b-tooltip.hover title="Mark as Correct answser"></i>
                        </div>
                        </b-popover>
                    </div>
                  </template>
                  <template slot="correctAnswer" slot-scope="data">
                    <div v-if="data.item.correctAnswer!=null">
                    {{data.item.correctAnswer.answerNumber}}) <div v-html="data.item.correctAnswer.answer.replace('__dexters_access_token_9836758498731097845__', $session.get('access_token')).replace('__dexters_resource_location_9836758498731097845__',resourceLocation)"></div>
                    </div>
                  </template>
                </b-table>
              </b-col>
            </b-container>
        </b-container>
        <hr>
        <b-container>
          <b-row>
            <b-col>

        <div class="d-flex justify-content-between">
          <div>
            <span class="fa fa-info" style="color: red">&nbsp;Click the contents to edit contents</span><br>
          </div>
          <button class="btn btn-info" @click="$refs.editQuestionModal.hide()">Close</button>
        </div>
            </b-col>
          </b-row>
        </b-container>
    </b-modal>
  <b-modal
    hide-header
    hide-footer=""
    no-close-on-esc
    centered
    size="lg"
    ref="wysiwygEditor">
      <b-container>
        <b-row>
          <b-col>
            <wysiwyg v-model="wysiwygContent" />
          </b-col>
        </b-row>
      <hr>
      <b-row>
        <b-col>
          <b-button @click="$refs.wysiwygEditor.hide()">Cancel</b-button>
          <b-button @click="handleEditorOk">Ok</b-button>
        </b-col>
      </b-row>
      </b-container>
  </b-modal>


  <loader v-if="isLoading"></loader>
  </b-container>
</div>
</template>
<script>
import Global from "@/service/Global";
import LabelEdit from "label-edit";
import MainHeader from "@/components/comp/MainHeader";
import SubHeader from "@/components/comp/admin/SubHeader";
import BreadCrumb from "@/components/comp/admin/BreadCrumb";
import Loader from "@/components/comp/Loader";
import Editable from "@/components/comp/Editable";
import swal from "sweetalert2";
const toast = swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 3000
});
export default {
  name: "CustomTest",
  props: ["testId"],
  components: {
    MainHeader,
    SubHeader,
    BreadCrumb,
    LabelEdit,
    Loader,
    Editable,
    Editor: {
      props: ["id", "target", "html"],
      watch: {
        html: function(value) {
          this.content = value;
        }
      },
      data() {
        return {
          content: this.html,
          popoverShow: false,
          editorOptions: {
            hideModules: {
              bold: true,
              italic: true,
              underline: true,
              justifyLeft: false,
              justifyCenter: false,
              justifyRight: true,
              headings: true,
              link: true,
              code: false,
              orderedList: false,
              unorderedList: false,
              image: false,
              table: false,
              removeFormat: false,
              separator: true
            }
          }
        };
      },
      methods: {
        onOk: function() {
          this.$emit("input", this.content);
          this.popoverShow = false;
        }
      },
      template: `
                       <div :id="id" class="content-container">
                        <div class="" v-html="html"></div>
                        <b-popover :target="target" triggers="click"  :show.sync="popoverShow" style="width: 100%">
                        <div >
                            <wysiwyg v-model="content" @input="$emit('input',html)" :options="editorOptions"/>
                        </div>
                        <b-btn @click="popoverShow=false" size="sm" variant="danger">Cancel</b-btn>
                        <b-btn @click="onOk" size="sm" variant="primary">Ok</b-btn>
                        </b-popover>
                       </div>
    `
    }
  },
  data: function() {
    return {
      title: "Zen",
      isLoading: false,
      question: [],
      editRef: {
        data: null,
        section: {
          index: 0
        },
        question: {
          index: 0
        },
        answer: {
          index: 0
        }
      },
      wysiwygContent: "",
      formula:
        '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">  <mi>x</mi>  <mo>=</mo>  <mrow class="MJX-TeXAtom-ORD">    <mfrac>      <mrow>        <mo>&#x2212;<!-- − --></mo>        <mi>b</mi>        <mo>&#x00B1;<!-- ± --></mo>        <msqrt>          <msup>            <mi>b</mi>            <mn>2</mn>          </msup>          <mo>&#x2212;<!-- − --></mo>          <mn>4</mn>          <mi>a</mi>          <mi>c</mi>        </msqrt>      </mrow>      <mrow>        <mn>2</mn>        <mi>a</mi>      </mrow>    </mfrac>  </mrow>  <mo>.</mo></math>           ',
      test: null,
      error: false,
      isCreateMode: false,
      isEditMode: false,
      files: null,
      selectedSection: null,
      currentUser: null,
      subMenu: [
        {
          name: "DashBoard",
          link: "#/admin/addTest",
          icon: "fa fa-home px-2",
          active: "active"
        },
        {
          name: "Assessment",
          link: "#/admin/assessment",
          icon: "fa fa-pencil-square-o px-2",
          active: ""
        },
        {
          name: "Account",
          link: "#/admin/users",
          icon: "fa fa-users px-2",
          active: ""
        },
         {
          name: "Menu",
          link: "#/admin/addMenu",
          icon: "fa fa-users px-2 ",
          active: ""
        }
      ],
      crumbItems: [
        {
          text: "DashBoard",
          href: "#/admin/addTest",
          active: false
        },

        {
          text: "Custom Test",
          href: "#/admin/customTest",
          active: true
        }
      ],
      testType: [
        { value: null, text: "select section" },
        { value: "1", text: "Generic" }
      ]
    };
  },
  async mounted() {
    this.isLoading = true;
    // console.log("Getting refresh token");
    await Global.onPageRefresh(this.$session, this.$router);
    // console.log("Getting User info");
    await this.getUserInfo();
    // console.log("Getting test");
    await this.getTest();
    this.isLoading = false;
    // console.log(this.test.sections)
  },
  methods: {
   closeModal:function(){
     this.isCreateMode=false;
     this.$refs.verifyModal.hide();
   },
  editQuestion:function(sindex, q){
    this.editRef.section.index=sindex;
    this.question.splice(0);
    this.question.push(q);
    this.$refs.editQuestionModal.show();
  },
  deleteQuestion: function(sindex, q){
    this.test.sections[sindex].questionsData.splice(this.findIndex(q), 1);
  },
  showWsyiwygEditor: function(content){
    this.wysiwygContent=content;
    this.$refs.editQuestionModal.hide();
    this.$refs.wysiwygEditor.show();
  },
  add: function(question, aindex){
    let data={
      answer: "Fill in ur answer",
      answerNumber:"x",
    };
    this.test.sections[this.editRef.section.index].questionsData[this.findIndex(question)].answers.splice(aindex+1, 0, data);
  },
  trash: function(question, aindex){
    this.test.sections[this.editRef.section.index].questionsData[this.findIndex(question)].answers.splice(aindex, 1);
  },
  check: function(question, aindex){
    this.test.sections[this.editRef.section.index].questionsData[this.findIndex(question)].correctAnswer=question.answers[aindex];
  },
  edit: function(question, aindex){
    let content=this.questions[this.findIndex(question)].answers[aindex].answer;
    this.editRef.question.index=this.findIndex(question);
    this.editRef.answer.index=aindex;
    this.editRef.data=question;
    this.showWsyiwygEditor(this.questions[this.findIndex(question)].answers[aindex].answer);
  },
  findIndex: function(question){
    for(let count=0; count<this.test.sections[this.editRef.section.index].questionsData.length; count++){
      let e=this.test.sections[this.editRef.section.index].questionsData[count];
      if(e.questionNumber==question.questionNumber)
        return count;
    }
    return -1;
  },
  handleEditorOk: function(evt){
    evt.preventDefault();
    this.questions[this.editRef.answer.index].answers[this.editRef.answer.index].answer=this.wysiwygContent;
    this.editQuestion(this.questions[this.editRef.answer.index]);
    this.$refs.editQuestionModal.show();
  },
  saveEditedQuestion: function(question){
    this.questions[this.editRef.question.index]=question;
    this.$refs.editQuestionModal.hide();
  },
  discardSection:function(index){
     this.test.sections.splice(-1,1);
     this.isEditMode=false;
  },
    removeSection: function(index) {
      let data = {
        testId: this.testId,
        testName: this.test.testName,
        testDuration: this.test.timeDuration,
        sectionId: this.test.sections[index].sectionId,
      };
      let formData = new FormData();
      formData.append("section", data);
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("question/section/delete", data, config)
          .then(response => {
            console.log("Response Received", response.data);
            this.test=response.data;
             window.location.reload();
            resolve(response);
            toast({
              type: "success",
              title: "Section removed successfully"
            });

          })
          .catch(err => {
            reject(err);
            console.log(err);
            toast({
              type: "error",
              title: "Section saving failed"
            });
          });
      });
    },
    addSection: function() {
      let data = {
        testId: this.testId,
        sectionName: "GENERIC",
        noOfQuestions: "0",
        timeDuration: "30",
        totalMarks: "100.00",
        marksForIndividualQuestion: "1.0",
        negativeMarksForIndividualQuestion: "0.5",
        questionData: null
      };
      this.test.sections.push(data);
    },
    textUpdated: function(text) {
      this.text = text;
    },
    startCreateMode: function($event, index) {
      $event.stopImmediatePropagation();
      this.isCreateMode = true;
      this.selectedSection = index;
    },
    cancelCreateMode: function($event) {
      $event.stopImmediatePropagation();
      this.isCreateMode = false;
    },
    fileSelected: function(e) {
      this.files = e.target.files || e.dataTransfer.files;
      // console.log(this.files);
    },
    onUploadQuestion: function() {
      this.isLoading = true;
      let formData = new FormData();
      formData.append("file", this.files[0]);
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        };
        axios
          .post("question/upload", formData, config)
          .then(response => {
            // console.log("Response Received", response.data);
            this.$store.dispatch("addQuestions", response.data);
            this.$store.dispatch("addSection", response.data);
            this.test.sections[this.selectedSection].questionsData =
              response.data;
            this.isLoading = false;
            this.isCreateMode = false;
            this.isEditMode = true;
            resolve(response);
          })
          .catch(err => {
            this.isLoading = false;
            swal({
              title: 'Upload Error!',
              text: "Are you uploading a proper file format of docx!",
              type: 'error',
              allowOutsideClick: false,
              allowEscapeKey: false,
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Ok Resume!'
            }).then((result) => {
              if (result.value) {
                window.location.reload();
              }
            });
            reject(err);
          });
      });
    },
    saveSection: function(index) {
      let data = {
        testId: this.testId,
        testName: this.test.testName,
        testDuration: this.test.timeDuration,
        sectionId: this.test.sections[index].sectionId,
        sectionName: this.test.sections[index].sectionName,
        noOfQuestions: this.test.sections[index].questionsData.length,
        timeDuration: this.test.sections[index].timeDuration,
        marksForIndividualQuestion: this.test.sections[index].marksForIndividualQuestion,
        negativeMarksForIndividualQuestion: this.test.sections[index].negativeMarksForIndividualQuestion,
        questionData: this.test.sections[index].questionsData
      };
      let formData = new FormData();
      formData.append("section", data);
      return new Promise((resolve, reject) => {
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("question/save", data, config)
          .then(response => {
            // console.log("Response Received", response.data);
            this.test=response.data;
            this.isEditMode = false;
            resolve(response);
            toast({
              type: "success",
              title: "Section saved successfully"
            });
          })
          .catch(err => {
            reject(err);
            console.log(err);
            toast({
              type: "error",
              title: "Section saving failed"
            });
          });
      });
    },
    saveTest: function(){
      this.isLoading=true;
      return new Promise((resolve, reject) => {
        let data={
          testId: this.test.testId,
          testName: this.test.testName,
          timeDuration: this.test.timeDuration,
        };
        let config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios
          .post("/test/save", data, config)
          .then(response => {
            this.isLoading=false;
            resolve(response);
            toast({
              type: "success",
              title: "Test saved successfully"
            });
          })
          .catch(err => {
            this.isLoading=false;
            console.log(err);
            toast({
              type: "error",
              title: "Test saving failed"
            });
          });
      });
    },
    getTest: function() {
      this.isLoading = true;
      return new Promise((resolve, reject) => {
        axios
          .get("/test/get/" + this.testId)
          .then(response => {
            // console.log("Response Received", response.data);
            this.$nextTick(function() {
              this.test = response.data;
            });
            this.isLoading = false;
            resolve(response);
          })
          .catch(err => {
            reject(err);
            console.log(err);
            alert("Upload Error occured");
          });
      });
      this.isLoading = false;
    },
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
    }
  }
};
</script>

<style scoped>
.not_saved{
    border-bottom-style: dotted;
    border-left-style: solid;
}
i {
  cursor: pointer;
}
.row-container {
  overflow-x: auto;
  padding: 2px;
  cursor: pointer;
}
.row-container:hover {
  overflow-x: auto;
  cursor: pointer;
  padding: 3px;
  box-shadow: 0 5px 5px #666;
}
.content-container {
  overflow-x: auto;
  padding: 2px;
  cursor: pointer;
}
.content-container:hover {
  overflow-x: auto;
  /* border: 1px solid #9c9c9c; */
  cursor: pointer;
  padding: 3px;
  box-shadow: 0 5px 5px #666;
}
.add-btn-edit {
  background-color: teal;
}
.add-btn-edit:hover {
  background-color: teal;
}
.submit-btn-edit {
  background-color: slateblue;
}
.submit-btn-edit:hover {
  background-color: slateblue;
}
.close-btn-edit {
  margin-top: 5px;
  border: none;
  background-color: crimson;
}
.close-btn-edit:hover {
  border: none;
  background-color: crimson;
}
.save-btn-edit {
  margin-top: 5px;
  border: none;
  background-color: green;
}
.save-btn-edit:hover {
  border: none;
  background-color: green;
}
.add1-btn-edit {
  margin-top: 5px;
  border: none;
  background-color: rebeccapurple;
}
.add1-btn-edit:hover {
  border: none;
  background-color: rebeccapurple;
}
.editable-container.editable-inline {
  display: inline-block;
  vertical-align: middle;
  width: auto;
  zoom: 1;
}
.exam-name {
  text-decoration: underline;
  font-size: 24px;
  color: rgb(144, 153, 156);
  margin-left: 20px;
}
.exam-type {
  text-decoration: underline;
  font-size: 20px;
  color: rgb(144, 153, 156);
  /* margin-left: 12px; */
}
.upload-btn-edit {
  background-color: #22baa0;
  border: none;
}
.upload-btn-edit:hover {
  background-color: #22baa0;
  border: none;
}
.back-btn-edit {
  background-color: #7a6fbe;
  border: none;
}
.back-btn-edit:hover {
  background-color: #7a6fbe;
  border: none;
}

/* ::-webkit-scrollbar { width: 0 !important } */

/* .container-fluid { -ms-overflow-style: none; }
.container-fluid { overflow: -moz-scrollbars-none; }

.container { -ms-overflow-style: none; }
.container { overflow: -moz-scrollbars-none; } */
</style>
