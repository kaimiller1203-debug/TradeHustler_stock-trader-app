'use client';

import {useForm} from "react-hook-form"
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/inputField";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology',
        },
        mode:'onBlur'
}, );
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
            </form>
        </>
    )
}
export default SignUp
