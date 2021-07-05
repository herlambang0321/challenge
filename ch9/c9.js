function spiral(param1) {
    const result = [];

    let sMatrix = [];
    for (let i = 0; i < param1; i++) {
        let arrX = [];
        for (let j = i * param1; j < param1 * (i + 1); j++) {
            arrX.push(j);
        }
        sMatrix.push(arrX);
    }
    
    
    let left = 0;
    let top = 0;
    let right = sMatrix[0].length - 1;
    let bottom = sMatrix.length - 1;
    let direction = 'right';
    while(left <= right && top <= bottom) {
        if(direction === 'right') {
            for(let i = left; i <= right; i+=1) {
                result.push(sMatrix[top][i]);
            }
            top += 1;
            direction = 'down';
        } else if(direction === 'down') {
            for (let i = top; i <= bottom; i+=1) {
                result.push(sMatrix[i][right]);
            }
            right -= 1;
            direction = 'left';
        } else if(direction === 'left') {
            for (let i = right; i >= left; i-=1) {
                result.push(sMatrix[bottom][i]);
            }
            bottom -= 1;
            direction = 'up';
        } else if(direction === 'up') {
            for (let i = bottom; i >= top; i-=1) {
                result.push(sMatrix[i][left]);
            }
            left += 1;
            direction = 'right';
        }
    }
    
    console.log(result)
}

spiral(5)
spiral(6)
spiral(7)
