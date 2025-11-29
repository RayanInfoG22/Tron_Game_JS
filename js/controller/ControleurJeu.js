
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

        // Édition des touches au clic
        $(".key-cyan, .key-orange").on("click", (event) => {
            const div = $(event.currentTarget);
            div.text("_");

            const handleKey = (e) => {
                e.preventDefault();
                const key = e.key.toUpperCase();
                const isCyan = div.hasClass("key-cyan");
                const joueur = isCyan ? this.controlesJ1 : this.controlesJ2;
                const autreJoueur = isCyan ? this.controlesJ2 : this.controlesJ1;

                const touchesJoueur = Object.values(joueur.touchesDirection);
                const touchesAutre = Object.values(autreJoueur.touchesDirection);

                if (key.length !== 1) {
                    alert("La touche doit être un seul caractère !");
                    return;
                }
                if (touchesJoueur.includes(key)) {
                    alert("Cette touche est déjà utilisée par ce joueur !");
                    return;
                }
                if (touchesAutre.includes(key)) {
                    alert("Cette touche est déjà utilisée par l'autre joueur !");
                    return;
                }

                div.text(key);
                $(document).off("keydown", handleKey);
            };

            $(document).on("keydown", handleKey);
        });

        // Sauvegarder
        $("#btn-save-controls").on("click", () => {
            let valide = true;

            $(".key-cyan").each((_i, elem) => {
                const key = $(elem).text();
                const dir = $(elem).parent().find("p").text().toLowerCase();
                if (key.length !== 1 || key === "_") valide = false;
                else this.controlesJ1.definirTouche(dir, key);
            });

            $(".key-orange").each((_i, elem) => {
                const key = $(elem).text();
                const dir = $(elem).parent().find("p").text().toLowerCase();
                if (key.length !== 1 || key === "_") valide = false;
                else this.controlesJ2.definirTouche(dir, key);
            });

            if (!valide) {
                alert("Certaines touches sont invalides ou en conflit. Corrigez-les avant de sauvegarder !");
                return;
            }

            $("#dialog-config").dialog("close");
        });

        // Annuler
        $("#btn-cancel-controls").on("click", () => {
            $("#dialog-config").dialog("close");
        });


        // Réinitialiser les touches par défaut
        $("#btn-reset-controls").on("click", () => {
            const defautsJ1 = { gauche: 'Q', droite: 'D', haut: 'Z', bas: 'S', saut: 'A' };
            const defautsJ2 = { gauche: 'O', droite: 'K', haut: ';', bas: 'M', saut: 'P' };

       
            this.controlesJ1.touchesDirection = { ...defautsJ1 };
            this.controlesJ2.touchesDirection = { ...defautsJ2 };

            $(".key-cyan").eq(0).text(defautsJ1.gauche);
            $(".key-cyan").eq(1).text(defautsJ1.droite);
            $(".key-cyan").eq(2).text(defautsJ1.haut);
            $(".key-cyan").eq(3).text(defautsJ1.bas);
            $(".key-cyan").eq(4).text(defautsJ1.saut);

            $(".key-orange").eq(0).text(defautsJ2.gauche);
            $(".key-orange").eq(1).text(defautsJ2.droite);
            $(".key-orange").eq(2).text(defautsJ2.haut);
            $(".key-orange").eq(3).text(defautsJ2.bas);
            $(".key-orange").eq(4).text(defautsJ2.saut);

            alert("Touches réinitialisées aux valeurs par défaut !");
        });

    }
}

export default ControleurJeu;
