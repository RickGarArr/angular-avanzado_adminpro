export interface RegisterForm {
    nombre: string;
    email: string;
    password: string;
    password2: string;
}

export interface Login {
    email: string;
    password: string;
    recordar: boolean;
}