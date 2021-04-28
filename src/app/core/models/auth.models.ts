export class User {
    id: number;
    username?: string;
    password: string;
    firstName: string;
    lastName: string;
    token?: string;
    email: string;
    uid: string;
    stsTokenManager?: any;
}

export class UserDetail {
    uid: string;
    client?: any;
    company?: any;
    nama: string;
    tipe: string;
    akses: any;
}

