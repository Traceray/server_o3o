/**
 * Created by Administrator on 2015/11/20.
 */
import {INCREMENT_COUNTER, DECREMENT_COUNTER} from '../constants/actionsTypes.js';

export function increment() {
    return {
        type: INCREMENT_COUNTER
    }
}

export function decrement() {
    return {
        type: DECREMENT_COUNTER
    }
}

