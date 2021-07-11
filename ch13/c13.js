const fs = require('fs');
const { exit } = require('process');
const aData = () => JSON.parse(fs.readFileSync('todo.json', 'utf8'));
const bData = (data) => fs.writeFileSync('todo.json', JSON.stringify(data, null, 3), 'utf8');
const command = process.argv;
const num = parseInt(command[3] - 1);
const data = aData();

if (command.length == 2 || command[2] == `help`) {
    console.log(`>>> JS TODO <<<
$ node todo.js <command>
$ node todo.js list
$ node todo.js task <task_id>
$ node todo.js add <task_content>
$ node todo.js delete <task_id>
$ node todo.js complete <task_id>
$ node todo.js uncomplete <task_id>
$ node todo.js list:outstanding asc|desc
$ node todo.js list:complete asc|desc
$ node todo.js tag <task_id> <tag_name_1> <tag_name_2> ... <tag_name_N>
$ node todo.js filter:<tag_name>
`);
    process.exit()
}

switch (command[2]) {
    case 'add':
        const output = command.slice(3).join(' ');
        data.push({ "task": output, "complete": false, "tag": [] });
        bData(data);
        console.log(`'${output}' telah ditambahkan.`);
        break;
    case 'list':
        console.log('Daftar Pekerjaan');
        data.forEach((item, index) => {
            if (item.complete == true) {
                console.log(`${index + 1}. [x] ${item.task}.`);
            } else if (item.complete == false) {
                console.log(`${index + 1}. [ ] ${item.task}.`);
            }
        });
        break;
    case 'delete':
        console.log(`'${data[num].task}' telah dihapus dari daftar`);
        data.splice(num, 1);
        bData(data);
        break;
    case 'complete':
        const completeTask = num;
        data[completeTask].complete = true;
        console.log(`'${data[completeTask].task}' telah selesai.`);
        bData(data);
        break;
    case 'uncomplete':
        const uncompleteTask = num;
        data[uncompleteTask].complete = false;
        console.log(`'${data[uncompleteTask].task}' status selesai dibatalkan.`)
        bData(data);
        break;
    case 'list:outstanding':
        console.log('Daftar Pekerjaan')
        if (command[3] === 'asc') {
            for (let i = 0; i < data.length; i++) {
                if (data[i].complete === false) {
                    console.log(`${i + 1}. [ ] ${data[i].task}.`)
                }

            }

        } else if (command[3] === 'desc') {
            for (let j = data.length - 1; j >= 0; j--) {
                if (data[j].complete === false) {
                    console.log(`${j + 1}. [ ] ${data[j].task}.`)
                }

            }

        }
        break;
    case 'list:completed':
        console.log('Daftar Pekerjaan')
        if (command[3] === 'asc') {
            for (let i = 0; i < data.length; i++) {
                if (data[i].complete === true) {
                    console.log(`${i + 1}. [x] ${data[i].task}.`)
                }

            }

        } else if (command[3] === 'desc') {
            for (let j = data.length - 1; j >= 0; j--) {
                if (data[j].complete === true) {
                    console.log(`${j + 1}. [x] ${data[j].task}.`)
                }

            }

        }
        break;
    case 'tag':
        data[num].tag = command.slice(4);
        bData(data);
        console.log(`Tag '${command.slice(4).join(' ')}' telah ditambahkan ke daftar '${data[num].task}'.`)
        break;
    case command[2]:
        let distance = command[2].split(':');
        let arr = [];
        for (let i = 1; i < distance.length; i++) {
            arr.push(distance[i]);
        }

        let x = 0;
        data.forEach((item, index) => {
            if (item.tag !== undefined) {
                for (let i = 0; i < item.tag.length; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if (item.tag[i] == arr[j]) {
                            if (item.complete == true) {
                                console.log(`${index + 1}. [x] ${item.task}`)
                                x += 1;
                            } else {
                                console.log(`${index + 1}. [ ] ${item.task}`)
                                x += 1;
                            }
                        }
                    }

                }
            }
        })
        break;


    default:
}