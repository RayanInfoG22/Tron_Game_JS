import Jeu from "./model/Jeu.js";
import Canevas from "./model/Canevas.js";
import TableauScores from "./model/TableauScores.js";
import ControleurJeu from "./controller/ControleurJeu.js";

const canvas = new Canevas(".canvas-container", 80, 59, 10);

const jeu = new Jeu(canvas);

new ControleurJeu(jeu);


const tableauScores = new TableauScores([jeu.joueur1, jeu.joueur2]);
jeu.lierTableauScores(tableauScores);

setInterval(() => {
    document.getElementById("score1").textContent = tableauScores.obtenirScore(jeu.joueur2.nom);
    document.getElementById("score2").textContent = tableauScores.obtenirScore(jeu.joueur1.nom);
}, 100);


