class Joueur{
    constructor(nom,couleur,positionActuelle,directionActuelle,controles,grille){
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

        this.grille=grille;
    }



    deplacer(){
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

                case 'bas':
                newPosition={
                    x:this.positionActuelle.x,
                    y:this.positionActuelle.y+1
                };
                break;

                case 'haut':
                newPosition={
                    x:this.positionActuelle.x,
                    y:this.positionActuelle.y-1
                };
                break;
            
        
            default:
                break;

       


        }
        if(this.grille.estlibre(newPosition.x,newPosition.y) /*&&(this.grille[newPosition.y][newPosition.x]===null)*/){
            this.positionActuelle.x=newPosition.x;
            this.positionActuelle.y=newPosition.y;
            //Mise a jour de trace
            this.trace.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
            this.historiqueTrajet.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
            this.grille.occuper(this.positionActuelle.x,this.positionActuelle.y,this.nom);
        }
        else{
            this.vivant=false;
        }

        

    }
    sauter(){
        let directionActuelle=this.directionActuelle;
        let newPosition_1;
        let newPosition_2;
        switch (directionActuelle) {
            case 'droite':
                newPosition_1={x:this.positionActuelle.x+1,y:this.positionActuelle.y};
                if(this.grille.estlibre(newPosition_1.x,newPosition_1.y)){
                    newPosition_2={x:newPosition_1.x+1,y:newPosition_1.y};
                    if(this.grille.estlibre(newPosition_2.x,newPosition_2.y)){
                        this.positionActuelle.x=newPosition_1.x;
                        this.positionActuelle.y=newPosition_1.y;

                        this.trace.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.historiqueTrajet.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.grille.occuper(this.positionActuelle.x,this.positionActuelle.y,this.nom);

                        this.positionActuelle.x=newPosition_2.x;
                        this.positionActuelle.y=newPosition_2.y;

                        this.trace.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.historiqueTrajet.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.grille.occuper(this.positionActuelle.x,this.positionActuelle.y,this.nom);
                    }
                    else{
                        this.vivant=false;
                    }
                }
                else{
                    this.vivant=false;
                }

                break;


                case 'gauche':
                newPosition_1={x:this.positionActuelle.x-1,y:this.positionActuelle.y};
                if(this.grille.estlibre(newPosition_1.x,newPosition_1.y)){
                    newPosition_2={x:newPosition_1.x-1,y:newPosition_1.y};
                    if(this.grille.estlibre(newPosition_2.x,newPosition_2.y)){
                        this.positionActuelle.x=newPosition_1.x;
                        this.positionActuelle.y=newPosition_1.y;

                        this.trace.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.historiqueTrajet.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.grille.occuper(this.positionActuelle.x,this.positionActuelle.y,this.nom);

                        this.positionActuelle.x=newPosition_2.x;
                        this.positionActuelle.y=newPosition_2.y;

                        this.trace.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.historiqueTrajet.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.grille.occuper(this.positionActuelle.x,this.positionActuelle.y,this.nom);
                    }
                    else{
                        this.vivant=false;
                    }
                }
                else{
                    this.vivant=false;
                }

                break;
        
                case 'haut':
                newPosition_1={x:this.positionActuelle.x,y:this.positionActuelle.y-1};
                if(this.grille.estlibre(newPosition_1.x,newPosition_1.y)){
                    newPosition_2={x:newPosition_1.x,y:newPosition_1.y-1};
                    if(this.grille.estlibre(newPosition_2.x,newPosition_2.y)){
                        this.positionActuelle.x=newPosition_1.x;
                        this.positionActuelle.y=newPosition_1.y;

                        this.trace.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.historiqueTrajet.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.grille.occuper(this.positionActuelle.x,this.positionActuelle.y,this.nom);

                        this.positionActuelle.x=newPosition_2.x;
                        this.positionActuelle.y=newPosition_2.y;
                        this.trace.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.historiqueTrajet.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.grille.occuper(this.positionActuelle.x,this.positionActuelle.y,this.nom);
                    }
                    else{
                        this.vivant=false;
                    }
                }
                else{
                    this.vivant=false;
                }

                break;

                case 'bas':
                newPosition_1={x:this.positionActuelle.x,y:this.positionActuelle.y+1};
                if(this.grille.estlibre(newPosition_1.x,newPosition_1.y)){
                    newPosition_2={x:newPosition_1.x,y:newPosition_1.y+1};
                    if(this.grille.estlibre(newPosition_2.x,newPosition_2.y)){
                        this.positionActuelle.x=newPosition_1.x;
                        this.positionActuelle.y=newPosition_1.y;

                        this.trace.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.historiqueTrajet.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.grille.occuper(this.positionActuelle.x,this.positionActuelle.y,this.nom);

                        this.positionActuelle.x=newPosition_2.x;
                        this.positionActuelle.y=newPosition_2.y;
                        this.trace.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.historiqueTrajet.push({x:this.positionActuelle.x,y:this.positionActuelle.y});
                        this.grille.occuper(this.positionActuelle.x,this.positionActuelle.y,this.nom);
                    }
                    else{
                        this.vivant=false;
                    }
                }
                else{
                    this.vivant=false;
                }

                break;

            default:
                break;
        }


    }
    dessiner(ctx){

    }
    ajouterDircetion(direction){
        
    }
}
export default Joueur;