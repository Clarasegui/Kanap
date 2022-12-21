// Enregistre le panier dans le localStorage
function saveCart(currentCart) {
    localStorage.setItem("cart", JSON.stringify(currentCart));
}

// Insère les données des produits dans le DOM
function insertCurrentCartToPage() {
    // Récupère le panier dans le localStorage
    const getCurrentCartFromLocalStorage = window.localStorage.getItem("cart");

    // Convertit le panier en objet
    const currentCart = JSON.parse(getCurrentCartFromLocalStorage);

    // Calcule la quantité totale des produits
    const totalQuantity = currentCart.reduce((sum, product) => {
        return sum + parseInt(product.quantity);
    }, 0);

    // Calcule le prix total des produits
    const totalPrice = currentCart.reduce((sum, product) => {
        return sum + product.price * product.quantity;
    }, 0);

    document.getElementById("totalQuantity").innerText = totalQuantity;
    document.getElementById("totalPrice").innerText = totalPrice;
    
    if (currentCart === null) {
        console.log("Votre panier est vide")
    }
    else {
        document.getElementById("cart__items").innerHTML = null
        for (let product of currentCart) {
            document.getElementById("cart__items").innerHTML += `<article class="cart__item" data-id="${product.id}" data-color="${product.color}">
            <div class="cart__item__img">
              <img src="${product.image}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${product.title}</h2>
                <p>${product.color}</p>
                <p>${product.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`;
        }

        addEventListenerOnQuantities(currentCart);
        addEventListenerOnDelete(currentCart)

    }
}

insertCurrentCartToPage();

// Modification de la quantité par l'utilisateur et mise à jour dans le localStorage

function addEventListenerOnQuantities(currentCart) {
    for (let input of document.getElementsByName("itemQuantity")) {
        let productColorIncart = input.closest("article").dataset.color
        let productIdInCart = input.closest("article").dataset.id
        input.addEventListener('change', function () {
            productFoundInCart = currentCart.find(product => product.id === productIdInCart && product.color === productColorIncart);
            productFoundInCart.quantity = parseInt(input.value);
            saveCart(currentCart)
            insertCurrentCartToPage()
        })
    }
}


// Suppression du produit par l'utilisateur et mise à jour dans le localStorage

function addEventListenerOnDelete(currentCart) {
    for (let p of document.getElementsByClassName("deleteItem")) {
        let productIdToDelete = p.closest("article").dataset.id;
        let productColorToDelete = p.closest("article").dataset.color;
        p.addEventListener('click', () => removeProductFromCart(productIdToDelete, productColorToDelete, currentCart));
    }
    }

function removeProductFromCart(productIdToDelete, productColorToDelete, currentCart) {
    productsInCartToKeep = currentCart.filter(product => product.id !== productIdToDelete || product.color !== productColorToDelete);
    saveCart(productsInCartToKeep)
    insertCurrentCartToPage()
}

