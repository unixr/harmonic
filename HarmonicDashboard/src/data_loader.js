// data_loader.js

async function getValidationConfusionMatrix(csvPath, epoch) {
  try {
    const data = await d3.csv(csvPath);
    
    // Filtra para encontrar todas as matrizes da época desejada.
    const epochRows = data.filter(row => +row["Epoch"] === epoch && row["Confusion Matrix"]);

    // Verifica se existe uma segunda matriz (a de validação).
    if (epochRows.length >= 2) {
      // Pega a segunda linha encontrada (índice 1), que corresponde à validação.
      const validationRow = epochRows[1];
      const confusionMatrix = JSON.parse(validationRow["Confusion Matrix"]);
      return confusionMatrix;
    } else {
      throw new Error(`Matriz de validação não encontrada para a época ${epoch} em ${csvPath}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}