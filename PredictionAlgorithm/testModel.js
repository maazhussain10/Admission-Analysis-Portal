const trainModel= require('./trainModel')

exports.testModel = (list, tempPredictedValue, percentageIncrease) => {
    let epoch = list.length - 1; // Find the length of the data list.
		let percentageDiff=[epoch - 2]; // Create an array of size double to store the percentage
															// differences
		let index = 0, value;

		// Loop until there are only 2 datas left.
		while (epoch > 2) {
			let testingResult = list[epoch]; // Store the last data as the result.
			let tempList = list.slice(0, epoch); // Copy all the datas except the last data into
																	// tempList
			value = trainModel.trainModel(tempList, percentageIncrease); // Get the trained value for the tempList.

			// Find the Percentage difference between the trained value and the
			// testingResult and store in percentageDiff.
			percentageDiff[index] = (testingResult * 100);
			if (value != 0)
				percentageDiff[index] /= value;
			percentageDiff[index] /= 100;

			// Increase the index and decrease the epoch.
			index++;
			epoch--;
		}
		// Return the percentageDiff.
    // console.log("Percentage Difference After Testing : ", percentageDiff);
		return percentageDiff;
}