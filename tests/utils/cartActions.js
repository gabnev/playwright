
class CartActions {

    constructor(page) {
        this.page = page;
        this.addGenericToCartButton = '.btn_inventory';
        this.cartIcon = '.shopping_cart_link';
    }

    async addAllItemsToCart() {
        const addToCartButtons = await this.page.locator(this.addGenericToCartButton).all();
        for (const button of addToCartButtons) {
            await button.click();
        }
    }

    async addSpecificItemToCart(itemNames) {

        const items = Array.isArray(itemNames) ? itemNames : [itemNames];
        
        for (const itemName of items) {
            const itemContainer = this.page.locator(`.inventory_item:has-text("${itemName}")`).first();
            await itemContainer.waitFor();
            const addItemToCartButton = itemContainer.locator('.btn_inventory');
            await addItemToCartButton.waitFor();
            await addItemToCartButton.click();
        }
    }

}

module.exports = CartActions;