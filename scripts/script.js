function affichageScore(score, mots) {
  let afficheScore = document.querySelector(".zoneScore span");
  let affichage = `${score}/${mots}`;
  afficheScore.innerHTML = affichage;
}

function affichageMots(a) {
  let inputEcriture = document.querySelector(".zoneProposition");
  inputEcriture.innerText = a;
}
function afficherEmail(nom, email, score) {
  let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`;
  location.href = mailto;
}
function validerNom(balise) {
  if (balise.length < 2) {
    throw new Error(`Le nom est trop court`);
  }
}
function validerEmail(champ) {
  let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!emailRegExp.test(champ)) {
    throw new Error(`L'email n'est pas valide !`);
  }
}

function afficherMessageErreur(message) {
  let span = document.getElementById("erreurMessage");
  if (!span) {
    let popup = document.querySelector(".popup");
    span = document.createElement("span");
    span.id = "erreurMessage";

    popup.append(span);
  }
  span.innerText = message;
}
function gererFormulaire(scoreTotal) {
  try {
    let nom = document.querySelector("#nom").value;
    validerNom(nom);
    let mail = document.getElementById("email").value;
    validerEmail(mail);
    afficherMessageErreur("");
    afficherEmail(nom, mail, scoreTotal);
  } catch (erreur) {
    afficherMessageErreur(erreur.message);
  }
}
function lancerJeu() {
  let listeProposition = listeMots;
  let score = 0;
  let i = 0;
  let bouton = document.getElementById("btnValiderMot");
  let inputEcriture = document.getElementById("inputEcriture");
  affichageMots(listeProposition[i]);
  bouton.addEventListener("click", () => {
    console.log(inputEcriture.value);
    if (listeProposition[i] === inputEcriture.value) {
      score++;
    }
    i++;
    affichageMots(listeProposition[i]);
    inputEcriture.value = "";
    if (listeProposition[i] === undefined) {
      affichageMots("Le jeu est fini");
      bouton.disabled = true;
    } else {
      affichageMots(listeProposition[i]);
    }

    affichageScore(score, i);
  });
  let listeBoutonRadio = document.querySelectorAll(".optionSource input");
  for (let index = 0; index < listeBoutonRadio.length; index++) {
    listeBoutonRadio[index].addEventListener("change", (event) => {
      console.log(event.target.value);
      if (event.target.value === "1") {
        listeProposition = listeMots;
      } else {
        listeProposition = listePhrases;
      }
      affichageMots(listeProposition[i]);
    });
  }
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let scoreTotal = `${score}/${i}`;
    gererFormulaire(scoreTotal);
  });
}

lancerJeu();
