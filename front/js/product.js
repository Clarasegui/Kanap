// Récupère l'URL de la page

function getCurrentURL() {
    return window.location.href
}

const url = new URL(getCurrentURL());
const id = url.searchParams.get("_id");

async function transformResponseToJson(response) {
    return response.json();
}

fetch(`http://localhost:3000/api/products/${id}`)
    .then(transformResponseToJson)
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
    // Récupère la quantité
    const quantityOfProduct = parseInt(document.getElementById("quantity").value);
    // Récupère la couleur
    const colorOfProduct = document.getElementById("colors").value;
    // Récupère l'image
    const productImage = document.getElementsByClassName("item__img")[0].getElementsByTagName("img")[0].src;
    // Récupère le nom
    const nameOfProduct = document.getElementById("title").innerText;
    // Récupère le prix
    const priceOfProduct = parseInt(document.getElementById("price").innerText);
    if (quantityOfProduct > 100) {
        window.alert("Veuillez choisir une quantité inférieure ou égale à 100");
        return;
    }
    if (colorOfProduct === "") {
        window.alert("Veuillez choisir une couleur");
        return;
    }
    if (quantityOfProduct === 0) {
        window.alert("Veuillez choisir une quantité");
        return;
    }
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
            window.alert("Ajouté au panier !");
        }
    }
}

// Ajoute la fonction onclick sur le bouton "Ajouter au panier"
document.getElementById("addToCart").onclick = addToCart;


