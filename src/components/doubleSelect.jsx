import React from "react";
import { Col, FormGroup, Row } from "reactstrap";
import Select from "react-select";

function DoubleSelect({
    featureOptions,
    featureValuesOptions,
    defaultValueFeature,
    onSelectFeature,
    onSelectFeatureValue
}) {
    return (
        <Row>
            <Col md="6" sm="6">
                <FormGroup>
                    <Select
                        isSearchable={true}
                        className="react-select react-select-default"
                        classNamePrefix="react-select"
                        name="defaultSelect"
                        defaultValue={defaultValueFeature}
                        onChange={(value) => onSelectFeature(value)}
                        options={featureOptions}
                    />
                </FormGroup>
            </Col>
            <Col md="6" sm="6">
                <FormGroup>
                    <Select
                        isSearchable={true}
                        className="react-select react-select-default"
                        classNamePrefix="react-select"
                        name="defaultSelect2"
                        defaultValue={[]}
                        onChange={(value) => onSelectFeatureValue(value)}
                        options={featureValuesOptions}
                    />
                </FormGroup>
            </Col>
        </Row>
    );
}

export default DoubleSelect;
