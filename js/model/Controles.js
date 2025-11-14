

/**
 * Clase qui gere les controles du joueur:
 * touches du clavier
 * file d'attente des directions pressees
 * empeche les directions invalides (ex: aller a gauche quand on va deja a droite)
 * empeche de faire demi-tour 
 * 
 */

class Controles {
    constructor(mapping = {}) {
        //mapping: objet qui mappe les codes des touches aux directions
        //on utilise mappping pour pouvoir personnaliser les controles
        //et pour eviter les if else a chaque appui de touche
        //chaque joueur a son propre mapping


        /**
         * Mapping des touches du clavier aux directions
         * @type {Object}
         * @property {string} gauche - Touche pour aller a gauche
         * @property {string} droite - Touche pour aller a droite
         * @property {string} haut - Touche pour aller en haut
         * @property {string} bas - Touche pour aller en bas
         * 
         */

        this.touchesDirection = {
            'gauche': mapping.gauche || 'ArrowLeft',
            'droite': mapping.droite || 'ArrowRight',
            'haut': mapping.haut || 'ArrowUp',
            'bas': mapping.bas || 'ArrowDown'
        };

        this.directionSuivante = [];   //direction suivante a prendre
        this.directionActuelle = null; //direction actuelle


    }}export default Controles;
