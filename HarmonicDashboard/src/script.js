// script.js

document.addEventListener('DOMContentLoaded', async function() {
    // Configuração geral do Dashboard
    const qcnnConfig = {
        path: "../data/Model1_Results_QCNN.csv",
        modelName: "QCNN+TL"
    };
    const cnnConfig = {
        path: "../data/Model2_Results_CNN.csv",
        modelName: "CNN+TL"
    };

    // Arquivos de logits (separados por modelos a partir dos arquivos csv's de cada treinamento/validação)
    const qcnnLogitsPath = "../data/Model1_Logits_QCNN.csv";
    const cnnLogitsPath  = "../data/Model2_Logits_CNN.csv";

    const classMapping = {
        0: 'BENIGN', 1: 'DDOS', 2: 'BRUTEFORCE', 3: 'SPOOFING',
        4: 'DOS', 5: 'RECON', 6: 'WEBBASED', 7: 'MIRAI'
    };

    // Carregamento dos 4 CSVs
    try {
        console.log("Iniciando carregamento dos dados a partir dos 4 arquivos CSVs");
        const [
            qcnnFullData,
            cnnFullData,
            qcnnLogitsData,
            cnnLogitsData
        ] = await Promise.all([
            d3.csv(qcnnConfig.path),
            d3.csv(cnnConfig.path),
            d3.csv(qcnnLogitsPath),
            d3.csv(cnnLogitsPath)
        ]);
        console.log("Todos os CSVs carregados com sucesso!");

        // Normaliza/parseia resultados (metrics) e parseia os logits
        qcnnFullData.forEach(d => normalizeRow(d));
        cnnFullData.forEach(d => normalizeRow(d));

        qcnnLogitsData.forEach(d => parseLogitsRow(d));
        cnnLogitsData.forEach(d => parseLogitsRow(d));

        console.log("Exemplos (results):", qcnnFullData[0], cnnFullData[0]);
        console.log("Exemplos (logits):", qcnnLogitsData[0], cnnLogitsData[0]);

        // Detecta automaticamente as melhores épocas (pela maior Accuracy em validation)
        const bestQCNN = getBestEpochFromData(qcnnFullData);
        const bestCNN  = getBestEpochFromData(cnnFullData);

        // assegura modelName para exibição
        if (bestQCNN) bestQCNN.modelName = qcnnConfig.modelName;
        if (bestCNN)  bestCNN.modelName  = cnnConfig.modelName;

        console.log("Melhor QCNN (auto):", bestQCNN);
        console.log("Melhor CNN  (auto):", bestCNN);

        // atualiza epochs (usadas por funções que esperam epoch)
        qcnnConfig.epoch = bestQCNN?.Epoch;
        cnnConfig.epoch  = bestCNN?.Epoch;

        // Gráficos de Linha (Acurácia e Perda)
        plotTrainingHistoryCharts(qcnnFullData, cnnFullData, "#accuracyChart");
        plotTrainingHistoryChartsMSE(qcnnFullData, cnnFullData, "#lossChart");

        // Matrizes de Confusão (usa epochs detectadas)
        plotConfusionMatricesFromCSV(qcnnConfig.path, "#qcnn_matrix_chart", qcnnConfig.epoch, qcnnConfig.modelName);
        plotConfusionMatricesFromCSV(cnnConfig.path, "#cnn_matrix_chart", cnnConfig.epoch, cnnConfig.modelName);

        // Gráficos de Pizza
        const qcnnMatrix = extractValidationMatrix(qcnnFullData, qcnnConfig.epoch);
        const cnnMatrix  = extractValidationMatrix(cnnFullData, cnnConfig.epoch);
        drawAllPieCharts(qcnnMatrix, cnnMatrix);

        // Radar Chart
        drawRadar(qcnnFullData, cnnFullData);

        // Tabela: Resumo de Performance
        try {
            if (typeof PerformanceSummaryTable === 'function') {
                new PerformanceSummaryTable(
                    'performanceSummaryTableContainer',
                    [bestQCNN, bestCNN]
                );
            } else {
                console.warn("PerformanceSummaryTable não encontrada. Certifique-se de carregar performance_summary_table.js");
            }
        } catch (e) {
            console.error("Erro ao instanciar PerformanceSummaryTable:", e);
        }

        // Tabela: Amostras de Logits (7 por modelo, podendo ser alterada/definida pelo adm)
        try {
            if (typeof LogitsSamplesTable === 'function') {
                new LogitsSamplesTable('logitsSamplesTableContainer', qcnnLogitsData, cnnLogitsData, 7);
            } else {
                console.warn("LogitsSamplesTable não encontrada. Verifique se a classe foi adicionada em performance_summary_table.js!");
            }
        } catch (e) {
            console.error("Erro ao instanciar LogitsSamplesTable:", e);
        }

        console.log("Dashboard renderizado com sucesso!");
    } catch (error) {
        console.error("ERRO FATAL: Falha ao carregar dados do dashboard!", error);
        mostrarErroNaTela("Erro ao carregar dados. Verifique se os CSVs estão no caminho correto e o formato das colunas!");
    }

    // Funções auxiliares
    function normalizeRow(d) {
        // normaliza colunas numéricas de results CSV
        d.Epoch = d.Epoch !== undefined ? +d.Epoch : d.Epoch;
        ["Accuracy","Precision","Recall","AUC","MSE","Loss"].forEach(k => {
            if (d[k] !== undefined && d[k] !== null && d[k] !== "") {
                const v = parseFloat(d[k].toString().replace(",", "."));
                d[k] = isNaN(v) ? null : v;
            } else {
                d[k] = d[k] === "" ? null : d[k];
            }
        });
    }

    function parseLogitsRow(d) {
        // esperado: Epoch Phase Target logit_0 ... logit_7
        d.Epoch = d.Epoch !== undefined && d.Epoch !== "" ? +d.Epoch : d.Epoch;
        // mantém Phase e Target como strings
        for (let i = 0; i <= 7; i++) {
            const key = `logit_${i}`;
            if (d[key] !== undefined && d[key] !== null && d[key] !== "") {
                const v = parseFloat(d[key].toString().replace(",", "."));
                d[key] = isNaN(v) ? null : v;
            } else {
                d[key] = null;
            }
        }
    }

    function getBestEpochFromData(fullData) {
        if (!Array.isArray(fullData) || fullData.length === 0) return null;
        const val = fullData.filter(d => d.Phase && d.Phase.toString().toLowerCase() === 'validation');
        const dataset = val.length ? val : fullData;

        function parseMetric(v) {
            if (v === null || v === undefined || v === '') return -Infinity;
            if (typeof v === 'string') v = v.replace(',', '.').trim();
            const n = parseFloat(v);
            return isNaN(n) ? -Infinity : n;
        }

        return dataset.reduce((best, row) => {
            if (!best) return row;
            const accRow  = parseMetric(row.Accuracy);
            const accBest = parseMetric(best?.Accuracy);
            return accRow > accBest ? row : best;
        }, dataset[0]);
    }

    function extractValidationMatrix(fullData, epoch) {
        const epochRows = fullData.filter(row => +row["Epoch"] === +epoch && row["Confusion Matrix"]);
        if (epochRows.length >= 2) {
            return JSON.parse(epochRows[1]["Confusion Matrix"]);
        }
        throw new Error(`Matriz de validação não encontrada para a época ${epoch}.`);
    }

    function drawAllPieCharts(qcnnMatrix, cnnMatrix) {
        Object.keys(classMapping).forEach(classIndexStr => {
            const classIndex = parseInt(classIndexStr, 10);
            const className = classMapping[classIndex];
            const classNameLower = className.toLowerCase();

            const qcnnPieData = calculatePieData(qcnnMatrix, classIndex);
            drawPieChart(`#pie_qcnn_${classNameLower}`, qcnnPieData, className);

            const cnnPieData = calculatePieData(cnnMatrix, classIndex);
            drawPieChart(`#pie_cnn_${classNameLower}`, cnnPieData, className);
        });
    }

    function calculatePieData(matrix, classIndex) {
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

    function drawPieChart(containerSelector, data, title) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const size = Math.min(container.offsetWidth, 100);
        const width = size, height = size, margin = 5;
        const radius = (Math.min(width, height) / 2) - margin;

        d3.select(containerSelector).select("svg").remove();

        if (!data || data.length === 0 || d3.sum(data, d => d.value) === 0) {
            d3.select(containerSelector).append("p")
                .style("font-size", "12px").text(`${title} (sem dados)`);
            return;
        }

        const svg = d3.select(containerSelector).append("svg")
            .attr("width", width).attr("height", height)
            .append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);

        const color = d3.scaleOrdinal()
            .domain(["Correct", "Incorrect"])
            .range(["#0bd695", "#f54927"]);

        const pie = d3.pie().sort(null).value(d => d.value);
        const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);

        svg.selectAll(".arc").data(pie(data)).enter()
            .append("path")
            .attr("d", arc)
            .attr("fill", d => color(d.data.label))
            .attr("stroke", "white")
            .style("stroke-width", "2px");

        const total = d3.sum(data, d => d.value);
        const correctValue = data.find(d => d.label === "Correct")?.value || 0;
        const percentage = total > 0 ? (correctValue / total * 100).toFixed(1) : 0;

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "-0.5em")
            .style("font-size", "10px")
            .style("font-weight", "bold")
            .text(title);

        svg.append("text")
            .attr("text-anchor", "middle")
            .attr("dy", "0.8em")
            .style("font-size", "12px")
            .style("font-weight", "bold")
            .text(`${percentage}%`);
    }

    function mostrarErroNaTela(msg) {
        const body = d3.select("body");
        body.html("");
        body.append("h1").style("color", "red").text("Erro ao Carregar o Dashboard");
        body.append("p").text(msg);
    }
});
