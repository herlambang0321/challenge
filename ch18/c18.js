const readline = require('readline');
const Table = require('cli-table');
const sqlite3 = require('sqlite3').verbose();
const dbFile = __dirname + "/university.db";

let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
    
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function login() {
    console.log('==============================================================');
    console.log('Welcome To Universitas Muhammadiyah Bengkulu\nJl Bali Kota Bengkulu');
    console.log('==============================================================');
    rl.question('username: ', (username) => {
        console.log('==============================================================');
        rl.question('password: ', (password) => {
            console.log('==============================================================');
            
            let sql = `SELECT * FROM user WHERE username == '${username}' AND passwords == '${password}'`;
            db.get(sql, (err, data) => {
                if (err) throw err;
                if (data) {
                    console.log(`Welcome, ${data.username}. Your access level is: ${data.users}`);
                    menuAwal()
                } else {
                    console.log('Username atau Password yang anda masukkan Salah, Silahkan anda coba lagi!!');
                    login();
                }
            })
        })
    })
}
login();

function menuAwal() {
    console.log('==============================================================');
    console.log("silahkan pilih opsi di bawah ini");
    console.log("[1] Mahasiswa\n[2] Jurusan\n[3] dosen\n[4] mata kuliah\n[5] kontrak\n[6] keluar");
    console.log('==============================================================');
    rl.question(`masukkan salah satu no. dari opsi diatas: `, (number) => {
        switch (number) {
            case '1':
                mahasiswa();
                break;
            case '2':
                jurusan();
                break;
            case '3':
                dosen();
                break;
            case '4':
                matakuliah();
                break;
            case '5':
                kontrak();
                break;
            case '6':
                console.log('==============================================================');
                console.log('kamu telah keluar.');
                login();
                break;
            default:
                console.log('==============================================================');
                console.log('Maaf number yang anda inputkan salah');
                menuAwal();
        }
    })
}

function mahasiswa() {
    console.log('==============================================================');
    console.log('silahkan pilih opsi di bawah ini');
    console.log(`[1] daftar murid\n[2] cari murid\n[3] tambah murid\n[4] hapus murid\n[5] kembali`);
    console.log('==============================================================');
    rl.question(`masukkan salah satu no. dari opsi diatas: `, (number) => {
        switch (number) {
            case '1':
                daftarMurid();
                break;
            case '2':
                cariMurid();
                break;
            case '3':
                tambahMurid();
                break;
            case '4':
                hapusMurid();
                break;
            case '5':
                menuAwal();
                break;
            default:
                console.log('==============================================================');
                console.log('Maaf number yang anda inputkan salah');
                menuAwal();
        }
    })
};

function daftarMurid() {
    console.log('==============================================================');
    db.serialize(function () {
        let sql = 'SELECT * FROM mahasiswa';
        db.all(sql, (err, data) => {
            if (err) throw err;
            if (data) {
                var table = new Table({
                    head: ['NIM', 'Nama', 'Alamat', 'Umur', 'Jurusan'],
                    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                });
                data.forEach(data => {
                    table.push(
                        [`${data.nim}`, `${data.nama}`, `${data.alamat}`, `${data.umur}`, `${data.kodejur}`]
                    );
                });
                console.log(table.toString());
                mahasiswa();
            } 
        });
    });
}

function cariMurid() {
    console.log('==============================================================');
    rl.question(`Masukkan NIM: `, (nim) => {
        let sql = `SELECT * FROM mahasiswa WHERE nim = '${nim}'`;
        db.get(sql, (err, data) => {
            if (err) throw err;
            if (data) {
                console.log(`
==============================================================
Student Details
==============================================================
ID          : ${data.nim}
Nama        : ${data.nama}
Alamat      : ${data.alamat}
Umur        : ${data.umur}
Jurusan     : ${data.kodejur}`);
                mahasiswa();
            } else {
                console.log(`Mahasiswa dengan NIM ${nim} tidak terdaftar`)
                cariMurid();
            }
        })
    })
};

function tambahMurid() {
    console.log('==============================================================');
    console.log('Lengkapi data di bawah ini :');
    rl.question('NIM : ', (nim) => {
        rl.question('Nama : ', (nama) => {
            rl.question('Alamat : ', (alamat) => {
                rl.question('Umur : ', (umur) => {
                    rl.question('Jurusan : ', (kodejur) => {
                        
                        let sql = `INSERT INTO mahasiswa (nim, nama, alamat, umur, kodejur) VALUES ('${nim}', '${nama}', '${alamat}', '${umur}', '${kodejur}')`;
                        db.run(sql, (err) => {
                            if (err) throw err;
                            console.log('==============================================================');
                            console.log('Data Mahasiswa Berhasil di input');
                            console.log('==============================================================');
                        });

                        let sql2 = `SELECT * FROM mahasiswa JOIN jurusan ON mahasiswa.kodejur = jurusan.kodejur`;
                        db.all(sql2, (err, data) => {
                            if (err) throw err;
                            if (data) {
                                var table = new Table({
                                    head: ['NIM', 'Nama', 'Alamat', 'Umur', 'Jurusan'],
                                    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                                            , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                                            , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                                            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                                });
                                data.forEach(data => {
                                    table.push(
                                        [`${data.nim}`, `${data.nama}`, `${data.alamat}`, `${data.umur}`, `${data.kodejur}`]
                                    );
                                });
                                console.log(table.toString());
                                mahasiswa();
                            } 
                        })
                    })
                })
            })
        })
    })
}

function hapusMurid() {
    rl.question('Masukkan NIM yang akan dihapus : ', (nim) => {
        let sql = `DELETE FROM mahasiswa WHERE nim = '${nim}'`;
        
        let sql2 = `SELECT * FROM mahasiswa WHERE nim = '${nim}'`;
        db.get(sql2, (err, rows) => {
            if (err) throw err
                if (rows) {
                    db.run(sql, (err) => {
                        console.log(`mahasiswa dengan NIM : '${nim}' telah dihapus.`);
                        console.log('==============================================================')
                        db.all('SELECT * FROM mahasiswa;', (err, data) => {
                        var table = new Table({
                            head: ['NIM', 'Nama', 'Alamat', 'Umur', 'Jurusan'],
                            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                                    , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                                    , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                                    , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                        });
                        data.forEach(data => {
                            table.push(
                                [`${data.nim}`, `${data.nama}`, `${data.alamat}`, `${data.umur}`, `${data.kodejur}`]
                            );
                        });
                        console.log(table.toString());
                        mahasiswa();
                        })
                    })
                } else {
                    console.log('NIM tidak terdaftar')
                    console.log('==============================================================')
                    hapusMurid();
                
                }
        })
    })
}

function jurusan() {
    console.log('==============================================================');
    console.log('silahkan pilih opsi di bawah ini')
    console.log(`[1] Daftar Jurusan\n[2] Cari Jurusan\n[3] Tambah Jurusan\n[4] Hapus Jurusan\n[5] kembali`)
    console.log('==============================================================');
    rl.question(`masukkan salah satu no. dari opsi diatas : `, (number) => {
        console.log('==============================================================');
        switch (number) {
            case '1':
                daftarJurusan();
                break;
            case '2':
                cariJurusan();
                break;
            case '3':
                tambahJurusan();
                break;
            case '4':
                hapusJurusan();
                break;
            case '5':
                menuAwal();
                break;
            default:
                console.log('==============================================================');
                console.log('Maaf number yang anda inputkan salah');
                menuAwal();
        }
    })
};

function daftarJurusan() {
    db.serialize(function () {
        let sql = 'SELECT * FROM jurusan';
        db.all(sql, (err, data) => {
            if (err) throw err;
            if (data) {
                var table = new Table({
                    head: ['ID Jurusan', 'Nama Jurusan'],
                    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                            , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                            , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                })
                data.forEach(data => {
                    table.push([`${data.kodejur}`, `${data.namajurusan}`]);
                })
                console.log(table.toString());
                jurusan();
            }
        })
    })
}

function cariJurusan() {
    rl.question(`Masukkan ID Jurusan: `, (kodejur) => {
        let sql = `SELECT * FROM jurusan WHERE kodejur = '${kodejur}'`;
        db.get(sql, (err, data) => {
            if (err) throw err;
            if (data) {
                console.log(`
==============================================================
Jurusan Details
==============================================================
ID Jurusan      : ${data.kodejur}
Nama Jurusan    : ${data.namajurusan}`);
                jurusan();
            } else {
                console.log(`ID jurusan dengan ID : ${kodejur} tidak ditemukan`);
                console.log('==============================================================');
                cariJurusan();
            }
        })
    })
}

function tambahJurusan() {
    console.log('Lengkapi data dibawah ini :');
    rl.question('ID Jurusan : ', (kodejur) => {
        rl.question('Nama Jurusan : ', (namajurusan) => {
            let sql = `INSERT INTO jurusan (kodejur, namajurusan) VALUES ('${kodejur}', '${namajurusan}')`;
            db.run(sql, (err) => {
                if (err) throw err;
                console.log('==============================================================');
                console.log("Data Jurusan Berhasil di Input");
                console.log('==============================================================');
            });

            let sql2 = 'SELECT * FROM jurusan';
            db.all(sql2, (err, data) => {
                if (err) throw err;
                if (data) {
                    var table = new Table({
                        head: ['ID Jurusan', 'Nama Jurusan'],
                        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                                , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                                , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                                , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                    })
                    data.forEach(data => {
                        table.push([`${data.kodejur}`, `${data.namajurusan}`]);
                    })
                    console.log(table.toString());
                    jurusan();
                } 
            })
        })
    })
}

function hapusJurusan() {
    rl.question('Masukkan ID jurusan yang akan dihapus : ', (kodejur) => {
        let sql = `DELETE FROM jurusan WHERE kodejur = '${kodejur}'`;
        
        let sql2 = `SELECT * FROM jurusan WHERE kodejur = '${kodejur}'`;
        db.get(sql2, (err, rows) => {
            if (err) throw err
                if (rows) {
                    db.run(sql, (err) => {
                        console.log(`Jurusan dengan ID Jurusan : '${kodejur}' telah dihapus.`);
                        console.log('==============================================================')
                        db.all('SELECT * FROM jurusan;', (err, data) => {
                        var table = new Table({
                            head: ['ID Jurusan', 'Nama Jurusan'],
                            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                                    , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                                    , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                                    , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                        });
                        data.forEach(data => {
                            table.push(
                                [`${data.kodejur}`, `${data.namajurusan}`]
                            );
                        });
                        console.log(table.toString());
                        mahasiswa();
                        })
                    })
                } else {
                    console.log('ID Jurusan tidak terdaftar')
                    console.log('==============================================================')
                    hapusJurusan();
                
                }
        })
    })
}


function dosen() {
    console.log('==============================================================');
    console.log('silahkan pilih opsi dibawah ini');
    console.log('[1] Daftar Dosen\n[2] Cari Dosen\n[3] Tambah Dosen\n[4] Hapus Dosen\n[5] kembali');
    console.log('==============================================================');
    rl.question(`masukan salah satu no. dari opsi diatas : `, (number) => {
        switch (number) {
            case '1':
                daftarDosen();
                break;
            case '2':
                cariDosen();
                break;
            case '3':
                tambahDosen();
                break;
            case '4':
                hapusDosen();
                break;
            case '5':
                menuAwal();
                break;
            default:
                console.log('==============================================================');
                console.log('Maaf number yang anda inputkan salah');
                menuAwal();
        }
    })
}

function daftarDosen() {
    db.serialize(function () {
        let sql = 'SELECT * FROM dosen';
        db.all(sql, (err, data) => {
            if (err) throw err;
            if (data) {
                var table = new Table({
                    head: ['ID Dosen', 'Nama Dosen'],
                    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                            , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                            , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                })
                data.forEach(data => {
                    table.push([`${data.nip_dosen}`, `${data.nama_dosen}`]);
                })
                console.log(table.toString());
                dosen();
            } 
        })
    })
}

function cariDosen() {
    rl.question(`Masukkan ID Dosen: `, (nip_dosen) => {
        let sql = `SELECT * FROM dosen WHERE nip_dosen = '${nip_dosen}'`
        db.get(sql, (err, data) => {
            if (err) throw err;
            if (data) {
                console.log(`
==============================================================
Dosen Details
==============================================================
ID Dosen      : ${data.nip_dosen}
Nama Dosen    : ${data.nama_dosen}`);
                dosen();
            } else {
                console.log(`Nip dosen dengan ID : ${nip_dosen} tidak ditemukan`);
                console.log('==============================================================');
                cariDosen();
            }
        })
    })
}

function tambahDosen() {
    console.log('Lengkapi data dibawah ini :');
    rl.question('ID Dosen : ', (nip_dosen) => {
        rl.question('Nama Dosen : ', (nama_dosen) => {
            let sql = `INSERT INTO dosen (nip_dosen, nama_dosen) VALUES ('${nip_dosen}','${nama_dosen}')`;
            db.run(sql, (err) => {
                if (err) throw err;
                console.log('==============================================================');
                console.log("Data Jurusan Berhasil di Input");
                console.log('==============================================================');
            });

            let sql2 = 'SELECT * FROM dosen';
            db.all(sql2, (err, data) => {
                if (err) throw err;
                if (data) {
                    var table = new Table({
                        head: ['ID Dosen', 'Nama Dosen'],
                        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                                , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                                , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                                , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                    })
                    data.forEach(data => {
                        table.push([`${data.nip_dosen}`, `${data.nama_dosen}`]);
                    })
                    console.log(table.toString());
                    dosen();
                } 
            })
        })
    })
}

function hapusDosen() {
    rl.question('Masukkan NIM yang akan dihapus : ', (nip_dosen) => {
        let sql = `DELETE FROM dosen WHERE nip_dosen = '${nip_dosen}'`;
        
        let sql2 = `SELECT * FROM dosen WHERE nip_dosen = '${nip_dosen}'`;
        db.get(sql2, (err, rows) => {
            if (err) throw err
                if (rows) {
                    db.run(sql, (err) => {
                        console.log(`Nip dosen dengan ID : '${nip_dosen}' telah dihapus.`);
                        console.log('==============================================================')
                        db.all('SELECT * FROM dosen;', (err, data) => {
                        var table = new Table({
                            head: ['ID Dosen', 'Nama Dosen'],
                            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                                    , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                                    , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                                    , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                        });
                        data.forEach(data => {
                            table.push(
                                [`${data.nip_dosen}`, `${data.nama_dosen}`]
                            );
                        });
                        console.log(table.toString());
                        mahasiswa();
                        })
                    })
                } else {
                    console.log('Nip Dosen tidak terdaftar')
                    console.log('==============================================================')
                    hapusDosen();
                
                }
        })
    })
}


function matakuliah() {
    console.log('==============================================================');
    console.log('silahkan pilih opsi dibawah ini');
    console.log('[1] Daftar Mata Kuliah\n[2] Cari Mata Kuliah\n[3] Tambah Mata Kuliah\n[4] Hapus Mata Kuliah\n[5] kembali');
    console.log('==============================================================')
    rl.question(`masukkan salah satu no. dari opsi diatas : `, (number) => {
        switch (number) {
            case '1':
                daftarMatkul();
                break;
            case '2':
                cariMatkul();
                break;
            case '3':
                tambahMatkul();
                break;
            case '4':
                hapusMatkul();
                break;
            case '5':
                menuAwal();
                break;
            default:
                console.log('==============================================================');
                console.log('Maaf number yang anda inputkan salah');
                menuAwal();
        }
    })
};

function daftarMatkul() {
    db.serialize(function () {
        let sql = 'SELECT * FROM matakuliah';
        db.all(sql, (err, data) => {
            if (err) throw err;
                if (data) {
                    var table = new Table({
                        head: ['ID Mata Kuliah', 'Nama Mata Kuliah', 'SKS', 'Nip Dosen'],
                        chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                                , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                                , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                                , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                    })
                    data.forEach(data => {
                        table.push([`${data.kodematkul}`, `${data.namamatkul}`, `${data.sks}`, `${data.nip_dosen}`]);
                    })
                    console.log(table.toString());
                    matakuliah();
                }
        })
    })
}


function cariMatkul() {
    rl.question(`Masukkan ID Mata Kuliah : `, (kodematkul) => {
        let sql = `SELECT * FROM matakuliah WHERE kodematkul = '${kodematkul}'`
        db.get(sql, (err, data) => {
            if (err) throw err;
            if (data) {
                console.log(`
==============================================================
Mata Kuliah Details
==============================================================
ID Mata Kuliah      : ${data.kodematkul}
Nama Mata Kuliah    : ${data.namamatkul}
SKS                 : ${data.sks}
Nip Dosen           : ${data.nip_dosen}`);
                matakuliah();
            } else {
                console.log(`ID mata kuliah dengan ID : ${kodematkul} tidak ditemukan`);
                console.log('==============================================================');
                cariMatkul();
            }
        })
    })
}

function tambahMatkul() {
    console.log('Lengkapi data dibawah ini :');
    rl.question('ID Mata Kuliah : ', (kodematkul) => {
        rl.question('Nama Mata Kuliah : ', (namamatkul) => {
            rl.question('Jumlah SKS : ', (sks) => {
                rl.question('Nip Dosen : ', (nip_dosen) => {
                    let sql = `INSERT INTO matakuliah (kodematkul, namamatkul, sks, nip_dosen) VALUES ('${kodematkul}', '${namamatkul}', ${sks}, '${nip_dosen}')`;
                    db.run(sql, (err) => {
                        if (err) throw err;
                        console.log('==============================================================');
                        console.log("Data Mata Kuliah Berhasil di Input");
                        console.log('==============================================================');
                    });

                    let sql2 = 'SELECT * FROM matakuliah';
                    db.all(sql2, (err, data) => {
                        if (err) throw err;
                        if (data) {
                            var table = new Table({
                                head: ['ID Mata Kuliah', 'Nama Mata Kuliah', 'SKS', 'Nip Dosen'],
                                chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                                        , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                                        , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                                        , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                            })
                            data.forEach(data => {
                                table.push([`${data.kodematkul}`, `${data.namamatkul}`, `${data.sks}`, `${data.nip_dosen}`]);
                            })
                            console.log(table.toString());
                            matakuliah();
                        }
                    })     
                })
            })
        })
    })
}

function hapusMatkul() {
    rl.question('Masukkan ID Mata Kuliah yang akan dihapus : ', (kodematkul) => {
        let sql = `DELETE FROM matakuliah WHERE kodematkul = '${kodematkul}'`;
        
        let sql2 = `SELECT * FROM matakuliah WHERE kodematkul = '${kodematkul}'`;
        db.get(sql2, (err, rows) => {
            if (err) throw err
                if (rows) {
                    db.run(sql, (err) => {
                        console.log(`Kode Mata Kuliah dengan ID : '${kodematkul}' telah dihapus.`);
                        console.log('==============================================================')
                        db.all('SELECT * FROM matakuliah;', (err, data) => {
                        var table = new Table({
                            head: ['ID Mata Kuliah', 'Nama Mata Kuliah ', 'SKS', 'Nip Dosen'],
                            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                                    , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                                    , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                                    , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                        });
                        data.forEach(data => {
                            table.push(
                                [`${data.kodematkul}`, `${data.namamatkul}`, `${data.sks}`, `${data.nip_dosen}`]
                            );
                        });
                        console.log(table.toString());
                        mahasiswa();
                        })
                    })
                } else {
                    console.log('ID Mata Kuliah tidak terdaftar')
                    console.log('==============================================================')
                    hapusMatkul();
                
                }
        })
    })
}


function kontrak() {
    console.log('==============================================================');
    console.log('silahkan pilih opsi dibawah ini');
    console.log('[1] Daftar Kontrak\n[2] Cari Kontrak\n[3] Tambah Kontrak\n[4] Hapus Kontrak\n[5] kembali');
console.log('==============================================================');
    rl.question(`masukkan salah satu no. dari opsi diatas : `, (number) => {
        switch (number) {
            case '1':
                daftarKontrak();
                break;
            case '2':
                cariKontrak();
                break;
            case '3':
                tambahKontrak();
                break;
            case '4':
                hapusKontrak();
                break;
            case '5':
                menuAwal();
                break;
            default:
                console.log('==============================================================');
                console.log('Maaf number yang anda inputkan salah');
                menuAwal();
        }
    })
}

function daftarKontrak() {
    console.log('==============================================================');
    db.serialize(function () {
        let sql = 'SELECT * FROM kontrak';

        db.all(sql, (err, data) => {
            if (err) throw err;
            if (data) {
                var table = new Table({
                    head: ['ID Kontrak', 'NIM', 'Kode Mata Kuliah', 'SKS', 'Nilai', 'Nip Dosen'],
                    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                            , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                            , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                })
                data.forEach(data => {
                    table.push([`${data.id_kontrak}`, `${data.nim}`, `${data.kodematkul}`, `${data.sks}`, `${data.nilai}`, `${data.nip_dosen}`]);
                })
                console.log(table.toString());
                kontrak();
            } 
        })
    })
}

function cariKontrak() {
    rl.question(`Masukkan ID KONTRAK : `, (id_kontrak) => {
        let sql = `SELECT * FROM kontrak WHERE id_kontrak  = '${id_kontrak}'`;
        db.get(sql, (err, data) => {
            if (err) throw err;
            if (data) {
                console.log(`
==============================================================
Kontrak Details
==============================================================
ID Kontrak          : ${data.id_kontrak}
NIM                 : ${data.nim}
Kode Mata Kuliah    : ${data.kodematkul}
Nilai               : ${data.nilai}
SKS                 : ${data.sks}
Nip Dosen           : ${data.nip_dosen}`);
                kontrak();
            } else {
                console.log(`ID Kontrak dengan ID : ${answer} tidak ditemukan`);
                cariKontrak();
            }
        })
    })
}

function tambahKontrak() {
    console.log('Lengkapi Data dibawah ini :');
        rl.question('NIM : ', (nim) => {
        rl.question('Kode Mata Kuliah : ', (kodematkul) => {
            rl.question('SKS : ', (sks) => {
            rl.question('Nilai : ', (nilai) => {
                    rl.question('Nip Dosen : ', (nip_dosen) => {
                        let sql = `INSERT INTO kontrak (nim, kodematkul, sks, nilai, nip_dosen) VALUES ('${nim}', '${kodematkul}', '${nilai}', ${sks}, '${nip_dosen}')`;

                        let sql2 = `SELECT * FROM kontrak`;
                        db.run(sql, (err) => {
                            if (err) throw err;
                            console.log('==============================================================');
                            console.log("Data Kontrak Berhasil di Input");
                            console.log('==============================================================');
                        });

                        db.all(sql2, (err, data) => {
                            if (err) throw err;
                            if (data) {
                                var table = new Table({
                                    head: ['ID Kontrak', 'NIM', 'Kode Mata Kuliah', 'Nilai', 'SKS', 'Nip Dosen'],
                                    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                                            , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                                            , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                                            , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                                })
                                data.forEach(data => {
                                    table.push([`${data.id_kontrak}`, `${data.nim}`, `${data.kodematkul}`, `${data.sks}`, `${data.nilai}`, `${data.nip_dosen}`]);
                                })
                                console.log(table.toString());
                                kontrak();
                            } 
                        })
                    })
                })
            })
        })
    })
}


function hapusKontrak() {
    rl.question('Masukkan ID Kontrak yang akan dihapus : ', (id_kontrak) => {
        let sql = `DELETE FROM kontrak WHERE id_kontrak = '${id_kontrak}'`;
        
        let sql2 = `SELECT * FROM kontrak WHERE id_kontrak = '${id_kontrak}'`;
        db.get(sql2, (err, rows) => {
            if (err) throw err
                if (rows) {
                    db.run(sql, (err) => {
                        console.log(`ID Kontrak dengan ID : '${id_kontrak}' telah dihapus.`);
                        console.log('==============================================================')
                        db.all('SELECT * FROM kontrak;', (err, data) => {
                        var table = new Table({
                            head: ['ID Kontrak', 'NIM', 'Kode Mata Kuliah', 'Nilai', 'SKS', 'Nip Dosen'],
                            chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
                                    , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
                                    , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
                                    , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
                        });
                        data.forEach(data => {
                            table.push(
                                [ `${data.id_kontrak}`, `${data.nim}`, `${data.kodematkul}`, `${data.sks}`, `${data.nilai}`, `${data.nip_dosen}`]
                            );
                        });
                        console.log(table.toString());
                        kontrak();
                        })
                    })
                } else {
                    console.log('ID Kontrak tidak terdaftar')
                    console.log('==============================================================')
                    hapusKontrak();
                
                }
        })
    })
}