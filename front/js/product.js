// Récupère l'URL de la page
function getCurrentURL() {
    return window.location.href
}

// Créé la variable url
const url = new URL(getCurrentURL());
// Créé la variable id
const id = url.searchParams.get("_id");

// Appel à l'API
fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then(product => loadProductDetails(product));


// Intègre les données produit dans le DOM
function loadProductDetails(product) {
    document.getElementById("price").innerText = product.price;
    document.getElementById("description").innerText = product.description;
    document.getElementById("title").innerText = product.name;
    document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
    for (let color of product.colors) {
        document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`;
    }
}

// Enregistre le panier dans le localStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Récupère le panier
function getCart() {
    return JSON.parse(localStorage.getItem("cart"));
}

// Ajoute au panier
function addToCart() {
    let currentCart = getCart();
    // Créé la variable de quantité
    const quantityOfProduct = parseInt(document.getElementById("quantity").value);
    // Créé la variable de couleur
    const colorOfProduct = document.getElementById("colors").value;
    // Créé la variable d'image
    const productImage = document.getElementsByClassName("item__img")[0].getElementsByTagName("img")[0].src;
    // Créé la variable de nom
    const nameOfProduct = document.getElementById("title").innerText;
    // Créé la variable de prix
    const priceOfProduct = parseInt(document.getElementById("price").innerText);
    // Si la quantité est supérieur à 100
    if (quantityOfProduct > 100) {
        window.alert("Veuillez choisir une quantité inférieure ou égale à 100");
        return;
    }
    // Si la couleur n'est pas sélectionnée
    if (colorOfProduct === "") {
        window.alert("Veuillez choisir une couleur");
        return;
    }
    // Si la quantité est égale à 0
    if (quantityOfProduct <= 0) {
        window.alert("Veuillez choisir une quantité supérieure à 0");
        return;
    }
    // Si le panier est vide
    if (currentCart == null) {
        const products = Array({
            "id": id, "color": colorOfProduct, "quantity": quantityOfProduct,
            "image": productImage, "title": nameOfProduct, "price": priceOfProduct
        });
        saveCart(products);
        window.alert("Ajouté au panier !");
    }
    else {
        let productFound = currentCart.find(product => product.id == id && product.color == colorOfProduct);
        if (productFound !== undefined) {
            productFound.quantity += quantityOfProduct
            saveCart(currentCart)
            window.alert("Ajouté au panier !");
        }
        else {
            currentCart.push({
                "id": id, "color": colorOfProduct, "quantity": quantityOfProduct,
                "image": productImage, "title": nameOfProduct, "price": priceOfProduct
            });
            saveCart(currentCart);
            window.alert("Produit ajouté au panier !");
        }
    }
}

// Ajoute la fonction onclick sur le bouton "Ajouter au panier"
document.getElementById("addToCart").onclick = addToCart;


