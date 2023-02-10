import { POST, GET, PUT, DELETE } from "./libs.js";

//importo le categorie prodotti
GET("products").then((data) => elaborazioneProdotti(data));

let elaborazioneProdotti = (array) => {
  insertCat(array);
};

let cardContainer = document.querySelector(".cardsContainer");
let count = 0;
let insertCat = (array) => {
  array.forEach((element) => {
    count++;
    let card = document.createElement("div");
    card.setAttribute("id", count);
    card.classList.add("card");
    let img = document.createElement("img");
    let title = document.createElement("p");
    title.classList.add("titleCard");
    title.textContent = element.title;
    let price = document.createElement("h3");
    price.textContent = "€" + element.price + ".00";
    img.setAttribute("src", element.images);
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(price);
    cardContainer.appendChild(card);
    console.log(element.title);
  });
};
