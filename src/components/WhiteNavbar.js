import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

// JavaScript plugin that hides or shows a component based on your scroll
import Headroom from "headroom.js";
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
import { useSelector } from "react-redux";
import { getCategories } from "../store/categories";
import SearchForm from "./searchForm";
// core components

function WhiteNavbar() {
    const { items } = useCart();
    const categories = useSelector(getCategories());
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
            <Navbar className="fixed-top" expand="lg" id="navbar-main">
                <Container>
                    <div className="navbar-translate">
                        <NavbarBrand id="navbar-brand" to="/" tag={Link}>
                            HOLODOS.COM
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

                    <SearchForm inputClasses={"border-danger"} />

                    <Collapse navbar isOpen={collapseOpen}>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle
                                    className="mr-2"
                                    color="default"
                                    caret
                                    nav
                                >
                                    КАТАЛОГ
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-danger" right>
                                    {categories.length > 0 &&
                                        categories.map((cat) => (
                                            <DropdownItem
                                                key={cat._id}
                                                to={`/catalog/${cat.urlAlias}`}
                                                tag={Link}
                                            >
                                                {cat.name}
                                            </DropdownItem>
                                        ))}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle
                                    className="mr-2"
                                    color="default"
                                    caret
                                    nav
                                >
                                    Контакты
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-danger" right>
                                    <DropdownItem
                                        to="/sections#headers"
                                        tag={Link}
                                    >
                                        <i className="nc-icon nc-tile-56" />
                                        Как проехать
                                    </DropdownItem>
                                    <DropdownItem
                                        to="/sections#features"
                                        tag={Link}
                                    >
                                        <i className="nc-icon nc-settings" />
                                        Доставка
                                    </DropdownItem>
                                    <DropdownItem
                                        to="/sections#blogs"
                                        tag={Link}
                                    >
                                        <i className="nc-icon nc-bullet-list-67" />
                                        Оплата
                                    </DropdownItem>
                                    <DropdownItem
                                        to="/sections#teams"
                                        tag={Link}
                                    >
                                        <i className="nc-icon nc-single-02" />О
                                        нас
                                    </DropdownItem>
                                    <DropdownItem
                                        to="/sections#projects"
                                        tag={Link}
                                    >
                                        <i className="nc-icon nc-calendar-60" />
                                        Написать нам
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle color="default" caret nav>
                                    Войти
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-danger" right>
                                    <DropdownItem to="/login" tag={Link}>
                                        <i className="nc-icon nc-bullet-list-67" />
                                        Вход
                                    </DropdownItem>
                                    <DropdownItem to="/user" tag={Link}>
                                        <i className="nc-icon nc-badge" />
                                        Мои данные
                                    </DropdownItem>
                                    <DropdownItem to="/user/orders/" tag={Link}>
                                        <i className="nc-icon nc-bank" />
                                        Мои заказы
                                    </DropdownItem>

                                    <DropdownItem
                                        to="/admin/product/add"
                                        tag={Link}
                                    >
                                        <i className="nc-icon nc-basket" />
                                        Добавить продукт
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            <NavItem>
                                <Button
                                    className="btn-round"
                                    color="danger"
                                    to="/cart"
                                    tag={Link}
                                >
                                    <i className="nc-icon nc-cart-simple" />{" "}
                                    {items.length}
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default WhiteNavbar;
