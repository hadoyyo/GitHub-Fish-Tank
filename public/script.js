const API_BASE = window.location.origin;

const usernameInput = document.getElementById('username');
const generateBtn = document.getElementById('generateBtn');
const bgColorInput = document.getElementById('bgColor');
const frameColorInput = document.getElementById('frameColor');
const showFrameCheckbox = document.getElementById('showFrame');
const sandColorInput = document.getElementById('sandColor');
const hideLanguagesInput = document.getElementById('hideLanguages');
const showLegendCheckbox = document.getElementById('showLegend');
const showBubblesCheckbox = document.getElementById('showBubbles');
const showRocksCheckbox = document.getElementById('showRocks');
const showPlantsCheckbox = document.getElementById('showPlants');
const showCastleCheckbox = document.getElementById('showCastle');
const showChestCheckbox = document.getElementById('showChest');
const showShellCheckbox = document.getElementById('showShell');
const previewImg = document.getElementById('preview');
const previewContainer = document.querySelector('.preview-container');
const loadingEl = document.getElementById('loading');
const generatedUrlInput = document.getElementById('generatedUrl');
const markdownCode = document.getElementById('markdownCode');
const rateLimitSpan = document.getElementById('rateLimit');
const urlSection = document.getElementById('urlSection');
const bgColorValue = document.getElementById('bgColorValue');
const frameColorValue = document.getElementById('frameColorValue');
const sandColorValue = document.getElementById('sandColorValue');

function generateAquarium() {
  const username = usernameInput.value.trim();
  if (!username) {
    alert('Please enter a GitHub username');
    usernameInput.focus();
    return;
  }
  
  const bgColor = bgColorInput.value.substring(1);
  const frameColor = frameColorInput.value.substring(1);
  const sandColor = sandColorInput.value.substring(1);
  const hide = hideLanguagesInput.value.trim();
  const showLegend = showLegendCheckbox.checked;
  const showBubbles = showBubblesCheckbox.checked;
  const showRocks = showRocksCheckbox.checked;
  const showPlants = showPlantsCheckbox.checked;
  const showCastle = showCastleCheckbox.checked;
  const showChest = showChestCheckbox.checked;
  const showShell = showShellCheckbox.checked;
  const showFrame = showFrameCheckbox.checked;
  
  const params = new URLSearchParams({
    user: username,
    bg: bgColor,
    frame: frameColor,
    sand: sandColor,
    show_legend: showLegend,
    show_bubbles: showBubbles,
    show_rocks: showRocks,
    show_plants: showPlants,
    show_castle: showCastle,
    show_chest: showChest,
    show_shell: showShell,
    show_frame: showFrame
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
    previewContainer.classList.add('has-image');
    generateBtn.disabled = false;
    generateBtn.textContent = 'GENERATE';
    urlSection.style.display = 'block';
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

function updateBgColorValue() {
  if (bgColorValue) {
    bgColorValue.textContent = bgColorInput.value;
  }
}

function updateFrameColorValue() {
  if (frameColorValue) {
    frameColorValue.textContent = frameColorInput.value;
  }
}

function updateSandColorValue() {
  if (sandColorValue) {
    sandColorValue.textContent = sandColorInput.value;
  }
}

generateBtn.addEventListener('click', generateAquarium);
usernameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateAquarium();
  }
});
bgColorInput.addEventListener('input', updateBgColorValue);
frameColorInput.addEventListener('input', updateFrameColorValue);
sandColorInput.addEventListener('input', updateSandColorValue);

checkRateLimit();

setInterval(checkRateLimit, 30000);
