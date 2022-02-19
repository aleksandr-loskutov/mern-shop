import { CITY_LIST } from "./consts";
export function getCityName(cityValue) {
    return CITY_LIST[CITY_LIST.findIndex((c) => c.value === cityValue)]?.name;
}
