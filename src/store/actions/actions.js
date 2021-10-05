import { SORT } from "./actionTypes";

export function sort(order) {
    return {
        type: SORT,
        payload: order
    };
}
