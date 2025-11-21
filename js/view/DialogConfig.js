
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


    let controls = JSON.parse(localStorage.getItem("tronControls")) || {
        cyan: { left: "Q", right: "D", up: "Z", down: "S", Saut: "A" },
        orange: { left: "O", right: "K", up: ";", down: "M", Saut: "P" }
    };


    function genererHTML() {
        return `
        <div class="controls-panel">

            <div class="controls-players">

                <!-- Joueur Cyan -->
                <div class="controls-player player-cyan">
                    <h3>Cycle Cyan</h3>
                    ${genererBlocTouche(controls.cyan, "cyan")}
                </div>

                <!-- Joueur Orange -->
                <div class="controls-player player-orange">
                    <h3>Cycle Orange</h3>
                    ${genererBlocTouche(controls.orange, "orange")}
                </div>

            </div>

            <div class="buttons-config">
                <button id="btn-save-config">Sauvegarder</button>
                <button id="btn-cancel-config">Annuler</button>
            </div>

        </div>`;
    }


    function genererBlocTouche(obj, couleur) {
        return `
            <div class="cmd"><p>Gauche</p><div class="key key-${couleur}" data-player="${couleur}" data-action="left">${obj.left}</div></div>
            <div class="cmd"><p>Droite</p><div class="key key-${couleur}" data-player="${couleur}" data-action="right">${obj.right}</div></div>
            <div class="cmd"><p>Haut</p><div class="key key-${couleur}" data-player="${couleur}" data-action="up">${obj.up}</div></div>
            <div class="cmd"><p>Bas</p><div class="key key-${couleur}" data-player="${couleur}" data-action="down">${obj.down}</div></div>
            <div class="cmd"><p>Saut</p><div class="key key-${couleur}" data-player="${couleur}" data-action="Saut">${obj.Saut}</div></div>
        `;
    }


    $("#dialog-config").html(genererHTML());

    $("#dialog-config").dialog({
        autoOpen: false,
        modal: true,
        width: 600,
        resizable: false
    });


    $(".btn-config").on("click", () => {
        $("#dialog-config").html(genererHTML());
        $("#dialog-config").dialog("open");
    });


    let toucheEnEdition = null;

    $(document).on("click", ".key", function () {
        $(".key").removeClass("editing");
        $(this).addClass("editing");

        toucheEnEdition = this;
    });

    $(document).on("keydown", function (e) {
        if (!toucheEnEdition) return;

        const keyName = e.key.toUpperCase();

        const player = toucheEnEdition.dataset.player;
        const action = toucheEnEdition.dataset.action;

    
        controls[player][action] = keyName;

    
        toucheEnEdition.textContent = keyName;

        $(toucheEnEdition).removeClass("editing");
        toucheEnEdition = null;
    });


    $(document).on("click", "#btn-save-config", function () {

        localStorage.setItem("tronControls", JSON.stringify(controls));

        alert("✔ Commandes sauvegardées !");
        $("#dialog-config").dialog("close");
    });


    $(document).on("click", "#btn-cancel-config", function () {

        controls = JSON.parse(localStorage.getItem("tronControls")) || controls;

        alert("✖ Modifications annulées.");
        $("#dialog-config").dialog("close");
    });

});
