import { createRouter, createWebHistory } from 'vue-router'
import '../../src/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css'
import'../../src/assets/vendor/line-awesome/dist/line-awesome/css/line-awesome.min.css'
import '../../src/assets/vendor/remixicon/fonts/remixicon.css'
import { isUserLoggedIn } from './utils'

const childRoutes = (prop, mode) => [
  {
    path: '',
    name: prop + '.list',
    meta: { auth: true, name: 'Social App' },
    component: () => import('../views/Apps/Social/SocialApp')
  },
  {
    path: 'accountsetting',
    name: prop + '.accountsetting',
    meta: { auth: true, name: 'Account Setting' },
    component: () => import('../views/User/AccountSetting')
  },
  {
    path: 'privacysetting',
    name: prop + '.privacy-setting',
    meta: { auth: true, name: 'Privacy Setting' },
    component: () => import('../views/User/PrivacySetting')
  },
  {
    path: 'privacypolicy',
    name: prop + '.privacy',
    meta: { auth: true, name: 'Privacy Policy' },
    component: () => import('../views/Pages/PrivacyPolicy')
  },
  {
    path: 'termofservice',
    name: prop + '.termofservice',
    meta: { auth: true, name: 'Terms Of Use' },
    component: () => import('../views/Pages/TermsOfService')
  },
  {
    path: 'profile',
    name: prop + '.profilemain',
    meta: { auth: true, name: 'Profile' },
    component: () => import('../views/SocailMain/Profile/Profile')
  },
  {
    path: 'profileimage',
    name: prop + '.profileimage',
    meta: { auth: true, name: 'Profile Image' },
    component: () => import('../views/SocailMain/Profile/ProfileImage')
  },
  {
    path: 'profilevideo',
    name: prop + '.profilevideo',
    meta: { auth: true, name: 'Profile Video' },
    component: () => import('../views/SocailMain/Profile/ProfileVideo')
  },
  {
    path: 'profileevent',
    name: prop + '.profileevent',
    meta: { auth: true, name: 'Profile Event' },
    component: () => import('../views/SocailMain/Profile/ProfileEvent')
  },
  {
    path: 'event-detail',
    name: prop + '.event-detail',
    meta: { auth: true, name: 'Event-Detail' },
    component: () => import('../views/SocailMain/Profile/Event-Detail')
  },
  {
    path: 'profilebadges',
    name: prop + '.profilebadges',
    meta: { auth: true, name: 'Profile Badges' },
    component: () => import('../views/SocailMain/Profile/ProfileBadges')
  },
  {
    path: 'profileforum',
    name: prop + '.profileforum',
    meta: { auth: true, name: 'Profile Forum' },
    component: () => import('../views/SocailMain/Profile/ProfileForum')
  },
  {
    path: 'group',
    name: prop + '.group',
    meta: { auth: true, name: 'Group' },
    component: () => import('../views/SocailMain/Group/Group')
  },
  {
    path: 'group-detail',
    name: prop + '.group-detail',
    meta: { auth: true, name: 'Group detail' },
    component: () => import('../views/SocailMain/Group/Group-detail')
  },
  {
    path: 'friendlist',
    name: prop + '.friendlist',
    meta: { auth: true, name: 'Friend List' },
    component: () => import('../views/SocailMain/Friends/FriendList')
  },

  {
    path: 'birthdate', // Utilisez ':id' pour indiquer que l'ID sera dynamique dans l'URL
    name: prop + '.birthday',
    meta: { auth: true, name: 'Birthday' },
    component: () => import('../views/SocailMain/Bithdate/Bithdate')
  },
  {
    path: 'notification',
    name: prop + '.notification',
    meta: { auth: true, name: 'Notification' },
    component: () => import('../views/SocailMain/Notifications/Notification')
  },

]
const blankchildRoutes = (prop, mode) => [
  {
    path: 'signin',
    name: prop + '.sign-in1',
    component: () => import('../views/AuthPages/Default/SignIn1')
  },
  {
    path: 'signup',
    name: prop + '.sign-up1',
    component: () => import('../views/AuthPages/Default/SignUp1')
  },

  {
    path: 'recoverpassword',
    name: prop + '.recoverpassword1',
    component: () => import('../views/AuthPages/Default/RecoverPassword1')
  },

]
const chatChildRoutes = (prop, mode) => [
  {
    path: 'chat',
    name: prop + '.chat',
    component: () => import('../views/Apps/Chat/Index')
  }
]
const pagesChildRoutes = (prop, mode = false) => [

]
const blogchildRoutes = (prop, mode = false) => [

]
const storechildRoutes = (prop, mode = false) => [

]
const iconChildRoute = (prop, mode = false) => [

]
const formChildRoute = (prop, mode = false) => [

]
const formwizardChildRoute = (prop, mode = false) => [

]
const appChildRoute = (prop, mode = false) => [
  {
    path: 'calendar',
    name: prop + '.calendar',
    meta: { auth: true, name: 'Calendar'}, //img:require('../assets/images/page-img/profile-bg6.jpg') },
    component: () => import('../views/Apps/Calendar/Calendar')
  },
  {
    path: '/EditEvent/:id', // Le chemin doit commencer par une barre oblique et inclure un paramètre d'ID
    name: 'EditEvent', // Le nom de la route doit être simplement 'EditEvent'
    meta: { auth: true, name: 'EditEvent' },
    component: () => import('../views/Apps/Calendar/EditEvent')
  },
  {
    path: '/Event/:id',
    name: 'Event',
    meta: { auth: true, name: 'Event' },
    component: () => import('../views/Apps/Calendar/Event')
  },
  {
    path: '/Participant/:id',
    name: 'Participant',
    meta: { auth: true, name: 'Participant' },
    component: () => import('../views/Apps/Calendar/Participant')
  },

]
const defaultlayout = (prop, mode = false) => [
  {
    path: 'admin',
    name: prop + '.admin',
    meta: { auth: true, name: 'Admin' },
    component: () => import('../views/Pages/Admin')
  },

]
const coreChildRoute = (prop, mode) => [

]
const tableChildRoute = (prop, mode = false) => [


  {
    path: '/edit-event/:id', // Définissez le chemin avec un paramètre dynamique ":id"
    name: prop+ '.editevent', // Nommez la route (optionnel)
    meta: { auth: true, name: 'EditEvent' },
    component: () => import('../views/Apps/Calendar/EditEvent'), // Composant à afficher pour la modification d'événement
  },
  {
    path: 'datatable',
    name: prop + '.datatable',
    meta: { auth: true, name: 'datatable' },
    component: () => import('../views/Tables/DataTable')
  },
  {
    path: 'chatroom',
    name: prop + '.chatroom',
    meta: { auth: true, name: 'chatroom' },
    component: () => import('../views/Tables/ChatRoom')
  }
]
const userChildRoute = (prop, mode = false) => [
  {
    path: 'profile-edit',
    name: prop + '.profile-edit',
    meta: { auth: true, name: 'Edit Profile' },
    component: () => import('../views/User/ProfileEdit')
  },
  {
    path: 'accountsetting',
    name: prop + '.accountsetting',
    meta: { auth: true, name: 'Account Setting' },
    component: () => import('../views/User/AccountSetting')
  },
  {
    path: 'privacysetting',
    name: prop + '.privacy-setting',
    meta: { auth: true, name: 'Privacy Setting' },
    component: () => import('../views/User/PrivacySetting')
  }
]


const routes = [

  {
    path: '/',
    name: 'social',
    component: () => import('../layouts/Default'),
    children: childRoutes('social')
  },
  // {
  //   path: '/',meta: { requiresAuth: true } ,
  //   name: 'social',
  //   component: () => import('../layouts/Default'),
  //   children: childRoutes('social')
  // },
  {
    path: '/without-leftside',
    name: 'without-leftside',
    component: () => import('../layouts/WithoutLeftside'),
    children: childRoutes('leftside')
  },
  {
    path: '/without-rightside',
    name: 'without-rightside',
    component: () => import('../layouts/WithoutRightside'),
    children: childRoutes('rightside')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../layouts/Empty'),
    children: blankchildRoutes('auth1')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../layouts/Empty.vue'),
    children: chatChildRoutes('chat')
  },
  {
    path: '/pages',
    name: 'pages',
    component: () => import('../layouts/Empty'),
    children: pagesChildRoutes('default')
  },

  {
    path: '/app',
    name: 'app',
    component: () => import('../layouts/Default'),
    meta: { auth: true },
    children: appChildRoute('app')
  },

  {
    path: '/table',
    name: 'table',
    component: () => import('../layouts/Default'),
    meta: { auth: true },
    children: tableChildRoute('table')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../layouts/Default'),
    meta: { auth: true },
    children: userChildRoute('user')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes: routes
})

function isLoggedIn() {
  // Implémentez votre logique de vérification de connexion ici
  // Retournez true si l'utilisateur est connecté, false sinon
  return false; // Par défaut, on suppose que l'utilisateur n'est pas connecté
}

router.beforeEach((to, from, next) => {
    const isLoggedIn = isUserLoggedIn()

  console.log(isLoggedIn)
  // Vérifie si l'utilisateur est connecté avant de naviguer vers la nouvelle route
  if (to.meta.auth && !isUserLoggedIn()) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
    next('/auth/signin');
    } else {
    // L'utilisateur est connecté ou la route ne nécessite pas d'authentification
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   const isLoggedIn = isUserLoggedIn()

//   if(!isLoggedIn && to.name != 'login' && to.name !== 'forgot-password' && to.name !== 'verification-codes' && to.name !== 'reset-password' ){
//     return next({ name: 'auth.sign-in1' })
//   }else{
//     // if (canNavigate(to)) {
//     // console.log("to:", to.name);
//     if (to.meta.redirectIfLoggedIn && isLoggedIn) {
//       return next('/')
//     }
//   // }
//   else {
//     if (isLoggedIn) {
//       return next('/not-authorized')
//     }
//     else {
//       if (to.name != 'login') {
//         // console.log("test")
//         return next({ name: 'login' })
//         // , query: { to: to.name !== 'index' ? to.fullPath : undefined }
//       }

//     }
//   }
//   }

//   return next()

// });


export default router
