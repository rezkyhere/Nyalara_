import {
  AnonymousStory,
  DailyAffirmation,
  EducationArticle,
  EmergencyResource,
  MicroHabit,
  PersonalContact,
} from '../types';

export const INITIAL_AFFIRMATIONS: DailyAffirmation[] = [
  {
    id: 'aff-1',
    quote: 'Kamu tidak harus menyelesaikan semuanya hari ini. Cukup melangkah satu demi satu.',
    reflection: 'Perasaan lelah itu valid. Izinkan dirimu bernapas sejenak tanpa merasa bersalah.',
    category: 'ketenangan',
    bgGradient: 'from-amber-100 to-orange-50 border-amber-200 text-amber-950',
  },
  {
    id: 'aff-2',
    quote: 'Perasaanmu berharga, dan kamu pantas didengarkan tanpa harus takut dihakimi.',
    reflection: 'Saat kamu memendam semuanya sendiri, beban terasa berlipat ganda. Berbagi bukan berarti kamu lemah.',
    category: 'penerimaan',
    bgGradient: 'from-teal-100 to-emerald-50 border-teal-200 text-teal-950',
  },
  {
    id: 'aff-3',
    quote: 'Tidak apa-apa jika hari ini kamu hanya bertahan. Itu sudah sebuah pencapaian yang patut diapresiasi.',
    reflection: 'Setiap hari yang berat yang pernah kamu lalui membuktikan seberapa kuatnya hatimu.',
    category: 'harapan',
    bgGradient: 'from-rose-100 to-pink-50 border-rose-200 text-rose-950',
  },
  {
    id: 'aff-4',
    quote: 'Kamu bukan pikiran burukmu. Kamu adalah orang yang sedang mengamatinya dan memilih untuk pulih.',
    reflection: 'Pikiran negatif hanyalah awan yang lewat di langit pikiranmu. Ia tidak mendefinisikan siapa dirimu.',
    category: 'keberanian',
    bgGradient: 'from-sky-100 to-indigo-50 border-sky-200 text-sky-950',
  },
  {
    id: 'aff-5',
    quote: 'Batas yang sehat bukan bentuk keegoisan, tapi cara kamu menyayangi dirimu dan orang lain.',
    reflection: 'Berani berkata "tidak" pada hal yang menguras energimu adalah langkah awal kedamaian batin.',
    category: 'penerimaan',
    bgGradient: 'from-violet-100 to-purple-50 border-violet-200 text-violet-950',
  },
];

export const INITIAL_STORIES: AnonymousStory[] = [
  {
    id: 'story-1',
    authorAlias: 'Awan Teduh',
    authorAvatar: '☁️',
    category: 'sekolah',
    title: 'Capek banget rasanya dituntut sempurna di sekolah & bimbel',
    content:
      'Setiap pulang sekolah rasanya energi habis total. Mau cerita ke orang tua takut dibilang "kurang bersyukur" atau "kamu cuma disuruh belajar doang". Akhirnya malam ini aku cuma bisa nangis pelan di kamar sambil dengerin musik. Buat siapapun yang ngerasa capek sama ekspektasi sekitar, kita pelukan jarak jauh ya...',
    timeAgo: '2 jam yang lalu',
    reactions: {
      hug: 24,
      notAlone: 38,
      strength: 19,
    },
  },
  {
    id: 'story-2',
    authorAlias: 'Bintang Kecil',
    authorAvatar: '⭐',
    category: 'pertemanan',
    title: 'Merasa kayak orang asing di circle sendiri',
    content:
      'Pernah nggak sih ada di tengah tongkrongan tapi berasa nggak kasat mata? Kalau nggak mulai ngomong duluan nggak ada yang nanya. Hari ini aku memutuskan untuk pulang duluan dan ngopi sendiri. Ternyata tenang juga bisa menikmati waktu sendiri tanpa harus maksain fit in.',
    timeAgo: '5 jam yang lalu',
    reactions: {
      hug: 18,
      notAlone: 42,
      strength: 15,
    },
  },
  {
    id: 'story-3',
    authorAlias: 'Daun Hujan',
    authorAvatar: '🍃',
    category: 'kemenangan-kecil',
    title: 'Hari ini aku berhasil bangun tepat waktu dan jalan santai 10 menit!',
    content:
      'Seminggu kemarin rasanya berat banget buat bangun dari kasur karena overthinking tiap malam. Tapi pagi ini aku bisa keluar rumah, hirup udara segar, dan ngeliat langit pagi. Hal kecil tapi bikin ngerasa ada harapan baru lagi.',
    timeAgo: 'Kemarin',
    reactions: {
      hug: 35,
      notAlone: 14,
      strength: 51,
    },
  },
  {
    id: 'story-4',
    authorAlias: 'Cahaya Lilin',
    authorAvatar: '🕯️',
    category: 'diri-sendiri',
    title: 'Belajar untuk nggak menyalahkan diri sendiri terus-menerus',
    content:
      'Dulu tiap ada masalah, refleks pertamaku selalu mikir: "Ini pasti salah gue." Tapi sekarang aku mulai latihan ngomong ke diri sendiri kayak lagi ngomong ke sahabat yang lagi sedih. Ternyata memperlakukan diri sendiri dengan lembut itu bikin napas lebih plong.',
    timeAgo: '1 hari yang lalu',
    reactions: {
      hug: 29,
      notAlone: 31,
      strength: 40,
    },
  },
];

export const INITIAL_HABITS: MicroHabit[] = [
  {
    id: 'h-1',
    title: 'Minum 1 gelas air saat bangun tidur',
    description: 'Memberikan kesegaran fisik pertama untuk tubuhmu di pagi hari.',
    category: 'tubuh',
    completed: true,
    streak: 3,
  },
  {
    id: 'h-2',
    title: 'Tarik napas dalam 3 kali saat overthinking',
    description: 'Pause sejenak ketika pikiran mulai berputar cepat tak tentu arah.',
    category: 'pikiran',
    completed: false,
    streak: 2,
  },
  {
    id: 'h-3',
    title: 'Layar HP istirahat 15 menit sebelum tidur',
    description: 'Memberikan ruang tenang bagi mata dan otak agar tidur lebih lelap.',
    category: 'istirahat',
    completed: false,
    streak: 1,
  },
  {
    id: 'h-4',
    title: 'Kirim satu pesan terima kasih atau sapa teman',
    description: 'Menjaga hubungan hangat tanpa harus terasa membebani.',
    category: 'sosial',
    completed: false,
    streak: 4,
  },
  {
    id: 'h-5',
    title: 'Catat 1 hal yang kamu syukuri hari ini',
    description: 'Bisa sesederhana cemilan enak atau cuaca teduh sore ini.',
    category: 'pikiran',
    completed: false,
    streak: 5,
  },
];

export const EDUCATION_ARTICLES: EducationArticle[] = [
  {
    id: 'edu-1',
    title: 'Mengenal Emosi: Mengapa Kita Sering Merasa Kewalahan?',
    category: 'Psikologi Remaja',
    readTime: '3 mnt baca',
    summary: 'Emosi bukan musuh. Memahami cara otak remaja memproses stres membantu kita lebih berbelas kasih pada diri sendiri.',
    keyTakeaway: 'Semua emosi datang membawa pesan. Tugas kita bukan menolaknya, melainkan mengakuinya.',
    contentSections: [
      {
        heading: '1. Otak yang Sedang Berkembang',
        body: 'Di masa remaja, bagian otak emosional (amigdala) berkembang lebih cepat daripada bagian pemikiran logis (korteks prefrontal). Wajar sekali jika perasaan sedih, cemas, atau marah terkadang meledak-ledak dan terasa intens.',
      },
      {
        heading: '2. Validasi Dulu, Analisis Kemudian',
        body: 'Ketika emosi datang, jangan langsung berkata "Aku gak boleh lebay." Coba katakan: "Aku lagi sedih/takut, dan itu wajar karena situasinya memang berat."',
      },
      {
        heading: '3. Langkah Sederhana: Name It to Tame It',
        body: 'Memberi nama pada apa yang kamu rasakan (apakah itu kecewa, lelah, takut dihakimi, atau kesepian) secara otomatis menurunkan respons alarm di otak.',
      },
    ],
    actionPrompt: 'Coba sebutkan 1 emosi paling dominan yang kamu rasakan saat ini tanpa menghakiminya.',
  },
  {
    id: 'edu-2',
    title: 'Teknik Lingkaran Kendali: Redakan Overthinking',
    category: 'Manajemen Stres',
    readTime: '4 mnt baca',
    summary: 'Bedakan hal yang bisa kamu ubah dengan hal yang berada di luar kuasamu agar energi mentalmu tidak terkuras.',
    keyTakeaway: 'Fokuskan energimu hanya pada apa yang bisa kamu lakukan hari ini.',
    contentSections: [
      {
        heading: '1. Di Luar Kendalimu (Let It Go)',
        body: 'Opini orang lain, reaksi teman di medsos, masa lalu, dan hasil ujian yang sudah dikumpulkan. Mengkhawatirkannya tidak akan mengubah kenyataan, tapi hanya menghabiskan energi.',
      },
      {
        heading: '2. Di Dalam Kendalimu (Take Action)',
        body: 'Kata-kata yang kamu pilih, waktu istirahatmu, caramu memperlakukan diri sendiri, dan keputusan kapan harus meminta bantuan.',
      },
      {
        heading: '3. Latihan Kertas Dua Kolom',
        body: 'Bagi kertas jadi dua: "Bisa Aku Atur" dan "Bukan Urusanku". Pindahkan beban pikiranmu ke kolom yang sesuai.',
      },
    ],
    actionPrompt: 'Tuliskan satu hal yang akhir-akhir ini bikin kamu cemas, lalu tentukan apakah itu di dalam atau di luar kendalimu.',
  },
  {
    id: 'edu-3',
    title: 'Self-Compassion: Cara Menjadi Sahabat Terbaik bagi Diri Sendiri',
    category: 'Kesehatan Mental',
    readTime: '3 mnt baca',
    summary: 'Bagaimana jika suara di kepalamu memperlakukanmu seperti seorang kawan yang sedang berjuang, bukan hakim yang keras?',
    keyTakeaway: 'Kamu pantas mendapatkan kelembutan yang sama dengan yang kamu berikan ke orang lain.',
    contentSections: [
      {
        heading: '1. Kritik Diri vs Kasih Sayang Diri',
        body: 'Banyak remaja mengira harus keras pada diri sendiri agar sukses. Padahal riset membuktikan bahwa self-compassion meningkatkan resiliensi jauh lebih tinggi tanpa kecemasan berlebih.',
      },
      {
        heading: '2. Tiga Elemen Self-Compassion',
        body: 'Self-kindness (ramah pada diri), Common Humanity (sadar bahwa kesulitan adalah bagian hidup manusia), dan Mindfulness (sadar tanpa melebih-lebihkan).',
      },
    ],
    actionPrompt: 'Jika sahabatmu mengalami apa yang kamu alami sekarang, kata-kata apa yang akan kamu ucapkan padanya?',
  },
];

export const EMERGENCY_HOTLINES: EmergencyResource[] = [
  {
    name: 'Layanan SEJIWA Kemenkes RI',
    tagline: 'Layanan Kesehatan Jiwa Nasional',
    contact: '119 (Tekan 8)',
    contactType: 'phone',
    availability: '24 Jam / 7 Hari',
    isFree: true,
    description: 'Hotline resmi Kementerian Kesehatan untuk pertolongan pertama kesehatan jiwa, bebas pulsa di seluruh Indonesia.',
    urgentNotice: 'Hubungi jika kamu atau temanmu sedang dalam krisis emosional mendesak.',
  },
  {
    name: 'Into The Light Indonesia',
    tagline: 'Pencegahan Bunuh Diri & Advokasi Remaja',
    contact: 'intothelightid.org',
    contactType: 'website',
    availability: 'Panduan Informasi & Rujukan',
    isFree: true,
    description: 'Organisasi berbasis bukti yang menyediakan direktori rujukan psikolog, psikiater, dan informasi krisis terverifikasi.',
  },
  {
    name: 'Layanan SAPA 129 (KemenPPPA)',
    tagline: 'Perlindungan Anak & Remaja',
    contact: '129 / WA: 08111-129-129',
    contactType: 'whatsapp',
    availability: 'Senin - Minggu 24 Jam',
    isFree: true,
    description: 'Layanan pengaduan dan pendampingan psikososial khusus untuk anak, remaja, dan keluarga.',
  },
  {
    name: 'Yayasan Pulih',
    tagline: 'Konseling & Pemulihan Trauma',
    contact: '0811-8436-633 (WhatsApp)',
    contactType: 'whatsapp',
    availability: 'Senin - Jumat 09:00 - 17:00 WIB',
    isFree: false,
    description: 'Layanan konseling psikologis tatap muka & daring yang ramah remaja dan inklusif.',
  },
];

export const CHAT_TEMPLATES = [
  {
    id: 'tmpl-teman',
    target: 'Teman Dekat / Sahabat',
    title: 'Ketika butuh pendengar tanpa solusi rumit',
    body: 'Hai [Nama], lagi senggang nggak? Akhir-akhir ini kepalaku lagi lumayan penuh. Aku nggak butuh solusi kok, cuma butuh teman cerita atau ditemenin ngobrol bentar biar nggak ngerasa sendirian. Boleh?',
  },
  {
    id: 'tmpl-keluarga',
    target: 'Orang Tua / Kakak',
    title: 'Ketika ingin orang rumah mengerti kondisimu',
    body: 'Bapak/Ibu/Kak, aku mau ngomong sesuatu pelan-pelan ya. Belakangan ini aku lagi ngerasa capek dan kewalahan secara emosional. Aku pengen cerita tapi kadang takut salah paham. Nanti kalau ada waktu luang, bisa ngobrol santai sebentar?',
  },
  {
    id: 'tmpl-profesional',
    target: 'Guru BK / Konselor / Psikolog',
    title: 'Ketika ingin membuat janji sesi curhat',
    body: 'Selamat siang Bapak/Ibu [Nama], saya [Nama Kamu] dari [Kelas/Instansi]. Saya ingin menanyakan apakah ada waktu luang untuk sesi konseling? Ada beberapa hal yang sedang mengganggu fokus dan perasaan saya yang ingin saya konsultasikan. Terima kasih banyak.',
  },
];

export const INITIAL_CONTACTS: PersonalContact[] = [
  {
    id: 'c-1',
    name: 'Sarah (Sahabat)',
    relation: 'Teman Sebangku',
    phone: '0812-3456-7890',
    note: 'Selalu dengerin tanpa nge-judge, suka kirim meme lucu kalau lagi sedih.',
  },
  {
    id: 'c-2',
    name: 'Ibu Ratna (Guru BK)',
    relation: 'Sekolah',
    phone: '0813-9876-5432',
    note: 'Ramah dan bisa diajak ngobrol santai di ruang BK saat jam istirahat.',
  },
];

export const RESEARCH_BACKGROUND = {
  projectName: 'NYALARA (Ruang Aman Digital bagi Remaja)',
  event: 'Misi 1 Empathize & Define | SIAP IMPACT 2026',
  principles: [
    { title: 'Empatik', desc: 'Merespons dengan validasi perasaan tanpa kata-kata meremehkan seperti "kamu lebay" atau "kurang bersyukur".' },
    { title: 'Menjaga Privasi', desc: 'Kontrol penuh di tangan remaja: bisa refleksi mandiri, menulis jurnal privat, atau bercerita secara anonim.' },
    { title: 'Mudah Diakses', desc: 'Tersedia di genggaman, intuitif, cepat digunakan saat krisis atau saat butuh jeda 3 menit.' },
    { title: 'Tidak Menggantikan Bantuan Medis', desc: 'Menghadirkan pertolongan pertama emosional dan direktori rujukan resmi jika butuh penanganan ahli.' },
  ],
  personas: [
    {
      code: 'NA',
      profile: 'Remaja yang memandang masalah sebagai hal yang dapat dilewati, terbiasa menulis refleksi diri, mendekat pada Tuhan dan mencari distraksi positif.',
      needs: 'Ruang privat untuk mengekspresikan emosi tanpa takut menjadi beban bagi orang tua atau teman.',
    },
    {
      code: 'AW',
      profile: 'Memandang pengalaman negatif sebagai pembelajaran, mengandalkan self-talk, afirmasi, istirahat, dan deep talk dengan teman terpercaya.',
      needs: 'Penerimaan, pendengar suportif yang tidak langsung menghakimi atau menceramahi.',
    },
    {
      code: 'RA',
      profile: 'Pengguna media sosial yang nyaman mengawali cerita lewat tulisan/chat daring sebelum bertemu langsung.',
      needs: 'Keamanan data, anonimitas, dan kepastian bahwa ceritanya tidak akan bocor ke lingkungan pergaulan nyata.',
    },
  ],
  hmw: 'Bagaimana kita dapat menghadirkan ruang aman digital yang membantu remaja memahami perasaannya, merasa didengar tanpa dihakimi, dan menemukan dukungan yang sesuai ketika membutuhkannya?',
};
