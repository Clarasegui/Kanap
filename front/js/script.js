// Appel, récupération et intégration des produits de l'API
async function loadProductsToHtml() {
  // Attend la réponse de l'API
  fetch("http://localhost:3000/api/products")
    // Transforme la réponse en Json
    .then((response) => response.json())
    // Intègre les informations produit dans le DOM
    .then((products) => {
      for (let product of products) {
        document.getElementById("items").innerHTML += `<a href="./product.html?_id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3 class="productName">${product.name}</h3>
              <p class="productDescription">${product.description}</p>
            </article>`
      }
    })
}

// Appelle la fonction
loadProductsToHtml();
