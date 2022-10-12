export interface Personaje {
    char_id: number;
    name: string;
    nickname: string;
    img: string;
    status: string;
    occupation: Occupation[];
}

interface Occupation {
    name: string;
}