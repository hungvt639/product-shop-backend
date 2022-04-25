/// <reference types="node" />
import { IncomingMessage, ServerResponse } from "http";
import morgan from "morgan";
export declare const generator: (time: number | Date, index?: number) => string;
declare const _default: (format: string, option?: morgan.Options<IncomingMessage, ServerResponse>) => (req: IncomingMessage, res: ServerResponse, callback: (err?: Error) => void) => void;
export default _default;
