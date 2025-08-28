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
          
          <div className="relative my-2.5">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-3 text-gray-50 border-gray-300 hover:bg-gray-400 transition-all duration-200"
            onClick={handleGoogleSignIn}
            disabled={loading || isNavigating}
          >
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            <span className="font-medium">Sign in with Google</span>
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