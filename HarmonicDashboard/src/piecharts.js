
// piecharts.js

function drawAllPieCharts(qcnnMatrix, cnnMatrix, classLabels) {
    classLabels.forEach((className, classIndex) => {
        const idName = className.toLowerCase().replace(/[^a-z0-9]/g, "_");
        drawPieChart(`#pie_qcnn_${idName}`, calculatePieData(qcnnMatrix, classIndex), className);
        drawPieChart(`#pie_cnn_${idName}`, calculatePieData(cnnMatrix, classIndex), className);
    });
}

function calculatePieData(matrix, classIndex) {
    if (!matrix || !matrix[classIndex]) return [{ label: "Correct", value: 0 }, { label: "Incorrect", value: 0 }];
    const correct = matrix[classIndex][classIndex] || 0;
    const total = d3.sum(matrix[classIndex]) || 0;
    const incorrect = total - correct;
    return [{ label: "Correct", value: correct }, { label: "Incorrect", value: incorrect }];
}

function drawPieChart(containerSelector, data, title) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    const size = Math.min(container.offsetWidth, 160), radius = size / 2 - 5;

    d3.select(containerSelector).select("svg").remove();
    if (d3.sum(data, d => d.value) === 0) {
        d3.select(containerSelector).append("p").style("font-size", "10px").text(`${title} (sem dados)`);
        return;
    }

    const svg = d3.select(containerSelector).append("svg")
        .attr("width", size).attr("height", size)
        .append("g").attr("transform", `translate(${size / 2}, ${size / 2})`);

    const color = d3.scaleOrdinal().domain(["Correct", "Incorrect"]).range(["#28a745", "#dc3545"]);
    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(radius * 0.4).outerRadius(radius);

    svg.selectAll("path").data(pie(data)).enter().append("path")
        .attr("d", arc)
        .attr("fill", d => color(d.data.label))
        .attr("stroke", "white")
        .style("stroke-width", "1px");

    const total = d3.sum(data, d => d.value);
    const correct = data.find(d => d.label === "Correct")?.value || 0;
    const pct = total > 0 ? (correct / total * 100).toFixed(1) : 0;

    svg.append("text").attr("text-anchor", "middle").attr("dy", "-0.5em")
        .style("font-size", "9px").text(title);
    svg.append("text").attr("text-anchor", "middle").attr("dy", "0.2em")
        .style("font-size", "10px").text(`${pct}%`);
}
