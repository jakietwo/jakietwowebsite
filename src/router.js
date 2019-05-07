import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "",
          name: "articleList",
          component: () => import("@/components/myhome")
        },
        {
          path: "category",
          name: "category",
          component: () => import("@/components/mycategory")
        },
        {
          path: "myabout",
          name: "about",
          component: () => import("@/components/myabout")
        },
        {
          path: "myTime",
          name: "timeline",
          component: () => import("@/components/myTime")
        }
      ]
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});
