import * as d3 from "d3";
export const projection = d3.geoAlbersUsa().scale(1500).translate([600, 400]);
console.log('Projection in map.js:', projection);
export function createMap(us, data, currentStrengthFilter) {
    const width = 1200;
    const height = 800;
    const svg = d3.select("#map")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const path = d3.geoPath().projection(projection);
    const mapGroup = svg.append("g");

    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", (event) => {
            mapGroup.attr("transform", event.transform);
        });

    svg.call(zoom);

    mapGroup.selectAll("path")
        .data(us.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#EAEAEA")
        .attr("stroke", "#333");
}
export function updateMap(data) {
    const mapGroup = d3.select("#map svg g");

    mapGroup.selectAll("circle").remove();

    mapGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => {
            const coords = projection([d.BEGIN_LON, d.BEGIN_LAT]);
            return coords ? coords[0] : null;
        })
        .attr("cy", d => {
            const coords = projection([d.BEGIN_LON, d.BEGIN_LAT]);
            return coords ? coords[1] : null;
        })
        .attr("r", 2)
        .attr("fill", d => colorScale(d.TOR_F_SCALE))
        .attr("opacity", 0.6);
}