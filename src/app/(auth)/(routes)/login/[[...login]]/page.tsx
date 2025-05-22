"use client"

import Image from "next/image"
import { SignIn } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { isThirdPartyAuthenticationEnabled } from "@/lib/utils"
import { LoginFormValuesType, loginSchema } from "@/lib/validation/auth"
import { signUpUrl } from "@/data"
import { AppLogo } from "@/components/main/app-logo"
import { Form } from "@/components/ui/form"
import { CustomFormLink } from "@/components/form/custom-form-link"
import { CustomFormButton } from "@/components/form/custom-form-button"
import { CustomFormInput } from "@/components/form/custom-form-input"
import { CustomFormEmailPhoneInput } from "@/components/form/custom-form-email-phone-input"
import { CustomSpinnerAnimation } from "@/components/animation/custom-spinner"

export default function LoginPage() {
    const form = useForm<LoginFormValuesType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            emailOrPhone: "",
            password: "",
        },
    })
    const isLoading = form.formState.isSubmitting

    // If there is a third party auth
    if (isThirdPartyAuthenticationEnabled()) {
        return <SignIn />
    }

    function onSubmit(data: LoginFormValuesType) {
        console.log(data)
        // TODO: Handle login logic here
    }

    // TODO: Handle qr code generate here
    const qrCodeLoginData = undefined

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="authForm lg:w-[784px]">
                <AppLogo href="" showText={false} className="mb-4 w-[130px] h-9 sm:hidden flex-shrink-0 justify-self-center select-none" />
                <div className="w-full flex flex-row flex-nowrap justify-start items-center gap-x-16 text-center">
                    <div className="flex flex-col flex-grow items-start z-[1]">
                        <div className="w-full flex flex-col items-center">
                            <h1 className="mb-2 text-app-header-primary font-display font-semibold text-[24px] leading-tight">Welcome back!</h1>
                            <div className="text-app-header-secondary-2 font-primary font-normal text-[16px] leading-tight">We&apos;re so excited to see you again!</div>
                        </div>
                        <div className="mt-5 w-full text-left">
                            <CustomFormEmailPhoneInput
                                className="mb-5"
                                required={true}
                                autoFocus={true}
                                tabIndex={1}
                                autoComplete="username"
                            />
                            <CustomFormInput
                                label="Password"
                                type="password"
                                name="password"
                                required={true}
                                tabIndex={2}
                                autoComplete="current-password"
                            />
                            {/* TODO: Forgot your password? actions */}
                            <CustomFormLink
                                label="Forgot your password?"
                                buttonClassName="mt-1 mb-5"
                            />
                            <CustomFormButton
                                label="Log In"
                                variant="brand"
                                size="full-lg"
                                type="submit"
                                tabIndex={3}
                                className="mb-2"
                                isLoading={isLoading}
                            />
                            <div className="mt-1 inline-flex">
                                <span className="text-app-text-muted-3 text-[14px] leading-4">Need an account?</span>
                                <CustomFormLink
                                    href={signUpUrl}
                                    label="Register"
                                    buttonClassName="ml-1 align-bottom"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-60 h-[344px] relative hidden lg:flex items-center overflow-hidden">
                        <div className="h-full flex flex-col justify-center items-center">
                            <div className="qrCodeContainer mb-8 size-[176px] relative flex">
                                {/* TODO: XSS ? */}
                                {qrCodeLoginData && (
                                    <div className="qrCode p-2 size-full absolute bg-app-always-white rounded" dangerouslySetInnerHTML={{ __html: qrCodeLoginData }}></div>
                                )}
                                <div
                                    className="qrCodeOverlay size-full absolute flex justify-center items-center"
                                    aria-label={qrCodeLoginData ? undefined : "QR code login is loading"}
                                    aria-busy={qrCodeLoginData ? undefined : true}
                                >
                                    {qrCodeLoginData ? (
                                        <Image
                                            src={"/images/auth/dd05fd1ea37e7747.png"}
                                            alt={""}
                                            width={50}
                                            height={50}
                                            className="flex select-none"
                                        />
                                    ) : (
                                        <CustomSpinnerAnimation />
                                    )}
                                </div>
                            </div>
                            <h2 className="mb-2 text-app-header-primary font-display font-semibold text-[24px] leading-tight">Log in with QR Code</h2>
                            <div className="text-app-header-secondary-2 font-primary font-normal text-[16px] leading-tight">
                                Scan this with the <strong>Discord mobile app</strong> to log in instantly.
                            </div>
                            {/* TODO: Passkey */}
                            <CustomFormLink
                                label="Or, sign in with passkey"
                                buttonClassName="p-[2px_16px] h-11"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}