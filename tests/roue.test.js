const { showResultPopup, initializeEventListeners } = require('../js/script.js');

beforeEach(() => {
    document.body.innerHTML = `
        <div id="result-popup" class="hidden">
            <span id="close-popup" class="close-btn">&times;</span>
            <p id="result-message"></p>
            <button id="download-button">Télécharger le coupon</button>
        </div>
    `;
    initializeEventListeners();
});

test('Affichage de la popup après le spin', () => {
    showResultPopup("Coupon -10%", "Vous avez gagné 10% de réduction !");
    const popup = document.getElementById('result-popup');
    expect(popup.style.display).toBe('block');
});

test('Fermeture de la popup', () => {
    const closePopupBtn = document.getElementById('close-popup');
    const popup = document.getElementById('result-popup');
    popup.style.display = 'block';
    closePopupBtn.click();
    expect(popup.style.display).toBe('none');
});
