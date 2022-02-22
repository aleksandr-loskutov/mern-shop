import { ORDER_STATUSES } from "./consts";
export function getOrderStatusName(statusValue) {
    return ORDER_STATUSES[
        ORDER_STATUSES.findIndex((c) => c.value === statusValue)
    ]?.name;
}
