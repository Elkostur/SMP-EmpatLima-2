import type { Post, GalleryItem, StaffMember, User, Extracurricular, AboutPageContent, HeroImage, Statistic, Facility, FaqItem, Registration, ContactMessage, Achievement, ContactInfo } from '../types';

// --- DUMMY DATA ---
let posts: Post[] = [
  { id: '1', title: 'Peringatan Maulid Nabi Muhammad SAW di Sekolah', content: 'Seluruh siswa dan guru SMP "Empat Lima" 2 Kedungprin mengikuti acara peringatan Maulid Nabi dengan khidmat. Acara diisi dengan pembacaan shalawat, ceramah, dan berbagai lomba islami untuk meningkatkan kecintaan kepada Rasulullah. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', createdAt: new Date(), imageUrl: 'https://picsum.photos/800/600?random=1' },
  { id: '2', title: 'Siswa-siswi SMP "Empat Lima" 2 Raih Juara 1 Lomba Robotik', content: 'Tim Robotik sekolah berhasil meraih juara pertama dalam kompetisi tingkat nasional. Prestasi ini membuktikan bahwa siswa-siswi kami mampu bersaing dalam bidang teknologi modern tanpa meninggalkan nilai-nilai keislaman. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.', createdAt: new Date(Date.now() - 86400000), imageUrl: 'https://picsum.photos/800/600?random=2' },
];

let galleries: GalleryItem[] = [
  { id: 'g1', title: 'Kegiatan Class Meeting', imageUrl: 'https://picsum.photos/600/400?random=10', createdAt: new Date() },
  { id: 'g2', title: 'Wisuda & Pelepasan Siswa', imageUrl: 'https://picsum.photos/600/400?random=11', createdAt: new Date() },
  { id: 'g3', title: 'Bakti Sosial Ramadhan', imageUrl: 'https://picsum.photos/600/400?random=12', createdAt: new Date() },
];

let staff: StaffMember[] = [
  { 
    id: 's1', 
    name: 'Dr. H. Ahmad Fauzi, M.Pd.', 
    position: 'Kepala Sekolah', 
    bio: 'Pemimpin visioner dengan semangat memajukan pendidikan islami.', 
    imageUrl: 'https://picsum.photos/400/400?random=20',
    nuptk: '1234567890123456',
    address: 'Jl. Merdeka No. 10, Lamongan',
    religion: 'Islam',
    email: 'kepsek@smp45kedungprin.sch.id',
    phone: '0812-3456-7890'
  },
  { 
    id: 's2', 
    name: 'Siti Aisyah, S.Kom.', 
    position: 'Guru TIK & Pembina Robotik', 
    bio: 'Ahli dalam teknologi web modern dan pembina ekstrakurikuler.', 
    imageUrl: 'https://picsum.photos/400/400?random=21',
    nuptk: '9876543210987654',
    address: 'Perumahan Cendana Blok A5, Kedungprin',
    religion: 'Islam',
    email: 'siti.a@smp45kedungprin.sch.id',
    phone: '0856-7890-1234'
  },
];

let extracurriculars: Extracurricular[] = [
  { id: 'e1', name: 'Pramuka', description: 'Membentuk karakter mandiri, disiplin, dan cinta tanah air melalui kegiatan kepanduan yang seru dan menantang.', imageUrl: 'https://picsum.photos/600/400?random=30' },
  { id: 'e2', name: 'Robotik', description: 'Mengembangkan kreativitas dan kemampuan problem-solving di bidang teknologi melalui perakitan dan pemrograman robot.', imageUrl: 'https://picsum.photos/600/400?random=31' },
  { id: 'e3', name: 'Tahfidz Qur\'an', description: 'Program intensif untuk menghafal Al-Qur\'an dengan bimbingan dari para hafidz/hafidzah yang berpengalaman.', imageUrl: 'https://picsum.photos/600/400?random=32' },
];

let aboutPageContent: AboutPageContent = {
  vision: "Menjadi lembaga pendidikan Islam terdepan yang menghasilkan generasi cerdas, kreatif, berakhlak mulia, dan siap menghadapi tantangan global.",
  mission: "Misi kami adalah menyelenggarakan pendidikan yang seimbang antara pengembangan intelektual, emosional, dan spiritual. Kami berkomitmen untuk menciptakan lingkungan belajar yang kondusif, modern, dan berlandaskan nilai-nilai Islam untuk membentuk generasi yang unggul dalam Imtaq (Iman dan Taqwa) dan Iptek (Ilmu Pengetahuan dan Teknologi).",
  coreValues: [
    { title: 'Islami', description: "Mengintegrasikan ajaran Al-Qur'an dan Sunnah dalam setiap aspek kehidupan sekolah." },
    { title: 'Integritas', description: 'Menjunjung tinggi kejujuran, amanah, dan tanggung jawab.' },
    { title: 'Inovatif', description: 'Mendorong kreativitas dan pemikiran kritis dalam pembelajaran dan pemecahan masalah.' },
    { title: 'Unggul', description: 'Berkomitmen untuk mencapai keunggulan dalam bidang akademik dan non-akademik.' },
    { title: 'Kepedulian', description: 'Membangun rasa empati dan kepedulian terhadap sesama dan lingkungan.' },
  ],
  principalWelcome: {
    text: "Assalamualaikum Warahmatullahi Wabarakatuh.\n\nSelamat datang di website resmi SMP 'Empat Lima' 2 Kedungprin. Dengan penuh rasa syukur, kami mempersembahkan platform digital ini sebagai jembatan informasi antara sekolah, siswa, orang tua, dan masyarakat. Kami bertekad untuk terus berinovasi dalam pendidikan, memadukan kurikulum modern dengan penanaman akhlakul karimah yang kuat. Mari bersama-sama kita wujudkan generasi penerus yang tidak hanya unggul dalam ilmu pengetahuan, tetapi juga kokoh dalam iman dan taqwa. Terima kasih atas dukungan Anda.",
    imageUrl: 'https://picsum.photos/400/400?random=20',
    name: 'Dr. H. Ahmad Fauzi, M.Pd.',
    title: 'Kepala Sekolah'
  }
};

let heroImages: HeroImage[] = [
  { id: 'h1', title: 'Mencetak Generasi Cerdas & Berakhlak', subtitle: 'Menggabungkan keunggulan akademik modern dengan nilai-nilai Islam yang kokoh.', imageUrl: 'https://picsum.photos/1920/1080?random=40' },
  { id: 'h2', title: 'Fasilitas Belajar yang Modern', subtitle: 'Lingkungan belajar yang kondusif dengan teknologi terkini untuk mendukung prestasi siswa.', imageUrl: 'https://picsum.photos/1920/1080?random=41' },
  { id: 'h3', title: 'Juara di Tingkat Nasional', subtitle: 'Siswa-siswi kami aktif berprestasi di berbagai kompetisi akademik dan non-akademik.', imageUrl: 'https://picsum.photos/1920/1080?random=42' },
];

let statistics: Statistic[] = [
    { id: 'stat1', value: '1985', label: 'Tahun Berdiri' },
    { id: 'stat2', value: '5000+', label: 'Siswa Lulus' },
    { id: 'stat3', value: 'A', label: 'Akreditasi' },
    { id: 'stat4', value: '50+', label: 'Guru & Staf' },
];

let facilities: Facility[] = [
    { id: 'f1', name: 'Perpustakaan Modern', description: 'Koleksi buku lengkap dan ruang baca yang nyaman untuk mendukung literasi siswa.', imageUrl: 'https://picsum.photos/600/400?random=50' },
    { id: 'f2', name: 'Laboratorium Komputer', description: 'Dilengkapi perangkat terkini untuk pembelajaran teknologi informasi dan komunikasi.', imageUrl: 'https://picsum.photos/600/400?random=51' },
    { id: 'f3', name: 'Laboratorium IPA', description: 'Fasilitas untuk praktikum sains yang aman dan sesuai standar.', imageUrl: 'https://picsum.photos/600/400?random=52' },
    { id: 'f4', name: 'Lapangan Olahraga', description: 'Area multifungsi untuk berbagai kegiatan olahraga seperti basket, futsal, dan atletik.', imageUrl: 'https://picsum.photos/600/400?random=53' },
];

let faqs: FaqItem[] = [
    { id: 'faq1', question: 'Kapan pendaftaran siswa baru dibuka?', answer: 'Pendaftaran siswa baru dibuka setiap tahun ajaran baru, biasanya dimulai pada bulan Juni. Informasi detail akan diumumkan di website ini.' },
    { id: 'faq2', question: 'Apa saja ekstrakurikuler yang tersedia?', answer: 'Kami memiliki berbagai ekstrakurikuler seperti Pramuka, Robotik, Tahfidz Qur\'an, Futsal, dan lainnya untuk mengembangkan minat dan bakat siswa.' },
    { id: 'faq3', question: 'Bagaimana sistem pembayaran SPP?', answer: 'Pembayaran SPP dapat dilakukan melalui transfer bank atau langsung di bagian administrasi sekolah. Kami menyediakan beberapa pilihan untuk kemudahan orang tua.' },
];

let registrations: Registration[] = [
    { id: 'reg1', fullName: 'Budi Santoso', birthDate: '2010-05-15', previousSchool: 'SDN 1 Kedungprin', parentName: 'Ahmad Santoso', phone: '081234567890', email: 'budi.s@example.com', createdAt: new Date(), documentUrl: 'https://picsum.photos/seed/doc1/200/300' },
];

let contactMessages: ContactMessage[] = [
    { id: 'cm1', name: 'Rina Wati', email: 'rina.w@example.com', subject: 'Informasi Pendaftaran', message: 'Assalamualaikum, saya ingin bertanya mengenai jadwal pendaftaran untuk tahun ajaran depan. Terima kasih.', createdAt: new Date() },
];

let achievements: Achievement[] = [
    { id: 'ach1', title: 'Juara 1 Olimpiade Sains Nasional', description: 'Tim sains kami berhasil membawa pulang medali emas dalam ajang OSN tingkat SMP. Ini adalah bukti dedikasi dan kerja keras siswa dan guru pembimbing.', date: '2023-08-20', imageUrl: 'https://picsum.photos/800/600?random=60' },
    { id: 'ach2', title: 'Pemenang Lomba Cerdas Cermat PAI', description: 'Siswa kami menunjukkan pemahaman mendalam tentang Pendidikan Agama Islam dengan meraih juara pertama tingkat kabupaten.', date: '2023-05-10', imageUrl: 'https://picsum.photos/800/600?random=61' },
    { id: 'ach3', title: 'Sekolah Adiwiyata Tingkat Provinsi', description: 'Sekolah kami dianugerahi penghargaan Adiwiyata sebagai pengakuan atas komitmen kami terhadap lingkungan hidup.', date: '2022-11-25', imageUrl: 'https://picsum.photos/800/600?random=62' },
];

let contactInfo: ContactInfo = {
    address: 'Jl. Pendidikan No. 1, Kedungprin, Lamongan, Jawa Timur 62272',
    phone: '(0322) 123-456',
    email: 'info@smp45kedungprin.sch.id',
    mapImageUrl: 'https://picsum.photos/seed/map/600/400'
};


const mockDelay = <T,>(data: T): Promise<T> => new Promise(resolve => setTimeout(() => resolve(data), 500));

// --- STORAGE PLACEHOLDER ---

export const uploadImage = async (file: File, onProgress?: (progress: number) => void): Promise<string> => {
    console.log(`Firebase: "Uploading" image ${file.name}...`);
    
    // Simulate upload progress
    const uploadDuration = 1500; // 1.5 seconds
    const intervalTime = 50; // update every 50ms
    let progress = 0;

    return new Promise((resolve) => {
        const interval = setInterval(() => {
            progress += (intervalTime / uploadDuration) * 100;
            if (progress > 100) progress = 100;
            
            if (onProgress) {
                onProgress(Math.round(progress));
            }

            if (progress >= 100) {
                clearInterval(interval);
                const fakeUrl = `https://picsum.photos/seed/${Date.now()}/1200/800`;
                console.log(`Firebase: "Upload" complete. URL: ${fakeUrl}`);
                resolve(fakeUrl);
            }
        }, intervalTime);
    });
};

// --- AUTHENTICATION PLACEHOLDERS ---

export const checkUserLoggedIn = async (): Promise<User | null> => {
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  if (loggedInUser) return mockDelay(JSON.parse(loggedInUser));
  return mockDelay(null);
};

export const signIn = async (email: string, pass: string): Promise<User> => {
  if (email === 'admin@example.com' && pass === 'password') {
    const user: User = { uid: 'admin123', email: 'admin@example.com' };
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    return mockDelay(user);
  }
  throw new Error('Invalid credentials');
};

export const signOut = async (): Promise<void> => {
  sessionStorage.removeItem('loggedInUser');
  return mockDelay(undefined);
};

// --- POSTS CRUD ---

export const getPosts = async (): Promise<Post[]> => mockDelay([...posts].sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()));
export const getPostById = async (id: string): Promise<Post | undefined> => mockDelay(posts.find(p => p.id === id));
export const addPost = async (postData: Omit<Post, 'id' | 'createdAt'>): Promise<Post> => {
    const newPost: Post = { ...postData, id: Date.now().toString(), createdAt: new Date() };
    posts.unshift(newPost);
    return mockDelay(newPost);
};
export const updatePost = async (postId: string, postData: Partial<Post>): Promise<Post> => {
    const post = posts.find(p => p.id === postId);
    if (!post) throw new Error('Post not found');
    Object.assign(post, postData);
    return mockDelay(post);
};
export const deletePost = async (postId: string): Promise<void> => {
    posts = posts.filter(p => p.id !== postId);
    return mockDelay(undefined);
};

// --- GALLERIES CRUD ---

export const getGalleries = async (): Promise<GalleryItem[]> => mockDelay([...galleries].sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()));
export const addGalleryItem = async (itemData: Omit<GalleryItem, 'id' | 'createdAt'>): Promise<GalleryItem> => {
    const newItem: GalleryItem = { ...itemData, id: `g${Date.now()}`, createdAt: new Date() };
    galleries.unshift(newItem);
    return mockDelay(newItem);
};
export const updateGalleryItem = async (itemId: string, itemData: Partial<GalleryItem>): Promise<GalleryItem> => {
    const item = galleries.find(i => i.id === itemId);
    if (!item) throw new Error('Gallery item not found');
    Object.assign(item, itemData);
    return mockDelay(item);
};
export const deleteGalleryItem = async (itemId: string): Promise<void> => {
    galleries = galleries.filter(i => i.id !== itemId);
    return mockDelay(undefined);
};

// --- STAFF CRUD ---

export const getStaff = async (): Promise<StaffMember[]> => mockDelay([...staff]);
export const addStaffMember = async (staffData: Omit<StaffMember, 'id'>): Promise<StaffMember> => {
    const newMember: StaffMember = { ...staffData, id: `s${Date.now()}` };
    staff.push(newMember);
    return mockDelay(newMember);
};
export const updateStaffMember = async (staffId: string, staffData: Partial<StaffMember>): Promise<StaffMember> => {
    const member = staff.find(s => s.id === staffId);
    if (!member) throw new Error('Staff member not found');
    Object.assign(member, staffData);
    return mockDelay(member);
};
export const deleteStaffMember = async (staffId: string): Promise<void> => {
    staff = staff.filter(s => s.id !== staffId);
    return mockDelay(undefined);
};

// --- EXTRACURRICULARS CRUD ---

export const getExtracurriculars = async (): Promise<Extracurricular[]> => mockDelay([...extracurriculars]);
export const addExtracurricular = async (data: Omit<Extracurricular, 'id'>): Promise<Extracurricular> => {
    const newItem: Extracurricular = { ...data, id: `e${Date.now()}` };
    extracurriculars.push(newItem);
    return mockDelay(newItem);
};
export const updateExtracurricular = async (id: string, data: Partial<Extracurricular>): Promise<Extracurricular> => {
    const item = extracurriculars.find(e => e.id === id);
    if (!item) throw new Error('Extracurricular not found');
    Object.assign(item, data);
    return mockDelay(item);
};
export const deleteExtracurricular = async (id: string): Promise<void> => {
    extracurriculars = extracurriculars.filter(e => e.id !== id);
    return mockDelay(undefined);
};

// --- ABOUT PAGE CONTENT ---

export const getAboutPageContent = async (): Promise<AboutPageContent> => mockDelay(aboutPageContent);
export const updateAboutPageContent = async (data: Partial<AboutPageContent>): Promise<AboutPageContent> => {
    aboutPageContent = { ...aboutPageContent, ...data };
    return mockDelay(aboutPageContent);
};

// --- HERO IMAGES CRUD ---

export const getHeroImages = async (): Promise<HeroImage[]> => mockDelay([...heroImages]);
export const addHeroImage = async (data: Omit<HeroImage, 'id'>): Promise<HeroImage> => {
    const newItem: HeroImage = { ...data, id: `h${Date.now()}` };
    heroImages.push(newItem);
    return mockDelay(newItem);
};
export const updateHeroImage = async (id: string, data: Partial<HeroImage>): Promise<HeroImage> => {
    const item = heroImages.find(h => h.id === id);
    if (!item) throw new Error('Hero image not found');
    Object.assign(item, data);
    return mockDelay(item);
};
export const deleteHeroImage = async (id: string): Promise<void> => {
    heroImages = heroImages.filter(h => h.id !== id);
    return mockDelay(undefined);
};

// --- STATISTICS ---
export const getStatistics = async (): Promise<Statistic[]> => mockDelay([...statistics]);
export const updateStatistics = async (updatedStats: Statistic[]): Promise<Statistic[]> => {
    statistics = updatedStats;
    return mockDelay(statistics);
};

// --- FACILITIES CRUD ---
export const getFacilities = async (): Promise<Facility[]> => mockDelay([...facilities]);
export const addFacility = async (data: Omit<Facility, 'id'>): Promise<Facility> => {
    const newItem: Facility = { ...data, id: `f${Date.now()}` };
    facilities.push(newItem);
    return mockDelay(newItem);
};
export const updateFacility = async (id: string, data: Partial<Facility>): Promise<Facility> => {
    const item = facilities.find(f => f.id === id);
    if (!item) throw new Error('Facility not found');
    Object.assign(item, data);
    return mockDelay(item);
};
export const deleteFacility = async (id: string): Promise<void> => {
    facilities = facilities.filter(f => f.id !== id);
    return mockDelay(undefined);
};

// --- FAQ CRUD ---
export const getFaqs = async (): Promise<FaqItem[]> => mockDelay([...faqs]);
export const addFaq = async (data: Omit<FaqItem, 'id'>): Promise<FaqItem> => {
    const newItem: FaqItem = { ...data, id: `faq${Date.now()}` };
    faqs.push(newItem);
    return mockDelay(newItem);
};
export const updateFaq = async (id: string, data: Partial<FaqItem>): Promise<FaqItem> => {
    const item = faqs.find(f => f.id === id);
    if (!item) throw new Error('FAQ not found');
    Object.assign(item, data);
    return mockDelay(item);
};
export const deleteFaq = async (id: string): Promise<void> => {
    faqs = faqs.filter(f => f.id !== id);
    return mockDelay(undefined);
};

// --- REGISTRATIONS CRUD ---
export const getRegistrations = async (): Promise<Registration[]> => mockDelay([...registrations].sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()));
export const addRegistration = async (
    data: Omit<Registration, 'id' | 'createdAt' | 'documentUrl'>,
    documentFile?: File | null
): Promise<Registration> => {
    let documentUrl: string | undefined = undefined;
    if (documentFile) {
        // We can reuse the uploadImage function for any file in this mock
        documentUrl = await uploadImage(documentFile); 
    }

    const newRegistration: Registration = { 
        ...data, 
        id: `reg${Date.now()}`, 
        createdAt: new Date(),
        documentUrl: documentUrl 
    };
    registrations.unshift(newRegistration);
    return mockDelay(newRegistration);
};
export const deleteRegistration = async (id: string): Promise<void> => {
    registrations = registrations.filter(r => r.id !== id);
    return mockDelay(undefined);
};

// --- CONTACT MESSAGES CRUD ---
export const getContactMessages = async (): Promise<ContactMessage[]> => mockDelay([...contactMessages].sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime()));
export const addContactMessage = async (data: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage> => {
    const newMessage: ContactMessage = { 
        ...data, 
        id: `cm${Date.now()}`, 
        createdAt: new Date()
    };
    contactMessages.unshift(newMessage);
    return mockDelay(newMessage);
};
export const deleteContactMessage = async (id: string): Promise<void> => {
    contactMessages = contactMessages.filter(m => m.id !== id);
    return mockDelay(undefined);
};

// --- ACHIEVEMENTS CRUD ---
export const getAchievements = async (): Promise<Achievement[]> => mockDelay([...achievements].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
export const addAchievement = async (data: Omit<Achievement, 'id'>): Promise<Achievement> => {
    const newItem: Achievement = { ...data, id: `ach${Date.now()}` };
    achievements.unshift(newItem);
    return mockDelay(newItem);
};
export const updateAchievement = async (id: string, data: Partial<Achievement>): Promise<Achievement> => {
    const item = achievements.find(a => a.id === id);
    if (!item) throw new Error('Achievement not found');
    Object.assign(item, data);
    return mockDelay(item);
};
export const deleteAchievement = async (id: string): Promise<void> => {
    achievements = achievements.filter(a => a.id !== id);
    return mockDelay(undefined);
};

// --- CONTACT INFO ---
export const getContactInfo = async (): Promise<ContactInfo> => mockDelay(contactInfo);
export const updateContactInfo = async (data: Partial<ContactInfo>): Promise<ContactInfo> => {
    contactInfo = { ...contactInfo, ...data };
    return mockDelay(contactInfo);
};
