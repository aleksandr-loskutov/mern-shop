import React from "react";
import { Link } from "react-router-dom";
// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "../../node_modules/headroom.js/dist/headroom";
// reactstrap components
import {
    Button,
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    Nav,
    Container
} from "reactstrap";
// core components

function AdminNavbar() {
    const [bodyClick, setBodyClick] = React.useState(false);
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    React.useEffect(() => {
        let headroom = new Headroom(document.getElementById("navbar-main"));
        // initialise
        headroom.init();
    });
    return (
        <>
            {bodyClick ? (
                <div
                    id="bodyClick"
                    onClick={() => {
                        document.documentElement.classList.toggle("nav-open");
                        setBodyClick(false);
                        setCollapseOpen(false);
                    }}
                />
            ) : null}
            <Navbar
                className="fixed-top"
                expand="lg"
                id="navbar-main"
                color="danger"
            >
                <Container>
                    <div className="navbar-translate">
                        <NavbarBrand id="navbar-brand" to="/admin" tag={Link}>
                            HOLODOS | ADMIN
                        </NavbarBrand>

                        <button
                            className="navbar-toggler"
                            id="navigation"
                            type="button"
                            onClick={() => {
                                document.documentElement.classList.toggle(
                                    "nav-open"
                                );
                                setBodyClick(true);
                                setCollapseOpen(true);
                            }}
                        >
                            <span className="navbar-toggler-bar bar1" />
                            <span className="navbar-toggler-bar bar2" />
                            <span className="navbar-toggler-bar bar3" />
                        </button>
                    </div>
                    <Collapse navbar isOpen={collapseOpen}>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle
                                    className="mr-2"
                                    color="default"
                                    nav
                                    to="/admin/orders/"
                                    tag={Link}
                                >
                                    ЗАКАЗЫ
                                </DropdownToggle>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle
                                    className="mr-2"
                                    color="default"
                                    caret
                                    nav
                                >
                                    ТОВАРЫ
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-danger" right>
                                    <DropdownItem
                                        to="/admin/products/"
                                        tag={Link}
                                    >
                                        <i className="nc-icon nc-tile-56" />
                                        Все товары
                                    </DropdownItem>
                                    <DropdownItem
                                        to="/admin/product/add"
                                        tag={Link}
                                    >
                                        <i className="nc-icon nc-simple-add" />
                                        Добавить товар
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle color="default" caret nav>
                                    КАТЕГОРИИ
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-danger" right>
                                    <DropdownItem
                                        to="/admin/categories/"
                                        tag={Link}
                                    >
                                        <i className="nc-icon nc-tile-56" />
                                        Все категории
                                    </DropdownItem>
                                    <DropdownItem
                                        to="/admin/category/add"
                                        tag={Link}
                                    >
                                        <i className="nc-icon nc-simple-add" />
                                        Добавить категорию
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle
                                    className="mr-2"
                                    color="default"
                                    nav
                                    to="/admin/users/"
                                    tag={Link}
                                >
                                    ПОЛЬЗОВАТЕЛИ
                                </DropdownToggle>
                            </UncontrolledDropdown>
                            <NavItem>
                                <Button
                                    className="btn-round"
                                    color="danger"
                                    tag={Link}
                                    to={"/"}
                                >
                                    <i className="nc-icon nc-shop" /> МАГАЗИН
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default AdminNavbar;
