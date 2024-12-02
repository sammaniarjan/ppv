// script.js

// Select DOM elements
const populationInput = document.getElementById('population');
const specificitySlider = document.getElementById('specificity');
const specificityValue = document.getElementById('specificity-value');
const prevalenceSlider = document.getElementById('prevalence');
const prevalenceValue = document.getElementById('prevalence-value');
const calculateButton = document.getElementById('calculate');
const resultContainer = document.getElementById('result');
const ppvResult = document.getElementById('ppv-result');
const truePositivesResult = document.getElementById('true-positives');
const falsePositivesResult = document.getElementById('false-positives');

// Update slider display values
specificitySlider.addEventListener('input', () => {
  specificityValue.textContent = specificitySlider.value;
});

prevalenceSlider.addEventListener('input', () => {
  prevalenceValue.textContent = prevalenceSlider.value;
});

// Perform calculations on button click
calculateButton.addEventListener('click', () => {
  const population = parseInt(populationInput.value);
  const specificity = parseFloat(specificitySlider.value) / 100;
  const prevalence = parseFloat(prevalenceSlider.value) / 100;
  const sensitivity = 0.9; // Assuming fixed sensitivity of 90%

  if (population > 0) {
    const { ppv, truePositives, falsePositives } = calculatePPV(population, prevalence, sensitivity, specificity);

    // Update results
    ppvResult.textContent = (ppv * 100).toFixed(2);
    truePositivesResult.textContent = truePositives;
    falsePositivesResult.textContent = falsePositives;

    // Show results
    resultContainer.style.display = 'block';
  } else {
    alert('Voer een geldige populatiegrootte in.');
  }
});

// Calculate PPV and totals
function calculatePPV(population, prevalence, sensitivity, specificity) {
  const trueCases = population * prevalence; // True cases in population
  const truePositives = Math.round(sensitivity * trueCases);
  const falsePositives = Math.round((1 - specificity) * (population - trueCases));
  const ppv = truePositives / (truePositives + falsePositives);

  return {
    ppv: ppv || 0,
    truePositives: truePositives || 0,
    falsePositives: falsePositives || 0,
  };
}