import { POST, GET, PUT, DELETE } from "./libs.js";

//importo le categorie prodotti
GET("categories").then((data) => elaborazioneCat(data));

let elaborazioneCat = (array) => {
  insertCat(array);
};

let elemento;
let selectElement = new Array();
let count = 0;
let idCard = 0;
//inserisco le categorie nella navbar
let navCategorie = document.querySelector(".navCat");
let insertCat = (array) => {
  array.forEach((element) => {
    elemento = document.createElement("p");
    elemento.classList.add("elCat");
    elemento.textContent = element.name;
    elemento.setAttribute("id", count);
    navCategorie.appendChild(elemento);
    //creo gli eventi click per ogni categoria
    selectElement.push(document.getElementById(count));
    selectElement[count].addEventListener("click", categoryClick(count));
    count++;
  });
};

let containerCards = document.querySelector(".cardsContainer");
function categoryClick(i) {
  return function () {
    containerCards.innerHTML = "";
    count = 0;
    idCard = 0;
    //importo le categorie prodotti
    GET("products").then((data) =>
      elaborazioneProd(data, selectElement[i].textContent)
    );
  };
}
//seleziono i prodotti della categoria corrispondente

let elaborazioneProd = (array, cat) => {
  array.forEach((element) => {
    if ((element.category.name = cat)) {
      createCards(element);
      idCard++;
      console.log(element);
    }
  });
};

//creo tutte le cards
let selectCard = new Array();
let createCards = (oggetto) => {
  let card = document.createElement("div");
  card.classList.add("card");
  card.setAttribute("id", idCard);

  let titolo = document.createElement("p");
  titolo.textContent = oggetto.title;
  card.appendChild(titolo);

  let prezzo = document.createElement("p");
  prezzo.textContent = oggetto.price + "€";
  card.appendChild(prezzo);

  let immagine = document.createElement("img");
  immagine.setAttribute("src", oggetto.images);
  immagine.classList.add("immagine");
  card.appendChild(immagine);

  let bottone = document.createElement("button");
  bottone.classList.add("bottone");
  bottone.textContent = "ACQUISTA";
  bottone.setAttribute("id", "B" + idCard);
  card.appendChild(bottone);
  containerCards.appendChild(card);
  selectCard.push(document.getElementById("B" + idCard));
  selectCard[idCard].addEventListener(
    "click",
    buttonClick(idCard, oggetto.title, oggetto.price, oggetto.images)
  );
  //console.log(oggetto);
};
//creo numeretto carrello
let countAdd = 0;
let num = document.createElement("p");
num.classList.add("carrello");
num.setAttribute("id", "NUM");
let body = document.querySelector("body");
body.appendChild(num);

//sezione carrello
let sezCarrello = document.querySelector(".carrelloProd");
let carTitolo = document.createElement("p");
carTitolo.textContent = "CARRELLO:";
sezCarrello.appendChild(carTitolo);

//evento click
let buttonCarrello = document.querySelector("#carButton");
buttonCarrello.addEventListener("click", carClick);

let stato = 0;
function carClick() {
  if (stato == 0) {
    sezCarrello.style.display = "flex";
    stato = 1;
  } else if (stato == 1) {
    sezCarrello.style.display = "none";
    stato = 0;
  }
  console.log(stato);
}
//array quantità per singolo prodotto
let prodQ = new Array();
function buttonClick(i, titolo, prezzo, img) {
  return function () {
    countAdd++;
    num.textContent = countAdd;

    let prod = document.createElement("div");
    prod.setAttribute("id", "P" + i);
    let titProd = document.createElement("p");
    titProd.textContent = titolo;
    let prez = document.createElement("p");
    prez.textContent = "€" + prezzo;
    let imgP = document.createElement("img");
    imgP.setAttribute("src", img);
    //se non esiste un prodotto
    let eProd = document.querySelector("#P" + i);
    if (eProd == null) {
      prodQ[i] = 1;
      let prodQt = document.createElement("p");
      prodQt.setAttribute("id", "QP" + i);
      prodQt.textContent = prodQ[i];
      prod.appendChild(imgP);
      prod.appendChild(titProd);
      prod.appendChild(prez);
      prod.appendChild(prodQt);
      prod.classList.add("prod");
      sezCarrello.appendChild(prod);
    } else {
      //se esiste un prodotto
      prodQ[i] = prodQ[i] + 1;
      let prodQt = document.createElement("p");
      prodQt.setAttribute("id", "QP" + i);
      prodQt.textContent = prodQ[i];
      let eprodQ = document.querySelector("#QP" + i);
      console.log(prodQ[i]);
      //aggiorno la quantità per singolo prodotto
      eProd.removeChild(eprodQ);
      eProd.appendChild(prodQt);
    }
  };
}
