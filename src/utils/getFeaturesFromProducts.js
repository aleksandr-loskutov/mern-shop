export function getFeaturesFromProducts(productsArray) {
    return productsArray.reduce(
        (acc, product) => {
            if (product.features?.length > 0) {
                product.features.forEach((feature) => {
                    if (feature.name in acc.all) {
                        if (!acc.all[feature.name].includes(feature.value)) {
                            acc.all[feature.name].push(feature.value);
                        }
                    } else {
                        acc.all[feature.name] = [feature.value];
                    }
                    if (!acc.keys.some((key) => key.label === feature.name)) {
                        acc.keys.push({
                            label: feature.name,
                            value: feature.name,
                            input: "key"
                        });
                    }
                    if (
                        !acc.values.some(
                            (value) => value.label === feature.value
                        )
                    ) {
                        acc.values.push({
                            label: feature.value,
                            value: feature.value,
                            input: "value"
                        });
                    }
                });
            }
            return acc;
        },
        { all: {}, keys: [], values: [] }
    );
}
