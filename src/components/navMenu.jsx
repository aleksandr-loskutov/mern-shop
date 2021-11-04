import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../store/actions/categories";

const NavMenu = () => {
    const state = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);
    return (
        <div className="submenu">
            <ul className={"submenu-main-list"}>
                {state.categories.length > 0 &&
                    state.categories.map((cat) => (
                        <li key={cat._id}>
                            <Link to={`/catalog/${cat.urlAlias}`}>
                                {cat.name}
                            </Link>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default NavMenu;
