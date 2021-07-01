function stringManipulation(word) {
    if (word.charAt(0) == "a" || word.charAt(0) == "i" || word.charAt(0) == "u" || word.charAt(0) == "e"|| word.charAt(0) == "o") {
    console.log(word)
    } else {
    console.log(word.slice(1) + word[0] + "nyo")
    }
    
}

stringManipulation('ayam');
stringManipulation('bebek');