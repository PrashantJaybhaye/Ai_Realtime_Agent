"use client"

import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
} from "@/components/ui/form"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { FirebaseError } from "firebase/app"
import { useState, useEffect } from "react"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3, "Name should be at least 3 characters long.") : z.string().optional(),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address."),
    password: z.string().min(6, "Password must contain at least 6 characters."),
  })
}

export function LoginForm({
  className,
  type,
  ...props
}: React.ComponentProps<"form"> & { type: FormType }) {
  const [loading, setLoading] = useState(false)
  const [isNavigating, setIsNavigating] = useState(false)
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  // This effect will clear the loading state when the component unmounts
  // (which happens when the page navigation completes)
  useEffect(() => {
    return () => {
      setLoading(false)
      setIsNavigating(false)
    }
  }, [])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      if (type === "sign-up") {
        const { name, email, password } = values;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password
        })

        if (!result?.success) {
          toast.error(result?.message);
          setLoading(false);
          return;
        }

        toast.success("You're all set! Sign in to continue.")
        setIsNavigating(true)
        router.push('/sign-in')
        
      } else {
        const { email, password } = values

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        const idToken = await userCredential.user.getIdToken();

        if (!idToken) {
          toast.error('Sign in failed')
          setLoading(false);
          return;
        }

        await signIn({
          email, idToken,
        })

        toast.success("Authentication successful. You're logged in.")
        setIsNavigating(true)
        router.push('/')
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            toast.error("This email is already in use. Please sign in instead.");
            break;
          case "auth/invalid-credential":
            toast.error("Invalid credentials. Please try again.");
            break;
          case "auth/invalid-email":
            toast.error("Invalid email address.");
            break;
          case "auth/wrong-password":
            toast.error("Incorrect password.");
            break;
          case "auth/user-not-found":
            toast.error("No user found with this email.");
            break;
          default:
            toast.error(error.message || "Something went wrong");
        }
      } else {
        toast.error("Unexpected error. Please try again later.");
      }
      setLoading(false);
      setIsNavigating(false)
    }
  }

  const isSignIn = type === 'sign-in';

  return (
    <Form {...form}>
      <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">
            {isSignIn ? "Welcome back to Sidvia" : "Create your Sidvia account"}
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            {isSignIn
              ? "Enter your credentials to continue your interview prep"
              : "Start your journey with Sidvia — your AI interview coach"}
          </p>
        </div>
        <div className="grid gap-5">
          {!isSignIn &&
            <FormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Your Name"
            />}
          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Your Email Address"
            type="email"
          />
          <FormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter Password"
            type="password"
          />
          
          <Button type="submit" className="w-full" disabled={loading || isNavigating}>
            {(loading || isNavigating) 
              ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              : isSignIn ? "Login" : "Get Started with Sidvia"}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button 
            type="button" 
            variant="outline" 
            className="w-full gap-2" 
            onClick={handleGoogleSignIn}
            disabled={loading || isNavigating}
          >
            {(loading || isNavigating) ? (
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </Button>
        </div>
        <div className="text-center text-sm">
          {isSignIn ? (
            <>
              New to Sidvia?{" "}
              <a href="/sign-up" className="underline underline-offset-4">
                Join us now
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/sign-in" className="underline underline-offset-4">
                Sign in
              </a>
            </>
          )}
        </div>
      </form>
    </Form>
  )
}