import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PasswordStrength } from "@/lib/passwordStrength";

interface InputFieldProps {
    name: string;
    label: string;
    placeholder?: string;
    type?: string;
    register: any;
    error?: any;
    validation?: any;
    disabled?: boolean;
    value?: string;
    passwordStrength?: PasswordStrength;
    passwordValue?: string; // hides PW ELELMENTS //
}

const strengthColors = {
    weak: "bg-orange-500 shadow-[0_0_12px_rgba(255,136,0,0.8)]",
    medium: "bg-cyan-500 shadow-[0_0_14px_rgba(0,200,255,0.9)]",
    strong: "bg-emerald-500 shadow-[0_0_16px_rgba(0,255,140,1)]",
};

const InputField = ({
                        name,
                        label,
                        placeholder,
                        type = "text",
                        register,
                        error,
                        validation,
                        disabled,
                        passwordStrength,
                        passwordValue,
                    }: InputFieldProps) => {
    const [show, setShow] = useState(false);

    // decide what type to pass to the input
    const inputType = type === "password" ? (show ? "text" : "password") : type;

    return (
        <div className="space-y-2">
            <Label htmlFor={name} className="form-label">
                {label}
            </Label>

            {/* relative wrapper so we can position the eye icon */}
            <div className="relative">
                <Input
                    type={inputType}
                    id={name}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn("form-input pr-10")} // add right padding so eye doesn't overlap text
                    {...register(name, validation)}
                />

                {/* Eye toggle (only show for password fields) */}
                {type === "password" && passwordStrength && (
                    <button
                        type="button"
                        aria-label={show ? "Hide password" : "Show password"}
                        onClick={() => setShow((s) => !s)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 p-1 rounded-md hover:bg-white/5 focus:outline-none"
                    >
                        {/* simple eye / eye-off SVGs */}
                        {show ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7a10.05 10.05 0 011.875.175M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                            </svg>
                        )}
                    </button>
                )}
            </div>

            {/* Password strength UI (small thin segmented bar + small badge) */}
            {type === "password" && passwordValue && (
                <div className="mt-1 space-y-1">
                    <div className="flex gap-[2px]">
                        <div className={`h-[3px] flex-1 rounded ${strengthColors.weak}`}></div>
                        <div className={`h-[3px] flex-1 rounded ${passwordStrength === "medium" || passwordStrength === "strong" ? strengthColors.medium : "bg-neutral-800"}`}></div>
                        <div className={`h-[3px] flex-1 rounded ${passwordStrength === "strong" ? strengthColors.strong : "bg-neutral-800"}`}></div>
                    </div>

                    <div
                        className={cn(
                            "text-[10px] font-semibold px-2 py-[2px] rounded-full w-fit mt-1",
                            passwordStrength === "weak" && strengthColors.weak,
                            passwordStrength === "medium" && strengthColors.medium,
                            passwordStrength === "strong" && strengthColors.strong,
                            "text-black"
                        )}
                    >
                        {passwordStrength}
                    </div>
                </div>
            )}


            {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
    );
};

export default InputField;
