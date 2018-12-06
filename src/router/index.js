import Vue from 'vue'
import VueRouter from 'vue-router';
import VueAnalytics from 'vue-analytics';
import HelloWorld from '@/components/HelloWorld'
// ADMIN
import UploadQuestion from '@/components/comp/admin/UploadQuestion'
import AddTest from '@/components/comp/admin/AddTest'
import CustomTest from '@/components/comp/admin/CustomTest'
import PreviewTest from '@/components/comp/admin/PreviewTest'
import QuestionsVerify from '@/components/comp/admin/QuestionsVerify'
import MenuManage from '@/components/comp/admin/MenuManage'
// import AdminLogin from '@/components/comp/admin/AdminLogin'
import UserImport from '@/components/comp/admin/UserImport'
import Assessment from '@/components/comp/admin/Assessment'
import NavigateTree from '@/components/comp/admin/NavigateTree'
//  CANDIDATE
import LiveTest from '@/components/comp/candidate/LiveTest'
import ReviewTest from '@/components/comp/candidate/ReviewTest'
import DashBoard from '@/components/comp/candidate/DashBoard'
import QuestionPackage from '@/components/comp/candidate/QuestionPackage'
import Reports from '@/components/comp/candidate/Reports'
import TestAnalytics from '@/components/comp/candidate/vuechart/TestAnalytics'
import ResultPage from '@/components/comp/candidate/ResultPage'
import AccountActivation from '@/components/comp/candidate/AccountActivation'
import FbActivation from '@/components/comp/candidate/FbActivation'
import UserRegister from '@/components/comp/candidate/UserRegister'
// EXTRAS
import TestLogin from '@/components/TestLogin'
import Instruction from '@/components/Instruction'
import Main from '@/components/Main'
import Question from '@/components/Question'
import Login from '@/components/Login'
import ForgotPassword from '@/components/ForgotPassword';
import Changepassword from '@/components/ChangePassword';
import Setpassword from '@/components/SetPassword';
import OtpVerify from '@/components/OtpVerify';
import Test from '@/components/test/TestRender'
import Button from '@/components/Button'


Vue.use(VueRouter)


  const routes = [
    // {
    //   path: '/hello',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/login/:packId',
      name: 'TestLogin',
      component: TestLogin
    },
    {
      path: '/instruction',
      name: 'Instruction',
      component: Instruction,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/main',
    //   name: 'Main',
    //   component: Main,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    // {
    //   path: '/q1',
    //   name: 'Question',
    //   component: Question,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/',
      name: 'Login',
      component:Login
    },
    {
      path: '/password_reset',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/candidate/register',
      name: 'UserRegister',
      component: UserRegister,

    },
    {
      path: '/otp_verify',
      name: 'OtpVerify',
      component: OtpVerify
    },
    {
      path: '/change_password',
      name: 'ChangePassword',
      component: Changepassword,
      props: true,
      // meta: {
      //   requiresAuth: true
      // }

    },
    {
      path: '/set_password',
      name: 'SetPassword',
      component: Setpassword,
      props: true,
      // meta: {
      //   requiresAuth: true
      // }

    },
    // {
    //   path: '/taketest',
    //   name: 'Button',
    //   component: Button,
    //   meta: {
    //     requiresAuth: true
    //   }
    // },
    {
      path: '/instruction/:testId',
      name: 'Instruction',
      component: Instruction,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/livetest/:testId',
      name: 'LiveTest',
      component: LiveTest,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/livetest/:testId/:answerId',
      name: 'LiveTest',
      component: LiveTest,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/reviewtest/:testId/:answerId',
      name: 'ReviewTest',
      component: ReviewTest,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/admin',
    //   name: 'AdminLogin',
    //   component: AdminLogin
    // },
    {
      path: '/admin/users',
      name: 'UserImport',
      component: UserImport
    },
    {
      path: '/admin/addMenu',
      name: 'MenuManage',
      component: MenuManage
    },
    {
      path: '/admin/assessment',
      name: 'Assessment',
      component: Assessment,
      meta: {
        requiresAuth: true,
        is_admin: true,
      }

    },
    {
      path: '/admin/addTest',
      name: 'AddTest',
      component: AddTest,
      meta: {
        requiresAuth: true,
        breadcrumbs: [{
          to: '/addTest',
          text: 'Assessment'
        }],
        is_admin: true,
      }
    },
    {
      path: '/admin/previewtest/:testId',
      name: 'PreviewTest',
      component: PreviewTest,
      props: true,
      meta: {
        requiresAuth: true,
        is_admin: true,
      }
    },
    {
      path: '/admin/customTest/:testId',
      name: 'CustomTest',
      component: CustomTest,
      meta: {
        requiresAuth: true,
        breadcrumbs: [{
          to: 'admin/customTest/:testId',
          text: 'Examtest'
        }],
        is_admin: true,
      },
      props: true,
    },
    {
      path: '/admin/upload',
      name: 'UploadQuestion',
      component: UploadQuestion,
      meta: {
        requiresAuth: true,
        is_admin: true,
      }
    },
    {
      path: '/admin/verify',
      name: 'QuestionsVerify',
      component: QuestionsVerify,
      meta: {
        requiresAuth: true,
        is_admin: true,
      }
    },
    {
      path: '/admin/navigate',
      name: 'NavigateTree',
      component: NavigateTree,
      meta: {
        requiresAuth: true,
        is_admin: true,
      }
    },
    {
      path: '/account/google/:gtoken',
      name: 'AccountActivation',
      component: AccountActivation,
      meta: {
        // requiresAuth: true,
        // is_admin: false,
      },
      props: true,
    },
    {
      path: '/account/facebook/:ftoken',
      name: 'FbActivation',
      component: FbActivation,
      meta: {
        // requiresAuth: true,
        // is_admin: false,
      },
      props: true,
    },

    {
      path: '/candidate/dashboard',
      name: 'DashBoard',
      component: DashBoard,
      meta: {
        requiresAuth: true,
        is_admin: false,
      }
    },
    {
      path: '/candidate/pack/:packId',
      name: 'QuestionPackage',
      component: QuestionPackage,
      props: true,
      meta: {
        requiresAuth: true,
        is_admin: false,
      }
    },
    {
      path: '/candidate/report',
      name: 'Reports',
      component: Reports,
      meta: {
        requiresAuth: true,
        is_admin: false,
      }
    },
    {
      path: '/candidate/analytics',
      name: 'TestAnalytics',
      component: TestAnalytics,
      meta: {
        requiresAuth: true,
        is_admin: false,
      }
    },
    {
      path: '/candidate/result/:testId/:answerId',
      name: 'ResultPage',
      component: ResultPage,
      props: true,
      meta: {
        requiresAuth: true,
        is_admin: false,
      }
    },
  ];
  const router = new VueRouter({ routes });
  Vue.use(VueAnalytics, {
    id: 'UA-115769816-4',
    router
  });
  router.beforeEach((to, from, next) => {
    var data={};
    data=JSON.parse(localStorage.getItem("vue-session-key"))==null?{}:JSON.parse(localStorage.getItem("vue-session-key"));
    // if(data!=null)
      // console.log('Checking Logging info...', data.access_token);
    // if (to.matched.some(record => record.meta.requiresAuth) &&  data!=null?!data.hasOwnProperty('access_token'):false){
    if (to.matched.some(record => record.meta.requiresAuth) && !data.hasOwnProperty('access_token')){
      if(to.matched.some(record => record.meta.is_admin)){
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        });
      }else{
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        });
      }
    } else {
      if(to.matched.some(record => record.meta.is_admin)){
        let roles=data.current_user.roles
        let state=false;
        for(let i=0;i<roles.length; i++){
          if(roles[i].roleName=='ROLE_ADMIN'){
            state=true;
            next();
          }
        }
        if(!state){
          next({
            path: '/',
            query: {
              redirect: to.fullPath
            }
          });
        }
      }else{
        next();
      }
    }
  });

  // if(to.matched.some(record => record.meta.is_admin)){
  //   let roles=data.current_user.roles
  //   let state=false;
  //   for(let i=0;i<roles.length; i++){
  //     if(roles[i].roleName=='ROLE_ADMIN'){
  //       state=true;
  //       next();
  //     }
  //   }
  //   if(!state){
  //     next({
  //       path: '/admin',
  //       query: {
  //         redirect: to.fullPath
  //       }
  //     });
  //   }


// router.beforeEach((to, from, next) => {
//   console.log('Checking Logging info...', localStorage["vue-session-key"]["access_token"]);
//   console.log(to.matched.some(record => record.meta.requiresAuth) && localStorage["vue-session-key"]["access_token"]==null);
//   if (!){
//     if(){
//       if(to.matched.some(record => record.path) =='admin'){
//         next({
//           path: '/admin',
//           query: {
//             redirect: to.fullPath
//           }
//         });
//       }else{

//       }
//     }else{
//       if(to.matched.some(record => record.path) =='admin'){
//         next({
//           path: '/admin/addTest',
//           query: {
//             redirect: to.fullPath
//           }
//         });
//       }else{
//         next({
//           path: '/candidate/dashboard',
//           query: {
//             redirect: to.fullPath
//           }
//         });
//       }
//     }
//   }else{
//     next();
//   }
// });

export default router;

