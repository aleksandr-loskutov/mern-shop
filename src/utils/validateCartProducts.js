export function validateCartProducts(cartItems, products) {
    return cartItems.length > 0 && products.length > 0
        ? cartItems.reduce((acc, item) => {
              const productFromDb = products.find((p) => p._id === item.id);
              if (productFromDb)
                  acc.push({
                      ...productFromDb,
                      cartQuantity: item.quantity
                  });
              return acc;
          }, [])
        : [];
}
