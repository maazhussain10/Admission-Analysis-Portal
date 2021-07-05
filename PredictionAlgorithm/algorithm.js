const trainModel= require('./trainModel')
const testModel = require('./testModel')

exports.algorithm = (list) => {
    // Holds the percentage increase based on no of years of data available in ascending order.
    let percentageIncrease = [[ 25, 75 ], [ 20, 30, 50 ], [ 10, 20, 30, 40 ],[10, 15, 20, 25, 30 ], [ 8, 10, 12, 15, 25, 30 ], [ 5, 8, 10, 12, 15, 20, 30 ],[3, 5, 7, 10, 12, 15, 20, 28], [1, 3, 5, 7, 10, 12, 15, 22, 25]];
    // Get the Next years predicted value after Training the datasets.
    let tempPredictedValue = trainModel.trainModel(list, percentageIncrease);
    // console.log("PREDICTED",tempPredictedValue);
    // Test each attributes data and find the percentage differences in them.
    let percentageDifferences = testModel.testModel(list, tempPredictedValue, percentageIncrease);
    // console.log("PERCENTAGE DIFF", percentageDifferences);
    // Find the Final Predicted Value and print it.
    let finalTempValue = 0.0;
    for (let i = 0; i < percentageDifferences.length; i++)
        finalTempValue += percentageDifferences[i];
    finalTempValue /= percentageDifferences.length;

    if (finalTempValue !== 0.0)
        return finalTempValue * tempPredictedValue;
    else
        return tempPredictedValue;
}