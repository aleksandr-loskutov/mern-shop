import React from "react";
import {
    Button,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    NavItem,
    UncontrolledDropdown
} from "reactstrap";
import { Link } from "react-router-dom";
import {
    getCurrentUserData,
    getCurrentUserRole,
    getUsersLoadingStatus
} from "../store/users";
import { useSelector } from "react-redux";

function UserDropdown(props) {
    const currentUser = useSelector(getCurrentUserData());
    const role = useSelector(getCurrentUserRole());
    const isLoading = useSelector(getUsersLoadingStatus());
    if (isLoading) return "Loading...";
    return (
        <>
            <UncontrolledDropdown nav inNavbar>
                <DropdownToggle color="default" caret nav>
                    {currentUser
                        ? currentUser.email.split("@")[0].substring(0, 15)
                        : "Личный кабинет"}
                </DropdownToggle>
                <DropdownMenu className="dropdown-danger" right>
                    {!currentUser ? (
                        <>
                            <DropdownItem to="/login" tag={Link}>
                                <i className="nc-icon nc-bullet-list-67" />
                                Вход
                            </DropdownItem>
                            <DropdownItem to="/login/register" tag={Link}>
                                <i className="nc-icon nc-bullet-list-67" />
                                Регистрация
                            </DropdownItem>
                        </>
                    ) : (
                        <>
                            <DropdownItem to="/user/orders/" tag={Link}>
                                <i className="nc-icon nc-app" />
                                Мои заказы
                            </DropdownItem>
                            <DropdownItem to="/user" tag={Link}>
                                <i className="nc-icon nc-badge" />
                                Мои данные
                            </DropdownItem>
                            <DropdownItem to="/logout" tag={Link}>
                                <i className="nc-icon nc-button-power" />
                                Выйти
                            </DropdownItem>
                        </>
                    )}
                </DropdownMenu>
            </UncontrolledDropdown>
            {role === "admin" && (
                <NavItem>
                    <Button
                        className="btn-round"
                        color="danger"
                        tag={Link}
                        to={"/admin"}
                    >
                        <i className="nc-icon nc-key-25" /> Админ
                    </Button>
                </NavItem>
            )}
        </>
    );
}

export default UserDropdown;
