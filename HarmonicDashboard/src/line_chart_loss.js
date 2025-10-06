// line_chart_loss.js

// Limpeza de nomes das classes CSS
function sanitizeClassName(name) {
    return name.replace(/[^a-zA-Z0-9_-]/g, "_"); // só letras, números, _ e -
}

// Gráfico de linha:  Loss 
function plotTrainingHistoryChartsMSE(qcnnData, cnnData, lossCanvasId) {
    console.log("Preparando dados para gráficos de linha...");

    // Extrai dados de treino e validação
    function processData(data, metricKey) {
        const trainData = data.filter(d => d.Phase.toLowerCase() === "train")
            .map(d => ({ epoch: +d.Epoch, value: +d[metricKey] }));
        const valData = data.filter(d => d.Phase.toLowerCase() === "validation")
            .map(d => ({ epoch: +d.Epoch, value: +d[metricKey] }));
        return { trainData, valData };
    }

    const qcnnLoss = processData(qcnnData, "Loss");
    const cnnLoss = processData(cnnData, "Loss");

    // Gráfico de Loss
    drawLineChart(lossCanvasId,
        [
            { name: "QCNN_Train", values: qcnnLoss.trainData, color: "#228B22" },
            { name: "QCNN_Validation", values: qcnnLoss.valData, color: "#90EE90" },
            { name: "CNN_Train", values: cnnLoss.trainData, color: "#FF8C00" },
            { name: "CNN_Validation", values: cnnLoss.valData, color: "#FFD580" }
        ],
        "Loss");
}

// Função genéria para gráfico de linha
function drawLineChart(canvasId, series, yLabel) {
    const canvas = document.querySelector(canvasId);
    if (!canvas) {
        console.error("Canvas não encontrado:", canvasId);
        return;
    }

    const ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: series[0].values.map(d => d.epoch),
            datasets: series.map(s => ({
                label: s.name,
                data: s.values.map(d => d.value),
                borderColor: s.color,
                borderWidth: 2,
                fill: false,
                tension: 0.1
            }))
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: yLabel + " per epoch" }
            },
            scales: {
                x: { title: { display: true, text: "Epoch" } },
                y: { title: { display: true, text: yLabel }, beginAtZero: true }
            }
        }
    });
}
