// Jeu.js
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

    const btnNouvellePartie = document.querySelector(".btn-new-game");
    const btnConfig = document.querySelector(".btn-config");

    if (btnNouvellePartie) {
        btnNouvellePartie.disabled = true;
        btnNouvellePartie.textContent = "Partie en cours";
        btnNouvellePartie.classList.add("btn-disabled-game");
    }

    if (btnConfig) {
        btnConfig.disabled = true;
        btnConfig.classList.add("btn-disabled-config");
    }

    this.reinitialiserManche();
    this._intervalId = setInterval(() => this.mettreAJour(), this.tickMs);
}

arreterJeu() {
    if (!this.enCours) {
        this._restaurerBoutons();
        return;
    }

    clearInterval(this._intervalId);
    this.enCours = false;

    this._restaurerBoutons();
}

// Réactive les boutons et remet le style original
_restaurerBoutons() {
    const btnNouvellePartie = document.querySelector(".btn-new-game");
    const btnConfig = document.querySelector(".btn-config");

    if (btnNouvellePartie) {
        btnNouvellePartie.disabled = false;
        btnNouvellePartie.textContent = "Nouvelle Partie";
        btnNouvellePartie.classList.remove("btn-disabled-game");
    }

    if (btnConfig) {
        btnConfig.disabled = false;
        btnConfig.classList.remove("btn-disabled-config");
    }
}

    
    mettreAJour() {
        // update directions (une par joueur par tick max)
        [this.joueur1, this.joueur2].forEach(j => j && j.vivant && j.mettreAJourDirection());

        // avancer (saut prioritaire)
        [this.joueur1, this.joueur2].forEach(j => {
            if (!j || !j.vivant) return;
            if (j._demandeSaut) j.sauter();
            else j.deplacer();
        });

        // vérifier fin de manche
        this._verifierFinManche();

        // redraw
        this._dessiner();
    }

    _verifierFinManche() {
        const vivants = [this.joueur1, this.joueur2].filter(j => j && j.vivant);
        if (vivants.length === 2) return; // continues
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
        if (this.grille && typeof this.grille.reinitialiser === "function") this.grille.reinitialiser();

        const [d1, d2] = this._depart;

        if (this.joueur1 && typeof this.joueur1.reinitialiser === "function") {
            this.joueur1.reinitialiser({ x: d1.x, y: d1.y }, d1.dir);
        }
        if (this.joueur2 && typeof this.joueur2.reinitialiser === "function") {
            this.joueur2.reinitialiser({ x: d2.x, y: d2.y }, d2.dir);
        }

        // Occuper les cases de départ
        if (this.grille && typeof this.grille.occuper === "function") {
            this.grille.occuper(d1.x, d1.y, this.joueur1.nom);
            this.grille.occuper(d2.x, d2.y, this.joueur2.nom);
        }

        this._dessiner();
    }

    _dessiner() {
        if (!this.canevas) return;
        if (typeof this.canevas.effacer === "function") this.canevas.effacer();

        [this.joueur1, this.joueur2].forEach(j => {
            if (!j) return;
            const trace = j.trace || [];
            if (Array.isArray(trace)) {
                if (typeof this.canevas.dessinerTrace === "function") {
                    this.canevas.dessinerTrace(trace, j.couleur);
                } else {
                    trace.forEach(p => this.canevas.dessinerCase && this.canevas.dessinerCase(p.x, p.y, j.couleur));
                }
            }

            const pos = j.position;
            if (!pos) return;
            if (typeof this.canevas.dessinerTete === "function") {
                this.canevas.dessinerTete(pos, j.couleur, j.direction);
            } else {
                this.canevas.dessinerCase && this.canevas.dessinerCase(pos.x, pos.y, j.couleur);
            }
        });
    }

    remplirTouchesConfig(j1, j2) {
    const touchesJ1 = [j1.touches.gauche, j1.touches.droite, j1.touches.haut, j1.touches.bas, j1.touches.saut];
    const touchesJ2 = [j2.touches.gauche, j2.touches.droite, j2.touches.haut, j2.touches.bas, j2.touches.saut];

    document.querySelectorAll(".player-cyan .key-cyan")
        .forEach((el, i) => el.textContent = touchesJ1[i]);

    document.querySelectorAll(".player-red .key-red")
        .forEach((el, i) => el.textContent = touchesJ2[i]);
}


    terminerJeu() {
        this.arreterJeu();
    }
}

export default Jeu;
