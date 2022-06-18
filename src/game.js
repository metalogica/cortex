import * as Statistics from "./statistics";

const SAMPLE_TYPES = ["AF3","F7","F3","FC5","T7","P7","O1","O2","P8","T8","FC6","F4","F8","AF4"];

export const generateExpectedZScores = () => {
  const results = {};

  SAMPLE_TYPES.forEach((sampleType) => {
    results[sampleType] = 0;
  });

  return results;
}

// The calibration sample sets is an array of X number of sets of samples
// The output is a mean and SD for each sample
export const meanAndSdOfEachSample = (calibrationSampleSets) => {
  const valuesPerSample = {};

  // Contains the mean and SD of each sample type
  const results = {};

  calibrationSampleSets.forEach((sampleSet) => {
    Object.keys(sampleSet).forEach((key) => {
      const value = sampleSet[key];

      if (valuesPerSample[key] === undefined) {
        valuesPerSample[key] = [value]
      } else {
        valuesPerSample[key].push(value);
      }
    });
  });

  Object.keys(valuesPerSample).forEach((key) => {
    const arrayOfSampleValues = valuesPerSample(key);
    results[key] = {
      mean: Statistics.mean(arrayOfSampleValues),
      sd: Statistics.standardDeviation(arrayOfSampleValues)
    }
  });

  return results;
}

export const scoreForAnInput = (sampleSet, expectedZScores, calibrationData, par) => {
  const sum = SAMPLE_TYPES.reduce((sum, currentSampleType) => {
    const actualValue = sampleSet[currentSampleType];
    const calibrationMean = calibrationData[currentSampleType].mean;
    const calibrationSd = calibrationData[currentSampleType].sd;
    const epectedZScore = expectedZScores[currentSampleType];
    const zScore = Statistics.zScore(actualValue, calibrationMean, calibrationSd);
    const absoluteDistance = Math.abs(zScore - epectedZScore);
    return absoluteDistance;
  }, 0);

  return Statistics.mean(sum) - par;
}
