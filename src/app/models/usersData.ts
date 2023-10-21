export interface IUserData {
    page?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
    data?: IUserDetails[];
    support?: {
        url?: string;
        text?: string;
    };
}

export interface IUserDetails {
    id?: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
}
