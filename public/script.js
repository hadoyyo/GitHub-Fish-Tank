const API_BASE = window.location.origin;

const usernameInput = document.getElementById('username');
const generateBtn = document.getElementById('generateBtn');
const bgColorInput = document.getElementById('bgColor');
const hideLanguagesInput = document.getElementById('hideLanguages');
const showLegendCheckbox = document.getElementById('showLegend');
const showDecorationsCheckbox = document.getElementById('showDecorations');
const showBubblesCheckbox = document.getElementById('showBubbles');
const showRocksCheckbox = document.getElementById('showRocks');
const showPlantsCheckbox = document.getElementById('showPlants');
const showCastleCheckbox = document.getElementById('showCastle');
const showChestCheckbox = document.getElementById('showChest');
const showShellCheckbox = document.getElementById('showShell');
const previewImg = document.getElementById('preview');
const loadingEl = document.getElementById('loading');
const generatedUrlInput = document.getElementById('generatedUrl');
const markdownCode = document.getElementById('markdownCode');
const rateLimitSpan = document.getElementById('rateLimit');
const colorValue = document.querySelector('.color-value');

function generateAquarium() {
  const username = usernameInput.value.trim();
  if (!username) {
    alert('Please enter a GitHub username');
    usernameInput.focus();
    return;
  }
  
  const bgColor = bgColorInput.value.substring(1); // Remove #
  const hide = hideLanguagesInput.value.trim();
  const showLegend = showLegendCheckbox.checked;
  const showDecorations = showDecorationsCheckbox.checked;
  const showBubbles = showBubblesCheckbox.checked;
  const showRocks = showRocksCheckbox.checked;
  const showPlants = showPlantsCheckbox.checked;
  const showCastle = showCastleCheckbox.checked;
  const showChest = showChestCheckbox.checked;
  const showShell = showShellCheckbox.checked;
  
  const params = new URLSearchParams({
    user: username,
    bg: bgColor,
    show_legend: showLegend,
    show_decorations: showDecorations,
    show_bubbles: showBubbles,
    show_rocks: showRocks,
    show_plants: showPlants,
    show_castle: showCastle,
    show_chest: showChest,
    show_shell: showShell
  });
  
  if (hide) {
    params.append('hide', hide);
  }
  
  const url = `${API_BASE}/api/generate?${params.toString()}`;
  
  loadingEl.style.display = 'block';
  previewImg.style.opacity = '0.5';
  generateBtn.disabled = true;
  generateBtn.textContent = 'LOADING...';
  
  previewImg.onload = () => {
    loadingEl.style.display = 'none';
    previewImg.style.opacity = '1';
    generateBtn.disabled = false;
    generateBtn.textContent = 'GENERATE';
  };
  
  previewImg.onerror = () => {
    loadingEl.style.display = 'none';
    previewImg.style.opacity = '1';
    generateBtn.disabled = false;
    generateBtn.textContent = 'GENERATE';
    alert('Error generating aquarium. Please check the username.');
  };
  
  previewImg.src = url;
  generatedUrlInput.value = url;
  markdownCode.textContent = `[![GitHub Fish Tank](${url})](https://github.com/${username})`;
}

function copyUrl() {
  generatedUrlInput.select();
  document.execCommand('copy');
  
  const btn = document.getElementById('copyBtn');
  const originalText = btn.textContent;
  btn.textContent = 'COPIED!';
  setTimeout(() => {
    btn.textContent = originalText;
  }, 2000);
}

async function checkRateLimit() {
  try {
    const response = await fetch(`${API_BASE}/api/rate-limit`);
    const data = await response.json();
    rateLimitSpan.textContent = `${data.remaining}/${data.limit} (resets ${new Date(data.reset).toLocaleTimeString()})`;
  } catch (error) {
    rateLimitSpan.textContent = 'Error checking limit';
  }
}

function updateColorValue() {
  if (colorValue) {
    colorValue.textContent = bgColorInput.value;
  }
}

generateBtn.addEventListener('click', generateAquarium);
usernameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateAquarium();
  }
});
bgColorInput.addEventListener('input', updateColorValue);

checkRateLimit();

setInterval(checkRateLimit, 30000);
