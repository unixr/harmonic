// radarChart.js

function drawRadar(qcnnFullData, cnnFullData) {
    if (!Array.isArray(qcnnFullData) || !Array.isArray(cnnFullData)) {
        console.error("drawRadar espera dois arrays (qcnnFullData, cnnFullData).");
        return;
    }

    let qcnnVal = qcnnFullData.filter(d => d.Phase && d.Phase.toString().toLowerCase() === "validation");
    let cnnVal  = cnnFullData.filter(d => d.Phase && d.Phase.toString().toLowerCase() === "validation");
    if (qcnnVal.length === 0) qcnnVal = qcnnFullData;
    if (cnnVal.length === 0)  cnnVal  = cnnFullData;

    function parseMetric(v) {
        if (v === null || v === undefined || v === "") return 0;
        if (typeof v === "string") v = v.replace(",", ".").trim();
        const n = parseFloat(v);
        return isNaN(n) ? 0 : n;
    }

    function getBestEpoch(data) {
        return data.reduce((best, row) => {
            const accRow  = parseMetric(row.Accuracy);
            const accBest = parseMetric(best.Accuracy);
            return accRow > accBest ? row : best;
        }, data[0]);
    }

    const bestQCNN = getBestEpoch(qcnnVal);
    const bestCNN  = getBestEpoch(cnnVal);

    const qcnnMetrics = [
        parseMetric(bestQCNN?.Accuracy),
        parseMetric(bestQCNN?.Precision),
        parseMetric(bestQCNN?.Recall),
        parseMetric(bestQCNN?.AUC)
    ];

    const cnnMetrics = [
        parseMetric(bestCNN?.Accuracy),
        parseMetric(bestCNN?.Precision),
        parseMetric(bestCNN?.Recall),
        parseMetric(bestCNN?.AUC)
    ];

    const canvas = document.getElementById("radarChart");
    if (!canvas) {
        console.error("Canvas #radarChart não encontrado.");
        return;
    }
    const ctx = canvas.getContext("2d");
    if (window.radarChart) {
        try { window.radarChart.destroy(); } catch (e) {}
        window.radarChart = null;
    }

    window.radarChart = new Chart(ctx, {
        type: "radar",
        data: {
            labels: ["ACCURACY", "PRECISION", "RECALL", "AUC"],
            datasets: [
                {
                    //label: `QCNN (epoch ${bestQCNN?.Epoch ?? "?"})`,
                    label: `QCNN: (${bestQCNN?.Epoch ?? "?"})`,
                    data: qcnnMetrics,
                    borderColor: "#228B22",
                    backgroundColor: "rgba(34,139,34,0.3)",
                    fill: true,
                    tension: 0.5
                },
                {
                    //label: `CNN (epoch ${bestCNN?.Epoch ?? "?"})`,
                    label: `CNN: (${bestCNN?.Epoch ?? "?"})`,
                    data: cnnMetrics,
                    borderColor: "#FF8C00",
                    backgroundColor: "rgba(255,140,0,0.3)",
                    fill: true,
                    tension: 0.5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: { display: true, text: "Radar Chart (QCNN vs CNN)" },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const v = context.raw;
                            return `${context.dataset.label}: ${typeof v === "number" ? v.toFixed(4) : v}`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    min: 0,
                    max: 1,
                    ticks: { stepSize: 0.2 },
                    grid: { circular: true }
                }
            },
            elements: {
                line: {
                    borderWidth: 2,
                    tension: 0.4  
                }
            }
        }
    });
}
