function romawi(n) {
    let nom = [1000, 900, 500, 400, 300, 100, 90, 50, 40, 30, 10, 9, 5, 4, 3, 1];
    let rom = ['M', 'CM', 'D', 'CD', 'CCC', 'C', 'XC', 'L', 'XL', 'XXX', 'X', 'IX', 'V', 'IV', 'III', 'I'];
    let hasil = '';

    for( let i = 0; i < nom.length; i++) {
        while(nom[i] <= n) {
            hasil += rom[i];
            n -= nom[i];
        }
    }

    return hasil;
}

console.log ("Script Testing untuk Konversi Romawi\n");
console.log ("Input | expected | result");
console.log ("------| ---------| ------");
console.log ("4     | IV       | ", romawi(4));
console.log ("9     | IX       | ", romawi(9));
console.log ("13    | XIII     | ", romawi(13));
console.log ("1453  | MCDLIII  | ", romawi(1453));
console.log ("1646  | MDCXLVI  | ", romawi(1646));