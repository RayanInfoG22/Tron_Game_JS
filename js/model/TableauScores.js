

class TableauScores {
    constructor(joueurs = []) {
        this.scores = {};
        joueurs.forEach(j => {
            const nom = j && j.nom ? j.nom : j;
            this.scores[nom] = 0;
        });
    }

    ajouterPoint(nomJoueur) {
        if (this.scores[nomJoueur] !== undefined) {
            this.scores[nomJoueur]++;
        }
    }
    obtenirScore(nomJoueur) {
        return this.scores[nomJoueur] || 0;
    }


    obtenirTousLesScores() {
        return { ...this.scores };
    }

    reinitialiser() {
        for (let nom in this.scores) {
            this.scores[nom] = 0;
        }
    }
}

export default TableauScores;
