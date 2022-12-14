async function loadProductsToHtml() {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();
    let productsListHtmlSection = document.querySelector("#items");
    for (let product in products) {
        const productCard =`<a href="./product.html?_id=${product._id}">
        <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
        </a>`
        console.log (productCard)
    }

}