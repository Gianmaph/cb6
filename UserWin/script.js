import { GET, qS, cE } from "./libs.js";

const archivioButton = qS(".iconButton");
const archivio = qS(".archivio");
let colorVariabile;

//creo evento bottone per chiudere popup
const popupBack = qS(".popupBack");
const closePopup = qS(".close");
closePopup.addEventListener("click", () => {
  popupBack.classList.remove("showPopup");
});
//genera un numero da 3 a 10
function getNumberValue() {
  //ricorsione
  let num = Math.floor(Math.random() * 10);
  if (num < 3) {
    return getNumberValue();
  }
  //
  return num;
}
//ritorna il valore in pixel della linea per le key cards
function getPixelValue(number) {
  if (number < 5) {
    colorVariabile = "red";
  }
  if (number >= 5 && number < 8) {
    colorVariabile = "yellow";
  }
  if (number >= 8) {
    colorVariabile = "green";
  }
  return String((number * 160) / 10) + "px";
}
//funzione che genera i numeri per le immagini degli utenti
function getRandomNumberImg() {
  return Math.floor(Math.random() * 100);
}
//Evento click bottone Archivio
archivioButton.addEventListener("click", () => {
  //Nascondo bottone
  archivio.classList.add("hideArchivio");
  //Prendo gli oggetti
  GET().then((data) => elaborazioneUtenti(data));

  const elaborazioneUtenti = (array) => {
    insertCards(array);
  };

  const insertCards = (array) => {
    array.forEach((element) => {
      //Inserisco le tre chiavi in più che servono
      element = {
        ...element,
        attitudine: getNumberValue(),
        forza: getNumberValue(),
        coraggio: getNumberValue(),
      };
      //Inserisco le cards
      const card = cE("div");
      const lines = cE("div");
      const line1 = cE("div");
      const line2 = cE("div");
      const line3 = cE("div");
      card.classList.add("card");
      lines.classList.add("lines");
      line1.classList.add("line");
      line2.classList.add("line");
      line3.classList.add("line");
      const cardsContainer = qS(".cardsContainer");
      const img = cE("img");
      //Immagine
      let numImg = getRandomNumberImg();
      img.setAttribute(
        "src",
        "https://randomuser.me/api/portraits/men/" + numImg + ".jpg"
      );
      console.log(element.address.geo);
      const nome = cE("p");
      nome.textContent = element.name;
      const email = cE("p");
      email.textContent = element.email;
      card.append(img, nome, email);
      const attitudine = cE("p");
      line1.style.width = getPixelValue(element.attitudine);
      line1.style.backgroundColor = colorVariabile;
      attitudine.textContent = "Attitudine: " + element.attitudine;
      const forza = cE("p");
      line2.style.width = getPixelValue(element.forza);
      line2.style.backgroundColor = colorVariabile;
      forza.textContent = "Forza: " + element.forza;
      const coraggio = cE("p");
      line3.style.width = getPixelValue(element.coraggio);
      line3.style.backgroundColor = colorVariabile;
      coraggio.textContent = "Coraggio: " + element.coraggio;
      lines.append(attitudine, line1, forza, line2, coraggio, line3);
      const infoButton = cE("button");
      infoButton.textContent = "Mostra Informazioni";
      card.append(lines, infoButton);
      const vincitore = cE("p");
      if (element.attitudine + element.forza + element.coraggio >= 20) {
        card.style.border = "2px solid #ffc400bb";
        vincitore.textContent = "VINCITORE!";
        vincitore.classList.add("vincitore");
      } else {
        vincitore.textContent = "PERDENTE!";
        vincitore.classList.add("perdente");
      }
      cardsContainer.appendChild(card);
      //Tasto Mostra informazioni
      infoButton.addEventListener("click", () => {
        popupBack.classList.add("showPopup");
        const popup = qS(".popup");
        popup.innerHTML = "";
        const nome2 = cE("p");
        const email2 = cE("p");
        const img2 = cE("img");
        nome2.textContent = "Nome: " + element.name;
        email2.textContent = "Email: " + element.email;
        img2.classList.add("image");
        img2.setAttribute(
          "src",
          "https://randomuser.me/api/portraits/men/" + numImg + ".jpg"
        );
        const username = cE("p");
        username.textContent = "Username: " + element.username;
        const telephone = cE("p");
        telephone.textContent = "Telefono: " + element.phone;
        const website = cE("p");
        website.textContent = "Sito Web: " + element.website;
        const company = cE("p");
        company.textContent = "Nome Azienda: " + element.company.name;
        const geoButton = cE("button");
        geoButton.textContent = "GEOLOCALIZZA!";

        geoButton.addEventListener("click", () => {
          window.open(
            "https://www.google.it/maps/@" +
              element.address.geo.lng +
              "," +
              element.address.geo.lat +
              ",5z",
            "_blank"
          );
        });
        popup.append(
          closePopup,
          img2,
          nome2,
          email2,
          username,
          telephone,
          website,
          company,
          geoButton,
          vincitore
        );
      });
    });
  };
});
