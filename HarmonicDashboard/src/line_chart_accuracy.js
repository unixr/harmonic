// line_chart_accuracy.js

// Limpeza de nomes das classes CSS
function sanitizeClassName(name) {
    return name.replace(/[^a-zA-Z0-9_-]/g, "_"); // só letras, números, _ e -
}

// Gráfico de linha: Accuracy
function plotTrainingHistoryCharts(qcnnData, cnnData, accuracyCanvasId) {
    console.log("Preparando dados para gráficos de linha...");

    // Extrai dados de treino e validação
    function processData(data, metricKey) {
        const trainData = data.filter(d => d.Phase.toLowerCase() === "train")
            .map(d => ({ epoch: +d.Epoch, value: +d[metricKey] }));
        const valData = data.filter(d => d.Phase.toLowerCase() === "validation")
            .map(d => ({ epoch: +d.Epoch, value: +d[metricKey] }));
        return { trainData, valData };
    }

    const qcnnAcc = processData(qcnnData, "Accuracy");
    const cnnAcc = processData(cnnData, "Accuracy");

    // Gráfico de Acurácia
    drawLineChart(accuracyCanvasId,
        [
            { name: "QCNN_Train", values: qcnnAcc.trainData, color: "#228B22" },
            { name: "QCNN_Validation", values: qcnnAcc.valData, color: "#90EE90" },
            { name: "CNN_Train", values: cnnAcc.trainData, color: "#FF8C00" },
            { name: "CNN_Validation", values: cnnAcc.valData, color: "#FFD580" }
        ],
        "Accuracy");
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
