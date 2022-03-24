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
};
type Urlstype = typeof ROUTE.user &
    typeof ROUTE.permission &
    typeof ROUTE.group;

export function generateURLs(): Urlstype {
    let URLs: any = {};
    Object.keys(ROUTE).map((key) => {
        const route = ROUTE[key];
        return Object.keys(route).map((k) => {
            URLs[k] = env.APIV1_1 + route.root + route[k];
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
