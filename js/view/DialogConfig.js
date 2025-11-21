
/**
 * Le joueur clique sur Configuration des contrôles et --> fenêtre affichée
 * Les touches actuelles sont affichées
 *  Le joueur clique sur une touche --> elle devient modifiable
 *  Il appuie sur une nouvelle touche --> elle remplace lancienne
 *  Le joueur clique sur Sauvegarder ou Annuler
 *  Un message indique si cest bien enregistré ou annulé
 *  Les touches restent en mémoire (localStorage
 */

$(function () {
    // Charger les touches depuis localStorage sinon touches par defaut 
    let controls = JSON.parse(localStorage.getItem("tronControls")) || {
        joueur1: { gauche: 'Q', droite: 'D', haut: 'Z', bas: 'S', saut: 'A' },
        joueur2: { gauche: 'O', droite: 'K', haut: ';', bas: 'M', saut: 'P' }
    };

    // Mettre à jour l'affichage des touches sur la page
    function majAffichage() {
        $(".key-cyan").eq(0).text(controls.joueur1.gauche);
        $(".key-cyan").eq(1).text(controls.joueur1.droite);
        $(".key-cyan").eq(2).text(controls.joueur1.haut);
        $(".key-cyan").eq(3).text(controls.joueur1.bas);
        $(".key-cyan").eq(4).text(controls.joueur1.saut);

        $(".key-orange").eq(0).text(controls.joueur2.gauche);
        $(".key-orange").eq(1).text(controls.joueur2.droite);
        $(".key-orange").eq(2).text(controls.joueur2.haut);
        $(".key-orange").eq(3).text(controls.joueur2.bas);
        $(".key-orange").eq(4).text(controls.joueur2.saut);
    }

    majAffichage();

    // Initialiser la modale
    $("#dialog-config").dialog({
        autoOpen: false,
        modal: true,
        width: 400
    });

    // Bouton pour ouvrir la modale
    $(".btn-config").click(function () {
        // Remplir les champs de la modale avec les touches actuelles
        $("#dialog-config .key-cyan").eq(0).text(controls.joueur1.gauche);
        $("#dialog-config .key-cyan").eq(1).text(controls.joueur1.droite);
        $("#dialog-config .key-cyan").eq(2).text(controls.joueur1.haut);
        $("#dialog-config .key-cyan").eq(3).text(controls.joueur1.bas);
        $("#dialog-config .key-cyan").eq(4).text(controls.joueur1.saut);

        $("#dialog-config .key-orange").eq(0).text(controls.joueur2.gauche);
        $("#dialog-config .key-orange").eq(1).text(controls.joueur2.droite);
        $("#dialog-config .key-orange").eq(2).text(controls.joueur2.haut);
        $("#dialog-config .key-orange").eq(3).text(controls.joueur2.bas);
        $("#dialog-config .key-orange").eq(4).text(controls.joueur2.saut);

        $("#dialog-config").dialog("open");
    });

    // Modifier une touche en cliquant dessus
    $("#dialog-config .cmd div").click(function () {
        const div = $(this);
        const oldValue = div.text();
        const newKey = prompt("Appuyez sur la nouvelle touche", oldValue);
        if (newKey) div.text(newKey.toUpperCase());
    });

    // Sauvegarder
    $("#btn-save-controls").click(function () {
        controls.joueur1.gauche = $("#dialog-config .key-cyan").eq(0).text();
        controls.joueur1.droite = $("#dialog-config .key-cyan").eq(1).text();
        controls.joueur1.haut = $("#dialog-config .key-cyan").eq(2).text();
        controls.joueur1.bas = $("#dialog-config .key-cyan").eq(3).text();
        controls.joueur1.saut = $("#dialog-config .key-cyan").eq(4).text();

        controls.joueur2.gauche = $("#dialog-config .key-orange").eq(0).text();
        controls.joueur2.droite = $("#dialog-config .key-orange").eq(1).text();
        controls.joueur2.haut = $("#dialog-config .key-orange").eq(2).text();
        controls.joueur2.bas = $("#dialog-config .key-orange").eq(3).text();
        controls.joueur2.saut = $("#dialog-config .key-orange").eq(4).text();

        // Sauvegarder dans localStorage
        localStorage.setItem("tronControls", JSON.stringify(controls));

        // Mettre à jour l'affichage sur la page
        majAffichage();

        alert("Touches sauvegardées !");
        $("#dialog-config").dialog("close");
    });

    // Annuler
    $("#btn-cancel-controls").click(function () {
        $("#dialog-config").dialog("close");
        alert("Modification annulée");
    });
});
