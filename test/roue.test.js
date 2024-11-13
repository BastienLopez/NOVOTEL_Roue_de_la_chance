const { spin, showResultPopup } = require('../js/script.js');

document.body.innerHTML = `
  <div id="chart"></div>
  <div id="result-popup" class="hidden">
    <span id="close-popup">&times;</span>
    <p id="result-message"></p>
    <button id="download-button">Télécharger le coupon</button>
  </div>
  <div class="chartholder"></div>
`;

describe('Roue de la chance', () => {
  test('La roue tourne et choisit un résultat', () => {
    const result = spin();
    expect(result).toBeDefined();
  });

  test('Affichage de la popup', () => {
    const label = "Coupon -5%";
    const message = "Bravo ! Vous avez gagné un coupon d'une valeur de 5% sur votre prochain achat";
    showResultPopup(label, message);

    const popup = document.getElementById('result-popup');
    const messageElem = document.getElementById('result-message');

    expect(popup.style.display).toBe('block');
    expect(messageElem.textContent).toBe(message);
  });

  test('Fermeture de la popup', () => {
    const closePopupBtn = document.getElementById('close-popup');
    closePopupBtn.click();

    const popup = document.getElementById('result-popup');
    expect(popup.style.display).toBe('none');
  });
});
