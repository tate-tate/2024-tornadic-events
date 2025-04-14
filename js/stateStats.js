// filepath: js/stateStats.js
export function updateStateStats(data, state) {
    const totalTornadoes = data.length;
    const totalInjuries = data.reduce((sum, d) => sum + d.TOTAL_INJURIES, 0);
    const totalDeaths = data.reduce((sum, d) => sum + d.TOTAL_DEATHS, 0);
    const averageEFScale = totalTornadoes > 0
        ? (data.reduce((sum, d) => sum + d.TOR_F_SCALE, 0) / totalTornadoes).toFixed(2)
        : "N/A";
    const strongestTornado = totalTornadoes > 0
        ? Math.max(...data.map(d => d.TOR_F_SCALE))
        : "N/A";

    d3.select("#stateName").text(`State: ${state === "all" ? "All States" : state}`);
    d3.select("#stateTornadoes").text(`Total Tornadoes: ${totalTornadoes}`);
    d3.select("#stateAverageEFScale").text(`Average EF Scale: ${averageEFScale}`);
    d3.select("#stateStrongestTornado").text(`Strongest Tornado: ${strongestTornado === "N/A" ? "N/A" : `EF${strongestTornado}`}`);
    d3.select("#stateInjuries").text(`Total Injuries: ${totalInjuries}`);
    d3.select("#stateDeaths").text(`Total Deaths: ${totalDeaths}`);
}