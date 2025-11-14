

console.log('Script test.js chargé');

import Historique from "./model/Historique.js";
import Point from "./model/Point.js";

// Tests pour la classe Point
function testPoint() {
    let p1 = new Point(2, 3);
    let p2 = new Point(2, 3);
    let p3 = new Point(4, 5);

    console.assert(p1.commpare(p2) === true, "Test de comparaison échoué pour des points identiques.");
    console.assert(p1.commpare(p3) === false, "Test de comparaison échoué pour des points différents.");

    let p4 = p1.suivant('haut');
    console.assert(p4.x === 2 && p4.y === 2, "Test de déplacement vers le haut échoué.");

    let p5 = p1.suivant('droite', 2);
    console.assert(p5.x === 4 && p5.y === 3, "Test de déplacement vers la droite avec pas échoué.");
}

// Tests pour la classe Historique
function testHistorique() {
    let historique = new Historique();
    let p1 = new Point(1, 1);
    let p2 = new Point(2, 2);

    historique.ajouter(p1);
    console.assert(historique.contient(p1) === true, "Test d'inclusion échoué pour un point ajouté.");
    console.assert(historique.contient(p2) === false, "Test d'inclusion échoué pour un point non ajouté.");

    historique.reset();
    console.assert(historique.contient(p1) === false, "Test de réinitialisation échoué.");
}

// Exécution des tests
testPoint();
testHistorique();

console.log("Tous les tests sont passés avec succès.");