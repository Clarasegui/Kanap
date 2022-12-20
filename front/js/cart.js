const getCurrentCartFromLocalStorage = window.localStorage.getItem("cart");
const currentCart = JSON.parse(getCurrentCartFromLocalStorage);

function insertCurrentCartToPage() {
    if (currentCart === null) {
        console.log("Votre panier est vide")
    }
    else {
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
                  <p>Qté : ${product.quantity}</p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`
        }
        
        console.log("Voici votre panier")
    }
}


insertCurrentCartToPage();

