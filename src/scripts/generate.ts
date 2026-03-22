import * as fs from 'fs';

const generateCSV = () => {
    const fileName = 'data.csv';
    const header = 'hub_sn,hub_ip,sensor_id,battery,type,extra_val\n';
    let content = header;

    for (let i = 1; i <= 1000; i++) {
        const hubId = Math.floor(i / 20); // Один хаб на кожні 20 сенсорів
        const type = Math.random() > 0.5 ? 'Motion' : 'Door';
        const extraVal = type === 'Motion' ? (Math.random() * 10).toFixed(1) : (Math.random() > 0.5).toString();
        
        content += `SN-${hubId},192.168.1.${hubId},ID-${i},${Math.floor(Math.random() * 100)},${type},${extraVal}\n`;
    }

    fs.writeFileSync(fileName, content);
    console.log('Файл data.csv на 1000 рядків створено!');
};

generateCSV();