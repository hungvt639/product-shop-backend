declare const envV1: {
    model: {
        USER: string;
        GROUP: string;
        PERMISSION: string;
        COLOR: string;
        SIZE: string;
        TYPE: string;
        PRODUCT: string;
        ORDER: string;
        CAROUSE: string;
        BLOG_LINK: string;
    };
    MIMETYPEs: string[];
    r: {
        order_detail: string;
        activate_user: string;
        reset_password: string;
    };
    query: {
        order_detail: string;
        active_token: string;
        reset_password_token: string;
    };
};
export default envV1;
