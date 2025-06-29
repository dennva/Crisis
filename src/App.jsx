import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- ICONS ---
const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-300"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);
const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-300"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const ArrowDownIcon = () => (
    <svg className="w-8 h-8 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
);

// --- COMPREHENSIVE CONTENT & CHART DATA ---
// This now includes all sections from the document and data for interactive charts.
const content = {
    introduction: {
        id: "introduction",
        title: "Pengantar",
        paragraphs: [
            "Gue nulis ini pas sepuluh tahun setelah krisis finansial 2008. Tujuannya buat ngasih sudut pandang gue sebagai investor yang (bisa dibilang) berhasil selamat dari krisis itu. Kenapa bisa selamat? Karena gue udah bikin semacam 'template' atau contekan buat ngertiin gimana cara kerja semua krisis utang. Nah, template itulah yang mau gue bagi di sini, dengan harapan bisa ngurangin kemungkinan krisis utang di masa depan dan ngebantu cara ngelolanya jadi lebih baik.",
            "Setelah berkali-kali kena batunya dari kejadian-kejadian yang belum pernah gue alamin sebelumnya, gue jadi terdorong buat belajar lebih jauh lagi, gak cuma dari pengalaman pribadi. Gue telusuri semua pergerakan besar di ekonomi dan pasar saham dalam sejarah. Dengan nyatuin semua template ini, gue dapet pemahaman yang simpel tapi mendalam tentang semua kasus ini. Alih-alih ngeliat banyak banget kejadian individual yang beda-beda, gue malah ngeliat lebih sedikit hal yang terjadi berulang-ulang, kayak dokter berpengalaman yang ngeliat setiap kasus penyakit tertentu sebagai, 'ah, ini kasus yang 'itu' lagi.'"
        ]
    },
    archetype: {
        id: "archetype",
        title: "Siklus Utang Besar Arketipe",
        paragraphs: [
            "Karena kredit itu nyiptain daya belanja sekaligus utang, jadi bagus nggaknya nambah kredit itu tergantung apakah duit pinjemannya dipake cukup produktif buat ngasilin pendapatan yang cukup buat nyicil utangnya. Kalau itu terjadi, berarti sumber daya udah dialokasiin dengan baik, dan si pemberi pinjaman maupun si peminjam sama-sama untung secara ekonomi.",
            "Setiap kali lo minjem duit, lo itu sebenernya lagi nyiptain sebuah siklus. Lo itu lagi 'ngutang' dari diri lo sendiri di masa depan. Pada dasarnya, lo lagi nyiptain sebuah waktu di masa depan di mana lo harus belanja lebih sedikit dari pendapatan lo biar bisa bayar utang itu. Pola meminjam, belanja lebih besar dari pemasukan, lalu harus belanja lebih kecil dari pemasukan ini dengan cepat banget ngebentuk sebuah siklus."
        ],
        chartData: {
            usDebtBurdens: [
                { name: '1920', DebtLevel: 170, DebtService: 25 },
                { name: '1930', DebtLevel: 240, DebtService: 40 },
                { name: '1933', DebtLevel: 260, DebtService: 38 },
                { name: '1945', DebtLevel: 180, DebtService: 20 },
                { name: '1970', DebtLevel: 150, DebtService: 25 },
                { name: '1980', DebtLevel: 170, DebtService: 40 },
                { name: '2000', DebtLevel: 280, DebtService: 55 },
                { name: '2008', DebtLevel: 380, DebtService: 68 },
                { name: '2012', DebtLevel: 350, DebtService: 55 },
                { name: '2020', DebtLevel: 330, DebtService: 50 },
            ],
            caption: "Beban Utang Total AS (%PDB), 1910-2020. Menunjukkan sifat siklus dari tingkat utang dan layanan utang."
        }
    },
    deflationaryCycle: {
        id: "deflationary-cycle",
        title: "Fase-Fase Siklus Utang Deflasi Klasik",
        paragraphs: [
            "Siklus utang jangka panjang klasik memiliki tujuh tahapan yang berbeda, yang didorong oleh pasang surut kredit dan psikologi pasar. Memahami tahapan-tahapan ini sangat penting untuk mengenali di mana kita berada dalam siklus tersebut.",
        ],
        phases: [
            { name: "1. Awal Siklus", description: "Utang tumbuh sejalan dengan pendapatan. Pertumbuhan ekonomi sehat dan berkelanjutan. Periode 'Goldilocks'." },
            { name: "2. Gelembung (Bubble)", description: "Utang tumbuh lebih cepat dari pendapatan. Harga aset melonjak, spekulasi meningkat, dan optimisme berlebihan." },
            { name: "3. Puncak (The Top)", description: "Pasar jenuh beli dan penuh leverage. Bank sentral mulai mengetatkan kebijakan, memicu pembalikan arah." },
            { name: "4. Depresi", description: "Harga aset anjlok, gagal bayar meningkat. Kebijakan moneter kehilangan efektivitasnya karena suku bunga mendekati nol." },
            { name: "5. Deleveraging yang Indah", description: "Kombinasi kebijakan yang seimbang (penghematan, restrukturisasi, cetak uang, transfer kekayaan) untuk mengurangi beban utang tanpa menghancurkan ekonomi." },
            { name: "6. Mendorong Tali (Pushing on a String)", description: "Bank sentral kesulitan mengubah stimulus menjadi pertumbuhan kredit dan belanja riil." },
            { name: "7. Normalisasi", description: "Ekonomi pulih secara bertahap. Butuh bertahun-tahun bagi PDB dan harga aset untuk kembali ke puncak sebelumnya ('dekade yang hilang')." },
        ],
        chartData: {
            cyclePhases: [
                { time: -60, 'Total Debt (%GDP)': 205, 'Debt Service (%GDP)': 50, phase: '1' },
                { time: -48, 'Total Debt (%GDP)': 215, 'Debt Service (%GDP)': 52, phase: '2' },
                { time: -24, 'Total Debt (%GDP)': 250, 'Debt Service (%GDP)': 60, phase: '2' },
                { time: 0, 'Total Debt (%GDP)': 290, 'Debt Service (%GDP)': 65, phase: '3' },
                { time: 12, 'Total Debt (%GDP)': 295, 'Debt Service (%GDP)': 63, phase: '4' },
                { time: 24, 'Total Debt (%GDP)': 300, 'Debt Service (%GDP)': 60, phase: '4' },
                { time: 36, 'Total Debt (%GDP)': 305, 'Debt Service (%GDP)': 58, phase: '5' },
                { time: 48, 'Total Debt (%GDP)': 295, 'Debt Service (%GDP)': 55, phase: '5' },
                { time: 60, 'Total Debt (%GDP)': 285, 'Debt Service (%GDP)': 52, phase: '6/7' },
                { time: 72, 'Total Debt (%GDP)': 270, 'Debt Service (%GDP)': 50, phase: '6/7' },
            ],
            caption: "Tujuh tahapan siklus utang jangka panjang. Perhatikan bagaimana layanan utang mencapai puncaknya sebelum tingkat utang absolut."
        }
    },
    policyLevers: {
        id: "policy-levers",
        title: "Empat Tuas Kebijakan",
        paragraphs: ["Untuk mengelola depresi dan mencapai 'deleveraging yang indah', para pembuat kebijakan memiliki empat tuas yang dapat mereka tarik. Keseimbangan adalah kuncinya."],
        levers: [
            { name: "1. Penghematan (Austerity)", description: "Mengurangi belanja. Bersifat deflasi, tetapi jika berlebihan dapat memperburuk kontraksi ekonomi.", icon: "💰" },
            { name: "2. Gagal Bayar/Restrukturisasi Utang", description: "Menghapus utang. Bersifat deflasi dan menyakitkan, tetapi perlu untuk membersihkan sistem.", icon: "💥" },
            { name: "3. Cetak Uang (Monetisasi)", description: "Bank sentral membeli aset pemerintah (QE). Bersifat inflasi dan merangsang ekonomi.", icon: "🖨️" },
            { name: "4. Transfer Kekayaan", description: "Memindahkan uang dari yang 'punya' ke yang 'tidak punya'. Secara politik sulit tetapi dapat mengurangi ketegangan sosial.", icon: "🤝" }
        ]
    },
    inflationaryCycle: {
        id: "inflationary-cycle",
        title: "Depresi Inflasi & Krisis Mata Uang",
        paragraphs: [
            "Ini biasanya terjadi di negara-negara yang tidak memiliki mata uang cadangan, memiliki utang luar negeri yang besar, dan bergantung pada modal asing. Ketika modal tersebut berhenti mengalir, mata uang runtuh, dan inflasi meroket.",
            "Dinamika mata uang menjadi kekuatan pendorong utama. Alih-alih kontraksi deflasi, negara tersebut mengalami kontraksi ekonomi yang parah disertai dengan kenaikan harga yang cepat, menghancurkan daya beli dan tabungan."
        ],
        chartData: {
            fxCrisis: [
                { time: -24, 'Real FX Rate': 15, 'Capital Inflows (%GDP)': 8 },
                { time: -12, 'Real FX Rate': 20, 'Capital Inflows (%GDP)': 12 },
                { time: 0, 'Real FX Rate': 18, 'Capital Inflows (%GDP)': 5 },
                { time: 6, 'Real FX Rate': -5, 'Capital Inflows (%GDP)': -2 },
                { time: 12, 'Real FX Rate': -18, 'Capital Inflows (%GDP)': -5 },
                { time: 24, 'Real FX Rate': -10, 'Capital Inflows (%GDP)': -2 },
                { time: 36, 'Real FX Rate': -8, 'Capital Inflows (%GDP)': 1 },
            ],
            caption: "Jalur arketipe krisis mata uang. Perhatikan jatuhnya nilai tukar riil secara tiba-tiba saat arus modal berbalik arah."
        }
    },
};

const navigationLinks = Object.values(content).map(section => ({ href: `#${section.id}`, label: section.title }));


// --- HOOKS ---
const useOnScreen = (ref, threshold = 0.1) => {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIntersecting(true);
        }, { rootMargin: '0px', threshold });
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, [ref, threshold]);
    return isIntersecting;
};

// --- ANIMATION WRAPPER COMPONENT ---
const AnimatedSection = ({ children, className = '', delay = 0 }) => {
    const ref = useRef(null);
    const onScreen = useOnScreen(ref, 0.2);
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: onScreen ? 1 : 0, y: onScreen ? 0 : 20 }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

// --- UI COMPONENTS ---
const Header = ({ activeSection }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navItemClasses = (href) => `block md:inline-block px-4 py-3 md:py-2 transition-colors duration-300 rounded-md text-sm ${activeSection === href ? 'text-amber-400 bg-gray-800' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-60 backdrop-blur-lg border-b border-gray-800 shadow-lg">
            <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
                <a href="#hero" className="text-xl font-serif font-bold text-white">Debt Crises</a>
                <div className="hidden md:flex space-x-1">
                    {navigationLinks.map(link => <a key={link.href} href={link.href} className={navItemClasses(link.href)}>{link.label}</a>)}
                </div>
                <div className="md:hidden"><button onClick={() => setIsOpen(!isOpen)}>{isOpen ? <XIcon /> : <MenuIcon />}</button></div>
            </nav>
            {isOpen && (
                <div className="md:hidden bg-black bg-opacity-95">
                    {navigationLinks.map(link => <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className={`${navItemClasses(link.href)} text-center border-t border-gray-800`}>{link.label}</a>)}
                </div>
            )}
        </header>
    );
};

const Hero = () => {
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
    const RedLine = () => (
      <motion.svg className="absolute top-0 left-0 w-full h-full opacity-20" viewBox="0 0 400 300" preserveAspectRatio="none">
        <motion.path d="M 20 100 L 40 80 L 60 120 L 80 100 L 100 150 L 120 130 L 140 180 L 160 160 L 180 200 L 200 180 L 220 230 L 240 210 L 260 250 L 280 190 L 300 280 L 320 260 L 340 320 L 360 300" fill="none" stroke="#ef4444" strokeWidth="2" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 5, ease: "easeInOut" }} />
      </motion.svg>
    );
    return (
        <section id="hero" ref={heroRef} className="h-screen flex items-center justify-center relative overflow-hidden bg-black text-white">
            <motion.div style={{ y: backgroundY }} className="absolute inset-0"><RedLine /></motion.div>
            <motion.div style={{ y: textY }} className="text-center z-10 p-4">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-extrabold text-white leading-tight drop-shadow-lg">A Template for Understanding</h1>
                <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif font-extrabold text-amber-400 mt-2 drop-shadow-lg">Big Debt Crises</h2>
                <p className="mt-6 text-xl md:text-2xl text-gray-300">by Ray Dalio | An Interactive Experience</p>
            </motion.div>
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"><ArrowDownIcon /></div>
        </section>
    );
};

const InteractiveChart = ({ data, caption, lines }) => (
    <AnimatedSection className="my-12 md:my-20">
        <div className="bg-gray-900 bg-opacity-50 rounded-xl shadow-2xl p-4 md:p-6 border border-gray-700 backdrop-blur-sm">
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                    <XAxis dataKey="name" stroke="#a0aec0" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#a0aec0" tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1a202c', border: '1px solid #4a5568', color: '#e2e8f0' }} />
                    <Legend wrapperStyle={{ color: '#e2e8f0' }} />
                    {lines.map(line => <Line key={line.dataKey} type="monotone" dataKey={line.dataKey} stroke={line.color} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />)}
                </LineChart>
            </ResponsiveContainer>
            <p className="text-sm text-gray-500 mt-4 text-center italic">{caption}</p>
        </div>
    </AnimatedSection>
);

const ContentSection = ({ id, title, paragraphs }) => (
    <section id={id} className="py-20 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
            <AnimatedSection>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-400 mb-12 text-center">{title}</h2>
            </AnimatedSection>
            {paragraphs.map((p, index) => (
                <AnimatedSection key={index} delay={0.1 * index}>
                    <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed text-justify">{p}</p>
                </AnimatedSection>
            ))}
        </div>
    </section>
);


// --- MAIN APP COMPONENT ---
export default function App() {
    const [activeSection, setActiveSection] = useState('#hero');
    const sectionRefs = {
        '#hero': useRef(null),
        '#introduction': useRef(null),
        '#archetype': useRef(null),
        '#deflationary-cycle': useRef(null),
        '#policy-levers': useRef(null),
        '#inflationary-cycle': useRef(null),
    };

    useEffect(() => {
        const observerOptions = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };
        const callback = (entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`); });
        };
        const observer = new IntersectionObserver(callback, observerOptions);
        Object.values(sectionRefs).forEach(ref => { if (ref.current) observer.observe(ref.current); });
        return () => { Object.values(sectionRefs).forEach(ref => { if (ref.current) observer.unobserve(ref.current); }); };
    }, []);

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500&display=swap');
                html { scroll-behavior: smooth; }
                body { font-family: 'Inter', sans-serif; }
                h1, h2, h3, .font-serif { font-family: 'Playfair Display', serif; }
                ::selection { background-color: #f59e0b; color: #111827; }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #000; }
                ::-webkit-scrollbar-thumb { background-color: #4b5563; border-radius: 20px; border: 2px solid #000; }
                `}
            </style>
            <div className="bg-black text-white min-h-screen">
                <Header activeSection={activeSection} />
                <main>
                    <div ref={sectionRefs['#hero']} id="hero"><Hero /></div>
                    
                    <div ref={sectionRefs['#introduction']}><ContentSection {...content.introduction} /></div>
                    
                    <section ref={sectionRefs['#archetype']} id="archetype" className="py-20 md:py-32 bg-gray-900 bg-opacity-20">
                        <div className="container mx-auto px-6 max-w-5xl">
                            <AnimatedSection><h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-400 mb-12 text-center">{content.archetype.title}</h2></AnimatedSection>
                            {content.archetype.paragraphs.map((p, i) => <AnimatedSection key={i} delay={0.1*i}><p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed text-justify">{p}</p></AnimatedSection>)}
                            <InteractiveChart data={content.archetype.chartData.usDebtBurdens} caption={content.archetype.chartData.caption} lines={[{ dataKey: 'DebtLevel', color: '#FBBF24' }, { dataKey: 'DebtService', color: '#34D399' }]} />
                        </div>
                    </section>
                    
                    <section ref={sectionRefs['#deflationary-cycle']} id="deflationary-cycle" className="py-20 md:py-32">
                        <div className="container mx-auto px-6 max-w-5xl">
                             <AnimatedSection><h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-400 mb-12 text-center">{content.deflationaryCycle.title}</h2></AnimatedSection>
                             <AnimatedSection><p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed text-center max-w-4xl mx-auto">{content.deflationaryCycle.paragraphs[0]}</p></AnimatedSection>
                             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
                                {content.deflationaryCycle.phases.map((phase, i) => (
                                    <AnimatedSection key={phase.name} delay={0.1 * i} className="bg-gray-900 bg-opacity-40 p-6 rounded-lg border border-gray-700 hover:border-amber-400 transition-all duration-300">
                                        <h3 className="font-bold text-xl text-amber-400 mb-2">{phase.name}</h3>
                                        <p className="text-gray-400">{phase.description}</p>
                                    </AnimatedSection>
                                ))}
                             </div>
                             <InteractiveChart data={content.deflationaryCycle.chartData.cyclePhases} caption={content.deflationaryCycle.chartData.caption} lines={[{ dataKey: 'Total Debt (%GDP)', color: '#FBBF24' }, { dataKey: 'Debt Service (%GDP)', color: '#60A5FA' }]} />
                        </div>
                    </section>

                     <section ref={sectionRefs['#policy-levers']} id="policy-levers" className="py-20 md:py-32 bg-gray-900 bg-opacity-20">
                        <div className="container mx-auto px-6 max-w-4xl">
                            <AnimatedSection><h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-400 mb-12 text-center">{content.policyLevers.title}</h2></AnimatedSection>
                             <AnimatedSection><p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed text-center">{content.policyLevers.paragraphs[0]}</p></AnimatedSection>
                            <div className="grid md:grid-cols-2 gap-8">
                                {content.policyLevers.levers.map((lever, i) => (
                                    <AnimatedSection key={lever.name} delay={0.1*i} className="flex items-start space-x-4">
                                        <div className="text-4xl">{lever.icon}</div>
                                        <div>
                                            <h3 className="font-bold text-xl text-amber-400 mb-1">{lever.name}</h3>
                                            <p className="text-gray-400">{lever.description}</p>
                                        </div>
                                    </AnimatedSection>
                                ))}
                            </div>
                        </div>
                    </section>
                    
                    <section ref={sectionRefs['#inflationary-cycle']} id="inflationary-cycle" className="py-20 md:py-32">
                        <div className="container mx-auto px-6 max-w-5xl">
                           <AnimatedSection><h2 className="text-4xl md:text-5xl font-serif font-bold text-amber-400 mb-12 text-center">{content.inflationaryCycle.title}</h2></AnimatedSection>
                            {content.inflationaryCycle.paragraphs.map((p, i) => <AnimatedSection key={i} delay={0.1*i}><p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed text-justify">{p}</p></AnimatedSection>)}
                            <InteractiveChart data={content.inflationaryCycle.chartData.fxCrisis} caption={content.inflationaryCycle.chartData.caption} lines={[{ dataKey: 'Real FX Rate', color: '#F87171' }, { dataKey: 'Capital Inflows (%GDP)', color: '#60A5FA' }]} />
                        </div>
                    </section>

                </main>
                <footer className="bg-black border-t border-gray-800 py-8">
                    <div className="container mx-auto px-6 text-center text-gray-500">
                        <p>Website concept based on "Big Debt Crises" by Ray Dalio.</p>
                        <p className="text-sm mt-2">This is a conceptual web implementation for educational purposes.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

