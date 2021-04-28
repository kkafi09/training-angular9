import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'Dashboards',
        icon: 'fa fa-home mr-2',
    },
    {
        id: 2,
        label: 'Pengaturan',
        icon: 'fa fa-cog mr-2',
        subItems: [
            {
                id: 3,
                label: 'Perusahaan',
                subItems: [
                    {
                        id: 4,
                        label: 'Perusahaan',
                        link: '/company/perusahaan',
                        parentId: 3,
                    },
                    {
                        id: 5,
                        label: 'Organisasi Unit',
                        link: '/company/organisasi',
                        parentId: 3,
                    },
                    {
                        id: 6,
                        label: 'Level Jabatan',
                        link: '/company/leveljabatan',
                        parentId: 3,
                    },
                    {
                        id: 7,
                        label: 'Jabatan',
                        link: '/company/jabatan',
                        parentId: 3,
                    },
                ],
            },
            {
                id: 8,
                label: 'Kehadiran',
                subItems: [
                    {
                        id: 9,
                        label: 'Time Off',
                        link: '/master/timeoff',
                        parentId: 8,
                    },
                    {
                        id: 10,
                        label: 'Jadwal Kerja',
                        link: '/company/organisasi',
                        parentId: 8,
                    },
                ],
            },
            {
                id: 11,
                label: 'Data Master',
                subItems: [
                    {
                        id: 12,
                        label: 'Pelatihan',
                        link: '/master/pelatihan',
                        parentId: 11,
                    },
                    {
                        id: 13,
                        label: 'Sertifikat',
                        link: '/master/sertifikat',
                        parentId: 11,
                    },
                    {
                        id: 14,
                        label: 'Kategori File',
                        link: '/master/kategorifile',
                        parentId: 11,
                    },
                ],
            },
            {
                id: 15,
                label: 'Pengguna',
                subItems: [
                    {
                        id: 16,
                        label: 'Pengguna',
                        link: '/master/pengguna',
                        parentId: 12,
                    },
                    {
                        id: 17,
                        label: 'Hak Akses',
                        link: '/master/hakakses',
                        parentId: 12,
                    },
                ],
            },
        ],
    },
    {
        id: 18,
        label: 'Karyawan',
        icon: 'fa fa-user mr-2',
        subItems: [
            {
                id: 19,
                label: 'Daftar Karyawan',
                link: '/karyawan/daftar-karyawan',
                parentId: 18,
            },
            {
                id: 20,
                label: 'Laporan Riwayat Pelatihan',
                link: '/karyawan/laporan-riwayat-pelatihan',
                parentId: 18,
            },
            {
                id: 21,
                label: 'Laporan Riwayat Pendidikan',
                link: '/karyawan/laporan-riwayat-pendidikan',
                parentId: 18,
            },
        ],
    },
    {
        id: 22,
        label: 'Keuangan',
        icon: 'far fa-money-bill-alt mr-2',
        subItems: [
            {
                id: 23,
                label: 'Penggajian',
                link: '/keuangan/penggajian',
                parentId: 22,
            },
            {
                id: 24,
                label: 'Pinjaman / Kasbon',
                link: '/keuangan/kasbon',
                parentId: 22,
            },
        ],
    },
    {
        id: 23,
        label: 'Pengumuman',
        icon: 'fas fa-bullhorn fa-xs mr-2',
        link: '/master/pengumuman',
    }
];
