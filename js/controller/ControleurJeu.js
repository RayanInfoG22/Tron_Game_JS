
/**
*Crée et lie les controles des joueurs au jeu
*Gère le clavier pour chaque joueur/ les evenements
*Gère les boutons/Nouvelle Partie et Configuration des touches
*Utilise jQuery UI pour la fenêtre de configuration des touches et sauvegarde les nouvelles touches dans le localStorage
 */

import Controles from "../model/Controles.js";

class ControleurJeu {
    constructor(jeu) {
        this.jeu = jeu;

        this.controlesJ1 = new Controles(1);
        this.controlesJ2 = new Controles(2);

  
        this.jeu.lierControles(this.controlesJ1, this.controlesJ2);

        this._initialiserBoutons();
        this._initialiserClavier();
        this._initialiserDialogConfig();
    }

    _initialiserBoutons() {
        
        const btnNouvellePartie = document.querySelector(".btn-new-game");
        btnNouvellePartie.addEventListener("click", () => {
            this.jeu.demarrerJeu();
        });

        const btnConfig = document.querySelector(".btn-config");
        btnConfig.addEventListener("click", () => {
            $("#dialog-config").dialog("open");
        });
    }

    _initialiserClavier() {
        document.addEventListener("keydown", (e) => {
            const key = e.key.toUpperCase();

            // Joueur 1
            for (let dir in this.controlesJ1.touchesDirection) {
                if (this.controlesJ1.touchesDirection[dir] === key) {
                    if (dir.toLowerCase() === "saut") {
                        this.jeu.joueur1._demandeSaut = true;
                    } else {
                        this.controlesJ1.ajouterDirection(dir.toLowerCase());
                    }
                }
            }

            // Joueur 2
            for (let dir in this.controlesJ2.touchesDirection) {
                if (this.controlesJ2.touchesDirection[dir] === key) {
                    if (dir.toLowerCase() === "saut") {
                        this.jeu.joueur2._demandeSaut = true;
                    } else {
                        this.controlesJ2.ajouterDirection(dir.toLowerCase());
                    }
                }
            }
        });
    }

    _initialiserDialogConfig() {

        $("#dialog-config").dialog({
            autoOpen: false,
            width: 400,
            modal: true,
        });

   
        $("#btn-save-controls").on("click", () => {
            // Maj les touches pour Joueur 1
            $(".key-cyan").each((index, elem) => {
                const dir = $(elem).parent().find("p").text();
                this.controlesJ1.definirTouche(dir.toLowerCase(), $(elem).text());
            });

            // maj les touches pour Joueur2
            $(".key-orange").each((index, elem) => {
                const dir = $(elem).parent().find("p").text();
                this.controlesJ2.definirTouche(dir.toLowerCase(), $(elem).text());
            });

            $("#dialog-config").dialog("close");
        });

        // btn Annuler
        $("#btn-cancel-controls").on("click", () => {
            $("#dialog-config").dialog("close");
        });
    }
}

export default ControleurJeu;
