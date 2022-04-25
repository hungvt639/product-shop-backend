import { Permission } from "../models/user/permissionModel";
export declare const PER: Permission[];
export declare const GROUP: {
    superAdmin: {
        name: string;
        code: string;
        permissions: string[];
    };
    user: {
        name: string;
        code: string;
        permissions: string[];
    };
};
declare function dataApiV1(): Promise<void>;
export default dataApiV1;
