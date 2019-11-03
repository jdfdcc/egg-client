import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login']

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title);
  if (to.path !== '/login') {
    await store.dispatch('user/getInfo')
  }
  next()
  // if (to.path === '/login') {
  //   next();
  //   NProgress.done()
  // } else {
  //   const hasGetUserInfo = store.getters.name;
  //   if (true) {
  //     next();
  //   } else {
  //     try {
  //       await store.dispatch('user/getInfo')
  //       next();
  //     } catch (error) {
  //       Message.error(error || 'Has Error')
  //       next(`/login?redirect=${to.path}`)
  //       NProgress.done()
  //     }
  //   }
  // };
})

router.afterEach(() => {
  NProgress.done()
})
