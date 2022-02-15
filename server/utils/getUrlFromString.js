const { sanitize } = require("string-sanitizer");
const cyrillicToTranslit = require("cyrillic-to-translit-js");

function getUrlFromString(name) {
    return sanitize.addDash(
        cyrillicToTranslit().transform(name, " ").toLowerCase()
    );
}

module.exports = getUrlFromString;
