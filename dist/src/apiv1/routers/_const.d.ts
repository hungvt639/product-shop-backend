export declare const ROUTE: {
    user: {
        root: string;
        register: string;
        activate_user: string;
        login: string;
        get_profile: string;
        get_list_users: string;
        get_user: string;
        edit_profile: string;
        change_password: string;
        send_reset_password: string;
        reset_password: string;
        update_group_for_user: string;
    };
    permission: {
        root: string;
        create_per: string;
        list_per: string;
        delete_per: string;
        edit_per: string;
        list_url: string;
    };
    group: {
        root: string;
        get_groups: string;
        create_group: string;
        delete_group: string;
        update_permission_in_group: string;
    };
    file: {
        root: string;
        upload_img: string;
        upload_img_ck: string;
    };
    color: {
        root: string;
        create_color: string;
        get_list_color: string;
        edit_color: string;
        delete_color: string;
    };
    size: {
        root: string;
        create_size: string;
        get_list_size: string;
        delete_size: string;
    };
    type: {
        root: string;
        get_list_type: string;
        create_type: string;
        edit_type: string;
        delete_type: string;
        get_product: string;
        get_type: string;
    };
    product: {
        root: string;
        get_list_product: string;
        get_product_sale: string;
        create_product: string;
        edit_product: string;
        delete_product: string;
        get_product: string;
        search_product: string;
    };
    order: {
        root: string;
        get_list_order: string;
        create_order: string;
        updte_order: string;
        get_order_detail: string;
    };
    carousel: {
        root: string;
        get_list_carousel: string;
        create_carousel: string;
        edit_carousel: string;
        delete_carousel: string;
    };
    country: {
        root: string;
        get_provincials: string;
        get_districts: string;
        get_wards: string;
    };
    blog_link: {
        root: string;
        get_list_blog_link: string;
        get_blog_link: string;
        creat_blog_link: string;
        edit_blog_link: string;
        delete_blog_link: string;
    };
};
declare type Urlstype = typeof ROUTE.user & typeof ROUTE.permission & typeof ROUTE.group & typeof ROUTE.color & typeof ROUTE.size & typeof ROUTE.file & typeof ROUTE.type & typeof ROUTE.product & typeof ROUTE.order & typeof ROUTE.carousel & typeof ROUTE.country & typeof ROUTE.blog_link;
export declare function generateURLs(): Urlstype;
export declare function generateListNamePermissions(): Urlstype;
export declare const METHOD: {
    GET: string;
    POST: string;
    DELETE: string;
    PUT: string;
};
export {};
