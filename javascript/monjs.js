
const startButton = document.getElementById("commencer");
const quizz = document.getElementById("quiz")
const avant = document.getElementById("regle");
const suivant = document.getElementById("suivant")
const reponse = document.getElementById("reponses");
const rejouer = document.getElementById("rejouer")
const quest = document.getElementById("questions");
const q = document.getElementById("titre")


startButton.addEventListener("click", DemarerChrono)
startButton.addEventListener("click", CommencerQuiz);
suivant.addEventListener("click", Question);

let score = 0;
let noQuestion = 0

/**
 * 
 */
function CommencerQuiz() {
    Reprise()
    avant.style.display = "none";
    const questionActive = (noQuestion + 1) + (". ") + questions[noQuestion].question
    quest.textContent = questionActive
    questions[noQuestion].answers.forEach(answers => {
        const boutton = document.createElement("button")
        boutton.classList.add("btn")
        boutton.classList.add("btn-primary")
        boutton.classList.add("border-primary")
        boutton.classList.add("my-1")
        boutton.classList.add("shadow-sm")
        boutton.classList.add("fw-bold")
        boutton.innerHTML = answers.text
        reponse.appendChild(boutton)
        quizz.style.display = "block";
        const sortir = document.getElementById("sortie")
        sortir.style.display = "block";
        suivant.style.display = "none";
        rejouer.style.display = "none"
        sortir.addEventListener("click", Terminer)
        startButton.style.display = "none";
        if (answers.correct) {
            boutton.dataset.correct = answers.correct
        }
        boutton.addEventListener("click", verifReponse)
        boutton.addEventListener("click", ReprendreChrono)
    });
}


function Terminer() {
    const fini = confirm("Voulez-vous vraiment sortir?")
    if (fini == true) {
        quizz.style.display = "none";
        reponse.style.display = "none";
        startButton.style.display = "block"
        avant.style.display = "block";
        noQuestion = 0
        location.reload()
    } else {
        Decompte()
    }
}
function Reprise() {
    while (reponse.firstChild) {
        reponse.removeChild(reponse.firstChild)
    }
}

function verifReponse(e) {
    const choix = e.target
    const exact = choix.dataset.correct === "true"
    if (exact) {
        choix.classList.add("bg-correct")
        score++
        suivant.style.display = "block";
    } else {
        choix.classList.add("bg-incorrect")
        suivant.style.display = "block";
    }
    Array.from(reponse.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("bg-correct")
        } else {
            button.classList.add("bg-secondary")
        }
        button.disabled = true;
    })
}

function Question() {
    noQuestion++
    if (noQuestion < questions.length) {
        secondes = 31
        DemarerChrono()
        CommencerQuiz()
    }
    else {
        noQuestion = 0
        ArreterChrono()
        Score()
    }
}
function Score() {
    Reprise()
    compt.style.setProperty('--progress-text', 30)
    Pourcent(30)
    q.innerHTML = "Résultats";
    reponse.innerHTML = `<span class="span-urw-light fw-bold fs-5 text-center d-flex justify-content-center">Vous avez obtenu un résutat de ${score}/20</span>`
    suivant.style.display = "none";
    quest.innerHTML = "";
    rejouer.style.display = "block";
    score = 0
    rejouer.addEventListener("click",CommencerQuiz)
    rejouer.addEventListener("click",DemarerChrono)
}


// Chronomètre
let secondes = 31
let estArreter = true


let timeout = 0
const compt = document.getElementById("compteur")


/**
 * 
 */
function DemarerChrono() {
    if (estArreter) {
        estArreter = false
        Decompte()
    }
}
function Decompte() {
    parseInt(secondes)
    if (estArreter) return;
    if (secondes < 10) {
        secondes = "0"+secondes
    }
    secondes--
    if (secondes >= 0) {
        compt.style.setProperty('--progress-text', secondes)
        Pourcent(secondes)
    }
    if(secondes == 0){
        Question()
    }

    timeout = setTimeout(Decompte, 1000)
}
function ArreterChrono() {
    estArreter = true
    secondes = 31
}



function ReprendreChrono() {
    secondes = 31
    estArreter = true
    clearTimeout(timeout)
}

function Pourcent(value) {
    const valeurMax = 30
    const pourcentage = (value * 100) / valeurMax;
    compt.style.setProperty('--progress-value', pourcentage)
}
window.addEventListener("load", function () {
    compt.style.setProperty('--progress-text', 30)
    Pourcent(30)
})


const questions = [
    {
        question: "Où Geoffrey Hinton a-t-il obtenu son diplôme en psychologie ?",
        answers: [
            { text: "À l'Université de Toronto.", correct: false },
            { text: "À l'Université de Cambridge.", correct: true },
            { text: "À l'Université Stanford.", correct: false },
            { text: "À l'Université Harvard.", correct: false },
        ]
    },
    {
        question: "En quelle année Geoffrey Hinton a-t-il obtenu son doctorat en intelligence artificielle ?",
        answers: [
            { text: "1986", correct: false },
            { text: "1998", correct: false },
            { text: "1978", correct: true },
            { text: "2001", correct: false },
        ]
    },
    {
        question: "Avec qui Geoffrey Hinton a-t-il publié des travaux sur la rétropropagation ?",
        answers: [
            { text: "David Rumelhart et Ronald J. Williams", correct: true },
            { text: "Yann LeCun et Yoshua Bengio", correct: false },
            { text: "Cade Metz et Richard Feynman", correct: false },
            { text: "Demis Hassabis et John Hopfield", correct: false },
        ]
    },
    {
        question: "Quel concours Hinton et son équipe ont-ils remporté en 2012 ?",
        answers: [
            { text: "AlphaGo Championship", correct: false },
            { text: "ImageNet", correct: true },
            { text: "Turing Challenge", correct: false },
            { text: "Loebner Prize", correct: false },
        ]
    },
    {
        question: "Pour quelle invention Geoffrey Hinton a-t-il été mentionné dans la citation de son prix Nobel ?",
        answers: [
            { text: "Les réseaux convolutifs", correct: false },
            { text: "L'algorithme de clustering", correct: false },
            { text: "La rétropropagation", correct: false },
            { text: "La machine Boltzmann", correct: true },
        ]
    },
    {
        question: "Quand Geoffrey Hinton est-il devenu compagnon de l'Ordre du Canada ?",
        answers: [
            { text: "2012", correct: false },
            { text: "2005", correct: false },
            { text: "2021", correct: false },
            { text: "2018", correct: true },
        ]
    },
    {
        question: "Quelle société Hinton a-t-il cofondée, acquise par Google ?",
        answers: [
            { text: "DeepMind", correct: false },
            { text: "OpenAI", correct: false },
            { text: "NVIDIA Research", correct: false },
            { text: "DNN Research", correct: true },
        ]
    },
    {
        question: "Dans quelle catégorie Geoffrey Hinton a-t-il reçu le prix Princess of Asturias en 2022 ?",
        answers: [
            { text: "Psychologie", correct: false },
            { text: "Physique", correct: false },
            { text: "Recherche scientifique", correct: true },
            { text: "Mathématiques", correct: false },
        ]
    },
    {
        question: "Quel prix Geoffrey Hinton a-t-il reçu en 2001 ?",
        answers: [
            { text: "Le prix Nobel", correct: false },
            { text: "La médaille Herzberg", correct: false },
            { text: "Le prix Killam", correct: false },
            { text: "Le prix Rumelhart", correct: true },
        ]
    },
    {
        question: "En quelle année Geoffrey Hinton a-t-il reçu la médaille d'or Herzberg ?",
        answers: [
            { text: "2011", correct: true },
            { text: "2012", correct: false },
            { text: "2021", correct: false },
            { text: "2005", correct: false },
        ]
    },
    {
        question: "Quel prix Hinton a-t-il remporté pour ses travaux sur l'intelligence artificielle en 2005 ?",
        answers: [
            { text: "Le prix Killam", correct: false },
            { text: "Le prix IJCAI pour l'excellence en recherche", correct: true },
            { text: "Le prix Dickson", correct: false },
            { text: "Le prix Nobel", correct: false },
        ]
    },
    {
        question: "Quel doctorat honorifique Geoffrey Hinton a-t-il reçu en 2013 ?",
        answers: [
            { text: "De l'Université Stanford", correct: false },
            { text: "De l'Université de Sherbrooke", correct: true },
            { text: "De l'Université de Toronto", correct: false },
            { text: "De l'Université de Cambridge", correct: false },
        ]
    },
    {
        question: "Quelle technologie a aidé Hinton à remporter le concours ImageNet ?",
        answers: [
            { text: "Les algorithmes génétiques", correct: false },
            { text: "Les arbres de décision", correct: false },
            { text: "Les réseaux de neurones profonds", correct: true },
            { text: "La machine de Turing", correct: false },
        ]
    },
    {
        question: "Quel titre honorifique Hinton a-t-il obtenu en 2023 ?",
        answers: [
            { text: "Prix Nobel de physique", correct: false },
            { text: "Prix Killam", correct: false },
            { text: "Membre de l'ACM", correct: true },
            { text: "Prix Princess of Asturias", correct: false },
        ]
    },
    {
        question: "Quel journaliste a interviewé Hinton après son prix Nobel ?",
        answers: [
            { text: "Yann LeCun", correct: false },
            { text: "Demis Hassabis", correct: false },
            { text: "Yoshua Bengio", correct: false },
            { text: "Cade Metz", correct: true },
        ]
    },
    {
        question: "Quelle citation humoristique Hinton a-t-il utilisée à propos de Feynman ?",
        answers: [
            { text: "\"L'algorithme de rétropropagation est simple.\"", correct: false },
            { text: "\"Si je pouvais l'expliquer en quelques minutes, il ne valait pas le prix Nobel.\"", correct: true },
            { text: "\"L'IA résoudra tout.\"", correct: false },
            { text: "\"La machine Boltzmann explique tout.\"", correct: false },
        ]
    },
    {
        question: "Avec qui Geoffrey Hinton a-t-il partagé le prix Princess of Asturias ?",
        answers: [
            { text: "Richard Feynman et Alan Turing", correct: false },
            { text: "David Rumelhart et Ronald J. Williams", correct: false },
            { text: "Yoshua Bengio, Yann LeCun et Demis Hassabis", correct: true },
            { text: "John Hopfield et Cade Metz", correct: false },
        ]
    },
    {
        question: "Quel prix Geoffrey Hinton a-t-il reçu en 2021 ?",
        answers: [
            { text: "Le prix Dickson en sciences", correct: true },
            { text: "La médaille d'or Herzberg", correct: false },
            { text: "Le prix Killam", correct: false },
            { text: "Le prix Nobel", correct: false },
        ]
    },
    {
        question: "Quelle invention Hinton a-t-il développée, mentionnée pour son prix Nobel ?",
        answers: [
            { text: "Les réseaux convolutifs", correct: false },
            { text: "Les SVM", correct: false },
            { text: "La machine Boltzmann", correct: true },
            { text: "La rétropropagation", correct: false },
        ]
    },
    {
        question: "Pour quel type d'algorithme Geoffrey Hinton est-il principalement connu ?",
        answers: [
            { text: "Les systèmes experts", correct: false },
            { text: "Les réseaux de neurones profonds", correct: true },
            { text: "Les algorithmes génétiques", correct: false },
            { text: "Les arbres de décision", correct: false },
        ]
    }
];
 