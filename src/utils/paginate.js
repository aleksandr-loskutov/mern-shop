import _ from "lodash";

export function paginate(items, pageNumber, pageSize, type = "loadMore") {
    if (type === "breadCrumbs") {
        return _(items)
            .slice((pageNumber - 1) * pageSize)
            .take(pageSize)
            .value();
    } else {
        return _(items)
            .slice(0)
            .take(pageSize * pageNumber)
            .value();
    }
}
