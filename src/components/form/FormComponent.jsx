import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
const FormComponent = ({
    children,
    validatorConfig,
    onSubmit,
    defaultData,
    className
}) => {
    const [data, setData] = useState(defaultData || {});
    const [errors, setErrors] = useState({});
    const handleChange = useCallback((target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    }, []);
    const validate = useCallback(
        (data) => {
            validatorConfig
                .validate(data)
                .then(() => setErrors({}))
                .catch((err) => {
                    setErrors({ [err.path]: err.message });
                });
            return (
                Object.keys(errors).length === 0 && Object.keys(data).length > 0
            );
        },
        // eslint-disable-next-line
        [validatorConfig, setErrors]
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("handleSubmit");
        const isValid = validate(data);
        if (!isValid) return;
        console.log("handleSubmit", isValid);
        onSubmit(data);
    };

    useEffect(() => {
        if (Object.keys(data).length > 0) {
            validate(data);
        }
        // eslint-disable-next-line
    }, [data]);
    const handleKeyDown = useCallback((event) => {
        if (event.keyCode === 13) {
            event.preventDefault();
            const form = event.target.form;
            const indexField = Array.prototype.indexOf.call(form, event.target);
            form.elements[indexField + 1].focus();
        }
    }, []);
    const isValid = Object.keys(errors).length === 0;

    const clonedElements = React.Children.map(children, (child) => {
        const childType = typeof child.type;
        // для отладки в будущем при оптимизации рендеров типы могут изменяться при использовании memo у полей

        let config = {};
        if (childType === "object") {
            console.log("child object", child, "type", childType);
            if (!child.props.name) {
                throw new Error(
                    "Name property is required for field component " + child
                );
            }
            config = {
                ...child.props,
                onChange: handleChange,
                value: data[child.props.name] || "",
                error: errors[child.props.name],
                onKeyDown: handleKeyDown
            };
        }
        // console.log("config", config);
        if (childType === "function") {
            if (child.props.tag === "button") {
                if (
                    child.props.type === "submit" ||
                    child.props.type === undefined
                ) {
                    config = { ...child.props, disabled: !isValid };
                }
            }
        }
        return React.cloneElement(child, config);
    });
    // console.log("clonedElements", clonedElements);
    return (
        <form className={className} onSubmit={handleSubmit}>
            {clonedElements}
        </form>
    );
};
FormComponent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    validatorConfig: PropTypes.object,
    onSubmit: PropTypes.func,
    defaultData: PropTypes.object
};
export default FormComponent;
