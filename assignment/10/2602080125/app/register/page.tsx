"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Mail, User, UserPlus } from "lucide-react";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { authFirebase, dbFirebase } from "@/lib/firebase";
import { useAuth } from "@/components/provider/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

interface registerPayload {
    name: string;
    email: string;
    password: string;
}

const registerSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name must be at most 50 characters"),
    email: z.string().min(1, "Email is required").pipe(z.email("Invalid email format")),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
})

const RegisterPage = () => {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<registerPayload>({ resolver: zodResolver(registerSchema) });

    useEffect(() => {
        reset();
        setShowPassword(false);
    }, [reset]);

    useEffect(() => {
        if (!loading && user) {
            router.replace("/user/profile")
        }
    }, [user, loading, router])

    const onSubmit = async (data: registerPayload) => {
        try {
            const cred = await createUserWithEmailAndPassword(authFirebase, data.email, data.password);
            await setDoc(doc(dbFirebase, "users", cred.user.uid), {
                email: cred.user.email,
                name: data.name,
                role: "user",
                createdAt: serverTimestamp(),
            });
            toast.success("Registration successful");
            router.push("/user/profile");
        }
        catch (e) {
            const code = e instanceof FirebaseError ? e.code : undefined;
            toast.error(code === "auth/email-already-in-use" ? "Email already registered" : "Registration failed");
        }
    }

    return (
        <main className="flex flex-1 items-center justify-center p-4 py-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center gap-3 border-b pb-4">
                        <UserPlus className="size-10 shrink-0 rounded-full bg-primary/10 p-2" />
                        <div className="flex flex-col gap-0.5">
                            <CardTitle className="text-xl">Create an account</CardTitle>
                            <CardDescription>Fill in the details below to sign up</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <FieldGroup className="gap-4">
                            <Field data-invalid={!!errors.name} className="gap-1.5">
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <InputGroup className="h-10">
                                    <InputGroupAddon align="inline-start">
                                        <User />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        id="name"
                                        placeholder="Full name"
                                        autoComplete="name"
                                        required
                                        maxLength={50}
                                        disabled={isSubmitting}
                                        aria-invalid={!!errors.name}
                                        {...register("name")}
                                    />
                                </InputGroup>
                                {errors.name && <FieldError>{errors.name.message}</FieldError>}
                            </Field>

                            <Field data-invalid={!!errors.email} className="gap-1.5">
                                <FieldLabel htmlFor="email">Email</FieldLabel>
                                <InputGroup className="h-10">
                                    <InputGroupAddon align="inline-start">
                                        <Mail />
                                    </InputGroupAddon>
                                    <InputGroupInput
                                        id="email"
                                        type="email"
                                        placeholder="name@email.com"
                                        autoComplete="email"
                                        required
                                        disabled={isSubmitting}
                                        aria-invalid={!!errors.email}
                                        {...register("email")}
                                    />
                                </InputGroup>
                                {errors.email && <FieldError>{errors.email.message}</FieldError>}
                            </Field>

                            <Field data-invalid={!!errors.password} className="gap-1.5">
                                <FieldLabel htmlFor="password">Password</FieldLabel>
                                <InputGroup className="h-10">
                                    <InputGroupInput
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="At least 8 characters"
                                        autoComplete="new-password"
                                        required
                                        minLength={8}
                                        disabled={isSubmitting}
                                        aria-invalid={!!errors.password}
                                        {...register("password")}
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <InputGroupButton
                                            type="button"
                                            size="icon-xs"
                                            tabIndex={-1}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            onClick={() => setShowPassword((s) => !s)}
                                        >
                                            {showPassword ? <EyeOff /> : <Eye />}
                                        </InputGroupButton>
                                    </InputGroupAddon>
                                </InputGroup>
                                {errors.password && <FieldError>{errors.password.message}</FieldError>}
                            </Field>

                            <div className="border-b" />

                            <Field className="gap-3">
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 size-4 animate-spin" />
                                            Creating account...
                                        </>
                                    ) : (
                                        "Register"
                                    )}
                                </Button>
                                <FieldDescription className="text-center">
                                    Already have an account?{" "}
                                    <Link href="/login" className="font-medium text-foreground underline">
                                        Login
                                    </Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </main>
    );
}
export default RegisterPage;