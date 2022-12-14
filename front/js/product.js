//------------------------------------------------------------------------
// Récupération du produit par l'id produit dans l'URL
//------------------------------------------------------------------------

const getIdByUrl = new URLSearchParams(document.location.search);
const id = getIdByUrl.get('_id'); // Récupère l'id produit dans l'URL

let fetchPromise = fetch(`http://localhost:3000/api/products/${id}`);

// Promise<Response>.then => Response

fetch(`http://localhost:3000/api/products/${id}`) // Promise<Response>
    .then((response) => response.json()) // Promise<Json>
    .then((product) => {
        document.getElementById("description").innerText = product.description;
        document.getElementById("title").innerText = product.name;
        document.getElementById("price").innerText = product.price;
        document.getElementById("quantity").innerText = product.quantity;
        document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

        for (let color of product.colors) {
            document.getElementById("colors").innerHTML += `<option value="${color}">${color}</option>`
        }
        
    });

//------------------------------------------------------------------------
// 
//------------------------------------------------------------------------




