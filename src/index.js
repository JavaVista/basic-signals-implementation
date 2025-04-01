import { signal, effect, computed } from './my_signals/signals.js';

// Observable State and Side Effects
const counter = signal(0);  // Observable state
const counterValueDisplay = document.getElementById('counterValue');
const incrementButton = document.getElementById('incrementButton');

function incrementCounter() {
    console.log('Incrementing counter...');
    counter.updateData(value => value + 1);  // Update state
}

effect(() => {  // Side effect
    counterValueDisplay.textContent = counter.readData(); // Read state, update UI
});

incrementButton.addEventListener('click', incrementCounter);

// Computed Value
const price = signal(10);     // Observable state
const quantity = signal(2);  // Observable state
const total = computed(() => price.readData() * quantity.readData());    //  Calculate Computed value
const quantityInput = document.getElementById('quantityInput');
const totalValueDisplay = document.getElementById('totalValue');

effect(() => {
    totalValueDisplay.textContent = total.readData(); // Update UI
});

quantityInput.addEventListener('input', (event) => {
    quantity.setData(parseInt(event.target.value, 10) || 0);
});

// Two-Way Binding
const nameSignal = signal('');  // Observable state
const nameInput = document.getElementById('nameInput');
const displayNameDisplay = document.getElementById('displayName');

effect(() => {  // Side effect
    displayNameDisplay.textContent = nameSignal.readData(); // Update UI
});

nameInput.addEventListener('input', (event) => {
    nameSignal.setData(event.target.value); // Update state
});