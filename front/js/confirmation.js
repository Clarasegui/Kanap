// Crée la fonction 
function setOrderIdToConfirmationPage() {
    // Crée la variable url
    const url = new URL(window.location.href);
    // Crée la variable orderId
    const orderId = url.searchParams.get("orderId");
    // Intégre l'orderId dans le DOM
    document.getElementById("orderId").innerText = orderId;
}

// Appelle la fonction
setOrderIdToConfirmationPage();