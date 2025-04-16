import * as d3 from "d3";
export function initializeTooltip() {
    const tooltip = d3.select("#tooltip");

    d3.selectAll("circle")
        .on("mouseover", (event, d) => {
            tooltip.style("opacity", 1)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`)
                .html(`
                    <strong>EF Scale:</strong> EF${d.TOR_F_SCALE}<br>
                    <strong>Latitude:</strong> ${d.BEGIN_LAT}<br>
                    <strong>Longitude:</strong> ${d.BEGIN_LON}<br>
                    <strong>Injuries:</strong> ${d.TOTAL_INJURIES}<br>
                    <strong>Deaths:</strong> ${d.TOTAL_DEATHS}
                `);
        })
        .on("mousemove", (event) => {
            tooltip.style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 10}px`);
        })
        .on("mouseout", () => {
            tooltip.style("opacity", 0);
        });
}