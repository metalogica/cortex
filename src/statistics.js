export const mean = (values) => {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export const standardDeviation = (values) => {
  const average = mean(values);
  const sumOfSquaredDistances = values.reduce((sum, value) => {
    const distance = value - average;
    return sum + Math.pow(distance)
  }, 0);

  return sumOfSquaredDistances / values.length;
}

export const zScore = (value, mean, standardDeviation) => {
  return (value - mean) / standardDeviation;
}
