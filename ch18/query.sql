CREATE TABLE user(
    id_login INTEGER PRIMARY KEY,
    username VARCHAR(30),
    passwords VARCHAR(50),
    users VARCHAR (30)
);

INSERT INTO user VALUES 
    (1, 'bambang', '12345', 'ADMIN');

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

CREATE TABLE jurusan(
    kodejur VARCHAR(20) PRIMARY KEY,
    namajurusan VARCHAR(20) NOT NULL
);

INSERT INTO jurusan VALUES
    ('101', 'Manajemen'),
    ('102', 'Teknik Informatika');

CREATE TABLE matakuliah(
    kodematkul VARCHAR(20) PRIMARY KEY,
    namamatkul VARCHAR(25) NOT NULL,
    sks INTEGER NOT NULL,
    nip_dosen  VARCHAR(20) NOT NULL,
    FOREIGN KEY(nip_dosen) REFERENCES dosen(nip_dosen)
);

INSERT INTO matakuliah VALUES
    ('0021', 'Manajemen SDM Internasional', 4, '001'),
    ('0022', 'Akuntansi', 3, '003'),
    ('0023', 'Jaringan Data', 3, '001'),
    ('0024', 'Data Mining', 4, '002');

CREATE TABLE dosen(
    nip_dosen VARCHAR(20) PRIMARY KEY,
    nama_dosen VARCHAR(25) NOT NULL
);

INSERT INTO dosen VALUES
    ('001', 'Afri Erisman'),
    ('002', 'Islamudin'),
    ('003', 'Eti');

CREATE TABLE kontrak(
    id_kontrak INTEGER PRIMARY KEY AUTOINCREMENT,
    nim VARCHAR(20) NOT NULL,
    kodematkul VARCHAR(20) NOT NULL,
    sks INTEGER NOT NULL,
    nilai VARCHAR(5) NULL,
    nip_dosen VARCHAR(20) NOT NULL,
    FOREIGN KEY(nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY(kodematkul) REFERENCES matakuliah(kodematkul),
    FOREIGN KEY(sks) REFERENCES matakuliah(sks),
    FOREIGN KEY(nip_dosen) REFERENCES dosen(nip_dosen)
);    

INSERT INTO kontrak(nim, kodematkul, sks, nilai, nip_dosen) VALUES 
('0734021634', '0021', 4, 'A', '001'),
('0734021635', '0023', 3, 'D', '001'),
('0734021636', '0024', 4, 'C', '002'),
('0734021634', '0022', 3, 'A', '003'),
('0734021637', '0021', 4, 'B', '001'),
('0734021634', '0024', 4, 'E', '002');