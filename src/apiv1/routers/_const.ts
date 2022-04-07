import env from "../../config/env";
import { wordUpFirst } from "../utils/functions";

export const ROUTE = {
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
    },
    product: {
        root: "/product",
        get_list_product: "",
        get_product_sale: "/sale",
        create_product: "",
        edit_product: "/:id",
        delete_product: "/:id",
        get_product: "/:slug",
    },
    order: {
        root: "/order",
        get_list_order: "",
        create_order: "",
        updte_order: "/:id",
        get_order_detail: "/detail/:id",
    },
};
type Urlstype = typeof ROUTE.user &
    typeof ROUTE.permission &
    typeof ROUTE.group &
    typeof ROUTE.color &
    typeof ROUTE.size &
    typeof ROUTE.file &
    typeof ROUTE.type &
    typeof ROUTE.product &
    typeof ROUTE.order;

export function generateURLs(): Urlstype {
    let URLs: any = {};
    Object.keys(ROUTE).map((key) => {
        const route = ROUTE[key];
        return Object.keys(route).map((k) => {
            URLs[k] = env.APIV1 + route.root + route[k];
            return route[k];
        });
    });
    return URLs;
}

export function generateListNamePermissions(): Urlstype {
    let PERsDefault: any = {};
    Object.keys(ROUTE).map((key) => {
        const route = ROUTE[key];
        return Object.keys(route).map((k) => {
            PERsDefault[k] = wordUpFirst(k.split("_").join(" "));
            return route[k];
        });
    });
    return PERsDefault;
}

export const METHOD = {
    GET: "GET",
    POST: "POST",
    DELETE: "DELETE",
    PUT: "PUT",
};
