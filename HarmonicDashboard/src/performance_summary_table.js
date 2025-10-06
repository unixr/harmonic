// performance_summary_table.js

class PerformanceSummaryTable {
    /**
     * @param {string} targetId - ID do container no HTML
     * @param {Array<Object>} modelsData - Array com objetos de resultados já filtrados (melhor época de cada modelo)
     */
    constructor(targetId, modelsData) {
        this.container = document.getElementById(targetId);
        if (!this.container) {
            console.error(`Elemento de destino #${targetId} não encontrado.`);
            return;
        }
        this.modelsData = modelsData || [];
        this.render();
    }

    //Renderiza a tabela HTML
    render() {
        this.container.innerHTML = ''; // limpa conteúdo anterior
        const table = document.createElement('table');

        // estilo básico
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.fontSize = '0.85rem';
        table.style.marginTop = '10px';

        // cabeçalho
        const thead = table.createTHead();
        const headerRow = thead.insertRow();
        const headers = ['Model', 'Best Epoch', 'Accuracy', 'Precision', 'Recall', 'AUC', 'MSE'];
        headers.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            th.style.textAlign = 'center';
            th.style.padding = '6px';
            th.style.borderBottom = '2px solid #AAA';
            th.style.backgroundColor = '#ffff80';
            headerRow.appendChild(th);
        });

        // corpo da tabela
        const tbody = table.createTBody();
        this.modelsData.forEach(entry => {
            if (!entry) return; // ignora entradas inválidas

            const row = tbody.insertRow();
            const cells = [
                entry.modelName || "N/A",
                entry.Epoch ?? "N/A",
                this.formatMetric(entry.Accuracy),
                this.formatMetric(entry.Precision),
                this.formatMetric(entry.Recall),
                this.formatMetric(entry.AUC),
                this.formatMetric(entry.MSE)

            ];
            cells.forEach(c => {
                const cell = row.insertCell();
                cell.textContent = c;
                cell.style.padding = '6px';
                cell.style.textAlign = 'center';
            });
        });

        this.container.appendChild(table);
    }

    //Formata números com até 4 casas decimais
    formatMetric(value) {
        const num = parseFloat(value);
        if (isNaN(num)) return "N/A";
        return num.toFixed(4);
    }
}


 //Classe: LogitsSamplesTable
 //Apresenta n amostras aleatórias de logits de cada modelo pré-definida pelo adm.
class LogitsSamplesTable {
    constructor(targetId, qcnnData, cnnData, sampleSize = 7) {
        this.container = document.getElementById(targetId);
        if (!this.container) {
            console.error(`Elemento de destino #${targetId} não foi encontrado.`);
            return;
        }
        this.qcnnData = qcnnData;
        this.cnnData = cnnData;
        this.sampleSize = sampleSize;
        this.render();
    }

    getRandomSamples(data) {
        if (!Array.isArray(data) || data.length === 0) return [];
        const shuffled = data.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, this.sampleSize);
    }

    formatLogit(value) {
        const num = parseFloat(value);
        if (isNaN(num)) return "N/A";
        return num.toFixed(4);
    }

    render() {
        this.container.innerHTML = '';
        const table = document.createElement('table');

        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.fontSize = '0.7rem';
        table.style.marginTop = '8px';

        const thead = table.createTHead();
        const headerRow = thead.insertRow();
        const headers = ['Model', 'Target',
                         'logit_0','logit_1','logit_2','logit_3',
                         'logit_4','logit_5','logit_6','logit_7'];
        // const headers = ['Model', 'Epoch', 'Phase', 'Target',
        //                  'logit_0','logit_1','logit_2','logit_3',
        //                  'logit_4','logit_5','logit_6','logit_7'];
        headers.forEach(text => {
            const th = document.createElement('th');
            th.textContent = text;
            th.style.textAlign = 'center';
            th.style.padding = '2px';
            th.style.borderBottom = '1px solid #AAA';
            th.style.backgroundColor = '#d0f0f7';
            headerRow.appendChild(th);
        });

        const tbody = table.createTBody();

        const qcnnSamples = this.getRandomSamples(this.qcnnData);
        const cnnSamples  = this.getRandomSamples(this.cnnData);

        [...qcnnSamples.map(s => ({...s, modelName: "QCNN"})),
         ...cnnSamples.map(s => ({...s, modelName: "CNN"}))]
        .forEach(sample => {
            const row = tbody.insertRow();
            row.style.borderBottom = '1px solid #ddd';

            const cells = [
                sample.modelName,
                //sample.Epoch,
                //sample.Phase,
                sample.Target,
                this.formatLogit(sample.logit_0),
                this.formatLogit(sample.logit_1),
                this.formatLogit(sample.logit_2),
                this.formatLogit(sample.logit_3),
                this.formatLogit(sample.logit_4),
                this.formatLogit(sample.logit_5),
                this.formatLogit(sample.logit_6),
                this.formatLogit(sample.logit_7)
            ];

            cells.forEach(cellData => {
                const cell = row.insertCell();
                cell.textContent = cellData;
                cell.style.padding = '6px';
                cell.style.textAlign = 'center';
            });
        });

        this.container.appendChild(table);
    }
}
