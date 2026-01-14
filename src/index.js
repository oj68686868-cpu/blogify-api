const https = require('https');

// 1. Capture the city name from command-line arguments
// process.argv[0] is node, process.argv[1] is the file path, [2] is our input
const city = process.argv[2];

if (!city) {
    console.log("Usage: node index.js [city_name]");
    process.exit(1);
}

// 2. Define the Weather API URL (using wttr.in JSON format)
const url = `https://wttr.in/${encodeURIComponent(city)}?format=j1`;

// 3. Make the HTTP GET request
https.get(url, (res) => {
    let data = '';

    // Listen for data chunks as they arrive
    res.on('data', (chunk) => {
        data += chunk;
    });

    // Process the final response
    res.on('end', () => {
        try {
            const weather = JSON.parse(data);
            const current = weather.current_condition[0];
            const temp = current.temp_C;
            const desc = current.weatherDesc[0].value;

            console.log(`Weather in ${city}: ${temp}°C. ${desc}`);
        } catch (error) {
            console.error("Error: Could not parse weather data. Please check the city name.");
        }
    });

    // Replace your current error block with this:
}).on('error', (err) => {
    if (err.code === 'ECONNRESET') {
        console.error("Error: The connection was reset. This might be due to a firewall or unstable internet.");
    } else {
        console.error("Network Error: " + err.message);
    }
});