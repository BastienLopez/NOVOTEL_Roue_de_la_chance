// Écouter l'événement personnalisé 'wheelEnd'
window.addEventListener('wheelEnd', function (event) {
    const { label, message } = event.detail;
    showResultPopup(label, message);
});

// Fonction pour afficher la popup après le spin
function showResultPopup(label, message) {
    const popup = document.getElementById('result-popup');
    const messageElem = document.getElementById('result-message');
    messageElem.textContent = message;
    popup.setAttribute('data-label', label);
    popup.style.display = 'block';

    // Désactiver le click sur la roue pour éviter de relancer le spin
    document.querySelector('.chartholder').style.pointerEvents = 'none';
}

// Fonction pour fermer la popup et réactiver le click sur la roue
document.getElementById('close-popup').addEventListener('click', function () {
    const popup = document.getElementById('result-popup');
    popup.style.display = 'none';

    // Réactiver le click sur la roue
    document.querySelector('.chartholder').style.pointerEvents = 'auto';
});

// Fonction pour télécharger le coupon
document.getElementById('download-button').addEventListener('click', function() {
    const couponLabel = document.getElementById('result-popup').getAttribute('data-label');
    if (!couponLabel) {
        alert("Erreur : Aucun label disponible pour le coupon.");
        return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 200;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 30px Arial';
    ctx.fillStyle = '#1E22AA';
    ctx.textAlign = 'center';
    ctx.fillText('NOVOTEL', canvas.width / 2, 40);
    ctx.font = '20px Arial';
    ctx.fillStyle = '#000000';
    ctx.fillText(couponLabel, canvas.width / 2, 120);
    
    // Créer le lien de téléchargement
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'coupon_novotel.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Gestion de la sélection d'emoji
const emojis = document.querySelectorAll('.emoji');
const emojiRatingInput = document.getElementById('emoji-rating');

emojis.forEach(emoji => {
    emoji.addEventListener('click', function() {
        // Retirer la classe 'selected' des autres emojis
        emojis.forEach(e => e.classList.remove('selected'));

        // Ajouter la classe 'selected' à l'emoji cliqué
        this.classList.add('selected');

        // Enregistrer la valeur de l'emoji sélectionné dans le champ caché
        emojiRatingInput.value = this.getAttribute('data-value');
    });
});

// Validation du formulaire lors de l'envoi
document.getElementById('feedback-form').addEventListener('submit', function(event) {
    const emojiRating = document.getElementById('emoji-rating').value;
    const feedback = document.getElementById('feedback').value;

    // Vérifier que l'utilisateur a sélectionné un emoji et donné un avis
    if (!emojiRating || !feedback.trim()) {
        event.preventDefault();
        alert("Veuillez sélectionner un emoji et donner votre avis.");
        return;
    }

    // Cache le formulaire et démarre la roue
    document.getElementById('form-container').style.display = 'none';
    spin(); // Démarrer la roue (assurez-vous que cette fonction est définie dans 'roue.js')
});
