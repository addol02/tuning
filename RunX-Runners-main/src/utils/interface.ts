export interface InfoResponse {
    version: string;
}

export interface Configs {
    bunHashType: {
        algorithm: "argon2d" | "argon2id" | "argon2i" | "bcrypt"; // A string with specific values
        memoryCost: number; // A number
        timeCost: number; // A number
        cost?: number; // for bcrypt algorithm
    }
}

export interface ObjectSort {
    [key: string]: string | number | object;
}

export interface ExcelUploadRuner {
    FirstName: string;
    LastName: string;
    Age: number;
    Score: number;
    Gender: "M" | "F";
    Nation: string;
    Time: string;
    Rank: string;
}

export interface RunnersRanking {
    firstname: string;
    lastname: "Seifu",
    gender: "M" | "F";
    score: number;
    nation: string;
    age: number;
    entrytime: string;
    eventid?: string;
}