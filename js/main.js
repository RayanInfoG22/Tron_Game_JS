    import $ from "jquery";
    // Quand le document est prêt...
    $(document).ready(function() {
      console.log("jQuery est chargé et fonctionne !");
      
      // Quand on clique sur le bouton
      $("#btn").click(function() {
        $("#resultat").text("Le bouton a été cliqué !");
        $(this).css("background-color", "lightgreen");
      });
    });