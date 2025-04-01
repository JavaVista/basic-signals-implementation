
let currentRunningEffect = null;

export function signal(initialValue) {
    let value = initialValue;
    // this could be a simple array, but we want to use a set to avoid duplicates
    const subscribers = new Set();

    function setData(newValue) {
        value = newValue;
        // notify all subscribers
        subscribers.forEach(subscription => subscription());
    }

    function readData() {
        if(currentRunningEffect) {
            subscribers.add(currentRunningEffect);
            currentRunningEffect = null;
        }
        return value;
    }
}