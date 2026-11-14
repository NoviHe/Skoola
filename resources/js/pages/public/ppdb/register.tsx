import PublicLayout from '@/layouts/public-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    Award,
    Check,
    CheckCircle2,
    FileText,
    HelpCircle,
    Info,
    ShieldCheck,
    UploadCloud,
    User,
    Users,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';

interface Wave {
    id: number;
    nama_gelombang: string;
    kode_gelombang: string;
    tanggal_buka: string;
    tanggal_tutup: string;
    kuota: number | null;
    is_active: boolean;
}

interface Major {
    id: number;
    nama_jurusan: string;
    singkatan: string;
}

interface RegisterProps {
    institution: {
        nama_institusi: string;
        jenjang: string;
    };
    waves: Wave[];
    selectedWaveId: number;
    majors: Major[];
    hasMajors: boolean;
}

export default function Register({
    institution,
    waves,
    selectedWaveId,
    majors,
    hasMajors,
}: RegisterProps) {
    const [currentStep, setCurrentStep] = useState(1);

    const { data, setData, post, processing, errors, reset } = useForm({
        ppdb_wave_id: selectedWaveId || (waves[0]?.id ?? ''),
        jalur_pendaftaran: 'reguler',
        jurusan_pilihan_1: majors[0]?.id ? String(majors[0].id) : '',
        jurusan_pilihan_2: '',
        nisn: '',
        nik: '',
        nama_calon_siswa: '',
        jenis_kelamin: 'L',
        tempat_lahir: '',
        tanggal_lahir: '',
        agama: 'Islam',
        asal_sekolah: '',
        nama_wali: '',
        hubungan_wali: 'Ayah Kandung',
        pekerjaan_wali: '',
        nomor_whatsapp_wali: '',
        alamat: '',
        berkas_kartu_keluarga: null as File | null,
        berkas_akta_kelahiran: null as File | null,
        berkas_ijazah_skl: null as File | null,
        berkas_rapor_prestasi: null as File | null,
        pernyataan_benar: false,
    });

    const steps = [
        { id: 1, title: 'Jalur & Gelombang', icon: Award },
        { id: 2, title: 'Data Calon Siswa', icon: User },
        { id: 3, title: 'Data Wali & Kontak', icon: Users },
        { id: 4, title: 'Unggah Berkas', icon: UploadCloud },
        { id: 5, title: 'Konfirmasi', icon: CheckCircle2 },
    ];

    const validateStep = (step: number): boolean => {
        if (step === 1) {
            if (!data.ppdb_wave_id || !data.jalur_pendaftaran) return false;
            return true;
        }
        if (step === 2) {
            if (
                !data.nisn ||
                data.nisn.length !== 10 ||
                !data.nik ||
                data.nik.length !== 16 ||
                !data.nama_calon_siswa ||
                !data.tempat_lahir ||
                !data.tanggal_lahir ||
                !data.asal_sekolah
            ) {
                return false;
            }
            return true;
        }
        if (step === 3) {
            if (
                !data.nama_wali ||
                !data.hubungan_wali ||
                !data.nomor_whatsapp_wali ||
                !data.alamat
            ) {
                return false;
            }
            return true;
        }
        return true;
    };

    const handleNext = () => {
        if (currentStep < 5) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/ppdb/daftar', {
            forceFormData: true,
        });
    };

    return (
        <PublicLayout>
            <Head
                title={`Formulir Pendaftaran PPDB - ${institution.nama_institusi}`}
            />

            <div className="bg-slate-50 py-10 dark:bg-slate-950 sm:py-14">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <Link
                            href="/ppdb"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            <span>Kembali ke Informasi PPDB</span>
                        </Link>
                        <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl dark:text-white">
                            Formulir Penerimaan Siswa Baru
                        </h1>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            Lengkapi seluruh tahapan pendaftaran secara cermat
                            dan benar sesuai dokumen resmi kependudukan.
                        </p>
                    </div>

                    {/* Multi-step Stepper Progress */}
                    <div className="mb-8 overflow-x-auto pb-2">
                        <div className="flex min-w-[580px] items-center justify-between">
                            {steps.map((st, idx) => {
                                const Icon = st.icon;
                                const isDone = currentStep > st.id;
                                const isCurrent = currentStep === st.id;

                                return (
                                    <div
                                        key={st.id}
                                        className="flex flex-1 items-center"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (st.id < currentStep)
                                                    setCurrentStep(st.id);
                                            }}
                                            className={`flex items-center gap-2.5 text-left transition ${
                                                isCurrent
                                                    ? 'text-blue-600 dark:text-blue-400'
                                                    : isDone
                                                      ? 'text-slate-800 dark:text-slate-200'
                                                      : 'text-slate-400'
                                            }`}
                                        >
                                            <div
                                                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-bold text-xs shadow-sm transition ${
                                                    isDone
                                                        ? 'bg-emerald-500 text-white'
                                                        : isCurrent
                                                          ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/50'
                                                          : 'bg-white text-slate-400 border border-slate-200 dark:bg-slate-900 dark:border-slate-800'
                                                }`}
                                            >
                                                {isDone ? (
                                                    <Check className="h-4 w-4" />
                                                ) : (
                                                    st.id
                                                )}
                                            </div>
                                            <div className="hidden sm:block">
                                                <div className="text-[11px] font-medium uppercase tracking-wider text-slate-400">
                                                    Langkah {st.id}
                                                </div>
                                                <div className="text-xs font-bold leading-tight">
                                                    {st.title}
                                                </div>
                                            </div>
                                        </button>

                                        {idx < steps.length - 1 && (
                                            <div
                                                className={`mx-2 h-0.5 flex-1 ${
                                                    currentStep > st.id
                                                        ? 'bg-emerald-500'
                                                        : 'bg-slate-200 dark:bg-slate-800'
                                                }`}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Server Error Alerts */}
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-300">
                            <div className="flex items-center gap-2 font-bold text-sm">
                                <AlertCircle className="h-4 w-4 text-red-600" />
                                <span>
                                    Terdapat beberapa kesalahan input data:
                                </span>
                            </div>
                            <ul className="mt-2 list-inside list-disc space-y-1">
                                {Object.entries(errors).map(([key, msg]) => (
                                    <li key={key}>{msg}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Form Container */}
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
                    >
                        {/* STEP 1: Jalur & Gelombang */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Langkah 1: Pilih Gelombang &amp; Jalur
                                        Seleksi
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Tentukan periode pendaftaran dan jalur
                                        masuk yang Anda ikuti.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                            Gelombang Pendaftaran{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <select
                                            value={data.ppdb_wave_id}
                                            onChange={(e) =>
                                                setData(
                                                    'ppdb_wave_id',
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                            required
                                        >
                                            {waves.map((w) => (
                                                <option key={w.id} value={w.id}>
                                                    {w.nama_gelombang} (
                                                    {w.kode_gelombang})
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                            Pilihan Jalur Seleksi{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                            {[
                                                {
                                                    id: 'reguler',
                                                    label: 'Jalur Reguler / Umum',
                                                    desc: 'Seleksi umum tes kemampuan dasar dan wawancara.',
                                                },
                                                {
                                                    id: 'prestasi',
                                                    label: 'Jalur Prestasi',
                                                    desc: 'Penilaian nilai rapor atau sertifikat kejuaraan lomba.',
                                                },
                                                {
                                                    id: 'afirmasi',
                                                    label: 'Jalur Afirmasi',
                                                    desc: 'Khusus calon siswa pemegang kartu KIP/PKH prasejahtera.',
                                                },
                                                {
                                                    id: 'zonasi',
                                                    label: 'Jalur Zonasi',
                                                    desc: 'Berdasarkan radius kedekatan alamat tempat tinggal.',
                                                },
                                                {
                                                    id: 'perpindahan_ortu',
                                                    label: 'Perpindahan Tugas Orang Tua',
                                                    desc: 'Bagi anak dari pegawai/TNI/Polri yang pindah domisili tugas.',
                                                },
                                                {
                                                    id: 'tes',
                                                    label: 'Jalur Tes Bakat Skolastik',
                                                    desc: 'Ujian penyaringan bakat dan peminatan jurusan.',
                                                },
                                            ].map((track) => (
                                                <label
                                                    key={track.id}
                                                    className={`relative flex cursor-pointer flex-col rounded-xl border p-4 transition ${
                                                        data.jalur_pendaftaran ===
                                                        track.id
                                                            ? 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-500 dark:bg-blue-950/40'
                                                            : 'border-slate-200 hover:border-slate-300 dark:border-slate-800'
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                                                            {track.label}
                                                        </span>
                                                        <input
                                                            type="radio"
                                                            name="jalur_pendaftaran"
                                                            value={track.id}
                                                            checked={
                                                                data.jalur_pendaftaran ===
                                                                track.id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    'jalur_pendaftaran',
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                        />
                                                    </div>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {track.desc}
                                                    </p>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {hasMajors && majors.length > 0 && (
                                        <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                    Pilihan Jurusan 1 (Prioritas
                                                    Utama){' '}
                                                    <span className="text-red-500">
                                                        *
                                                    </span>
                                                </label>
                                                <select
                                                    value={
                                                        data.jurusan_pilihan_1
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            'jurusan_pilihan_1',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                    required
                                                >
                                                    <option value="">
                                                        -- Pilih Jurusan 1 --
                                                    </option>
                                                    {majors.map((m) => (
                                                        <option
                                                            key={m.id}
                                                            value={m.id}
                                                        >
                                                            {m.nama_jurusan} (
                                                            {m.singkatan})
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                    Pilihan Jurusan 2
                                                    (Cadangan)
                                                </label>
                                                <select
                                                    value={
                                                        data.jurusan_pilihan_2
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            'jurusan_pilihan_2',
                                                            e.target.value
                                                        )
                                                    }
                                                    className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                >
                                                    <option value="">
                                                        -- Tidak Ada / Opsional
                                                        --
                                                    </option>
                                                    {majors
                                                        .filter(
                                                            (m) =>
                                                                String(m.id) !==
                                                                data.jurusan_pilihan_1
                                                        )
                                                        .map((m) => (
                                                            <option
                                                                key={m.id}
                                                                value={m.id}
                                                            >
                                                                {m.nama_jurusan}{' '}
                                                                ({m.singkatan})
                                                            </option>
                                                        ))}
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* STEP 2: Data Calon Siswa */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Langkah 2: Data Induk Calon Peserta
                                        Didik
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Masukkan nomor identitas siswa dan
                                        kependudukan sesuai Kartu Keluarga /
                                        Akta.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                NISN (Nomor Induk Siswa
                                                Nasional){' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                maxLength={10}
                                                value={data.nisn}
                                                onChange={(e) =>
                                                    setData(
                                                        'nisn',
                                                        e.target.value.replace(
                                                            /\D/g,
                                                            ''
                                                        )
                                                    )
                                                }
                                                placeholder="10 digit angka NISN"
                                                className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                required
                                            />
                                            <span className="mt-1 block text-[11px] text-slate-400">
                                                Cek NISN pada rapor sekolah asal
                                            </span>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                NIK (Nomor Induk Kependudukan){' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                maxLength={16}
                                                value={data.nik}
                                                onChange={(e) =>
                                                    setData(
                                                        'nik',
                                                        e.target.value.replace(
                                                            /\D/g,
                                                            ''
                                                        )
                                                    )
                                                }
                                                placeholder="16 digit NIK sesuai KK"
                                                className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                            Nama Lengkap Calon Siswa{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            value={data.nama_calon_siswa}
                                            onChange={(e) =>
                                                setData(
                                                    'nama_calon_siswa',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Nama lengkap sesuai ijazah jenjang sebelumnya"
                                            className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                            required
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                Jenis Kelamin{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                value={data.jenis_kelamin}
                                                onChange={(e) =>
                                                    setData(
                                                        'jenis_kelamin',
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                required
                                            >
                                                <option value="L">
                                                    Laki-laki
                                                </option>
                                                <option value="P">
                                                    Perempuan
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                Tempat Lahir{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.tempat_lahir}
                                                onChange={(e) =>
                                                    setData(
                                                        'tempat_lahir',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Kota / Kabupaten lahir"
                                                className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                Tanggal Lahir{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="date"
                                                value={data.tanggal_lahir}
                                                onChange={(e) =>
                                                    setData(
                                                        'tanggal_lahir',
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                Agama{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                value={data.agama}
                                                onChange={(e) =>
                                                    setData(
                                                        'agama',
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                required
                                            >
                                                <option value="Islam">
                                                    Islam
                                                </option>
                                                <option value="Kristen">
                                                    Kristen
                                                </option>
                                                <option value="Katolik">
                                                    Katolik
                                                </option>
                                                <option value="Hindu">
                                                    Hindu
                                                </option>
                                                <option value="Buddha">
                                                    Buddha
                                                </option>
                                                <option value="Konghucu">
                                                    Konghucu
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                Asal Sekolah (SMP / MTs / SD){' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.asal_sekolah}
                                                onChange={(e) =>
                                                    setData(
                                                        'asal_sekolah',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Contoh: SMP Negeri 1 Padaherang"
                                                className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 3: Data Wali & Kontak */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Langkah 3: Data Orang Tua / Wali &amp;
                                        Kontak
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Informasi kontak penting untuk pengiriman
                                        hasil verifikasi dan informasi daftar
                                        ulang.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                Nama Lengkap Orang Tua / Wali{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="text"
                                                value={data.nama_wali}
                                                onChange={(e) =>
                                                    setData(
                                                        'nama_wali',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Nama ayah / ibu / wali murid"
                                                className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                Hubungan Keluarga{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <select
                                                value={data.hubungan_wali}
                                                onChange={(e) =>
                                                    setData(
                                                        'hubungan_wali',
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1.5 block w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                required
                                            >
                                                <option value="Ayah Kandung">
                                                    Ayah Kandung
                                                </option>
                                                <option value="Ibu Kandung">
                                                    Ibu Kandung
                                                </option>
                                                <option value="Wali / Saudara">
                                                    Wali / Saudara
                                                </option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                Nomor WhatsApp Aktif{' '}
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </label>
                                            <input
                                                type="tel"
                                                value={data.nomor_whatsapp_wali}
                                                onChange={(e) =>
                                                    setData(
                                                        'nomor_whatsapp_wali',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Contoh: 081234567890"
                                                className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                                required
                                            />
                                            <span className="mt-1 block text-[11px] text-slate-400">
                                                Pastikan nomor terhubung dengan
                                                WhatsApp untuk menerima notifikasi.
                                            </span>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                                Pekerjaan Orang Tua / Wali
                                            </label>
                                            <input
                                                type="text"
                                                value={data.pekerjaan_wali}
                                                onChange={(e) =>
                                                    setData(
                                                        'pekerjaan_wali',
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Contoh: PNS, Karyawan, Wiraswasta"
                                                className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                                            Alamat Tempat Tinggal Lengkap{' '}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <textarea
                                            rows={3}
                                            value={data.alamat}
                                            onChange={(e) =>
                                                setData(
                                                    'alamat',
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Jalan, RT/RW, Dusun, Desa/Kelurahan, Kecamatan, Kabupaten/Kota"
                                            className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 4: Unggah Berkas */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Langkah 4: Unggah Berkas Dokumen
                                        Pendukung
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Format berkas: JPG, PNG, atau PDF (maksimal
                                        3MB per dokumen). Foto harus jelas dan
                                        dapat dibaca.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                    {/* Kartu Keluarga */}
                                    <div className="rounded-xl border border-dashed border-slate-300 p-4 transition hover:border-blue-400 dark:border-slate-700">
                                        <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                                            1. Kartu Keluarga (KK)
                                        </label>
                                        <p className="mt-0.5 text-[11px] text-slate-500">
                                            Scan atau foto asli KK yang masih
                                            berlaku.
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            onChange={(e) =>
                                                setData(
                                                    'berkas_kartu_keluarga',
                                                    e.target.files?.[0] || null
                                                )
                                            }
                                            className="mt-3 block w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                        {data.berkas_kartu_keluarga && (
                                            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                                                <Check className="h-3 w-3" />
                                                {
                                                    data.berkas_kartu_keluarga
                                                        .name
                                                }
                                            </span>
                                        )}
                                    </div>

                                    {/* Akta Kelahiran */}
                                    <div className="rounded-xl border border-dashed border-slate-300 p-4 transition hover:border-blue-400 dark:border-slate-700">
                                        <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                                            2. Akta Kelahiran
                                        </label>
                                        <p className="mt-0.5 text-[11px] text-slate-500">
                                            Scan akta kelahiran resmi calon
                                            siswa.
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            onChange={(e) =>
                                                setData(
                                                    'berkas_akta_kelahiran',
                                                    e.target.files?.[0] || null
                                                )
                                            }
                                            className="mt-3 block w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                        {data.berkas_akta_kelahiran && (
                                            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                                                <Check className="h-3 w-3" />
                                                {
                                                    data.berkas_akta_kelahiran
                                                        .name
                                                }
                                            </span>
                                        )}
                                    </div>

                                    {/* Ijazah / SKL */}
                                    <div className="rounded-xl border border-dashed border-slate-300 p-4 transition hover:border-blue-400 dark:border-slate-700">
                                        <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                                            3. Ijazah / SKL (Surat Keterangan
                                            Lulus)
                                        </label>
                                        <p className="mt-0.5 text-[11px] text-slate-500">
                                            Ijazah atau SKL sementara berstempel
                                            resmi.
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            onChange={(e) =>
                                                setData(
                                                    'berkas_ijazah_skl',
                                                    e.target.files?.[0] || null
                                                )
                                            }
                                            className="mt-3 block w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                        {data.berkas_ijazah_skl && (
                                            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                                                <Check className="h-3 w-3" />
                                                {data.berkas_ijazah_skl.name}
                                            </span>
                                        )}
                                    </div>

                                    {/* Sertifikat Rapor / Prestasi */}
                                    <div className="rounded-xl border border-dashed border-slate-300 p-4 transition hover:border-blue-400 dark:border-slate-700">
                                        <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                                            4. Sertifikat Prestasi / Rapor
                                            (Opsional)
                                        </label>
                                        <p className="mt-0.5 text-[11px] text-slate-500">
                                            Sertifikat juara (khusus jalur
                                            prestasi) atau nilai rapor.
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*,.pdf"
                                            onChange={(e) =>
                                                setData(
                                                    'berkas_rapor_prestasi',
                                                    e.target.files?.[0] || null
                                                )
                                            }
                                            className="mt-3 block w-full text-xs text-slate-500 file:mr-3 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                                        />
                                        {data.berkas_rapor_prestasi && (
                                            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                                                <Check className="h-3 w-3" />
                                                {
                                                    data.berkas_rapor_prestasi
                                                        .name
                                                }
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* STEP 5: Konfirmasi Ringkasan Data */}
                        {currentStep === 5 && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                        Langkah 5: Tinjauan &amp; Konfirmasi
                                        Pendaftaran
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
                                        Periksa kembali kesesuaian biodata
                                        sebelum mengirim formulir pendaftaran.
                                    </p>
                                </div>

                                <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-xs dark:border-slate-800 dark:bg-slate-950">
                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                        <div>
                                            <span className="text-slate-500">
                                                Nama Calon Siswa:
                                            </span>
                                            <div className="font-bold text-slate-900 dark:text-white">
                                                {data.nama_calon_siswa || '-'}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">
                                                Jalur Masuk:
                                            </span>
                                            <div className="font-bold capitalize text-blue-600 dark:text-blue-400">
                                                {data.jalur_pendaftaran}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">
                                                NISN:
                                            </span>
                                            <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                {data.nisn || '-'}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">
                                                NIK:
                                            </span>
                                            <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                {data.nik || '-'}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">
                                                Tempat, Tanggal Lahir:
                                            </span>
                                            <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                {data.tempat_lahir},{' '}
                                                {data.tanggal_lahir}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">
                                                Asal Sekolah:
                                            </span>
                                            <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                {data.asal_sekolah || '-'}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">
                                                Nama Wali / Kontak:
                                            </span>
                                            <div className="font-semibold text-slate-800 dark:text-slate-200">
                                                {data.nama_wali} (
                                                {data.nomor_whatsapp_wali})
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-slate-500">
                                                Dokumen Diunggah:
                                            </span>
                                            <div className="font-semibold text-emerald-600">
                                                {[
                                                    data.berkas_kartu_keluarga &&
                                                        'KK',
                                                    data.berkas_akta_kelahiran &&
                                                        'Akta',
                                                    data.berkas_ijazah_skl &&
                                                        'SKL',
                                                    data.berkas_rapor_prestasi &&
                                                        'Prestasi',
                                                ]
                                                    .filter(Boolean)
                                                    .join(', ') ||
                                                    'Belum ada berkas terlampir'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 text-xs text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={data.pernyataan_benar}
                                            onChange={(e) =>
                                                setData(
                                                    'pernyataan_benar',
                                                    e.target.checked
                                                )
                                            }
                                            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                            required
                                        />
                                        <span>
                                            Saya menyatakan dengan sebenar-benarnya
                                            bahwa data dan berkas dokumen yang
                                            saya lampirkan adalah sah dan dapat
                                            dipertanggungjawabkan keasliannya.
                                            Apabila di kemudian hari ditemukan
                                            ketidaksesuaian data, saya bersedia
                                            menerima sanksi pembatalan
                                            penerimaan.
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-5 dark:border-slate-800">
                            {currentStep > 1 ? (
                                <button
                                    type="button"
                                    onClick={handlePrev}
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                                >
                                    <ArrowLeft className="h-3.5 w-3.5" />
                                    <span>Sebelumnya</span>
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {currentStep < 5 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm shadow-blue-500/25 transition hover:bg-blue-700 active:scale-95"
                                >
                                    <span>Lanjut ke Langkah Berikutnya</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={
                                        processing || !data.pernyataan_benar
                                    }
                                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/30 transition hover:bg-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? (
                                        <span>Mengirim Pendaftaran...</span>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="h-4 w-4" />
                                            <span>
                                                Kirim Formulir Pendaftaran
                                            </span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </PublicLayout>
    );
}
