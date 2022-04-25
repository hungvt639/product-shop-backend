declare class Utils {
    convertCode(str: string): string;
    wordUpFirst(str: string): string;
    private _valueInObject;
    valiDataPermission(method: string, url: string): boolean;
    removeKeyNull(obj: any): any;
    validArrObjId(value: string[] | undefined): boolean;
    validateEmail(email: string, nul?: boolean): boolean;
    validatePhone(phone: string): boolean;
}
declare const _default: Utils;
export default _default;
