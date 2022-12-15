//------------------------------------------------------------------------
// Récupération et intégration du produit par l'id produit dans l'URL 
//------------------------------------------------------------------------

const getIdByUrl = new URLSearchParams(document.location.search);
const id = getIdByUrl.get('_id'); // Récupère l'id produit dans l'URL

fetch(`http://localhost:3000/api/products/${id}`) // Récupération du produit par l'id
    .then((response) => response.json())
    .then((product) => { // Intégre les données dans le DOM
        document.getElementById("title").innerText = product.name;
        document.getElementById("description").innerText = product.description;
        document.getElementById("price").innerText = product.price;
        document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}"></img>`;
        for (let color of product.colors) { // Intégre les couleurs dans l'élément select
            document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`;
        }
    });

//------------------------------------------------------------------------
// Récupération des données quantité et couleur
//------------------------------------------------------------------------

document.getElementById("addToCart").onclick = function () { // Ajoute la fonction onclick à l'élément button
    let quantityOfProduct = parseInt(document.getElementById("quantity").value); // Récupère la valeur quantité
    let colorOfProduct = document.getElementById("colors").value; // Récupère la valeur couleur

    let currentCart = localStorage.getItem("cart"); // Crée le panier

    if (currentCart === null) { // Si le panier est vide
        let products = Array({ // Créer un tableau contenant les valeurs id, couleur et quantité
            "id": id, "color": colorOfProduct, "quantity": quantityOfProduct
        })
        let productsJson = JSON.stringify(products); // Convertir la valeur en chaîne Json
        localStorage.setItem("cart", productsJson); // Stocker dans le localStorage
    } else {
        let currentProducts = JSON.parse(currentCart); // Sinon récupérer le panier en parsant le Json pour récupérer l'objet Javascript
        
        matchedProductInCart = currentProducts.find(p => p.id === id && p.color === colorOfProduct);
        if (matchedProductInCart != undefined) { // Si le panier contient un objet qui a le même id et la même couleur
            matchedProductInCart.quantity += quantityOfProduct;
            localStorage.setItem("cart",JSON.stringify(currentProducts));
        } else {
            let product = {
                "id": id,
                "color": colorOfProduct,
                "quantity": quantityOfProduct
            }
            currentProducts.push(product);
            let productsJson = JSON.stringify(currentProducts);
            localStorage.setItem("cart", productsJson);
        }

    }
}

