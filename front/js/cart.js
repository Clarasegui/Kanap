// Crée la fonction qui enregistre le panier dans le localStorage
function saveCart(currentCart) {
    localStorage.setItem("cart", JSON.stringify(currentCart));
}

// Défini la variable du panier
let currentCart = JSON.parse(localStorage.getItem("cart"));

// Crée la fonction pour insérer les données produits dans le DOM
function insertCurrentCartToPage() {
    // Crée la variable de récupération du panier dans le localStorage
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
    // Insère la quanité totale dans le DOM
    document.getElementById("totalQuantity").innerText = totalQuantity;
    // Insère le prix total dans le DOM
    document.getElementById("totalPrice").innerText = totalPrice;
    // Si le panier est vide
    if (getCurrentCartFromLocalStorage === null || currentCart.length === 0) {
        document.getElementById("cart__items").innerHTML = `<p>Votre panier est vide.</p>`;
        return;
    }
    // S'il y a un ou des produits dans le panier
    else {
        // Permet de ne pas afficher plusieurs fois le produit
        document.getElementById("cart__items").innerHTML = null
        // Pour chaque produit du panier
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
        // Appelle la fonction
        addEventListenerOnQuantities(currentCart);
        // Appelle la fonction
        addEventListenerOnDelete(currentCart)
    }
}

// Appelle la fonction
insertCurrentCartToPage();

// Fonction d'ajout de l'event listener sur l'input "itemQuantity"
function addEventListenerOnQuantities(currentCart) {
    // Pour chaque input ayant la classe classe "itemQuantity"
    for (let input of document.getElementsByName("itemQuantity")) {
        // Créé la variable productColorInCart
        let productColorIncart = input.closest("article").dataset.color
        // Créé la variable productIdInCart
        let productIdInCart = input.closest("article").dataset.id
        // Ajoute l'eventlistener sur l'input
        input.addEventListener('change', function () {
            // Si la valeur de l'input est supérieure à 100 afficher un message d'erreur
            if (input.value > 100) {
                window.alert("Veuillez choisir une quantité inférieure ou égale à 100");
                return;
            }
            // Si la valeur de l'input est inférieure ou égale à 0 afficher un message d'erreur
            if (input.value <= 0) {
                window.alert("Veuillez choisir une quantité supérieure à 0");
                return;
            }
            // Enregistre le panier et insère dans le DOM
            else {
                productFoundInCart = currentCart.find(product => product.id === productIdInCart && product.color === productColorIncart);
                productFoundInCart.quantity = parseInt(input.value);
                saveCart(currentCart)
                insertCurrentCartToPage()
            }
        })
    }
}

// Fonction d'ajout du event listener sur "Supprimer"
function addEventListenerOnDelete(currentCart) {
    // Pour chaque élément p ayant la classe "deleteItem"
    for (let p of document.getElementsByClassName("deleteItem")) {
        // Créé la variable productIdToBeDelete
        let productIdToDelete = p.closest("article").dataset.id;
        // Créé la variable productColorToBeDelete
        let productColorToDelete = p.closest("article").dataset.color;
        // Ajoute l'event listener 
        p.addEventListener('click', () => removeProductFromCart(productIdToDelete, productColorToDelete, currentCart));
    }
}

// Fonction de suppression du produit par l'utilisateur et mise à jour dans le localStorage
function removeProductFromCart(productIdToDelete, productColorToDelete, currentCart) {
    // Garde dans le DOM les produits différents de celui que l'on supprime
    productsInCartToKeep = currentCart.filter(product => product.id !== productIdToDelete || product.color !== productColorToDelete);
    // Enregistre le panier
    saveCart(productsInCartToKeep);
    // Insère le panier dans le DOM
    insertCurrentCartToPage();
}

// Créé la variable contactForm
const contactForm = document.getElementsByClassName("cart__order__form")[0];

// Ajoute l'event listener sur le bouton "Submit"
contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let cart = JSON.parse(localStorage.getItem("cart"));
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    const errorMessage = "Veuillez renseigner ce champs";
    const getCurrentCartFromLocalStorage = window.localStorage.getItem("cart");
    const currentCart = JSON.parse(getCurrentCartFromLocalStorage);
    let emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let nameRegex = /^[A-Za-z]{3,}$/;
    let formIsValid = true;
    for (let input of document.getElementsByName("itemQuantity")) {

        if (input.value > 100) {
            window.alert("Veuillez choisir une quantité inférieure ou égale à 100");
            return;
        }
        if (input.value <= 0) {
            window.alert("Veuillez choisir une quantité supérieure à 0");
            return;
        }
    }
    if (currentCart === null || currentCart.length === 0) {
        window.alert("Votre panier est vide");
        return;
    }
    if (firstName === "") {
        document.getElementById("firstNameErrorMsg").innerText = errorMessage;
        formIsValid = false;
    } else if (!firstName.match(nameRegex)) {
        document.getElementById("firstNameErrorMsg").innerText = "Veuillez saisir un prénom valide";
        formIsValid = false;
    }
    else {
        document.getElementById("firstNameErrorMsg").innerText = null;
    }
    if (lastName == "") {
        document.getElementById("lastNameErrorMsg").innerText = errorMessage;
        formIsValid = false;
    }
    else if (!lastName.match(nameRegex)) {
        document.getElementById("lastNameErrorMsg").innerText = "Veuillez saisir un nom valide";
        formIsValid = false;
    }
    else {
        document.getElementById("lastNameErrorMsg").innerText = null;
    }
    if (address == "") {
        document.getElementById("addressErrorMsg").innerText = errorMessage;
        formIsValid = false;
    } else {
        document.getElementById("addressErrorMsg").innerText = null;
    }
    if (city == "") {
        document.getElementById("cityErrorMsg").innerText = errorMessage;
        formIsValid = false;
    } else {
        document.getElementById("cityErrorMsg").innerText = null;
    }
    if (email == "" || !email.match(emailRegex)) {
        document.getElementById("emailErrorMsg").innerText = "Veuillez saisir une adresse e-mail valide";
        formIsValid = false;
    } else {
        document.getElementById("emailErrorMsg").innerText = null;
    }
    // Si le formulaire est valide
    if (formIsValid) {
        const dataToPost = {
            "contact": {
                "firstName": firstName,
                "lastName": lastName,
                "address": address,
                "city": city,
                "email": email,
            },
            "products": [cart.map(product => product.id)]
        }

        fetch(`http://localhost:3000/api/products/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToPost),
        })
            .then((response) => response.json())
            .then((data) => {
                orderId = data.orderId;
                window.location.href = "confirmation.html?orderId=" + orderId;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
})
