const fs = require('fs');

async function main() {
    const url = 'https://raw.githubusercontent.com/MicrosoftDocs/win32/docs/desktop-src/Debug/system-error-codes--0-499-.md';
    const response = await fetch(url);
    const text = await response.text();

    const regex = /\*\*([A-Za-z0-9_\\\*]+)\*\*\s*[\r\n]+\s*(\d+)\s*\((0x[0-9A-Fa-f]+)\)\s*[\r\n]+([\s\S]*?)(?=\n<span|\n\*\*|$)/g;
    
    let match;
    let count = 0;
    while ((match = regex.exec(text)) !== null) {
        count++;
        // console.log(match[1], match[2], match[3]);
    }
    console.log(`Matched ${count} error codes in 0-499.`);
}

main();
