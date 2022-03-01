import React, { useEffect } from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

import { Button } from "reactstrap";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

function ImageUpload({ avatar, onChange, currentImageUrl }) {
    const [file, setFile] = React.useState(null);
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
        currentImageUrl
            ? currentImageUrl
            : avatar
            ? defaultAvatar
            : defaultImage
    );
    const fileInput = React.useRef(null);
    const handleImageChange = (e) => {
        e.preventDefault();
        if (e.target.files[0]) {
            let reader = new FileReader();
            let file = e.target.files[0];
            reader.onloadend = () => {
                setFile(file);
                setImagePreviewUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        if (file?.name) onChange(file);
        // eslint-disable-next-line
    }, [file]);
    const handleClick = () => {
        fileInput.current.click();
    };
    const handleRemove = () => {
        setFile(null);
        setImagePreviewUrl(avatar ? defaultAvatar : defaultImage);
        fileInput.current.value = null;
    };
    return (
        <div className="fileinput text-center" style={{ maxHeight: "370px" }}>
            <input type="file" onChange={handleImageChange} ref={fileInput} />
            <div
                className={"thumbnail" + (avatar ? " img-circle" : "")}
                style={{ maxHeight: "370px" }}
            >
                <img src={imagePreviewUrl} alt="..." />
            </div>
            <div>
                {file === null ? (
                    <Button
                        className="btn-round"
                        color="default"
                        outline
                        onClick={handleClick}
                    >
                        {avatar ? "Загрузить" : "Выбрать"}
                    </Button>
                ) : (
                    <span>
                        <Button
                            className="btn-round"
                            outline
                            color="default"
                            onClick={handleClick}
                        >
                            Заменить
                        </Button>
                        {avatar ? <br /> : null}
                        <Button
                            color="danger"
                            className="btn-round btn-link"
                            onClick={handleRemove}
                        >
                            <i className="fa fa-times" />
                            Удалить
                        </Button>
                    </span>
                )}
            </div>
        </div>
    );
}

ImageUpload.propTypes = {
    avatar: PropTypes.bool
};

export default ImageUpload;
