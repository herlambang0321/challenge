const fs = require('fs');
const data = fs.readFileSync('data.json', 'utf8');
const q = JSON.parse(data);
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Jawaban: '
});

let i = 0;
let n = 1;
console.log("Selamat datang di permainan Tebak-tebakan, kamu akan diberikan pertanyaan dari file ini 'data.json'. Untuk bermain, jawablah dengan jawaban yang sesuai.\nGunakan 'skip' untuk menangguhkan pertanyaannya, dan di akhir pertanyaan akan ditanyakan lagi.");
console.log(' ')
console.log('Pertanyaan: ' + q[i].question);
rl.prompt();
rl.on('line', (line) => {
    if (line.trim().toLowerCase() == 'skip') {
        q.push(q[i])
        i++
        console.log('\nPertanyaan : ' + q[i].question)
        rl.prompt();
        
    } else if (line.trim().toLowerCase() == q[i].answer){ 
        i++
        console.log('\nAnda Beruntung!');
        console.log(' ');
        n=1;
        if (i == q.length) {
            console.log('Anda Berhasil!');
            process.exit(0);
        }
        console.log('Pertanyaan: ' + q[i].question);
    } else {
        console.log('\nAnda Kurang Beruntung! anda telah salah ' + n + ' kali, silahkan coba lagi.');
        n++
        if(n > 3) {
            rl.prompt();
        }
    }
    rl.prompt();
});