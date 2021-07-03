function weirdMultiply(sentence) {
    let multiply = sentence.toString();

    if(multiply.length > 1) {
        let number = 1;

        for(let i = 0; i < multiply.length; i++) {
            number = number * multiply[i];
        }
        return weirdMultiply(number);
    } else {
        return sentence;
    }

}

console.log(weirdMultiply(39)); // 3 * 9 = 27 -> 2 * 7 = 14 -> 1* 4 = 4
console.log(weirdMultiply(999)); // 9 * 9 * 9 = 729 -> 7 * 2 * 9 = 126 -> 1 * 2 * 6 = 12 -> 1 * 2 = 2
console.log(weirdMultiply(3)); // 3 karena telah satu digit