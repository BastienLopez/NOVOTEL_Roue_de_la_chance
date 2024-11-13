// Écouter l'événement personnalisé 'wheelEnd'
window.addEventListener('wheelEnd', function(event) {
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
}

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
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'coupon_novotel.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
