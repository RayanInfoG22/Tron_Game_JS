
class Historique {
    constructor() {
        /**
         * Tableau pour stocker les points de l'historique des positions deja passées par le joueur
         */
        this.Point = [];
    }
     
    //ajouter un point à l'historique
    /**
     * 
     * @param {point} point la possiton actuelle du joueur 
     * utilisé dans joueur.deplacer(direction) ou /et joueur.sauter(direction ) pour garder une trace des positions déjà occupées
     */
    ajouter(point) {

        this.Point.push(point);
    }

    //vérifier si un point est déjà dans l'historique
    /**
     * 
     * @param {point} point la position actuelle du joueur
     * @returns {boolean} true si le point est déjà dans l'historique, false sinon
     * utilisé dans joueur.deplacer(direction) ou /et joueur.sauter(direction ) pour éviter les collisions avec les positions déjà occupées
     */
    contient(point) {
        return this.Point.some(p => p.compare(point));
    }

    //réinitialiser l'historique

    reset() {
        this.Point = [];
    }
}

export default Historique;