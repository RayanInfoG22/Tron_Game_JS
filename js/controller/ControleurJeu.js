
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

    const majAffichagePanel = () => {
        // Panel joueur 1
        $(".controls-player.player-cyan .key-cyan").eq(0).text(this.controlesJ1.touchesDirection.gauche);
        $(".controls-player.player-cyan .key-cyan").eq(1).text(this.controlesJ1.touchesDirection.droite);
        $(".controls-player.player-cyan .key-cyan").eq(2).text(this.controlesJ1.touchesDirection.haut);
        $(".controls-player.player-cyan .key-cyan").eq(3).text(this.controlesJ1.touchesDirection.bas);
        $(".controls-player.player-cyan .key-cyan").eq(4).text(this.controlesJ1.touchesDirection.saut);

        // Panel joueur 2
        $(".controls-player.player-orange .key-orange").eq(0).text(this.controlesJ2.touchesDirection.gauche);
        $(".controls-player.player-orange .key-orange").eq(1).text(this.controlesJ2.touchesDirection.droite);
        $(".controls-player.player-orange .key-orange").eq(2).text(this.controlesJ2.touchesDirection.haut);
        $(".controls-player.player-orange .key-orange").eq(3).text(this.controlesJ2.touchesDirection.bas);
        $(".controls-player.player-orange .key-orange").eq(4).text(this.controlesJ2.touchesDirection.saut);
    };

    // Édition des touches au clic
    $(".key-cyan, .key-orange").on("click", (event) => {
        const div = $(event.currentTarget);
        const oldValue = div.text();
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
                div.text(oldValue);
                $(document).off("keydown", handleKey);
                return;
            }
            if (touchesJoueur.includes(key)) {
                alert("Cette touche est déjà utilisée par ce joueur !");
                div.text(oldValue);
                $(document).off("keydown", handleKey);
                return;
            }
            if (touchesAutre.includes(key)) {
                alert("Cette touche est déjà utilisée par l'autre joueur !");
                div.text(oldValue);
                $(document).off("keydown", handleKey);
                return;
            }

            // Mise à jour dans l'objet Controles
            const dir = div.parent().find("p").text().toLowerCase();
            joueur.definirTouche(dir, key);

            // Mise à jour affichage modale + panel
            div.text(key);
            majAffichagePanel();

            $(document).off("keydown", handleKey);
        };

        $(document).on("keydown", handleKey);
    });

    // Sauvegarder
    $("#btn-save-controls").on("click", () => {
        let valide = true;

        $(".key-cyan").each((_i, elem) => {
            const key = $(elem).text();
            if (key.length !== 1 || key === "_") valide = false;
        });

        $(".key-orange").each((_i, elem) => {
            const key = $(elem).text();
            if (key.length !== 1 || key === "_") valide = false;
        });

        if (!valide) {
            alert("Certaines touches sont invalides ou en conflit. Corrigez-les avant de sauvegarder !");
            return;
        }
        majAffichagePanel();
        alert("Touches sauvegardées !");
        
        $("#dialog-config").dialog("close");
    });

    // Annuler
    $("#btn-cancel-controls").on("click", () => {
        // Recharger depuis Controles pour annuler modifications non sauvegardées
        $(".key-cyan").eq(0).text(this.controlesJ1.touchesDirection.gauche);
        $(".key-cyan").eq(1).text(this.controlesJ1.touchesDirection.droite);
        $(".key-cyan").eq(2).text(this.controlesJ1.touchesDirection.haut);
        $(".key-cyan").eq(3).text(this.controlesJ1.touchesDirection.bas);
        $(".key-cyan").eq(4).text(this.controlesJ1.touchesDirection.saut);

        $(".key-orange").eq(0).text(this.controlesJ2.touchesDirection.gauche);
        $(".key-orange").eq(1).text(this.controlesJ2.touchesDirection.droite);
        $(".key-orange").eq(2).text(this.controlesJ2.touchesDirection.haut);
        $(".key-orange").eq(3).text(this.controlesJ2.touchesDirection.bas);
        $(".key-orange").eq(4).text(this.controlesJ2.touchesDirection.saut);

        majAffichagePanel();
        alert("Modification annulée");
        $("#dialog-config").dialog("close");
    });

    // Réinitialiser les touches par défaut
    $("#btn-reset-controls").on("click", () => {
        this.controlesJ1.reinitialiser();
        this.controlesJ2.reinitialiser();

        $(".key-cyan").eq(0).text(this.controlesJ1.touchesDirection.gauche);
        $(".key-cyan").eq(1).text(this.controlesJ1.touchesDirection.droite);
        $(".key-cyan").eq(2).text(this.controlesJ1.touchesDirection.haut);
        $(".key-cyan").eq(3).text(this.controlesJ1.touchesDirection.bas);
        $(".key-cyan").eq(4).text(this.controlesJ1.touchesDirection.saut);

        $(".key-orange").eq(0).text(this.controlesJ2.touchesDirection.gauche);
        $(".key-orange").eq(1).text(this.controlesJ2.touchesDirection.droite);
        $(".key-orange").eq(2).text(this.controlesJ2.touchesDirection.haut);
        $(".key-orange").eq(3).text(this.controlesJ2.touchesDirection.bas);
        $(".key-orange").eq(4).text(this.controlesJ2.touchesDirection.saut);

        majAffichagePanel();
        alert("Touches réinitialisées aux valeurs par défaut !");
    });
}

}

export default ControleurJeu;
