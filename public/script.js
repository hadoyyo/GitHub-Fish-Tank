const API_BASE = window.location.origin;

const usernameInput = document.getElementById('username');
const generateBtn = document.getElementById('generateBtn');
const bgColorInput = document.getElementById('bgColor');
const frameColorInput = document.getElementById('frameColor');
const showFrameCheckbox = document.getElementById('showFrame');
const sandColorInput = document.getElementById('sandColor');
const hideLanguagesInput = document.getElementById('hideLanguages');
const showLegendCheckbox = document.getElementById('showLegend');
const showLanguageLabelsCheckbox = document.getElementById('showLanguageLabels');
const showBubblesCheckbox = document.getElementById('showBubbles');
const showRocksCheckbox = document.getElementById('showRocks');
const showPlantsCheckbox = document.getElementById('showPlants');
const showPlantsAltCheckbox = document.getElementById('showPlantsAlt');
const showCastleCheckbox = document.getElementById('showCastle');
const showShipCheckbox = document.getElementById('showShip');
const showChestCheckbox = document.getElementById('showChest');
const showShellCheckbox = document.getElementById('showShell');
const showAnubiasCheckbox = document.getElementById('showAnubias');
const showStatueCheckbox = document.getElementById('showStatue');
const previewImg = document.getElementById('preview');
const previewContainer = document.querySelector('.preview-container');
const loadingEl = document.getElementById('loading');
const generatedUrlInput = document.getElementById('generatedUrl');
const markdownCode = document.getElementById('markdownCode');
const urlSection = document.getElementById('urlSection');
const previewSection = document.getElementById('previewSection');
const bgColorValue = document.getElementById('bgColorValue');
const frameColorValue = document.getElementById('frameColorValue');
const sandColorValue = document.getElementById('sandColorValue');

showPlantsCheckbox.addEventListener('change', function() {
    if (this.checked) {
        showPlantsAltCheckbox.checked = false;
    }
});

showPlantsAltCheckbox.addEventListener('change', function() {
    if (this.checked) {
        showPlantsCheckbox.checked = false;
    }
});

showCastleCheckbox.addEventListener('change', function() {
    if (this.checked) {
        showShipCheckbox.checked = false;
    }
});

showShipCheckbox.addEventListener('change', function() {
    if (this.checked) {
        showCastleCheckbox.checked = false;
    }
});

showChestCheckbox.addEventListener('change', function() {
    if (this.checked) {
        showAnubiasCheckbox.checked = false;
    }
});

showAnubiasCheckbox.addEventListener('change', function() {
    if (this.checked) {
        showChestCheckbox.checked = false;
    }
});

showShellCheckbox.addEventListener('change', function() {
    if (this.checked) {
        showStatueCheckbox.checked = false;
    }
});

showStatueCheckbox.addEventListener('change', function() {
    if (this.checked) {
        showShellCheckbox.checked = false;
    }
});

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
  const showLanguageLabels = showLanguageLabelsCheckbox.checked;
  const showBubbles = showBubblesCheckbox.checked;
  const showRocks = showRocksCheckbox.checked;
  const showPlants = showPlantsCheckbox.checked;
  const showPlantsAlt = showPlantsAltCheckbox.checked;
  const showCastle = showCastleCheckbox.checked;
  const showShip = showShipCheckbox.checked;
  const showChest = showChestCheckbox.checked;
  const showShell = showShellCheckbox.checked;
  const showFrame = showFrameCheckbox.checked;
  const showAnubias = showAnubiasCheckbox.checked;
  const showStatue = showStatueCheckbox.checked;
  
  const params = new URLSearchParams({
    user: username,
    bg: bgColor,
    frame: frameColor,
    sand: sandColor,
    show_legend: showLegend,
    show_language_labels: showLanguageLabels,
    show_bubbles: showBubbles,
    show_rocks: showRocks,
    show_plants: showPlants,
    show_plants_alt: showPlantsAlt,
    show_castle: showCastle,
    show_ship: showShip,
    show_chest: showChest,
    show_shell: showShell,
    show_frame: showFrame,
    show_anubias: showAnubias,
    show_statue: showStatue
  });
  
  if (hide) {
    params.append('hide', hide);
  }
  
  const url = `${API_BASE}/api/generate?${params.toString()}`;
  
  loadingEl.style.display = 'block';
  previewImg.style.opacity = '0';
  generateBtn.disabled = true;
  generateBtn.textContent = 'LOADING...';
  
  const startTime = Date.now();
  
  const finishLoading = () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, 500 - elapsed);
    
    setTimeout(() => {
      loadingEl.style.display = 'none';
      previewImg.style.opacity = '1';
      generateBtn.disabled = false;
      generateBtn.textContent = 'GENERATE';
    }, remaining);
  };
  
  previewImg.onload = () => {
    finishLoading();
    previewContainer.classList.add('has-image');
    urlSection.style.display = 'block';
    previewSection.style.display = 'block';
  };
  
  previewImg.onerror = () => {
    finishLoading();
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