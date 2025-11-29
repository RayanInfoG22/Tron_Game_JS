/**
 * Classe qui gère les contrôles du joueur :
 *   touches du clavier
 *  file d'attente des directions pressées
 *  empêche les directions invalides ( demitour)
 *  sauvegarde et lecture des touches personnalisées via localStorage
 */

class Controles {
  
    constructor(numeroJoueur) {
        this.numeroJoueur = numeroJoueur;
        // clé unique pour le localStorage selon le joueur
        this.cleLocalStorage = `tronControlsJ${numeroJoueur}`;

        // recupere les touches depuis localStorage sinon par défaut
        this.touchesDirection = JSON.parse(localStorage.getItem(this.cleLocalStorage)) || this.touchesParDefaut();

     
        this.directionSuivante = [];
        this.directionActuelle = null;
    }

 
    touchesParDefaut() {
        if (this.numeroJoueur === 1) {
            return { gauche: "Q", droite: "D", haut: "Z", bas: "S", Saut: "A" };
        } else {
            return { gauche: "O", droite: "K", haut: ";", bas: "M", Saut: "P" };
        }
    }

  
   definirTouche(direction, key) {
        key = key.toUpperCase();


        if (key.length !== 1) {
            alert("La touche doit être un seul caractère !");
            return false;
        }

        this.touchesDirection[direction] = key;
        this.sauvegarder?.();
        return true;
    }

    obtenirTouche(direction) {
        return this.touchesDirection[direction];
    }

    
     // Sauvegarde la configuration actuelle dans le localStorage
     
    sauvegarder() {
        localStorage.setItem(this.cleLocalStorage, JSON.stringify(this.touchesDirection));
    }

    ajouterDirection(dir) {
        this.directionSuivante.push(dir);
    }

  
    prochaineDirection() {
        return this.directionSuivante.shift() || null;
    }

    reinitialiser() {
        this.touchesDirection = this.touchesParDefaut();
        this.directionSuivante = [];
        this.directionActuelle = null;
        this.sauvegarder();
    }
}

export default Controles;


