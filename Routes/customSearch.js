const  algorithm  = require('../PredictionAlgorithm/algorithm');
let sqlFunctions = require('../SqlFunctions/sqlFunctions')

class CustomSearch{
    constructor(app) {
        this.customSearch(app);
    }
    customSearch(app) {
        app.get('/customSearch', async (req, res) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept');
            let { collegeName, selectedDepartment, selectedField } = req.query;
            let finalReport = []
            let finalData = []
            let size;
            if (selectedDepartment !== "All") {
                finalReport = await sqlFunctions.customSearch(collegeName, selectedDepartment, selectedField);
                size = await sqlFunctions.customFieldSize(collegeName,selectedDepartment,selectedField);
            }
            else {
                finalReport = await sqlFunctions.overallSearch(collegeName, selectedField);
                size = await sqlFunctions.fieldSize(collegeName, selectedField);
            }
            let totalValue = 0;
            for (let i = 0; i < size.length; i++){
                let currentField = size[i][selectedField];
                let valueSet = []
                for (let j = 0; j < finalReport.length; j++){
                    if (finalReport[j][selectedField] == currentField) {
                        valueSet.push(finalReport[j].count)
                    }
                }
                for (let k = 0; k < 4 - valueSet.length; k++)
                    valueSet.push(0);
                let report = {
                    "field": currentField,
                    "predictedValue":(Math.round(algorithm.algorithm(valueSet)))
                }
                totalValue += report.predictedValue;
                finalData.push(report)
            }

            finalData.sort((a, b) => (a.predictedValue < b.predictedValue) ? 1 : ((b.predictedValue < a.predictedValue) ? -1 : 0))
            for (let i = 0; i < finalData.length; i++) {
                finalData[i].predictedValue = Math.round(finalData[i].predictedValue * 100 / totalValue);
                if (!finalData[i].predictedValue || !finalData[i].field) {
                    finalData.pop(i);
                    continue;
                }
            }
            finalData.sort((a,b) => (a.predictedValue < b.predictedValue) ? 1 : ((b.predictedValue < a.predictedValue) ? -1 : 0))

            res.send(finalData);
        })
    }
}
module.exports = CustomSearch;