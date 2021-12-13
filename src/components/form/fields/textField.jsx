import React, { useState } from "react";
import PropTypes from "prop-types";
import { Input } from "reactstrap";

const TextField = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    required,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div className="mb-2">
            <label htmlFor={name} className="label">
                {" "}
                {label}
            </label>
            {required && <span className="text-danger">*</span>}
            <div
                className={
                    type === "password" && name !== "cardCVC"
                        ? "input-group has-validation"
                        : ""
                }
            >
                <Input
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                    {...rest}
                />

                {type === "password" && name !== "cardCVC" && (
                    <button
                        className="btn-sm btn-group-toggle border-0 "
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i className={"nc-icon nc-key-25"}></i>
                    </button>
                )}
                {error && <div className="invalid-feedback ">{error}</div>}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};

export default React.memo(TextField);
