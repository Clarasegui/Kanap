// Enregistre le panier dans le localStorage
function saveCart(currentCart) {
    localStorage.setItem("cart", JSON.stringify(currentCart));
}

// Fonction pour insérer les données produits dans le DOM
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
    // Si le panier est vide
    if (currentCart === null) {
        console.log("Votre panier est vide")
    }
    // S'il y a un ou des produits dans le panier
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

        // Appelle la fonction
        addEventListenerOnQuantities(currentCart);
        // Appelle la fonction
        addEventListenerOnDelete(currentCart)

    }
}
// Appelle la fonction
insertCurrentCartToPage();

// Fonction de modification de la quantité par l'utilisateur et mise à jour dans le localStorage

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

// Fonction de suppression du produit par l'utilisateur et mise à jour dans le localStorage
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



const contactForm = document.getElementsByClassName("cart__order__form")[0];



contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const email = document.getElementById("email").value;
    const errorMessage = "Veuillez renseigner ce champs";
    let emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let nameRegex = /^[A-Za-z]+$/;
    let formIsValid = true;
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
    if (formIsValid) {
        let cart = JSON.parse(localStorage.getItem("cart"));
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
                console.log('Success:', data);
                orderId = data.orderId;
                window.location.href = "confirmation.html?orderId=" + orderId;
            })
            .catch((error) => {
                console.error('Error:', error);
            });

    }
})
