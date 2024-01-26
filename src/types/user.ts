export interface User {
    address: string;
    birthDate: string;
    city: string;
    email: string;
    firstName: string;
    gender: Gender;
    lastName: string
    phoneNumber: string
    role: UserRole,
    status: UserStatus,
    userName: string,
    zipCode: string;
}

export enum UserStatus {
    // Full paying member
    Aktiv = 1,
    // Discounted paying member
    Passiv = 2,
    // Not paying member
    Special = 3,
    // Not in organisation anymore
    Left = 4,
}

export enum Gender {
    Male = 1,
    Female = 2,
    Diverse = 3,
}

export enum UserRole {
    // Mitglied
    Member = 1,
    // Mitglied Vorstand
    BoardMember = 2,
    // Mitglied Geschäftsführer Vorstand
    ExecutiveBoardMember = 3,
}
