import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/upload",
    name: "Upload",
    component: () => import("../views/Upload.vue")
  },
  {
    path: "/uploadform/:property",
    name: "Upload Form",
    component: () => import("../views/UploadForm.vue")
  },
  {
    path: "/selectcity",
    name: "SelectCity",
    component: () => import("../views/SelectCity.vue")
  },
  {
    path: "/tour/:city",
    name: "Tour",
    component: () => import("../views/Tour.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
