import React from "react";
import { Button, Form, Input } from "reactstrap";

function SearchForm({
    value,
    onSubmit,
    onChange,
    inputClasses,
    formClasses,
    buttonColor,
    showButton,
    placeholder,
    autoFocus
}) {
    return (
        <Form className={`form-inline ${formClasses}`} onSubmit={onSubmit}>
            <Input
                autoFocus
                value={value}
                className={`mr-sm-2 ${inputClasses}`}
                placeholder={placeholder}
                type="text"
                onChange={(e) => onChange(e)}
            />
            {showButton && (
                <Button
                    className="btn-just-icon btn-round"
                    color={buttonColor}
                    type="submit"
                >
                    <i aria-hidden={true} className="nc-icon nc-zoom-split" />
                </Button>
            )}
        </Form>
    );
}
SearchForm.defaultProps = {
    inputClasses: "",
    formClasses: "ml-2",
    buttonColor: "neutral",
    showButton: true,
    placeholder: "Поиск",
    onChange: () => {},
    onSubmit: () => {}
};
export default SearchForm;
