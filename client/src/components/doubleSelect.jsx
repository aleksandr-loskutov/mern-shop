import React from "react";
import { Col, FormGroup, Row } from "reactstrap";
import Select from "react-select";

function DoubleSelect({
    featureOptions,
    featureValuesOptions,
    onSelect,
    defaultValue,
    index
}) {
    const defaultValueSecond =
        featureValuesOptions[
            featureValuesOptions.findIndex(
                (f) => f.label === defaultValue?.secondDefault
            )
        ];
    return (
        defaultValue.hasOwnProperty("label") && (
            <Row>
                <Col md="6" sm="6">
                    <FormGroup>
                        <Select
                            isSearchable={false}
                            className="react-select react-select-default"
                            classNamePrefix="react-select"
                            name={`defaultSelect${index}`}
                            defaultValue={defaultValue}
                            onChange={(value) => onSelect(value)}
                            options={featureOptions}
                        />
                    </FormGroup>
                </Col>
                <Col md="6" sm="6">
                    <FormGroup>
                        <Select
                            isSearchable={false}
                            className="react-select react-select-default"
                            classNamePrefix="react-select"
                            name={`defaultSelect${index + 1}`}
                            defaultValue={defaultValueSecond}
                            onChange={(value) => onSelect(value)}
                            options={featureValuesOptions}
                        />
                    </FormGroup>
                </Col>
            </Row>
        )
    );
}

export default DoubleSelect;
