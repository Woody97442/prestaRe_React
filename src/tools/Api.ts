import User from "@/models/UserClass";
import Job from "@models/JobClass";
import Professional from "@/models/ProfessionalClass";

const API_URL = "http://localhost:3000/";

export const getProfessionals = async () => {
    const response = await fetch(`${API_URL}professional`);
    const professionals = await response.json();
    return professionals as Professional[];
};

export const getUsers = async () => {
    const response = await fetch(`${API_URL}users`);
    const users = await response.json();
    return users as User[];
};

export const getJobs = async () => {
    const response = await fetch(`${API_URL}jobs`);
    const jobs = await response.json();
    return jobs as Job[];
};

export const login = async (email: string, password: string) => {
    console.log(email, password);

    return { token: "Token", statusMessage: "Login successful", ok: true };
    return { token: "", statusMessage: "Login failed", ok: false };
}

export const register = async (formData: FormData) => {
    console.log(formData);

    return { token: "Token", statusMessage: "Register successful", ok: true };
    return { token: "", statusMessage: "Register failed", ok: false };
}

export const enableUser = async (id: string, isEnabled: boolean) => {
    const response = await fetch(`${API_URL}users/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ enabled: isEnabled }),
    });
    return response;
}