const apiUrl = "https://jsonblob.com/api/jsonBlob/1332789796837449728"
/**
 *  Función para obtener los productos del API
 */
const fetchProducts = () => {
    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        } // agregar headers https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    }).then(response => {
        if (!response.ok) { // comprobar si la respuesta es correcta
            throw new Error(`HTTP error! status: ${response.status}`); // si no es correcta, lanzar un error
        }
        return response.json(); // convertir la respuesta en JSON https://developer.mozilla.org/en-US/docs/Web/API/Response/json
    }).then(data => {
        // REFACTOR: inicializar el carro con el array de productos
        const Carro = new Carrito([], data.currency) // crear un nuevo objeto Carrito con el array de productos vacío y el currency de la API
        data.products.forEach(product => { // iterar sobre los productos htps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
            product.units = Math.floor(Math.random() * 10) // agregar una unidad random a cada producto https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
            Carro.addToCart(new Product(product)) // agregar el producto al carro
        })
        inicio(Carro) // llamar a la función de inicio
    }).catch(error => { // capturar cualquier error
        console.error("Error fetching the API:", error);  // mostrar un mensaje de error
    });
}

document.addEventListener("DOMContentLoaded", fetchProducts); // agregar un evento listener para cuando el DOM se cargue

const inicio = (Carrito) => { // función de inicio una vez se ha obtenido los productos
    cargaInicial(Carrito)    // llamar a la función de carga inicial
    document.querySelector(".products").addEventListener("click", event => {    // agregar un event listener para cuando se haga click en el carro
        if (event.target.matches("button")) { // comprobar si el evento es un button
            const button = event.target // obtener el button
            const product = button.closest(".product-row") // obtener el elemento del Dom que corresponde al producto mediante la función closest https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
            const sku = product.querySelector(".product-info span").textContent.split(":")[1].trim() // obtener el SKU del producto mediante un split y un trim https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split y https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim 
            if (button.textContent === "-") { // comprobar si el button es el botón de decrementar
                Carrito.decreaseUnits(sku) // llamar a la función de decrementar
                rePintar(sku, Carrito) // llamar a la función de rePintar
            }else { // si el button es el botón de incrementar
                Carrito.increaseUnits(sku) // llamar a la función de incrementar
                rePintar(sku, Carrito) // llamar a la función de rePintar
            }            
        }
    })
    // TODO: Agregar la cotejación del evento onchange del input para calcular el total
}

const cargaInicial = (Carrito) => { // función para pintar los productos en el carro inicial
    const productTemplate = document.getElementById("product-template") // obtener el template de producto https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
    const productTotalTemplate = document.getElementById("product-total-template") // obtener el template de producto total
    const products = Carrito.products // obtener los productos del carro
    products.forEach(product => { // iterar sobre los productos
        const clone = productTemplate.content.cloneNode(true) // clonar el template de producto https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
        clone.querySelector(".product-row").id = product.getSku() // agregar el id al producto
        clone.querySelector(".product-info strong").textContent = product.getTitle() // agregar el nombre al producto
        clone.querySelector(".product-info span").textContent = `Ref: ${product.getSku()}` // agregar el SKU al producto
        clone.querySelector(".product-quantity input").value = product.getUnits() // agregar el número de unidades al producto
        clone.querySelector(".product-price").textContent = `${product.getPrice()}${Carrito.currency}` // agregar el precio al producto
        clone.querySelector(".product-total").textContent = `${product.getTotal()}${Carrito.currency}` // agregar el total al producto
        document.querySelector(".products").appendChild(clone) // agregar el producto al carro
        const cloneTotal = productTotalTemplate.content.cloneNode(true) // clonar el template de producto total
        cloneTotal.querySelector("li").id = `${product.getSku()}-total` // agregar el id al producto total
        cloneTotal.querySelector("span").textContent = product.getTitle() // agregar el nombre al producto total
        cloneTotal.querySelector("strong").textContent = `${product.getTotal()}${Carrito.currency}` // agregar el total al producto total
        document.querySelector(".products-total").appendChild(cloneTotal) // agregar el producto total al carro total
    })
    /* TODO: Agregar el total de la orden */
}

const rePintar = (sku, Carro) => { // función para pintar los productos en el carro con los datos actuales del carro solo se pinta el producto que se ha seleccionado
    const productElement= document.getElementById(sku)  // obtener el elemento del Dom que corresponde al producto mediante el id
    const product = Carro.products.find(p => p.getSku() === sku) // obtener el producto del carro mediante el sku
    productElement.querySelector(".product-quantity input").value = product.getUnits() // agregar el número de unidades al producto
    productElement.querySelector(".product-total").textContent = `${product.getTotal()}${Carro.currency}` // agregar el total al producto
    reCalcularTotal(sku, Carro) // llamar a la función de reCalcularTotal
}

const reCalcularTotal = (sku, Carro) => { // función para calcular el total del carro con los datos actuales del carro solo se calcula el total que se ha seleccionado
    const productElement = document.getElementById(`${sku}-total`) // obtener el elemento del Dom que corresponde al producto total mediante el id
    const product = Carro.products.find(p => p.getSku() === sku) // obtener el producto del carro mediante el sku
    productElement.querySelector("strong").textContent = `${product.getTotal()}${Carro.currency}` // agregar el total al producto total
    // TODO: Agregar el total de la orden
}