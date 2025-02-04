/**
 *  Clase para representar un carro
 * @param {Array} products
 * @param {string} currency
 */
class Carrito {
    /**
     * Constructor de la clase
     * @param {Array} products
     * @param {string} currency 
     */
    constructor(products = [], currency = "€") {
      this.products = products
      this.currency = currency
    }
    /**
     *  Método para agregar un producto al carro
     * @param {*} product 
     */
    addToCart(product) {
        if (this.products.find(p => p.getSku() === product.getSku())) {
          this.increaseUnits(product.getSku())
        }else {
          this.products.push(product)
        }
    }
    /**
     *  Método para incrementar el número de unidades del producto
     * @param {string} sku 
     */
    increaseUnits(sku) {
      const product = this.products.find(product => product.getSku() === sku)
      // Incrementar en 1:
      if (product) {
        product.units++
      }
   }
   /**
    *  Método para decrementar el número de unidades del producto
    * @param {string} sku 
    */
    decreaseUnits(sku) {
      const product = this.products.find(product => product.getSku() === sku)
      // Disminuir en 1, sin llegar a numeros negativos:
      if (product && product.units > 0) {
      product.units--
      }
    }
    /**
     *  Método para obtener el total del producto
     * @param {*} product 
     */
    getProductTotal(product) {
      return product.getPrice() * product.getUnits()
    }
    /**
     *  Método para obtener el total del carro
     */ 
    getTotal() {
      // El total es la suma de todos los valores en un solo valor:
      return this.products.reduce((acc, product) => {
        return acc + this.getProductTotal(product)
      }, 0)
    }
  }