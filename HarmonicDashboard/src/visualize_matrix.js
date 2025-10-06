//visualiza_matrix.js 

async function plotConfusionMatricesFromCSV(csvFile, selector, epochToPlot, modelName) {
  
  function drawConfusionMatrix(matrix, targetSelector, title) {
    const n = matrix.length;
    const cellSize = 38;
    const margin = { top: 175, right: 90, bottom: 90, left: 185 };
    const width = n * cellSize;
    const height = n * cellSize;
    const svgWidth = (width + margin.left + margin.right)+85;
    const svgHeight = (height + margin.top + margin.bottom)-40;
    const maxVal = d3.max(matrix.flat());
    const colorScale = d3.scaleSequential(d3.interpolateOranges).domain([0, maxVal]);
    const svg = d3.select(targetSelector).append("svg").attr("width", svgWidth).attr("height", svgHeight);
    svg.append("text").attr("x", svgWidth / 2).attr("y", margin.top / 2.5).attr("text-anchor", "middle").style("font-size", "14px").style("font-weight", "bold").text(title);
    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);
    const cells = g.selectAll(".cell").data(matrix.flatMap((row, i) => row.map((value, j) => ({ row: i, col: j, value })))).enter().append("g").attr("class", "cell");
    cells.append("rect").attr("x", d => d.col * cellSize).attr("y", d => d.row * cellSize).attr("width", cellSize).attr("height", cellSize).attr("fill", d => colorScale(d.value)).attr("stroke", "#ccc");
    cells.append("text").attr("x", d => d.col * cellSize + cellSize / 2).attr("y", d => d.row * cellSize + cellSize / 2).attr("text-anchor", "middle").attr("dominant-baseline", "central").attr("fill", d => d.value > maxVal / 2 ? "white" : "black").text(d => d.value);
    const labels = {0: 'BENIGN', 1: 'DDOS', 2: 'BRUTEFORCE', 3: 'SPOOFING', 4: 'DOS', 5: 'RECON', 6: 'WEBBASED', 7: 'MIRAI'};
    const labelValues = Object.values(labels);
    g.selectAll(".y-label").data(labelValues).enter().append("text").attr("class", "axis-label").attr("x", -15).attr("y", (d, i) => i * cellSize + cellSize / 2).attr("text-anchor", "end").attr("dominant-baseline", "central").text(d => d);
    g.selectAll(".x-label").data(labelValues).enter().append("text").attr("class", "axis-label").attr("transform", (d, i) => `translate(${i * cellSize + cellSize / 2}, -15) rotate(-45)`).style("text-anchor", "start").text(d => d);
    svg.append("text").attr("text-anchor", "middle").attr("x", svgWidth / 2).attr("y", svgHeight - (margin.bottom / 3)).attr("class", "axis-label").style("font-size", "14px").text("Predicted Classes");
    svg.append("text").attr("text-anchor", "middle").attr("transform", `translate(${margin.left / 4}, ${svgHeight / 2}) rotate(-90)`).attr("class", "axis-label").style("font-size", "14px").text("True Classes");
  }

  // data_loader
  try {
    const confusionMatrix = await getValidationConfusionMatrix(csvFile, epochToPlot);
    const title = `Confusion Matrix (Validation): ${modelName} | Epoch ${epochToPlot}`;
    drawConfusionMatrix(confusionMatrix, selector, title);
  } catch (error) {
    d3.select(selector).append("p").style("color", "red").text(error.message);
  }
}