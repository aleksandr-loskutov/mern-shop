import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckOut from "../components/checkOut";
import Cart from "../components/cart";
import Page from "../components/page";
import { useCart } from "react-use-cart";
import { useSelector } from "react-redux";
import Preloader from "../components/preloader";
import { getProducts } from "../store/products";
//todo getProductsLoadingStatus
function CartLayout() {
    const { checkout } = useParams();
    const [cartProducts, setCartProducts] = useState([]);
    const { isEmpty, items, updateItemQuantity } = useCart();
    const products = useSelector(getProducts());
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (products.length > 0) {
            setCartProducts(
                !isEmpty
                    ? items.reduce((acc, item) => {
                          const productFromDb = products.find(
                              (p) => p._id === item.id
                          );
                          if (productFromDb)
                              acc.push({
                                  ...productFromDb,
                                  cartQuantity: item.quantity
                              });
                          return acc;
                      }, [])
                    : []
            );
            if (!isLoaded) {
                setIsLoaded(true);
            }
        }
        // eslint-disable-next-line
    }, [products, items]);
    return (
        <Page title={checkout ? "Оформление заказа" : "Корзина"}>
            {isLoaded ? (
                checkout ? (
                    <CheckOut cartProducts={cartProducts} />
                ) : (
                    <Cart
                        cartProducts={cartProducts}
                        updateItemQuantity={updateItemQuantity}
                    />
                )
            ) : (
                <Preloader blockClass="mt-5" />
            )}
        </Page>
    );
}

export default CartLayout;
