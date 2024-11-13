// Écouter l'événement personnalisé 'wheelEnd'
window.addEventListener('wheelEnd', function (event) {
    const { label, message } = event.detail;
    showResultPopup(label, message);
});

// Fonction pour afficher la popup après le spin
function showResultPopup(label, message) {
    const popup = document.getElementById('result-popup');
    const messageElem = document.getElementById('result-message');

    if (popup && messageElem) {
        messageElem.textContent = message;
        popup.setAttribute('data-label', label);
        popup.style.display = 'block';

        // Désactiver le click sur la roue pour éviter de relancer le spin
        const chartholder = document.querySelector('.chartholder');
        if (chartholder) {
            chartholder.style.pointerEvents = 'none';
        }
    }
}

// Initialisation des écouteurs d'événements lorsque le DOM est chargé
function initializeEventListeners() {
    // Fonction pour fermer la popup et réactiver le click sur la roue
    const closePopupBtn = document.getElementById('close-popup');
    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', function () {
            const popup = document.getElementById('result-popup');
            if (popup) {
                popup.style.display = 'none';
            }

            const chartholder = document.querySelector('.chartholder');
            if (chartholder) {
                chartholder.style.pointerEvents = 'auto';
            }
        });
    }

    // Fonction pour télécharger le coupon
    const downloadButton = document.getElementById('download-button');
    if (downloadButton) {
        downloadButton.addEventListener('click', function () {
            const couponLabel = document.getElementById('result-popup')?.getAttribute('data-label');
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

            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = 'coupon_novotel.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // Gestion de la sélection d'emoji
    const emojis = document.querySelectorAll('.emoji');
    const emojiRatingInput = document.getElementById('emoji-rating');

    if (emojis && emojiRatingInput) {
        emojis.forEach(emoji => {
            emoji.addEventListener('click', function () {
                emojis.forEach(e => e.classList.remove('selected'));
                this.classList.add('selected');
                emojiRatingInput.value = this.getAttribute('data-value');
            });
        });
    }

    // Validation du formulaire lors de l'envoi
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function (event) {
            const emojiRating = document.getElementById('emoji-rating')?.value;
            const feedback = document.getElementById('feedback')?.value;

            if (!emojiRating || !feedback.trim()) {
                event.preventDefault();
                alert("Veuillez sélectionner un emoji et donner votre avis.");
                return;
            }

            document.getElementById('form-container').style.display = 'none';
            spin(); // Démarrer la roue (assurez-vous que cette fonction est définie dans 'roue.js')
        });
    }
}

// Initialiser les écouteurs lorsque le DOM est chargé
if (typeof window !== 'undefined' && document.readyState !== 'loading') {
    initializeEventListeners();
} else {
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
}

// Exporter les fonctions pour les tests
module.exports = { showResultPopup, initializeEventListeners };
