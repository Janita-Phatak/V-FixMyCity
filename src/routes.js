import {createWebHistory, createRouter} from 'vue-router'
// import CamTest from '@/components/extras/CamTest.vue'
// import reportProblem from '@/components/extras/reportProblem.vue'
// import problemDetails from '@/components/extras/problemDetails.vue'
// import userLocation from '@/components/extras/userLocation.vue'
import fetchLocation from '@/components/postProblem/fetchLocation.vue'
import uploadImage from '@/components/postProblem/uploadImage.vue'
import addDetailsTab from '@/components/postProblem/addDetails.vue'
import reviewSubmitTab from '@/components/postProblem/reviewSubmitTab.vue'
import loginPage from '@/components/loginPage.vue'
import signUpPage from '@/components/signUpPage.vue'
import emailVerification from '@/components/emailVerification.vue'
import forgotPassword from '@/components/forgotPassword.vue'
import postsView from '@/components/postsView.vue'
import cardView from '@/components/cardView.vue'
import userProfile from '@/components/account/userProfile.vue'
import myPosts from '@/components/posts/myPosts.vue'
import usersView from '@/components/nav-menu/usersView.vue'
import HomePage from '@/components/homePageweb.vue'
import ContactUs from '@/components/contactUsPage.vue'

const routes=[
    // {
    //     name: 'camTest',
    //     path: '/camtest',
    //     component: CamTest
    // },
    // {
    //     name: 'reportProblem',
    //     path: '/report',
    //     component: reportProblem
    // },
    // {
    //     name: 'problemDetails',
    //     path: '/problemdetails',
    //     component: problemDetails
    // },
    // {
    //     name: 'userLocation',
    //     path: '/location',
    //     component: userLocation
    // },
    {
        name: 'fetchLocation',
        path: '/locate',
        component: fetchLocation
    },
    {
        name: 'uploadImage',
        path: '/image',
        component: uploadImage
    },
    {
        name: 'addDetailsTab',
        path: '/details',
        component: addDetailsTab
    },
    {
        name: 'reviewSubmitTab',
        path: '/submit',
        component: reviewSubmitTab
    },
    {
        name: 'loginPage',
        path: '/login',
        component: loginPage
    },
    {
        name: 'signUpPage',
        path: '/signup',
        component: signUpPage
    },
    {
        name: 'emailVerification',
        path: '/verify/email',
        component: emailVerification
    },
    {
        name: 'forgotPassword',
        path: '/forgotpassword',
        component: forgotPassword
    },
    {
        name: 'postsView',
        path: '/posts',
        component: postsView
    },
    {
        name: 'cardView',
        path: '/post/:postID',
        component: cardView
    },
    {
        name: 'userProfile',
        path: '/user/:email',
        component: userProfile
    },
    {
        name: 'myPosts',
        path: '/myposts',
        component: myPosts
    },
    {
        name: 'usersView',
        path: '/users',
        component: usersView
    },
    {
        name: 'HomePage',
        path: '/',
        component: HomePage
    },
    {
        name: 'ContactUs',
        path: '/ContactUs',
        component: ContactUs
    }
];

const router= createRouter(
    {
        history: createWebHistory(),
        routes
    }
);

export default router;