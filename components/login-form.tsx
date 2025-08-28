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
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp, signInWithGoogle } from "@/lib/actions/auth.action"
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
  const provider = new GoogleAuthProvider();

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

  async function handleGoogleSignIn() {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Call your server-side signInWithGoogle action
      const response = await signInWithGoogle({
        email: user.email!,
        idToken,
      });

      if (!response?.success) {
        toast.error(response?.message || "Google sign-in failed.");
        setLoading(false);
        setIsNavigating(false);
        return;
      }

      toast.success("Google sign-in successful. You're logged in.");
      setIsNavigating(true);
      router.push('/');
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast.error(error.message || "Google sign-in failed.");
      } else {
        toast.error("Unexpected error during Google sign-in.");
      }
      setLoading(false);
      setIsNavigating(false);
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
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
            disabled={loading || isNavigating}
          >
            <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2"><g><path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303C33.972 32.091 29.418 35 24 35c-6.065 0-11-4.935-11-11s4.935-11 11-11c2.507 0 4.81.857 6.646 2.278l6.364-6.364C33.084 6.527 28.761 5 24 5 12.954 5 4 13.954 4 25s8.954 20 20 20c11.046 0 20-8.954 20-20 0-1.341-.138-2.651-.389-3.917z"/><path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 16.1 19.001 13 24 13c2.507 0 4.81.857 6.646 2.278l6.364-6.364C33.084 6.527 28.761 5 24 5c-7.732 0-14.313 4.388-17.694 10.691z"/><path fill="#FBBC05" d="M24 45c5.315 0 10.065-1.824 13.797-4.938l-6.366-5.217C29.418 35 24 35 24 35c-5.418 0-9.972-2.909-11.303-6.917l-6.571 4.819C9.687 40.612 16.268 45 24 45z"/><path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303C34.527 32.091 29.418 35 24 35c-5.418 0-9.972-2.909-11.303-6.917l-6.571 4.819C9.687 40.612 16.268 45 24 45c7.732 0 14.313-4.388 17.694-10.691z"/></g></svg>
            Sign in with Google
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