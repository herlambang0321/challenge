function indexPrima(params1) {
    let count = [];
    let countNew = [];
    for(var i = 2; i < params1 * params1; i++) {
        let isPrime = true;
        for(j = 2; j < i; j++) {
            if(i % j == 0) {
                isPrime = false;
                break;
            }
        }
        if(isPrime)
            count.push(i);
    }
    for(let k = 0; k < count.length; k++) {
        if(k == params1 - 1) {
            countNew.push(count[k]);
        }
        
    }
    return countNew;
}

console.log(indexPrima(4)); // result => 7
console.log(indexPrima(500)); // result => 3571
console.log(indexPrima(37786)); // result => 450881