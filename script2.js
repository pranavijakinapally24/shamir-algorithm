const fs = require('fs');
function decodeValue(base, value)
{
    return parseInt(value, base);
}
function calculateMean(arr)
{
    const sum = arr.reduce((acc, val) => acc + val, 0);
    return sum / arr.length;
}
function calculateStandardDeviation(arr, mean) 
{
    const variance = arr.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / arr.length;
    return Math.sqrt(variance);
}
function detectOutliers(points) 
{
    const yValues = points.map(point => point.y);
    const mean = calculateMean(yValues);
    const stdDev = calculateStandardDeviation(yValues, mean);
    const threshold = 2;
    return points.filter(point => Math.abs(point.y - mean) > threshold * stdDev);
}
function findOutliersFromFile(filename) 
{
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) 
        {
            console.error("Error reading file:", err);
            return;
        }

        const jsonData = JSON.parse(data);
        const { n, k } = jsonData.keys;

        let points = [];
        Object.keys(jsonData).forEach(key => {
            if (key !== 'keys') {
                const base = parseInt(jsonData[key].base);
                const value = jsonData[key].value;
                const x = parseInt(key); // x is the key of the object
                const y = decodeValue(base, value); // y is the decoded value

                points.push({ x, y });
            }
        });
        const outliers = detectOutliers(points);
        console.log("Outliers found:", outliers);
    });
}
findOutliersFromFile('testcase2.json');
