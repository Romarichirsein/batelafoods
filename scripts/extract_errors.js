const fs = require('fs');
try {
    const data = fs.readFileSync('build_clean.log');
    let text = data.toString('utf16le');
    if (!text.includes('Error')) {
        text = data.toString('utf8');
    }

    const idx = text.indexOf("Module not found");
    if (idx !== -1) {
        console.log("------- RAW ERROR FROM LOG -------");
        console.log(text.substring(Math.max(0, idx - 50), Math.min(text.length, idx + 800)));
    } else {
        console.log("No 'Module not found' specific errors found by index.");
    }
} catch (e) {
    console.error(e);
}
