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

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-up") {
        console.log('SIGN UP', values)
        toast.success("You’re all set! Sign in to continue.", { position: "top-right" })
        router.push('/sign-in')
      } else {
        console.log("SIGN IN", values)
        toast.success("Authentication successful. You’re now logged in.", { position: "top-right" })
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was error: ${error}`, { position: "top-right" })
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

          <Button type="submit" className="w-full">
            {isSignIn ? "Login" : "Get Started with Sidvia"}
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