const fs = require('fs');

const allData = JSON.parse(fs.readFileSync('data/compatibility.json', 'utf8'));

const compatibility = [];
const hardware = [];

const isCompat = (q) => {
  const text = q.toLowerCase();
  return text.includes('compatib') || text.includes('fit') || text.includes('mix') || text.includes('vs') || text.includes('difference') || text.includes('support') || text.includes('bottleneck');
}

allData.forEach(item => {
  if (isCompat(item.question)) {
    compatibility.push(item);
  } else {
    hardware.push(item);
  }
});

fs.writeFileSync('data/hardware.json', JSON.stringify(hardware, null, 2));
fs.writeFileSync('data/compatibility.json', JSON.stringify(compatibility, null, 2));

console.log(`Hardware: ${hardware.length}, Compatibility: ${compatibility.length}`);
