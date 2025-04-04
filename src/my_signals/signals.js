    /** Tracks the currently executing effect for dependency tracking in the signals system. */
    let currentRunningEffect = null;

    // Debug flag to enable/disable logging
    const DEBUG = true;

    /**
   * Helper function for logging if debug is enabled
   * @param {string} type - The type of operation being logged
   * @param {string} message - The message to log
   * @param {any} data - Optional data to log
   */
    function debugLog(type, message, data = undefined) {
      if (!DEBUG) return;
  
      const styles = {
        signal: 'background: #3498db; color: white; padding: 2px 4px; border-radius: 2px;',
        effect: 'background: #2ecc71; color: white; padding: 2px 4px; border-radius: 2px;',
        computed: 'background: #9b59b6; color: white; padding: 2px 4px; border-radius: 2px;',
      };
  
      if (data !== undefined) {
        console.log(`%c${type}%c ${message}`, styles[type] || '', '', data);
      } else {
        console.log(`%c${type}%c ${message}`, styles[type] || '', '');
      }
    }

    /**
   * Creates a signal with an initial value & provides methods to read, set, & update the value.
   * @param {any} initialValue - initial value of the signal.
   * @returns {object} object containing methods to read, set, and update the signal's value.
   */
    export function signal(initialValue) {
        let value = initialValue;
        // this could be a simple array, but we want to use a set to avoid duplicates
        const subscribers = new Set();
    
        // Create a name for this signal for better logging
        const signalId = `signal_${Math.floor(Math.random() * 10000)}`;
    
        debugLog('signal', 'Created new signal', { id: signalId, initialValue });

        function setData(newValue) {
            if (value === newValue) {
                debugLog('signal', `${signalId}: Value unchanged, skipping update`, { current: value, new: newValue });
                return;
            }
        
            debugLog('signal', `${signalId}: Value changing`, { from: value, to: newValue });
            value = newValue;
        
            // notify all subscribers
            debugLog('signal', `${signalId}: Notifying ${subscribers.size} subscribers`);
            subscribers.forEach(subscription => subscription());
        }

        function getData() {
            if (currentRunningEffect) {
                const wasAlreadySubscribed = subscribers.has(currentRunningEffect);
                subscribers.add(currentRunningEffect);
            
                if (!wasAlreadySubscribed) {
                    debugLog('signal', `${signalId}: New effect subscription added`, { 
                      subscribersCount: subscribers.size 
                    });
                }
            }
        
            debugLog('signal', `${signalId}: Value read`, value);
            return value;
        }

        function updateData(updateFunction) {
            const oldValue = value;
            const newValue = updateFunction(value);
            debugLog('signal', `${signalId}: Value updating via function`, { from: oldValue, to: newValue });
            setData(newValue);
        }

        return {
            getData,
            setData,
            updateData,
            // Add a debug method to inspect the signal
            debug: () => ({
                value,
                subscribersCount: subscribers.size
            })
        };
    }

    /**
   * Creates a computed signal that automatically updates when its dependencies change.
   * @param {Function} computeCallback - function that computes the value of the signal.
   * @returns {object} signal with read-only access to the computed value.
   */
    export function computed(computeCallback) {
        debugLog('computed', 'Creating computed signal');
    
        // Compute initial value and create signal
        const initialValue = computeCallback();
        const result = signal(initialValue);
    
        // Add a more descriptive ID for the computed signal
        const computedId = `computed_${Math.floor(Math.random() * 10000)}`;
    
        debugLog('computed', `${computedId}: Initial computation complete`, initialValue);

        // Track dependencies and update when they change
        effect(() => {
            const newValue = computeCallback();
            debugLog('computed', `${computedId}: Recomputing value`, { from: result.debug().value, to: newValue });
            result.setData(newValue);
        });

        // Return the signal with only the read capability and debug info
        return {
            getData: result.getData,
            debug: () => ({
                ...result.debug(),
                type: 'computed'
            })
        };
    }

    /**
   * Executes a callback function while tracking its dependencies for reactive updates.
   * Manages the current running effect to prevent circular dependencies.
   * @param {Function} effectCallback - function to execute with tracked dependencies.
   */
    export function effect(effectCallback) {
        const effectId = `effect_${Math.floor(Math.random() * 10000)}`;
        debugLog('effect', `${effectId}: Running effect`);
    
        const savedEffect = currentRunningEffect;
    
        // Wrap the effect callback to include logging
        const wrappedCallback = () => {
            debugLog('effect', `${effectId}: Effect triggered`);
            effectCallback();
            debugLog('effect', `${effectId}: Effect completed`);
        };
    
        // Save the current effect to avoid circular dependencies
        currentRunningEffect = wrappedCallback;
        wrappedCallback();
        currentRunningEffect = savedEffect;
    
        debugLog('effect', `${effectId}: Effect setup complete`);
    }

    /**
   * Helper function to demonstrate and log the core concepts of signals
   */
    export function demonstrateSignals() {
        console.log('%c--- SIGNALS DEMONSTRATION ---', 'font-weight: bold; font-size: 16px;');
    
        // 1. Create a basic signal
        const count = signal(0);
        console.log('Created count signal with initial value:', count.debug());
    
        // 2. Create a computed signal
        const doubledCount = computed(() => count.getData() * 2);
        console.log('Created doubledCount computed signal:', doubledCount.debug());
    
        // 3. Set up an effect
        effect(() => {
            console.log('Effect running with count =', count.getData(), 'and doubledCount =', doubledCount.getData());
        });
    
        // 4. Update the signal and observe the reactivity
        console.log('Updating count to 1...');
        count.setData(1);
    
        console.log('Updating count to 2...');
        count.setData(2);
    
        console.log('Updating count with updateData...');
        count.updateData(val => val + 3);
    
        console.log('%c--- DEMONSTRATION COMPLETE ---', 'font-weight: bold; font-size: 16px;');
    }