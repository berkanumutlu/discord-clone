"use client"

import { SignUp } from "@clerk/nextjs"
import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { isThirdPartyAuthenticationEnabled } from "@/lib/utils"
import { RegisterFormValuesType, registerSchema } from "@/lib/validation/auth"
import { signInUrl } from "@/data/authData"
import { AppLogo } from "@/components/main/app-logo"
import { Form } from "@/components/ui/form"
import { CustomFormInput } from "@/components/form/custom-form-input"
import { CustomFormLink } from "@/components/form/custom-form-link"
import { CustomFormButton } from "@/components/form/custom-form-button"
import { CustomFormBirthDateInput } from "@/components/form/custom-form-birth-date-input"
import { CustomFormCheckbox } from "@/components/form/custom-form-checkbox"

type RegisterPageType = {
    onSubmit?: (data: RegisterFormValuesType) => void
}

export default function RegisterPage({ onSubmit }: RegisterPageType) {
    const form = useForm<RegisterFormValuesType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            global_name: "",
            username: "",
            password: "",
            newsletter: false,
            terms: false,
            birthDate: "",
        },
    })
    const isLoading = form.formState.isSubmitting
    const isTermsAccepted = useWatch({
        control: form.control,
        name: "terms",
    })
    const isSubmitButtonDisabled = !isTermsAccepted

    // If there is a third party auth
    if (isThirdPartyAuthenticationEnabled()) {
        return <SignUp />
    }

    function handleOnSubmit(data: RegisterFormValuesType) {
        if (onSubmit) {
            onSubmit(data)
        }
        // console.log(data)
        // TODO: Handle register logic here
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleOnSubmit)} className="authForm registerForm">
                <AppLogo href="" showText={false} className="mb-4 w-[130px] h-9 sm:hidden flex-shrink-0 justify-self-center select-none" />
                <div className="w-full text-center">
                    <h1 className="mb-2 text-app-header-primary font-display font-semibold text-[24px] leading-tight">Create an account</h1>
                    <div className="mt-5 space-y-5 w-full text-left">
                        <CustomFormInput
                            label="Email"
                            type="email"
                            name="email"
                            required={true}
                            autoFocus={true}
                            autoComplete="username"
                        />
                        <CustomFormInput
                            label="Display Name"
                            name="global_name"
                            description="This is how others see you. You can use special characters and emoji."
                            autoComplete="off"
                        />
                        <CustomFormInput
                            label="Username"
                            name="username"
                            description="Please only use numbers, letters, underscores _ , or periods."
                            required={true}
                            autoComplete="off"
                        />
                        <CustomFormInput
                            label="Password"
                            type="password"
                            name="password"
                            required={true}
                            autoComplete="current-password"
                        />
                        <CustomFormBirthDateInput
                            label="Date of Birth"
                            required={true}
                        />
                        <CustomFormCheckbox
                            label="(Optional) It’s okay to send me emails with Discord updates, tips, and special offers. You can opt out at any time."
                            name="newsletter"
                            className="!mt-2"
                            labelClassName="text-app-text-muted-3"
                        />
                        <div>
                            <CustomFormButton
                                label="Continue"
                                variant="brand"
                                size="full-lg"
                                type="submit"
                                isLoading={isLoading}
                                disabled={isSubmitButtonDisabled}
                                tooltipMessage="You need to agree to our terms of service to continue"
                            />
                        </div>
                        <CustomFormCheckbox
                            label={`I have read and agree to Discord's <a class="anchor_edefb8 anchorUnderlineOnHover_edefb8" href="//discord.com/terms" rel="noreferrer noopener" target="_blank">Terms of Service</a> and <a class="anchor_edefb8 anchorUnderlineOnHover_edefb8" href="//discord.com/privacy" rel="noreferrer noopener" target="_blank">Privacy Policy</a>.`}
                            name="terms"
                            required={true}
                            labelClassName="text-[14px] leading-[18px]"
                        />
                        <CustomFormLink
                            href={signInUrl}
                            label="Already have an account?"
                        />
                    </div>
                </div>
            </form>
        </Form>
    )
}