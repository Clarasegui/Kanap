//------------------------------------------------------------------------
// Appel, récupération et intégration des produits de l'API
//------------------------------------------------------------------------

async function loadProductsToHtml() {
    const response = await fetch("http://localhost:3000/api/products"); // Attend la réponse de l'API
    const products = await response.json(); // Traduit la réponse en json
    for (let product of products) {
        document.getElementById("items").innerHTML += `<a href="./product.html?_id=${product._id}">
        <article>
          <img src="${product.imageUrl}" alt="${product.altTxt}">
          <h3 class="productName">${product.name}</h3>
          <p class="productDescription">${product.description}</p>
        </article>`
    }
}

loadProductsToHtml();
