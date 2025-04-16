import * as d3 from "d3";
export function processData(csvData) {
    return csvData.filter(d => {
        d.TOR_F_SCALE = d.TOR_F_SCALE ? +d.TOR_F_SCALE.replace("EF", "") : null;
        d.INJURIES_DIRECT = +d.INJURIES_DIRECT || 0;
        d.INJURIES_INDIRECT = +d.INJURIES_INDIRECT || 0;
        d.DEATHS_DIRECT = +d.DEATHS_DIRECT || 0;
        d.DEATHS_INDIRECT = +d.DEATHS_INDIRECT || 0;
        d.TOTAL_INJURIES = d.INJURIES_DIRECT + d.INJURIES_INDIRECT;
        d.TOTAL_DEATHS = d.DEATHS_DIRECT + d.DEATHS_INDIRECT;
        d.BEGIN_LAT = +d.BEGIN_LAT;
        d.BEGIN_LON = +d.BEGIN_LON;
        return d.TOR_F_SCALE > 0;
    });
}