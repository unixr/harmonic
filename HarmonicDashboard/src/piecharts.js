// piechart.js

class PieChart {
    constructor(containerSelector, data, title) {
        this.containerSelector = containerSelector;
        this.data = data;
        this.title = title;
    }

    static calculatePieData(matrix, classIndex) {
        if (!matrix || !matrix[classIndex]) {
            return [
                { label: "Correct", value: 0 },
                { label: "Incorrect", value: 0 }
            ];
        }
        const correct = matrix[classIndex][classIndex] || 0;
        const total = d3.sum(matrix[classIndex]) || 0;
        const incorrect = total - correct;
        return [
            { label: "Correct", value: correct },
            { label: "Incorrect", value: incorrect }
        ];
    }

    draw() {
        const container = document.querySelector(this.containerSelector);
        if (!container) return;

        const size = Math.min(container.offsetWidth, 100);
        const width = size, height = size, margin = 5;
        const radius = (Math.min(width, height) / 2) - margin;

        // Remove gráfico anterior (se houver)
        d3.select(this.containerSelector).select("svg").remove();

        if (!this.data || this.data.length === 0 || d3.sum(this.data, d => d.value) === 0) {
            d3.select(this.containerSelector).append("p")
                .style("font-size", "8px").text(`${this.title} (sem dados)`);
            return;
        }

        const svg = d3.select(this.containerSelector).append("svg")
            .attr("width", width).attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal()
            .domain(["Correct", "Incorrect"])
            .range(["#0bd695", "#f54927"]);

        const pie = d3.pie().sort(null).value(d => d.value);
        const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);

        svg.selectAll(".arc")
            .data(pie(this.data))
            .enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.label))
            .attr("stroke", "white")
            .style("stroke-width", "2px");

        const total = d3.sum(this.data, d => d.value);
        const correctValue = this.data.find(d => d.label === "Correct")?.value || 0;
        const percentage = total > 0 ? (correctValue / total * 100).toFixed(1) : 0;

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-0.5em")
            .style("font-size", "8px")
            .style("font-weight", "bold")
            .text(this.title);

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.8em")
            .style("font-size", "8px")
            .style("font-weight", "bold")
            .text(`${percentage}%`);
    }
}

// Exporta a classe (para ambientes com módulos)
if (typeof module !== "undefined") {
    module.exports = PieChart;
}
