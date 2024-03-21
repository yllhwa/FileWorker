import { createRouter, createWebHashHistory } from "vue-router";
import Cookies from 'js-cookie'
import i18n from "./i18n";

import IndexPage from "./pages/IndexPage.vue";
import ClipPage from "./pages/ClipPage.vue";
import FilePage from "./pages/FilePage.vue";
import LoginPage from "./pages/LoginPage.vue";
import FileManagePage from "./pages/FileManagePage.vue";

const $t = i18n.global.t;

const routes = [
    {
        path: "/",
        name: "index",
        meta: {
            title: $t("page_title.index"),
        },
        component: IndexPage,
    },
    {
        path: "/clip",
        name: "clip",
        meta: {
            title: $t("page_title.clip"),
        },
        component: ClipPage,
    },
    {
        path: "/file",
        name: "file",
        meta: {
            title: $t("page_title.file"),
        },
        component: FilePage,
    },
    {
        path: "/filemanage",
        name: "filemanage",
        meta: {
            title: $t("page_title.filemanage"),
        },
        component: FileManagePage,
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: $t("page_title.login"),
        },
        component: LoginPage,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title as string;
    }
    const PASSWORD = Cookies.get('PASSWORD');
    if (!PASSWORD && to.path !== '/login') {
        next({
            path: '/login',
        })
    } else {
        next()
    }
})

export default router;
export { routes };