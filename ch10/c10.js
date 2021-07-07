const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: ' Tulis Kalimatmu Disini > '
});

rl.prompt();

rl.on('line', (answer) => {
    console.log(`hasil konversi : ${sentenceManipulation(answer)}`);
    rl.prompt();

}).on('close', () => {
    console.log('Good Bye');
    process.exit(0);
});

function stringManipulation(word) {
    if (word[0] == 'a' || word[0] == 'i' || word[0] == 'u' || word[0] == 'e' || word[0] == 'o') {
        return word + ' '
        } else {
        let newSentence = word.slice(1) + word[0] + 'nyo ';
        return newSentence;
    }
}

function sentenceManipulation(sentence){ 
    let huruf = sentence.split(' ');
    let hasilnya = '';

    for (let i = 0; i < huruf.length; i++){
        hasilnya += stringManipulation(huruf[i]);
    }
    return hasilnya;

}