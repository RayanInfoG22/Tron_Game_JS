document.addEventListener('DOMContentLoaded', () => {
    const fond = document.getElementById('fond-etoiles');
    const nbEtoiles = 150;

    function creerEtoile() {
        const etoile = document.createElement('div');
        etoile.classList.add('etoile');

        // Position aléatoire
        etoile.style.top = Math.random() * 100 + '%';
        etoile.style.left = Math.random() * 100 + '%';

        // Taille aléatoire (1px à 3px)
        const taille = Math.random() * 2 + 1;
        etoile.style.width = taille + 'px';
        etoile.style.height = taille + 'px';

        // Couleur aléatoire (bleu ou red)
        const couleur = Math.random() > 0.5
            ? getComputedStyle(document.documentElement).getPropertyValue('--couleur-cyan')
            : getComputedStyle(document.documentElement).getPropertyValue('--couleur-red');


        etoile.style.backgroundColor = couleur.trim();
        etoile.style.boxShadow = `0 0 12px ${couleur.trim()}`;
        fond.appendChild(etoile);
        animerEtoile(etoile);
    }

    function animerEtoile(etoile) {
        setInterval(() => {
            etoile.style.opacity = 0.4 + Math.random() * 0.6;
            etoile.style.transform = `scale(${0.8 + Math.random() * 0.8})`;
        }, 1000 + Math.random() * 2000);
    }

    for (let i = 0; i < nbEtoiles; i++) {
        creerEtoile();
    }


});
