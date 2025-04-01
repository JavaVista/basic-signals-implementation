
let currentRunningEffect = null;

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

    function readData() {
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
        readData,
        setData,
        updateData,
    };
}

export function computed(fn) {
    const result = signal(fn());

    // Track dependencies and update when they change
    effect(() => {
        result.setData(fn());
    });

    // Return the signal with only the read capability
    return {
        readData: result.readData
    };
}

export function effect(callbackFunction) {
    const savedEffect = currentRunningEffect;
    // Save the current effect to avoid circular dependencies
    currentRunningEffect = callbackFunction;
    callbackFunction();
    currentRunningEffect = savedEffect;
}