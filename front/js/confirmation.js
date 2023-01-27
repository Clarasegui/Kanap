// Crée la fonction qui intègre l'id de la commande dans le DOM
function setOrderIdToConfirmationPage() {
    const url = new URL(window.location.href);
    const orderId = url.searchParams.get("orderId");
    document.getElementById("orderId").innerText = orderId;
}

// Créé la fonction qui vide le panier
function clearCart() {
    let emptyCart = [];
    localStorage.setItem("cart", JSON.stringify(emptyCart));
}

// Appelle la fonction
setOrderIdToConfirmationPage();

// Appelle la fonction
clearCart();
