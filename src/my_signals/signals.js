
/** Tracks the currently executing effect for dependency tracking in the signals system. */
let currentRunningEffect = null;

/**
 * Creates a signal with an initial value & provides methods to read, set, & update the value.
 * @param {any} initialValue - initial value of the signal.
 * @returns {object} object containing methods to read, set, and update the signal's value.
 */
export function signal(initialValue) {
    let value = initialValue;
    // this could be a simple array, but we want to use a set to avoid duplicates
    const subscribers = new Set();

    function setData(newValue) {
        if (value === newValue) return;
        value = newValue;
        // notify all subscribers
        subscribers.forEach(subscription => subscription());
    }

    function getData() {
        if (currentRunningEffect) {
            subscribers.add(currentRunningEffect);
        }
        return value;
    }

    function updateData(updateFunction) {
        const newValue = updateFunction(value);
        setData(newValue); 
    }

    return {
        readData: getData,
        setData,
        updateData,
    };
}

/**
 * Creates a computed signal that automatically updates when its dependencies change.
 * @param {Function} computeCallback - function that computes the value of the signal.
 * @returns {object} signal with read-only access to the computed value.
 */
export function computed(computeCallback) {
    const result = signal(computeCallback());

    // Track dependencies and update when they change
    effect(() => {
        result.setData(computeCallback());
    });

    // Return the signal with only the read capability
    return {
        readData: result.readData
    };
}

/**
 * Executes a callback function while tracking its dependencies for reactive updates.
 * Manages the current running effect to prevent circular dependencies.
 * @param {Function} effectCallback - function to execute with tracked dependencies.
 */
export function effect(effectCallback) {
    const savedEffect = currentRunningEffect;
    // Save the current effect to avoid circular dependencies
    currentRunningEffect = effectCallback;
    effectCallback();
    currentRunningEffect = savedEffect;
}