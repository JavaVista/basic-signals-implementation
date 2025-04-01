# Basic Signals Implementation - Code Camp 2025 Demo

This repository contains the demo code for the talk **"Fine-Grained Reactivity with Signals"** presented by Javier Carrion at **Code Camp 2025**.

It provides a minimal, from-scratch implementation of the 'signals' pattern in plain JavaScript to illustrate the core concepts of fine-grained reactivity without relying on a specific framework.

## Purpose

The goal of this demo is to showcase:

1. **Observable State (`signal`):** How to create reactive state variables whose changes can be tracked.

2. **Side Effects (`effect`):** How to run code (like updating the DOM) automatically whenever a signal it depends on changes.

3. **Computed/Derived State (`computed`):** How to create signals whose values are derived from other signals and automatically update when their dependencies change.

4. **Practical Examples:** Simple UI patterns implemented using these core primitives.

## Demo Examples Included

The `index.html` and `src/index.js` files demonstrate:

* **Counter:** A simple button that increments a counter signal, with the UI updating automatically via an effect.

* **Computed Total:** Calculating a total price based on reactive `price` and `quantity` signals. Changing the quantity input updates the total automatically.

* **Basic Two-Way Binding:** An input field updates a `name` signal, and a separate display area updates automatically via an effect whenever the name signal changes.

## Code Structure

* `src/index.html`: The main HTML file containing the UI elements for the demos.

* `src/index.js`: Sets up the signals, effects, computed values, and event listeners for the UI examples.

* `src/my_signals/signals.js`: Contains the fundamental, simplified implementation of `signal`, `effect`, and `computed`.


## How to Run

This project is set up using Parcel.

1. **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    ```

2. **Navigate to the project directory:**

    ```bash
    cd basic-signals-implementation
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

    *(Or `yarn install` if you prefer yarn)*

4. **Start the development server:**

    ```bash
    npm start
    ```

    *(Or `yarn start`)*

This will start the Parcel development server in your default web browser at `http://localhost:1234`. Alternatively, you can use a simple local server like the VS Code Live Server extension or `npx serve`.

---

## About the Presenter / Contact

Feel free to connect or reach out!

* **Presenter:** Javier 'Javi' Carrion

* **Twitter:** [@seetechnologic](https://twitter.com/seetechnologic)

* **GitHub:** [JavaVista](https://github.com/JavaVista/)

* **LinkedIn:** [Javier Carrion](https://www.linkedin.com/in/technologic)

* **GDG Central Florida Discord:** [Join the Community](https://discord.gg/4v5wPtPt)

Thanks for attending the talk!
