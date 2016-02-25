/**
 * Created by Administrator on 2015/11/20.
 */

import React from 'react/addons';
import {INCREMENT_COUNTER,DECREMENT_COUNTER} from "../constants/actionsTypes"
const update = React.addons.update;

const initialState = {
    counter: 568,
}

export function counter(state = initialState, action) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            debugger;
            return update(state, {
                counter: {
                    $set: state.counter + 1,
                },
            });
        case DECREMENT_COUNTER:
            return update(state, {
                counter: {
                    $set: state.counter - 1,
                },
            });
        default:
            return state;

    }
}