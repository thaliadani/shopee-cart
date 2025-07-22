import { 
    addItemToCart, 
    deleteItemFromCart, 
    addQuantityItemToCart, 
    removeQuantityItemFromCart, 
    calculateTotalToCart, 
    displayCart 
} from "./services/cart.js";

import createItem from "./services/item.js";

import readline from 'readline';

const myCart = [];

console.log(
    `
    Welcome to the Shopping Cart!

    1- Add items to the cart
    2- Remove items from the cart
    3- Increase item quantity
    4- Decrease item quantity
    5- Display cart items
    0- Exit 
    `
);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function promptOption() {
    rl.question("\nChoose an option: ", async (option) => {
        await handleOption(option);
    });
}

async function handleOption(option) {
    switch (option) {
        case '1':
            rl.question("Enter item name, price, and quantity (format: name, price, quantity): ", async (input) => {
                const [name, price, quantity] = input.split(',').map(item => item.trim());
                const item = await createItem(name, parseFloat(price), parseInt(quantity) || 1);
                await addItemToCart(myCart, item);
                console.log(`Item "${name}" added to cart.`);
                await promptOption();
            });
            break;
        case '2':
            rl.question("Enter item name to remove: ", async (name) => {
                await deleteItemFromCart(myCart, name.trim());
                await promptOption();
            });
            break;
        case '3':
            rl.question("Enter item index to increase quantity: ", async (index) => {
                await addQuantityItemToCart(myCart, parseInt(index));
                await promptOption();
            });
            break;
        case '4':
            rl.question("Enter item index to decrease quantity: ", async (index) => {
                await removeQuantityItemFromCart(myCart, parseInt(index));
                await promptOption();
            });
            break;
        case '5':
            await displayCart(myCart);
            await calculateTotalToCart(myCart);
            await promptOption();
            break;
        case '0':
            console.log("Thank you for shopping with us!");
            rl.close();
            break;
        default:
            console.log("Invalid option. Please try again.");
            await promptOption();
    }
}

promptOption();