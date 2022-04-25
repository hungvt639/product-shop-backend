"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.METHOD = exports.generateListNamePermissions = exports.generateURLs = exports.ROUTE = void 0;
const env_1 = __importDefault(require("../../config/env"));
const functions_1 = __importDefault(require("../utils/functions"));
exports.ROUTE = {
    user: {
        root: "/user",
        register: "/register",
        activate_user: "/activate-user",
        login: "/login",
        get_profile: "/profile",
        get_list_users: "/users",
        get_user: "/user/:id",
        edit_profile: "/edit-profile",
        change_password: "/change-password",
        send_reset_password: "/send-reset-password",
        reset_password: "/reset-password",
        update_group_for_user: "/group/:id",
    },
    permission: {
        root: "/permission",
        create_per: "",
        list_per: "",
        delete_per: "/:id",
        edit_per: "/:id",
        list_url: "/urls",
    },
    group: {
        root: "/group",
        get_groups: "",
        create_group: "",
        delete_group: "/:id",
        update_permission_in_group: "/permissions-group/:id",
    },
    file: {
        root: "/file",
        upload_img: "/img",
        upload_img_ck: "/img-ck",
    },
    color: {
        root: "/color",
        create_color: "",
        get_list_color: "",
        edit_color: "/:id",
        delete_color: "/:id",
    },
    size: {
        root: "/size",
        create_size: "",
        get_list_size: "",
        delete_size: "/:id",
    },
    type: {
        root: "/type",
        get_list_type: "",
        create_type: "",
        edit_type: "/:id",
        delete_type: "/:id",
        get_product: "/get-product",
        get_type: "/:slug",
    },
    product: {
        root: "/product",
        get_list_product: "",
        get_product_sale: "/sale",
        create_product: "",
        edit_product: "/:id",
        delete_product: "/:id",
        get_product: "/:slug",
        search_product: "/search",
    },
    order: {
        root: "/order",
        get_list_order: "",
        create_order: "",
        updte_order: "/:id",
        get_order_detail: "/detail/:id",
    },
    carousel: {
        root: "/carousel",
        get_list_carousel: "",
        create_carousel: "",
        edit_carousel: "/:id",
        delete_carousel: "/:id",
    },
    country: {
        root: "/countries",
        get_provincials: "/provincials",
        get_districts: "/districts/:province",
        get_wards: "/wards/:district",
    },
    blog_link: {
        root: "/blog-link",
        get_list_blog_link: "",
        get_blog_link: "/:slug",
        creat_blog_link: "",
        edit_blog_link: "/:id",
        delete_blog_link: "/:id",
    },
};
function generateURLs() {
    let URLs = {};
    Object.keys(exports.ROUTE).map((key) => {
        const route = exports.ROUTE[key];
        return Object.keys(route).map((k) => {
            URLs[k] = env_1.default.APIV1 + route.root + route[k];
            return route[k];
        });
    });
    return URLs;
}
exports.generateURLs = generateURLs;
function generateListNamePermissions() {
    let PERsDefault = {};
    Object.keys(exports.ROUTE).map((key) => {
        const route = exports.ROUTE[key];
        return Object.keys(route).map((k) => {
            PERsDefault[k] = functions_1.default.wordUpFirst(k.split("_").join(" "));
            return route[k];
        });
    });
    return PERsDefault;
}
exports.generateListNamePermissions = generateListNamePermissions;
exports.METHOD = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
};
//# sourceMappingURL=_const.js.map