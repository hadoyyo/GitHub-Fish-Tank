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
  if (this.checked && showPlantsAltCheckbox) {
    showPlantsAltCheckbox.checked = false;
  }
});

showPlantsAltCheckbox.addEventListener('change', function() {
  if (this.checked && showPlantsCheckbox) {
    showPlantsCheckbox.checked = false;
  }
});

showCastleCheckbox.addEventListener('change', function() {
  if (this.checked && showShipCheckbox) {
    showShipCheckbox.checked = false;
  }
});

showShipCheckbox.addEventListener('change', function() {
  if (this.checked && showCastleCheckbox) {
    showCastleCheckbox.checked = false;
  }
});

showChestCheckbox.addEventListener('change', function() {
  if (this.checked && showAnubiasCheckbox) {
    showAnubiasCheckbox.checked = false;
  }
});

showAnubiasCheckbox.addEventListener('change', function() {
  if (this.checked && showChestCheckbox) {
    showChestCheckbox.checked = false;
  }
});

showShellCheckbox.addEventListener('change', function() {
  if (this.checked && showStatueCheckbox) {
    showStatueCheckbox.checked = false;
  }
});

showStatueCheckbox.addEventListener('change', function() {
  if (this.checked && showShellCheckbox) {
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
  
  loadingEl.style.display = 'flex';
  previewImg.style.opacity = '0';
  generateBtn.disabled = true;
  generateBtn.querySelector('span').textContent = 'DIVING IN...';
  
  const startTime = Date.now();
  
  const finishLoading = () => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, 450 - elapsed);
    
    setTimeout(() => {
      loadingEl.style.display = 'none';
      previewImg.style.opacity = '1';
      generateBtn.disabled = false;
      generateBtn.querySelector('span').textContent = 'GENERATE AQUARIUM';
    }, remaining);
  };
  
  previewImg.onload = () => {
    finishLoading();
    previewContainer.classList.add('has-image');
    urlSection.style.display = 'block';
    previewSection.style.display = 'block';
    previewSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };
  
  previewImg.onerror = () => {
    finishLoading();
    alert('Error generating aquarium. Please check the username.');
  };
  
  previewImg.src = url;
  generatedUrlInput.value = url;
  markdownCode.textContent = `[![GitHub Fish Tank](${url})](https://github.com/hadoyyo/GitHub-Fish-Tank)`;
}

function copyUrl() {
  if (!generatedUrlInput.value) return;
  generatedUrlInput.select();
  navigator.clipboard.writeText(generatedUrlInput.value).then(() => {
    const btn = document.getElementById('copyBtn');
    const originalText = btn.textContent;
    btn.textContent = 'COPIED!';
    setTimeout(() => {
      btn.textContent = originalText;
    }, 2000);
  }).catch(() => {
    document.execCommand('copy');
  });
}

function copyMarkdown() {
  if (!markdownCode.textContent) return;
  navigator.clipboard.writeText(markdownCode.textContent).then(() => {
    const btn = document.getElementById('copyMarkdownBtn');
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = 'COPIED!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    }
  });
}

function openSvgNewTab() {
  if (generatedUrlInput && generatedUrlInput.value) {
    window.open(generatedUrlInput.value, '_blank');
  }
}

function fillUser(name) {
  if (usernameInput) {
    usernameInput.value = name;
    generateAquarium();
  }
}

function applyPreset(bg, frame, sand) {
  if (bgColorInput) {
    bgColorInput.value = bg;
    updateBgColorValue();
  }
  if (frameColorInput) {
    frameColorInput.value = frame;
    updateFrameColorValue();
  }
  if (sandColorInput) {
    sandColorInput.value = sand;
    updateSandColorValue();
  }
  if (usernameInput.value.trim()) {
    generateAquarium();
  }
}

function updateBgColorValue() {
  if (bgColorValue && bgColorInput) {
    bgColorValue.textContent = bgColorInput.value;
    const dot = document.getElementById('bgColorDot');
    if (dot) dot.style.backgroundColor = bgColorInput.value;
  }
}

function updateFrameColorValue() {
  if (frameColorValue && frameColorInput) {
    frameColorValue.textContent = frameColorInput.value;
    const dot = document.getElementById('frameColorDot');
    if (dot) dot.style.backgroundColor = frameColorInput.value;
  }
}

function updateSandColorValue() {
  if (sandColorValue && sandColorInput) {
    sandColorValue.textContent = sandColorInput.value;
    const dot = document.getElementById('sandColorDot');
    if (dot) dot.style.backgroundColor = sandColorInput.value;
  }
}

const frameColorGroup = document.getElementById('frameColorGroup');
const frameToggleGroup = document.getElementById('frameToggleGroup');

function updateFrameColorAvailability() {
  if (!frameColorGroup || !showFrameCheckbox) return;
  if (showFrameCheckbox.checked) {
    frameColorGroup.classList.remove('is-disabled');
  } else {
    frameColorGroup.classList.add('is-disabled');
  }
}

let frameAlertTimeout;
function highlightFrameSwitch() {
  if (!frameToggleGroup) return;
  frameToggleGroup.classList.remove('highlight-error');
  void frameToggleGroup.offsetWidth;
  frameToggleGroup.classList.add('highlight-error');
  
  clearTimeout(frameAlertTimeout);
  frameAlertTimeout = setTimeout(() => {
    frameToggleGroup.classList.remove('highlight-error');
  }, 900);
}

function setColor(inputId, colorHex) {
  if (inputId === 'frameColor' && showFrameCheckbox && !showFrameCheckbox.checked) {
    highlightFrameSwitch();
    return;
  }
  const input = document.getElementById(inputId);
  if (input) {
    input.value = colorHex;
    if (inputId === 'bgColor') updateBgColorValue();
    if (inputId === 'frameColor') updateFrameColorValue();
    if (inputId === 'sandColor') updateSandColorValue();
    if (usernameInput && usernameInput.value.trim() && previewSection && previewSection.style.display !== 'none') {
      generateAquarium();
    }
  }
}

document.querySelectorAll('.hidden-color-input').forEach(input => {
  const container = input.closest('.color-picker-container');
  if (!container) return;
  input.addEventListener('click', () => {
    container.classList.add('is-open');
  });
  input.addEventListener('change', () => {
    container.classList.remove('is-open');
  });
  input.addEventListener('blur', () => {
    container.classList.remove('is-open');
  });
});

if (frameColorGroup) {
  frameColorGroup.addEventListener('click', (e) => {
    if (showFrameCheckbox && !showFrameCheckbox.checked) {
      e.preventDefault();
      highlightFrameSwitch();
    }
  });
}

if (showFrameCheckbox) {
  showFrameCheckbox.addEventListener('change', () => {
    updateFrameColorAvailability();
    if (usernameInput && usernameInput.value.trim() && previewSection && previewSection.style.display !== 'none') {
      generateAquarium();
    }
  });
}

updateFrameColorAvailability();

if (markdownCode) {
  markdownCode.addEventListener('click', copyMarkdown);
}

generateBtn.addEventListener('click', generateAquarium);
usernameInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    generateAquarium();
  }
});

bgColorInput.addEventListener('input', () => {
  updateBgColorValue();
});
bgColorInput.addEventListener('change', () => {
  updateBgColorValue();
  if (usernameInput && usernameInput.value.trim() && previewSection && previewSection.style.display !== 'none') {
    generateAquarium();
  }
});

frameColorInput.addEventListener('input', () => {
  if (showFrameCheckbox && !showFrameCheckbox.checked) return;
  updateFrameColorValue();
});
frameColorInput.addEventListener('change', () => {
  if (showFrameCheckbox && !showFrameCheckbox.checked) {
    highlightFrameSwitch();
    return;
  }
  updateFrameColorValue();
  if (usernameInput && usernameInput.value.trim() && previewSection && previewSection.style.display !== 'none') {
    generateAquarium();
  }
});

sandColorInput.addEventListener('input', () => {
  updateSandColorValue();
});
sandColorInput.addEventListener('change', () => {
  updateSandColorValue();
  if (usernameInput && usernameInput.value.trim() && previewSection && previewSection.style.display !== 'none') {
    generateAquarium();
  }
});
