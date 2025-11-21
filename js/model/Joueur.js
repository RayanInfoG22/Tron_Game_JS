class Joueur{
    constructor(nom,couleur,positionActuelle,directionActuelle,controles){
        this.nom=nom;
        this.couleur=couleur;
        this.positionActuelle={
            x:positionActuelle.x,
            y:positionActuelle.y
        };
        this.vivant=true;

        this.trace=[{
            x:positionActuelle.x,
            y:positionActuelle.y
        }];
        this.historiqueTrajet=[{
            x:positionActuelle.x,
            y:positionActuelle.y
        }];

        this.directionActuelle=directionActuelle;
        this.controles=controles;

        this.directionsSuivantes=[];
    }
    deplacer(grille){
        let directionActuelle=this.directionActuelle;
        let newPosition;
        switch (directionActuelle) {
            case 'gauche':
                newPosition={
                    x:this.positionActuelle.x-1,
                    y:this.positionActuelle.y
                };
                break;
            case 'droite':
                newPosition={
                    x:this.positionActuelle.x+1,
                    y:this.positionActuelle.y
                };
                break;

                case 'haut':
                newPosition={
                    x:this.positionActuelle.x,
                    y:this.positionActuelle.y+1
                };
                break;

                case 'bas':
                newPosition={
                    x:this.positionActuelle.x,
                    y:this.positionActuelle.y-1
                };
                break;
            
        
            default:
                break;

       


        }
        if(this.grille.estlibre(newPosition.x,newPosition.y) &&(this.grille[newPosition.x][newPosition.y]==null)){
            this.positionActuelle.x=newPosition.x;
            this.positionActuelle.y=newPosition.y;
            //Mise a jour de trace
            this.trace.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
            this.historiqueTrajet.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
        }
        else{
            this.vivant=false;
        }

        

    }
    sauter(grille){

    }
    dessiner(ctx){

    }
    ajouterDircetion(direction){
        
    }
}
export default Joueur;


import Grille from Grille.js;
