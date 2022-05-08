import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "reactstrap";
import DoubleSelect from "./doubleSelect";
import { getFeaturesFromProducts } from "../utils/getFeaturesFromProducts";

//todo: refactoring & optimization
function ProductFeaturesConstructor({ products, featuresData, onChange }) {
    const [data, setData] = useState(featuresData);
    const features = useRef();
    useEffect(() => {
        onChange(data);
        // eslint-disable-next-line
    }, [data]);

    useEffect(() => {
        features.current = getFeaturesFromProducts(products);
        features.current?.keys.length > 0 &&
            setData([
                {
                    name: features.current.keys[0].value,
                    value: ""
                }
            ]);
        // eslint-disable-next-line
    }, [products]);

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

    useEffect(() => {
        if (data?.length > 0) {
            const count = data.reduce(
                (acc, feature) =>
                    feature.name !== "" && feature.value !== "" ? acc + 1 : acc,
                0
            );
            if (
                count === data.length &&
                data.length < features?.current?.keys.length
            ) {
                const nextFeature = {
                    name: features.current.keys[data.length].value,
                    value: ""
                };
                setData((prevState) => [...prevState, nextFeature]);
            }
        }
    }, [data]);
    const reset = () => {
        setData([
            {
                name: features.current.keys[0].value,
                value: ""
            }
        ]);
    };

    const getConstructorInputs = () => {
        return features.current?.keys.length > 0 && data.length > 0
            ? data.map((feature, index) => {
                  return (
                      <DoubleSelect
                          key={index}
                          index={index}
                          featureOptions={features.current.keys
                              .map((f) => {
                                  return {
                                      ...f,
                                      index: index
                                  };
                              })
                              .filter(
                                  (f) =>
                                      !data.some(
                                          (feat) => feat.name === f.value
                                      )
                              )}
                          featureValuesOptions={features.current.all[
                              feature.name
                          ].map((f) => {
                              return {
                                  label: f,
                                  value: f,
                                  key: feature.name,
                                  input: "value",
                                  index: index
                              };
                          })}
                          defaultValue={features.current.keys[index]}
                          onSelect={handleSelectFeature}
                      />
                  );
              })
            : null;
    };

    return (
        <>
            <Row>
                <Col className="text-center">
                    <span className="mt-0 mb-2 mr-2">
                        конструктор параметров
                    </span>
                    <a className="text-info" href="#link" onClick={reset}>
                        ( сбросить )
                    </a>
                </Col>
            </Row>
            {getConstructorInputs()}
        </>
    );
}

export default ProductFeaturesConstructor;
