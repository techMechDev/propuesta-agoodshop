/**
 *  Clase para representar un producto
 * @param {Object} SKU, title, price, units
 */
class Product {
    #sku
    #title
    #price
    /**
     * Constructor de la clase
     * @param {Object} SKU, title, price, units
     */
    constructor({ SKU, title, price, units = 0 }) {
        this.#sku = SKU
        this.#title = title
        this.#price = Number(price)
        this.units = units // El valor de units es 0 por defecto, pero puede cambiar.
    }
    /**
     * método para obtener el SKU del producto
     * @returns {string} El SKU del producto
     */
    getSku() {
        return this.#sku;
    }
    /**
     * método para obtener el nombre del producto
     * @returns {string} El nombre del producto
     */
    getTitle() {
        return this.#title;
    }
    /**
     * método para obtener el precio del producto
     * @returns {number} El precio del producto
     */ 
    getPrice() {
        return this.#price;
    }
    /**
     * método para obtener el numero de unidades del producto
     * @returns {number} El numero de unidades del producto
     */
    getUnits() {
        return this.units;
    }
    /**
     * método para obtener el total del producto con 2 decimales
     * @returns {number} El total del producto
     */
    getTotal() {
        return (this.#price * this.units).toFixed(2)
    }
}