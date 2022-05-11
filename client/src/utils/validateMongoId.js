export function validateMongoId(id) {
    return isString(id) ? Array.isArray(id.match(/^[a-fA-F0-9]{24}$/)) : false;
}
function isString(x) {
    return Object.prototype.toString.call(x) === "[object String]";
}
