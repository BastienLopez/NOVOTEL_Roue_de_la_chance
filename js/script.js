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

        const chartholder = document.querySelector('.chartholder');
        if (chartholder) {
            chartholder.style.pointerEvents = 'none';
        }
    }
}

// Initialisation des écouteurs d'événements lorsque le DOM est chargé
function initializeEventListeners() {
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

    const feedbackForm = document.getElementById('feedback-form');
    const confirmationContainer = document.getElementById('confirmation-message');

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const emojiRating = emojiRatingInput?.value;
            const feedback = document.getElementById('feedback')?.value;
            const email = document.getElementById('email')?.value;

            // Vérifier que tous les champs sont remplis
            if (!emojiRating || !feedback.trim() || !email.trim()) {
                alert("Veuillez sélectionner un emoji, entrer votre email et donner votre avis.");
                return;
            }

            // Vérifier que l'avis contient au moins 50 caractères
            if (feedback.length < 50) {
                alert("Votre avis doit contenir au moins 50 caractères.");
                return;
            }

            // Construire le lien mailto pour envoyer l'email
            const subject = encodeURIComponent("Avis client - NOVOTEL Reims Tinqueux");
            const body = encodeURIComponent(
                `Emoji sélectionné : ${emojiRating}\nEmail : ${email}\nAvis : ${feedback}`
            );
            const mailtoLink = `mailto:citame7356@operades.com?subject=${subject}&body=${body}`;

            // Ouvrir le lien mailto pour envoyer l'email
            window.location.href = mailtoLink;

            // Afficher le message de confirmation avec les détails du mail
            if (confirmationContainer) {
                confirmationContainer.innerHTML = `
                    <h3>Merci ! Votre avis a bien été envoyé.</h3>
                    <p><strong>Email :</strong> ${email}</p>
                    <p><strong>Emoji sélectionné :</strong> ${emojiRating}</p>
                    <p><strong>Avis :</strong> ${feedback}</p>
                `;
                confirmationContainer.style.display = 'block';
            }

            // Rediriger vers la page de la roue après un délai
            setTimeout(() => {
                window.location.href = 'roue.html';
            }, 100);
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
