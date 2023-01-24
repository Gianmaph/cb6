//Seleziono la classe prodotti
let prodotti = document.querySelector(".prodotti");

let click = document.querySelector("#invia");
let number = document.querySelector("#num");

let oggetti;
let form = document.querySelector("#form");
//il form non spunta finché non sono carichi gli oggetti nell'array "oggetti"
form.style.display = "none";

//richiesta oggetti
fetch("https://api.escuelajs.co/api/v1/products/")
  .then((res) => res.json())
  .then((data) => elaborazioneDati(data));
//salvo tutti gli oggetti in un array (perché il link del sito ormai funziona così)
const elaborazioneDati = (arrayElementi) => {
  oggetti = arrayElementi;
  //appare il form
  form.style.display = "block";
};

//evento click bottone
let evento = () => {
  let numero = number.value;
  if (numero == "") {
    alert("Non hai inserito un numero!");
  } else {
    //cancello tutti gli elementi precedentemente inseriti
    let numDivs = prodotti.childElementCount; //numero degli elementi div
    for (let i = 0; i < numDivs; i++) {
      prodotti.removeChild(document.querySelector(".prodCards")); //rimuovo tutti gli elementi presenti
    }
    //creo tutti gli elementi nuovi
    for (let i = 1; i <= numero; i++) {
      console.log(oggetti[i]);
      //creo un elemento
      let prodotto = document.createElement("div");
      //gli assegno la classe
      prodotto.classList.add("prodCards");
      //creo l'elemento paragrafo
      let titolo = document.createElement("p");
      //gli inserisco il contenuto
      titolo.textContent = oggetti[i].title;
      //inserisco l'elemento paragrafo dentro il div
      prodotto.appendChild(titolo);
      //stessa cosa con gli altri paragrafi
      let id = document.createElement("p");
      id.textContent = oggetti[i].id;
      prodotto.appendChild(id);
      let prezzo = document.createElement("p");
      prezzo.textContent = oggetti[i].price;
      prodotto.appendChild(prezzo);
      //adesso assegno il div completo agli elementi della sezione .prodotti
      prodotti.appendChild(prodotto);
    }
  }
};

click.addEventListener("click", evento);
