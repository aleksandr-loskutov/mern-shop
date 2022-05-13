import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "reactstrap";
import DoubleSelect from "./doubleSelect";
import { getFeaturesFromProducts } from "../utils/getFeaturesFromProducts";

function ProductFeaturesConstructor({ featuresData, products, onChange }) {
    const isFeatures = featuresData.length > 0;
    const features = useRef();
    const removeLastFeature = useRef(false);
    features.current = getFeaturesFromProducts(products);
    const defaultFeatures = [
        { name: features.current.keys[0].value, value: "" }
    ];
    const [data, setData] = useState(
        isFeatures ? featuresData : defaultFeatures
    );

    useEffect(() => {
        if (!isFeatures) setData(defaultFeatures);
        // eslint-disable-next-line
    }, [featuresData]);

    useEffect(() => {
        onChange(data);
        setNextFeature();
        // eslint-disable-next-line
    }, [data]);

    const handleSelectFeature = (value) => {
        setData((prevState) => {
            const kvp =
                value.input === "key"
                    ? { name: value.value, value: "" }
                    : { name: value.key, value: value.value };
            return [
                ...prevState.map((feature, index) =>
                    index === value.index ? kvp : feature
                )
            ];
        });
    };

    const getNextFeatureIndex = (index) => {
        const featuresInData = data.reduce((acc, feature) => {
            acc.push(feature.name);
            return acc;
        }, []);
        if (!featuresInData.includes(features.current.keys[index].label)) {
            return index;
        }
        let nextFeatureIndex = index;
        features.current.keys.every((f, index) => {
            if (!featuresInData.includes(f.label)) {
                nextFeatureIndex = index;
                return false;
            }
            return true;
        });
        return nextFeatureIndex;
    };

    function setNextFeature(reset = false) {
        if (removeLastFeature.current) {
            removeLastFeature.current = false;
            return;
        }
        if (data?.length > 0) {
            const count = data.reduce(
                (acc, feature) =>
                    feature.name !== "" && feature.value !== "" ? acc + 1 : acc,
                0
            );
            if (
                (count === data.length &&
                    data.length < features?.current?.keys.length) ||
                reset
            ) {
                const nextFeature = {
                    name: features.current.keys[
                        reset ? 0 : getNextFeatureIndex(data.length)
                    ].value,
                    value: ""
                };
                setData((prevState) => {
                    return reset ? [] : [...prevState, nextFeature];
                });
            }
        }
    }

    const reset = () => {
        setNextFeature(true);
    };

    const getDefaultValueForDoubleSelect = (featureName) => {
        const featureObj =
            features.current.keys[
                features.current.keys.findIndex((f) => f.label === featureName)
            ];

        return data.length > 0
            ? {
                  ...featureObj,
                  secondDefault:
                      data[data.findIndex((f) => f.name === featureName)]
                          ?.value ?? ""
              }
            : featureObj;
    };

    const getFeatureValuesOptions = (name, index) => {
        return features.current.all[name].map((f) => {
            return {
                label: f,
                value: f,
                key: name,
                input: "value",
                index: index
            };
        });
    };

    const getFeatureOptions = (index) => {
        return features.current.keys
            .map((f) => {
                return {
                    ...f,
                    index
                };
            })
            .filter((f) => !data.some((feat) => feat.name === f.value));
    };

    const getConstructorInputs = () => {
        return features.current?.keys.length > 0 && data.length > 0
            ? data.map((feature, index) => {
                  return (
                      <DoubleSelect
                          key={index}
                          index={index}
                          featureOptions={getFeatureOptions(index)}
                          featureValuesOptions={getFeatureValuesOptions(
                              feature.name,
                              index
                          )}
                          defaultValue={getDefaultValueForDoubleSelect(
                              feature.name
                          )}
                          onSelect={handleSelectFeature}
                      />
                  );
              })
            : null;
    };
    const deleteLastFeature = () => {
        removeLastFeature.current = true;
        setData((prevState) => {
            const state = [...prevState];
            state.pop();
            return state;
        });
    };
    const getDeleteLastFeatureButton = () => {
        return (
            data.length > 1 && (
                <Row className="">
                    <Col>
                        <a
                            className="text-info pull-right"
                            href="#link"
                            onClick={deleteLastFeature}
                        >
                            <span className="text-info">[ удалить ]</span>
                        </a>
                    </Col>
                </Row>
            )
        );
    };
    return (
        <>
            <Row>
                <Col className="text-center mt-2 mb-2 ">
                    <span className="text-dark">конструктор параметров</span>
                    <a className="text-info " href="#link" onClick={reset}>
                        {" "}
                        [ сбросить ]
                    </a>
                </Col>
            </Row>
            {getConstructorInputs()}
            {getDeleteLastFeatureButton()}
        </>
    );
}

export default ProductFeaturesConstructor;
