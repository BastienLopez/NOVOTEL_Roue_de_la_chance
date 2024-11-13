// Fonction pour afficher la popup après le spin
function showResultPopup(label, message) {
    const popup = document.getElementById('result-popup');
    const messageElem = document.getElementById('result-message');
    messageElem.textContent = message;
    popup.setAttribute('data-label', label); // Stocker le label pour le téléchargement
    popup.style.display = 'block';
}

// Télécharger le coupon avec le texte du 'label' uniquement
document.getElementById('download-button').addEventListener('click', function() {
    // Récupérer le texte du 'label' depuis l'attribut personnalisé de la popup
    const couponLabel = document.getElementById('result-popup').getAttribute('data-label');

    if (!couponLabel) {
        alert("Erreur : Aucun label disponible pour le coupon.");
        return;
    }

    // Créer un canvas pour générer l'image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Définir la taille du canvas
    canvas.width = 400;
    canvas.height = 200;

    // Fond blanc
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Texte NOVOTEL en haut
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = '#1E22AA';
    ctx.textAlign = 'center';
    ctx.fillText('NOVOTEL', canvas.width / 2, 40);

    // Ajouter le texte du coupon (texte du label)
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000000';
    ctx.fillText(couponLabel, canvas.width / 2, 120);

    // Générer un lien de téléchargement pour l'image modifiée
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'coupon_novotel.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
