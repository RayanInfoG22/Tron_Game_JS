
import Point from "./Point.js";
import Historique from "./Historique.js"

class Joueur {
    constructor(nom, couleur, positionInitiale, directionInitiale, controles, grille) {
        this.nom = nom;
        this.couleur = couleur;
        this.controles = controles;
        this.grille = grille;
        this.position = new Point(positionInitiale.x, positionInitiale.y);
        this.direction = directionInitiale;
        this.trace = [new Point(positionInitiale.x, positionInitiale.y)];
        this.historique = new Historique();
        this.historique.ajouter(this.position);
        this.vivant = true;



    }


    //Met à jour la direction apartir des controles

    mettreAJourDirection() {
        const prochaineDir = this.controles.prochaineDirection();
        if (prochaineDir && !this.estDirectionInverse(prochaineDir)) {
            this.direction = prochaineDir;
        }
    }

    //Vérifie si la nouvelle direction est l'inverse de l'actuelle
    estDirectionInverse(nouvelleDir) {
        return (
            (this.direction === 'haut' && nouvelleDir === 'bas') ||
            (this.direction === 'bas' && nouvelleDir === 'haut') ||
            (this.direction === 'gauche' && nouvelleDir === 'droite') ||
            (this.direction === 'droite' && nouvelleDir === 'gauche')
        );
    }



    deplacer() {

        if (!this.vivant) return;

        let newPosition = this.position.suivant(this.direction)

        if (this.grille.estlibre(newPosition.x, newPosition.y) &&
            !this.historique.contient(newPosition)) {
            this.position = newPosition;
            this.trace.push(new Point(this.position.x, this.position.y));
            this.historique.ajouter(new Point(this.position.x, this.position.y));
            this.grille.occuper(this.position.x, this.position.y, this.nom);

        }
        else {
            this.vivant = false; //coullision
        }



    }
    sauter() {
        if (!this.vivant) return;

        const newPosition = this.position.suivant(this.direction, 1);
        if (this.grille.estlibre(newPosition.x, newPosition.y) &&
            !this.historique.contient(newPosition)) {
            this.position = newPosition;
            this.trace.push(new Point(this.position.x, this.position.y));
            this.historique.ajouter(new Point(this.position.x, this.position.y));
            this.grille.occuper(this.position.x, this.position.y, this.nom);
        } else {
            this.vivant = false;
        }
    }


}
export default Joueur;