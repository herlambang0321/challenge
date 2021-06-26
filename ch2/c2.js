function deretKaskus(n) {
    var hdk = [];
    for(var i = 3; i <= n * 3; i+=3) {
        if(i % 5 === 0 && i % 6 === 0) {
            hdk.push('KASKUS');
        } else if(i % 5 === 0) {
            hdk.push('KAS')
        } else if(i % 6 === 0) {
            hdk.push('KUS');
        } else {
            hdk.push(i);
        }
        
    } 
    return hdk;
}

console.log(deretKaskus(10));