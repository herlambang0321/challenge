const fs = require('fs');
const data = fs.readFileSync('data.json', 'utf8')
const q = JSON.parse(data)

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tebakan: '
});

let i = 0;
console.log('Selamat datang di permainan Tebak Kata, Silahkan isi dengan jawaban yang benar ya!')
console.log(' ')
console.log('Pertanyaan: ' + q[i].question)
rl.prompt();
rl.on('line', (line) => {

    if (line.trim().toLowerCase() == q[i].answer) {
        i++
        console.log('Selamat Anda Benar!');
        console.log(' ')
        if (i == q.length) {
            console.log('Hore Anda Menang!')
            process.exit(0);

        }
        console.log('Pertanyaan: ' + q[i].question)
    } else {
        console.log('Wkwkwkwk, Anda kurang beruntung')
        console.log(' ')


    }
    rl.prompt()
})