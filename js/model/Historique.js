
class Historique {
    constructor() {
        this.Point = [];
    }
     
    ajouter(point) {

        this.Point.push(point);
    }

    contient(point) {
        return this.Point.some(p => p.compare(point));
    }



    reset() {
        this.Point = [];
    }
}

export default Historique;