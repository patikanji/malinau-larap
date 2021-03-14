
export const Sensus = {
	id: '',
	enumerator: '',
  tanggal: '',
  dusun: '',
  desa: '',
  kecamatan: '',

  // ceklis:
  fotoResponden: false,
  fotoKTP: false,
  fotoRumah: false,
  fotoKamar: false,
  fotoKamarMandi: false,
  fotoDokumen: false,
  fotoKendaraan: false,
  paraf: false,
  koordinatRumah: '',
  koordinatLahan: [],

  nama: '',
  panggilan: '',
  gender: '',
  umur: 0,
  hubungan: '',
  marital: '',
  agama: '',
  suku: '',
  mukim: '',
  pendidikan: '',
  pekerjaan: '',
  pekerjaanLain: '',
  statusPekerjaan: '',
  statusPekerjaanLain: '',
  kerentanan: '',

  anggota: [{},],

  rumah : {
    linkungan: '',
    luas: 0,
    ruang: 0,
    konstruksi: '',

    dinding: '',
    lantai: '',
    atap: '',
    pondasi: '',

    kerusakan: '',
    kamarMandi: '',
    wc: '',
    lantai: '',
    nilai: 0,
    kepemilikan: '',
    buktiKepemilikan: '',
    tiggalSejak: '',
  },

	bangunan: [],

  tanah: [],

  tanaman: [],

  alatTransportasi: [],

  hewanTernak: [],

  tipeBelanja: 'bulanan',
  belanjaMakan: 0,
  belanjaMakanInfo: '',
  belanjaPendidikan: 0,
  belanjaPendidikanInfo: '',
  belanjaKesehatan: 0,
  belanjaKesehatanInfo: '',
  belanjaPakaian: 0,
  belanjaPakaianInfo: '',
  belanjaListrik: 0,
  belanjaListrikInfo: '',
  belanjaTransfer: 0,
  belanjaTransferInfo: '',
  belanjaRokok: 0,
  belanjaRokokInfo: '',
  belanjaKomunikasi: 0,
  belanjaKomunikasiInfo: '',
  belanjaTransportasi: 0,
  belanjaTransportasiInfo: '',
  belanjaRekreasi: 0,
  belanjaRekreasiInfo: '',
  belanjaPinjaman: 0,
  belanjaPinjamanInfo: '',
  belanjaAsuransi: 0,
  belanjaAsuransiInfo: '',
  belanjaSosial: 0,
  belanjaSosialInfo: '',

  pendapatanPekerjaan: 0, // {nilai: 0, keterangan: ''},
  pendapatanPekerjaanInfo: '',
  pendapatanPekerjaanLain: 0, //{nilai: 0, keterangan: ''},
  pendapatanPekerjaanLainInfo: '',
  pendapatanTransfer: 0,  //{nilai: 0, keterangan: ''},
  pendapatanTransferInfo: '',

	pendapatanAnggotaNonKK: [],

  pendapatanPertanian: [],

	jumlahBuruh: 0,

  pendapatanMenyewakanTanah: [],

  pendapatanMenyewakanBangunan: [],

  pendapatanBagihasilPertanian: [],

  pendapatanHasilHutan: [],

  pendapatanHasilBerburu: [],

  pendapatanBudidayaIkan: [],

	pendapatanIkanTangkapan: [],

	kejadianPenyakit: [],

	bpjs: 0,
	kip: '',
	aksesKesehatan: '',
	layananKesehatan: '',
	sakitBerat: '',
	sakitRingan: '',
	bersalin: '',

  putusSekolah: [],

	programSosial: [],

  sumberListrik: '',
	dayaListrik: '',
  frekuensiGangguan: '',
  persepsiGangguan: '',

	sumberAirMinum: '',
	sumberAirMasak: '',
	sumberAirMandi: '',
  sumberAirCuci: '',

	jarakAirMinum: '',
	jarakAirMasak: '',
	jarakAirMandi: '',
	jarakAirCuci: '',

	masalahAir: '',
	tempatBAB: '',
  tempatTinja: '',
  limbahCair: '',
	pengelolaanSampah: '',

	obsPlafon: '',
	obsDinding: '',
	obsLantai: '',
	obsJendelaKamarTidur: '',
	obsJendelaRuangKeluarga: '',
	obsVentilasi: '',
	obsCahaya: '',
	obsAsapDapur: '',
	obsKepadatan: '',

	psKonsen: '',
  psKonsenInfo: '',
  psEkonomiLokal: '',
  psEkonomiLokalInfo: '',
  psLapanganKerja: '',
  psLapanganKerjaInfo: '',
  psLingkungan: '',
  psLingkunganInfo: '',
  psKesmas: '',
  psKesmasInfo: '',
  psKepekaan: '',
  psKepekaanInfo: '',
  psInfrastruktur: '',
  psInfrastrukturInfo: '',
  psAdat: '',
  psAdatInfo: '',
  psGotongRoyong: '',
  psGotongRoyongInfo: '',
  psSikap: '',
  psSikapInfo: '',

	keinginanRelokasi: '',
	bantuanRelokasi: '',
  terdampakRelokasi: '',
  keinginanRelokasiInfo: '',
	bantuanRelokasiInfo: '',
	terdampakRelokasiInfo: '',
  bantuanHilangPendapatan: ['', '', '', ''],
}



export const Anggota =  {
  nama: '',
  gender: '',
  umur: 0,
  hubungan: '',
  marital: '',
  pendidikan: '',
  pekerjaan: '',
  kerentanan: '',
  isResponden: false
}
export const Bangunan =  {
  jenis: '',
  luas: 0,
  status: 'Milik sendiri',
  struktur: '',
  kerusakan: '',
  nilai: 0,
  sejak: '',
}
export const Tanah =  {
  jenis: '',
  luas: 0,
  status: 'Milik sendiri',
  nilai: 0,
}
export const Tanaman =  {
  jenis: '',
  lahan: '',
  tegakan: 0,
  nilaiTegakan: 0,
  nilaiPanen: 0,
  panen: '',
  sejak: '',
}
export const AlatTransportasi =  {
  jenis: '',
  umur: '',
  nilai: 0,
}

export const HewanTernak = {
  jenis: '',
  sejak: 0,
  dipakai: 0,
  dijual: 0,
  nilaiAset: 0,
  nilaiPerTahun: 0,
}


export const PendapatanAnggotaNonKK =  {
  nama: '',
  nilai: 0,
  keterangan: '',
}
export const PendapatanPertanian =  {
  produk: '',
  luas: 0,
  status: '',
  investasi: 0,
  dipakai: 0,
  dijual: 0,
  satuan: 'kg',
  nilaiPerTahun: 0,
}
export const PendapatanMenyewakanTanahDanBangunan =  {
  luas: 0,
  untuk: '',
  nilaiPerTahun: 0,
}
export const PendapatanBagihasilPertanian =  {
  luas: 0,
  produk: '',
  nilaiPerTahun: 0,
}
export const PendapatanHasilHutan =  {
  produk: '',
  satuan: 'kg',
  dipakai: 0, keterangan: '',
  dimakan: 0, untukObat: 0, untukAdat: 0, untukTernak: 0, lainnya: 0,
  dijual: 0,
  nilaiPerTahun: 0,
}

export const PendapatanHasilBerburu =  {
  produk: '',
  satuan: 'kg',
  dipakai: 0, keterangan: '',
  dimakan: 0, untukObat: 0, untukAdat: 0, untukTernak: 0, lainnya: 0,
  dijual: 0,
  nilaiPerTahun: 0,
}

export const PendapatanBudidayaIkan =  {
  jenis: '',
  satuan: 'kg',
  dipakai: 0, keterangan: '',
  dimakan: 0, untukObat: 0, untukAdat: 0, untukTernak: 0, lainnya: 0,
  dijual: 0,
  nilaiPerTahun: 0,
}
export const PendapatanIkanTangkapan =  {
  jenis: '',
  satuan: 'kg',
  dipakai: 0, keterangan: '',
  dimakan: 0, untukObat: 0, untukAdat: 0, untukTernak: 0, lainnya: 0,
  dijual: 0,
  nilaiPerTahun: 0,
}
export const KejadianPenyakit =  {
  nama: '',
  umur: 0,
  penyakit: '',
  kategori: '',
  keterangan: '',
}
export const PutusSekolah =  {
  nama: '',
  umur: 0,
  keterangan: '',
}
export const ProgramSosial =  {
  tahun: '',
  kategori: '',
  program: '',
}
