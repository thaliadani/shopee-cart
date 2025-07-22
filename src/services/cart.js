async function addItemToCart(userCart, item) {
    console.log("Adding item to cart...\n");
    userCart.push(item);
}

async function deleteItemFromCart(userCart, name) {
    console.log("Deleting item from cart...\n");

    const index = userCart.findIndex((item) => item.name === name);
    if (index !== -1) {
        userCart.splice(index, 1);
    } else {
        console.log(`Item ${name} not found in cart.`);
    }
}

async function addQuantityItemToCart(userCart, index) {
    console.log("Adding quantity to item in cart...\n");

    if (index >= 0 && index < userCart.length) {
        const item = userCart[index];
        item.quantity += 1;
    } else {
        console.log("Invalid index provided.");
    }

}

async function removeQuantityItemFromCart(userCart, index) {
    console.log("Removing quantity from item in cart...\n");

    if (index >= 0 && index < userCart.length) {
        const item = userCart[index];
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else if (item.quantity === 1) {
            console.log(`Removing item ${item.name} from cart because quantity is zero.`);
            userCart.splice(index, 1); 
        }else{
            console.log(`Item ${item.name} has no quantity to remove.`);
        }
    } else {
        console.log("Invalid index provided.");
    }   
}

async function calculateTotalToCart(userCart) {
    const result = userCart.reduce((total, item) => total + item.subtotal(), 0);
    console.log(`\n🛒 Cart Total: $${result}`);
}

async function displayCart(userCart) {
    userCart.forEach((item) => {
        console.log(`Index: ${userCart.indexOf(item)}, Item: ${item.name}, Price: $${item.price}, Quantity: ${item.quantity}, Subtotal: $${item.subtotal()}\n`);
    });
}

export {
    addItemToCart,
    deleteItemFromCart,
    addQuantityItemToCart,
    removeQuantityItemFromCart,
    calculateTotalToCart,
    displayCart
};