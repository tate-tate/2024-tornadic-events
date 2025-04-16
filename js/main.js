import { processData } from './dataProcessing.js';
import { createMap, projection } from './map.js'; // Import projection
import { createTornadoShape, animateDotsToMap } from './tornadoShape.js';
import { updateStateStats } from './stateStats.js';
import { initializeTooltip } from './tooltip.js';
import * as d3 from "d3";


document.addEventListener("DOMContentLoaded", () => {
    let data;
    let currentStrengthFilter = "all";

    // Light/Dark Mode Toggle
    const toggleModeButton = document.getElementById("toggleMode");
    toggleModeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Initialize tooltip
    initializeTooltip();

    // Load and process data
    d3.csv("data/2024weatherdata.csv").then(csvData => {
        data = processData(csvData);

        // Update state-specific statistics for all data
        updateStateStats(data, "all");

        // Create the tornado shape
        createTornadoShape(data);

        // Load map and add dropdown functionality
        d3.json("data/us-states.json").then(us => {
            createMap(us, data, currentStrengthFilter);
        
            // Add scroll event listener only after the map is initialized
            let mapInitialized = true; // Flag to ensure map is ready
            window.addEventListener("scroll", () => {
                if (!mapInitialized) return;
        
                const tornadoShape = document.getElementById("tornadoShape");
                const rect = tornadoShape.getBoundingClientRect();
        
                if (rect.bottom < window.innerHeight) {
                    animateDotsToMap(data, projection);
                }
            });
        });
    });
});