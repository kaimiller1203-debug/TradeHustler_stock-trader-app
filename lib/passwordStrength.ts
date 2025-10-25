export type PasswordStrength = "weak" | "medium" | "strong";

export function getPasswordStrength(password: string): PasswordStrength {
    let score = 0;

    // length
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // contains lowercase + uppercase
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;

    // contains number
    if (/\d/.test(password)) score++;

    // contains special char
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // SCORING:
    if (score <= 2) return "weak";
    if (score <= 4) return "medium";
    return "strong";
}
