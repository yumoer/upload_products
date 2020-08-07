import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/spuList'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
              {
                path: '/spuList',
                component: () => import(/* webpackChunkName: "table" */ '../components/page/spuList/spuList.vue'),
                meta: { title: '商品SPU' },
              },
              {
                path: '/spuDetails',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/spuList/spuDetails.vue'),
                meta: { title: 'SPU详情' },
                name:'spuDetails'
              },
              {
                path: '/skuList',
                component: () => import(/* webpackChunkName: "table" */ '../components/page/skuList/skuList.vue'),
                meta: { title: '商品SKU' }
              },
              {
                path: '/skuDetails',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/skuList/skuDetails.vue'),
                meta: { title: 'SKU详情' },
                name:'skuDetails'
              },
              {
                path: '/specificationList',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/specificationList/specificationList.vue'),
                meta: { title: 'SPU规格' },
                name:'specificationList'
              },
              {
                path: '/specificationDetails',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/specificationList/specificationDetails.vue'),
                meta: { title: 'SPU规格详情' },
                name:'specificationDetails'
              },
              {
                path: '/specificationValueList',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/specificationList/specificationValueList.vue'),
                meta: { title: 'SPU规格选项列表' },
                name:'specificationValueList'
              },
              {
                path: '/specificationValueDetails',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/specificationList/specificationValueDetails.vue'),
                meta: { title: 'SPU规格选项详情' },
                name:'specificationValueDetails'
              },
              {
                path: '/bindSpecificationValue',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/specificationList/bindSpecificationValue.vue'),
                meta: { title: 'SKU绑定规格选项详情' },
                name:'bindSpecificationValue'
              },
              {
                path: '/bindSpecificationValueList',
                component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/specificationList/bindSpecificationValueList.vue'),
                meta: { title: 'SKU绑定规格选项列表' },
                name:'bindSpecificationValueList'
              },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
    ],
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
});
