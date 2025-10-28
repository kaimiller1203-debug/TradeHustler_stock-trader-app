'use client';

import {useForm} from "react-hook-form"
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/inputField";
import FooterLink from "@/components/forms/FooterLink"
import { CountrySelectField } from "@/components/forms/CountrySelectField";

import { getPasswordStrength } from "@/lib/passwordStrength";
import SelectField from "@/components/forms/SelectField";
import {INVESTMENT_GOALS} from "@/lib/constants"
import {RISK_TOLERANCE_OPTIONS} from "@/lib/constants"
import {PREFERRED_INDUSTRIES} from "@/lib/constants"

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'us',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology',
        },
        mode:'onBlur'
}, );

    const passwordValue = watch("password") || "";
    const passwordStrength = getPasswordStrength(passwordValue);


    const onSubmit = async (data: SignUpFormData) => {
        try {
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <>
            <h1 className="relative form-title inline-block px-5 py-2 border border-orange-500/70 rounded-xl bg-white !text-orange-200 shadow-[0_0_20px_rgba(255,129,29,0.5)] overflow-hidden">
                <span className="relative z-10">Sign Up & Join Pioneer Club</span>
                <span className="absolute inset-0 before:absolute before:inset-0 before:translate-x-[-100%] before:bg-gradient-to-r before:from-transparent before:via-orange-300/40 before:to-transparent before:skew-x-12 animate-shine"></span>
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* INPUTS */}
                <InputField
                name="fullName"
                label="Full name"
                placeholder="John Doe"
                register={register}
                error={errors.fullName}
                validation={{required:'First and Last name is required', minLength:2}}
                />

                <InputField
                    name="email"
                    label="Email"
                    placeholder="JohnDoe@gmail.com"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: 'Email is required',
                        pattern: {
                            value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'Please enter a valid full email address'
                        }
                    }}
                />


                <InputField
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter a strong password"
                    register={register}
                    error={errors.password}
                    validation={{
                        required: "Password is required",
                    }}
                    passwordStrength={passwordStrength}
                    passwordValue={passwordValue}
                    // ✅ THIS IS THE IMPORTANT PART
                />
                <CountrySelectField
                    name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
                />


                <SelectField
                    name="investmentGoals"
                    label="Investment Goals"
                    placeholder="Select your Investment Goal"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />

                <SelectField
                    name="riskTolerance"
                    label="Risk Tolerance"
                    placeholder="Select your Risk level"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />

                <SelectField
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred Industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />



                <Button type= "submit"
                        disabled={isSubmitting}
                        className="relative inline-block px-5 py-2 border border-orange-500/70 rounded-xl bg-orange-200 !text-orange-400 shadow-[0_0_20px_rgba(255,129,29,0.5)] overflow-hidden">
                    {isSubmitting ? (
                        <span className="relative z-10">Creating Pioneer Member...</span>
                    ) : (
                        <span className="relative z-10">Start Your Journey</span>
                    )}

                    <span className="absolute inset-0 before:absolute before:inset-0 before:translate-x-[-100%] before:bg-gradient-to-r before:from-transparent before:via-orange-300/40 before:to-transparent before:skew-x-12 animate-shine"></span>
                </Button>
                <FooterLink text="already have an account"
                            linkText="Sign In"
                            href="/sign-in" />
            </form>
        </>
    )
}
export default SignUp
