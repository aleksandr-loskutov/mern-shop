import { DELIVERY_METHODS } from "./consts";
export function getDeliveryMethodName(deliveryValue) {
    return DELIVERY_METHODS[
        DELIVERY_METHODS.findIndex((c) => c.value === deliveryValue)
    ]?.name;
}
