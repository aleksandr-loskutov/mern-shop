import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckOut from "../components/checkOut";
import Cart from "../components/cart";
import Page from "../components/page";
import { useCart } from "react-use-cart";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/actions/products";
import Preloader from "../components/preloader";

function CartLayout() {
    const { checkout } = useParams();
    const [cartProducts, setCartProducts] = useState([]);
    const { isEmpty, items, updateItemQuantity } = useCart();
    const { products } = useSelector((state) => state.products);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    useEffect(() => {
        if (products?.content?.length > 0) {
            setCartProducts(
                !isEmpty
                    ? items.reduce((acc, item) => {
                          const productFromDb = products.content.find(
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
