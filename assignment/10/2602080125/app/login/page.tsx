"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, LogIn, Mail } from "lucide-react";
import { browserLocalPersistence, browserSessionPersistence, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { authFirebase } from "@/lib/firebase";
import { useAuth } from "@/components/provider/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";

interface loginPayload {
    email: string;
    password: string;
}

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").pipe(z.email("Invalid email format")),
    password: z.string().min(1, "Password is required").min(8, "Password must be at least 8 characters"),
})

const LoginPage = () => {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<loginPayload>({ resolver: zodResolver(loginSchema) });

    useEffect(() => {
        reset();
        setShowPassword(false);
        setRememberMe(true);
    }, [reset]);

    useEffect(() => {
        if (!loading && user) {
            router.replace("/user/profile")
        }
    }, [user, loading, router])

    const onSubmit = async (data: loginPayload) => {
        try {
            await setPersistence(authFirebase, rememberMe ? browserLocalPersistence : browserSessionPersistence);
            await signInWithEmailAndPassword(authFirebase, data.email, data.password);
            toast.success("Login successful");
            router.push("/user/profile");
        }
        catch {
            toast.error("Invalid email or password");
        }
    }

    return (
        <main className="flex flex-1 items-center justify-center p-4 py-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="flex items-center gap-3 border-b pb-4">
                        <LogIn className="size-10 shrink-0 rounded-full bg-primary/10 p-2" />
                        <div className="flex flex-col gap-0.5">
                            <CardTitle className="text-xl">Welcome back</CardTitle>
                            <CardDescription>Sign in with your email and password</CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <FieldGroup className="gap-4">
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
                                        autoComplete="current-password"
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

                            <Field orientation="horizontal" className="items-center gap-2">
                                <Checkbox
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onCheckedChange={(checked) => setRememberMe(checked === true)}
                                    disabled={isSubmitting}
                                />
                                <FieldLabel htmlFor="rememberMe" className="font-normal text-muted-foreground">
                                    Remember me
                                </FieldLabel>
                            </Field>

                            <div className="border-b" />

                            <Field className="gap-3">
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 size-4 animate-spin" />
                                            Signing in...
                                        </>
                                    ) : (
                                        "Login"
                                    )}
                                </Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/register" className="font-medium text-foreground underline">
                                        Register
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
export default LoginPage;