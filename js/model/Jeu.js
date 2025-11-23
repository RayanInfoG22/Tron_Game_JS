/**
 * la class jeu :
 * gérer la grille
 * gérer les joueurs
 * gérer le score
 * exécuter la boucle du jeu
 * vérifier les collisions
 * demander au canevas de se redraw
 * gérer le début/fin de manche
 *
 */

import Joueur from "./Joueur.js";
import Grille from "./Grille.js";
import Point from "./Point.js";


class Jeu {
    constructor(canevas, tickMs = 100) {

        this.nbColonnes = 80;
        this.nbLignes = 59;
        this.tailleCase = 10;
        this.canevas = canevas;
        this.grille = new Grille(this.nbColonnes, this.nbLignes);

        this.tickMs = tickMs;
        this._intervalId = null;
        this.enCours = false;


        this.joueur1 = new Joueur("Joueur 1", "cyan", { x: 1, y: 28 }, "droite", null, this.grille);
        this.joueur2 = new Joueur("Joueur 2", "red", { x: 1, y: 30 }, "droite", null, this.grille);

        this._depart = [
            { x: 1, y: 28, dir: "droite", nom: this.joueur1.nom },
            { x: 1, y: 30, dir: "droite", nom: this.joueur2.nom }
        ];

        this.tableauScores = null;

    }

    lierControles(controlesJ1, controlesJ2) {
        if (this.joueur1) this.joueur1.controles = controlesJ1;
        if (this.joueur2) this.joueur2.controles = controlesJ2;
    }

    lierTableauScores(tableauScores) {
        this.tableauScores = tableauScores;
    }

    demarrerJeu() {
        if (this.enCours) return;
        this.enCours = true;
        this.reinitialiserManche();

        this._intervalId = setInterval(() => this.mettreAJour(), this.tickMs);
    }


    arreterJeu() {
        if (!this.enCours) return;
        clearInterval(this._intervalId);
        this._intervalId = null;
        this.enCours = false;
    }



    /** Méthode appelée toutes les tickMs */
    mettreAJour() {
        //pour chaque joueur traiter la prochaine direction 
        [this.joueur1, this.joueur2].forEach(j => {
            if (!j || !j.vivant) return;
            if (typeof j.mettreAJourDirection === "function") {
                j.mettreAJourDirection();
            }
        });

        //appliquer déplacement
        for (const j of [this.joueur1, this.joueur2]) {
            if (!j || !j.vivant) continue;


            if (j._demandeSaut && typeof j.sauter === "function") {
                j.sauter();
            } else {

                if (typeof j.deplacer === "function") {
                    j.deplacer();
                }
            }
        }


        this._verifierFinManche();


        this._dessiner();
    }

    _verifierFinManche() {
        const vivants = [this.joueur1, this.joueur2].filter(j => j && j.vivant);
        if (vivants.length >= 2) return; // continue la manche


        this.arreterJeu();

        if (vivants.length === 1) {
            const gagnant = vivants[0];

            if (this.tableauScores && typeof this.tableauScores.ajouterPoint === "function") {
                this.tableauScores.ajouterPoint(gagnant.nom);
            }
            console.log("Manche terminée — gagnant :", gagnant.nom);
        } else {
            console.log("Manche terminée — égalité (aucun survivant)");
        }

    }

    reinitialiserManche() {

        if (this.grille && typeof this.grille.reinitialiser === "function") {
            this.grille.reinitialiser();
        }



        const depart1 = this._depart[0];
        const depart2 = this._depart[1];


        const resetJoueur = (joueur, depart) => {
            if (!joueur) return;
            if (typeof joueur.reset === "function") {
                joueur.reset(depart.x, depart.y, depart.dir);
            } else if (typeof joueur.reinitialiser === "function") {
                joueur.reinitialiser(depart.x, depart.y, depart.dir);
            } else {

                joueur.position = new Point(depart.x, depart.y);


                joueur.direction = depart.dir;
                joueur.trace = [{ x: depart.x, y: depart.y }];
                if (Array.isArray(joueur.historiqueTrajet)) {
                    joueur.historiqueTrajet = [{ x: depart.x, y: depart.y }];
                } else if (joueur.historique && typeof joueur.historique.reset === "function") {
                    joueur.historique.reset();
                    if (typeof joueur.historique.ajouter === "function") joueur.historique.ajouter(joueur.position);
                }
                joueur.vivant = true;
            }

            if (this.grille && typeof this.grille.occuper === "function") {
                this.grille.occuper(depart.x, depart.y, joueur.nom || joueur);
            }
        };

        resetJoueur(this.joueur1, depart1);
        resetJoueur(this.joueur2, depart2);


        this._dessiner();
    }


    _dessiner() {
        if (!this.canevas) return;
        if (typeof this.canevas.effacer === "function") this.canevas.effacer();

        [this.joueur1, this.joueur2].forEach(j => {
            if (!j) return;
            const trace = j.trace || j.historiqueTrajet || [];
            if (this.canevas.dessinerTrace && Array.isArray(trace)) {
                this.canevas.dessinerTrace(trace, j.couleur);
            } else if (Array.isArray(trace)) {

                trace.forEach(p => {
                    if (this.canevas.dessinerCase) this.canevas.dessinerCase(p.x, p.y, j.couleur);
                });
            }

            const pos = j.position || j.positionActuelle || (j.trace && j.trace[j.trace.length - 1]);
            if (!pos) return;

            if (typeof this.canevas.dessinerTete === "function") {
                this.canevas.dessinerTete(pos, j.couleur, j.direction);
            } else if (this.canevas.dessinerCase) {
                this.canevas.dessinerCase(pos.x, pos.y, j.couleur);
            }
        });
    }


    terminerJeu() {
        this.arreterJeu();

    }
}

export default Jeu;

