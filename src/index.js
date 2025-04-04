
import { demonstrateSignals } from './my_signals/signals.js';

// Run the demonstration
demonstrateSignals();

// Observable State and Side Effects
const counter = signal(0);  // Observable state
const counterValueDisplay = document.getElementById('counterValue');
const incrementButton = document.getElementById('incrementButton');

function incrementCounter() {
    console.log('Incrementing counter...');
    counter.updateData(value => value + 1);  // Update state
}

effect(() => {  // Side effect
    counterValueDisplay.textContent = counter.getData(); // Read state, update UI
});

incrementButton.addEventListener('click', incrementCounter);

// Computed Value
const price = signal(10);     // Observable state
const quantity = signal(2);  // Observable state
const total = computed(() => price.getData() * quantity.getData());    //  Calculate Computed value
const quantityInput = document.getElementById('quantityInput');
const totalValueDisplay = document.getElementById('totalValue');

effect(() => {
    totalValueDisplay.textContent = total.getData(); // Update UI
});

quantityInput.addEventListener('input', (event) => {
    quantity.setData(parseInt(event.target.value, 10) || 0);
});

// Two-Way Binding
const nameSignal = signal('');  // Observable state
const nameInput = document.getElementById('nameInput');
const displayNameDisplay = document.getElementById('displayName');

effect(() => {  // Side effect
    displayNameDisplay.textContent = nameSignal.getData(); // Update UI
});

nameInput.addEventListener('input', (event) => {
    nameSignal.setData(event.target.value); // Update state
});