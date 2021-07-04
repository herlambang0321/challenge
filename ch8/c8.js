function pola(str) {
    let count = str.split(" ");
    let result = [];
    
    let angka = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for(let i = 0; i < angka.length; i++) {
        let x = count[0].replace('#', angka[i]);
        for (let j = 0; j < angka.length; j++) {
            let y = count[4].replace('#', angka[j]);
            
            if(x * count[2] == y){
            result.push(i, j);
            }
        }
    }
    return result;
}

console.log(pola("42#3 * 188 = 80#204")); // result: [8, 5]
console.log(pola('8#61 * 895 = 78410#5')); // [7, 9]