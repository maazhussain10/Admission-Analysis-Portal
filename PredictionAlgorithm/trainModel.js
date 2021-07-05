exports.trainModel = (list, percentageIncrease) => {
    let epochs = list.length - 2, predictedValue = 0;// Declare number of times to train the data in epochs.

		let trainingSet = [epochs]; // Create an array with length equal to epochs.

		for (let epoch = 0; epoch < epochs; epoch++) {// loop the array till epochs.
			let tempTrainingValue = 0;
			// Loop everytime by taking length-1 data and keep reducing the data size from
			// 5,4,3,2.
			for (let i = 0; i < list.length - epoch - 1; i++) {
				let modelTrainCount = 0;
				let temp = 0;
				for (let k = i; k < epoch + i + 2; k++) {
					temp += list[k];
				}
				// Calculate the prediction using the percentage increase.
				modelTrainCount = temp * percentageIncrease[epochs - 1 - epoch][i] / 100;
				tempTrainingValue += modelTrainCount;
			}
			// Store the details in the variable named Training Set.
			trainingSet[epoch] = tempTrainingValue / (2 + epoch);
		}
		for (let i = 0; i < trainingSet.length; i++) {
			predictedValue += trainingSet[i];
		}
		// Return the predicted Trained Value for testing.
		return (predictedValue / trainingSet.length);
}