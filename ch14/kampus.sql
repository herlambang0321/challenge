CREATE TABLE jurusan(
    kodejur VARCHAR(20) PRIMARY KEY,
    namajurusan VARCHAR(20) NOT NULL
);

INSERT INTO jurusan VALUES(
    '101', 'Manajemen'
);

CREATE TABLE dosen(
    nip VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(20) NOT NULL
);

INSERT INTO dosen VALUES(
    '001', 'Afri Erisman'
);

CREATE TABLE matakuliah(
    kodematkul VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(20) NOT NULL,
    sks INT NOT NULL
);

INSERT INTO matakuliah VALUES(
    '0021', 'Manajemen SDM Internasional', 3
);

CREATE TABLE mahasiswa(
    nim VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(20) NOT NULL,
    alamat TEXT NOT NULL,
    kodejur VARCHAR(20) NOT NULL,
    FOREIGN KEY(kodejur) REFERENCES jurusan(kodejur)
);

INSERT INTO mahasiswa VALUES(
    '0734021634', 'Herlambang Gunawan', 'Bengkulu', '101'
);


.header on
.mode column

SELECT * FROM mahasiswa;
SELECT * FROM jurusan;
SELECT * FROM dosen;
SELECT * FROM matakuliah;