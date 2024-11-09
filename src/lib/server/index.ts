import { EventEmitter } from "./functionEmitter";
import { State } from "./state";
export {  
    getMediaDir,
    getMediaFile,
    readMedia 
} from "./media";

export const ee = new EventEmitter();
export const state = new State();
