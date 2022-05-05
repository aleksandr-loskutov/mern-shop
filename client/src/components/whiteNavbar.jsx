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
import { getActiveCategories } from "../store/categories";
import UserDropdown from "./userDropdown";
// core components

function WhiteNavbar() {
    const { items } = useCart();
    const categories = useSelector(getActiveCategories());
    const [bodyClick, setBodyClick] = React.useState(false);
    const [collapseOpen, setCollapseOpen] = React.useState(false);
    React.useEffect(() => {
        let headroom = new Headroom(document.getElementById("navbar-main"));
        // initialise
        headroom.init();
    });
    const toggleNavBar = () => {
        document.documentElement.classList.toggle("nav-open");
        setBodyClick(false);
        setCollapseOpen(false);
    };

    return (
        <>
            {bodyClick ? <div id="bodyClick" onClick={toggleNavBar} /> : null}
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
                                    {categories?.length > 0 &&
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
                                        to="/contact"
                                        tag={Link}
                                        onClick={toggleNavBar}
                                    >
                                        <i className="nc-icon nc-globe" />
                                        Как проехать
                                    </DropdownItem>
                                    <DropdownItem
                                        to="/contact"
                                        tag={Link}
                                        onClick={toggleNavBar}
                                    >
                                        <i className="nc-icon nc-delivery-fast" />
                                        Доставка
                                    </DropdownItem>
                                    <DropdownItem
                                        to="/contact"
                                        tag={Link}
                                        onClick={toggleNavBar}
                                    >
                                        <i className="nc-icon nc-money-coins" />
                                        Оплата
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>

                            <UserDropdown onToggle={toggleNavBar} />

                            <NavItem>
                                <Button
                                    className="btn-round"
                                    color="danger"
                                    to="/cart"
                                    tag={Link}
                                    onClick={toggleNavBar}
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
