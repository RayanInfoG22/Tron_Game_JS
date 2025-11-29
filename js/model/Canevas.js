/**
 * canvas.js est une couche d'abstraction autour de la balise <canevas> html
 * 
 */


class Canevas {
    constructor(selecteurParent, nbColonnes, nbLignes, tailleCase = 20) {
        this.conteneur = document.querySelector(selecteurParent);
        if (!this.conteneur) {
            throw new Error("conteneur introuvable:" + selecteurParent);

        }

        //cration du canevas*

        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");

        this.nbColonnes = nbColonnes;
        this.nbLignes = nbLignes;
        this.tailleCase = tailleCase;

        this.canvas.width = nbColonnes * tailleCase;
        this.canvas.height = nbLignes * tailleCase;

        this.conteneur.appendChild(this.canvas);


    }







    effacer() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }



    //draw une case
    dessinerCase(x, y, couleur) {
        this.context.fillStyle = couleur;
        this.context.fillRect(
            x * this.tailleCase,
            y * this.tailleCase,
            this.tailleCase,
            this.tailleCase
        );
    }

    dessinerTrace(listePositions, couleur) {
        this.context.fillStyle = couleur;

        listePositions.forEach(pos => {
            this.context.fillRect(
                pos.x * this.tailleCase,
                pos.y * this.tailleCase,
                this.tailleCase,
                this.tailleCase
            );
        });
    }


    //la tete du joueure
    dessinerTete(position, couleur, direction) {
        const ctx = this.context;
        const taille = this.tailleCase;
        const x = position.x * taille;
        const y = position.y * taille;
        const cx = x + taille / 2;
        const cy = y + taille / 2;
        const rayon = taille / 2;

        ctx.fillStyle = couleur;
        ctx.beginPath();

        switch (direction) {
            case 'droite':
                ctx.arc(cx, cy, rayon, 0.5 * Math.PI, 1.5 * Math.PI);
                break;
            case 'gauche':
                ctx.arc(cx, cy, rayon, 1.5 * Math.PI, 0.5 * Math.PI);
                break;
            case 'haut':
                ctx.arc(cx, cy, rayon, Math.PI, 0);
                break;
            case 'bas':
                ctx.arc(cx, cy, rayon, 0, Math.PI);
                break;
            default:
                ctx.fillRect(x, y, taille, taille);
                return;
        }

        ctx.fill();
    }




}

export default Canevas;
