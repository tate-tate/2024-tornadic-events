import * as d3 from "d3";
import { projection } from './map.js'; // Import projection from map.js
console.log('Projection in tornadoShape.js:', projection);
export function createTornadoShape(data) {
    const tornadoContainer = d3.select("#tornadoShape");

    const width = tornadoContainer.node().offsetWidth;
    const height = tornadoContainer.node().offsetHeight;

    tornadoContainer.selectAll(".tornado-dot")
        .data(data)
        .enter()
        .append("div")
        .attr("class", "tornado-dot")
        .style("left", (d, i) => {
            const level = i / data.length;
            const maxWidthAtLevel = width * 0.6 * (1 - level);
            return `${(width / 2) - (maxWidthAtLevel / 2) + Math.random() * maxWidthAtLevel}px`;
        })
        .style("top", (d, i) => `${(i / data.length) * height}px`)
        .style("opacity", 0.8);
}

export function animateDotsToMap(data, projection) {
    if (!projection) {
        console.error('Projection is not defined in animateDotsToMap.');
        return;
    }

    const tornadoDots = d3.selectAll(".tornado-dot");
    const tornadoShapeBounds = document.getElementById("tornadoShape").getBoundingClientRect();
    const mapBounds = document.getElementById("map").getBoundingClientRect();

    tornadoDots.transition()
        .duration(2000)
        .style("left", d => {
            const coords = projection([d.BEGIN_LON, d.BEGIN_LAT]);
            return coords ? `${coords[0] + mapBounds.left - tornadoShapeBounds.left}px` : "0px";
        })
        .style("top", d => {
            const coords = projection([d.BEGIN_LON, d.BEGIN_LAT]);
            return coords ? `${coords[1] + mapBounds.top - tornadoShapeBounds.top}px` : "0px";
        })
        .style("opacity", 0)
        .on("end", function () {
            d3.select(this).remove();
        });
}