CREATE TABLE jurusan(
    kodejur VARCHAR(20) PRIMARY KEY,
    namajurusan VARCHAR(20) NOT NULL
);

INSERT INTO jurusan VALUES
    ('101', 'Manajemen'),
    ('102', 'Teknik Informatika');

CREATE TABLE dosen(
    nip_dosen VARCHAR(20) PRIMARY KEY,
    nama_dosen VARCHAR(25) NOT NULL
);

INSERT INTO dosen VALUES
    ('001', 'Afri Erisman'),
    ('002', 'Islamudin'),
    ('003', 'Eti');

CREATE TABLE matakuliah(
    kodematkul VARCHAR(20) PRIMARY KEY,
    namamatkul VARCHAR(25) NOT NULL,
    sks INTEGER NOT NULL,
    nip_dosen INTEGER NOT NULL,
    FOREIGN KEY(nip_dosen) REFERENCES dosen(nip_dosen)
);

INSERT INTO matakuliah VALUES
('0021', 'Manajemen SDM Internasional', 4, '001'),
('0022', 'Akuntansi', 3, '003'),
('0023', 'Jaringan Data', 3, '001'),
('0024', 'Data Mining', 4, '002');

CREATE TABLE nilaiMhs(
    nim VARCHAR NOT NULL,
    kodematkul VARCHAR NOT NULL,
    sks INTEGER NOT NULL,
    nilai VARCHAR(5) NOT NULL,
    nip_dosen INTEGER NOT NULL,
    FOREIGN KEY(nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY(kodematkul) REFERENCES matakuliah(kodematkul),
    FOREIGN KEY(sks) REFERENCES matakuliah(sks),
    FOREIGN KEY(nip_dosen) REFERENCES dosen(nip_dosen)
);    

INSERT INTO nilaiMhs(nim, kodematkul, sks, nilai, nip_dosen) VALUES 
('0734021634', '0021', 4, 'A', '001'),
('0734021635', '0023', 3, 'D', '001'),
('0734021636', '0024', 4, 'C', '002'),
('0734021634', '0022', 3, 'A', '003'),
('0734021637', '0021', 4, 'B', '001'),
('0734021634', '0024', 4, 'E', '002');

CREATE TABLE mahasiswa(
    nim VARCHAR(20) PRIMARY KEY,
    nama VARCHAR(25) NOT NULL,
    alamat TEXT NOT NULL,
    umur INTEGER NOT NULL,
    kodejur VARCHAR(20) NOT NULL,
    FOREIGN KEY(kodejur) REFERENCES jurusan(kodejur)
);

INSERT INTO mahasiswa VALUES
    ('0734021634', 'Herlambang Gunawan', 'Bengkulu', 18, '101'),
    ('0734021635', 'Azka', 'Hulu Danau', 20, '102'),
    ('0734021636', 'Eza', 'Bengkulu Utara', 19, '101'),
    ('0734021637', 'Wahyu', 'Bengkulu Selatan', 18, '102');

.header on
.mode column

-- 1
SELECT mahasiswa.*, namajurusan FROM mahasiswa LEFT JOIN jurusan ON mahasiswa.kodejur = jurusan.kodejur;

-- 2
SELECT * FROM mahasiswa WHERE umur < 20;

-- 3
SELECT mahasiswa.nim, nama, nilai, matakuliah.kodematkul, namamatkul FROM mahasiswa, nilaiMhs, matakuliah WHERE mahasiswa.nim = nilaiMhs.nim AND matakuliah.kodematkul = nilaiMhs.kodematkul AND nilaiMhs.nilai <= 'B';

-- 4
SELECT mahasiswa.nim, nama, kodejur, SUM(nilaiMhs.sks) jumlah_sks FROM mahasiswa, nilaiMhs WHERE mahasiswa.nim = nilaiMhs.nim GROUP BY mahasiswa.nama HAVING SUM(nilaiMhs.sks) > 10;

-- 5
SELECT mahasiswa.nim, nama, kodejur, matakuliah.kodematkul, namamatkul FROM mahasiswa, nilaiMhs, matakuliah WHERE mahasiswa.nim = nilaiMhs.NIM AND matakuliah.kodematkul = nilaiMhs.kodematkul AND namamatkul = 'Data Mining';

-- 6
SELECT dosen.nip_dosen, nama_dosen, COUNT(nilaiMhs.nip_dosen) jumlah_mahasiswa FROM dosen, nilaiMhs WHERE dosen.nip_dosen = nilaiMhs.nip_dosen GROUP BY dosen.nip_dosen HAVING COUNT(nilaiMhs.nip_dosen);

-- 7
SELECT * FROM mahasiswa ORDER BY mahasiswa.umur ASC;

-- 8
-- JOIN
SELECT mahasiswa.nim, nama, jurusan.kodejur, dosen.nama_dosen AS nama_Dosen, matakuliah.namamatkul, nilaiMhs.nilai
FROM mahasiswa JOIN jurusan ON mahasiswa.kodejur = jurusan.kodejur 
JOIN dosen ON dosen.nip_dosen = matakuliah.nip_dosen 
JOIN matakuliah ON matakuliah.kodematkul = nilaiMhs.kodematkul
JOIN nilaiMhs ON nilaiMhs.nim = mahasiswa.nim
AND nilaiMhs.nilai >= 'D'
ORDER BY mahasiswa.nim;

-- WHERE
SELECT mahasiswa.nim, nama, jurusan.Namajurusan, dosen.nama_dosen AS nama_Dosen, matakuliah.namamatkul, nilaiMhs.nilai
FROM mahasiswa,jurusan,dosen,matakuliah,nilaiMhs
WHERE mahasiswa.kodejur = jurusan.kodejur
AND dosen.nip_dosen = matakuliah.nip_dosen
AND matakuliah.kodematkul = nilaiMhs.kodematkul 
AND mahasiswa.nim = nilaiMhs.nim
AND nilaiMhs.nilai > 'C'
ORDER BY mahasiswa.nim;