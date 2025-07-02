import { LoginForm } from '@/components/login-form'
import { GalleryVerticalEnd } from 'lucide-react'
import React from 'react'

const page = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 ">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Sidvia Inc.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm type='sign-in' />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/Authentication_Img.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[1.0] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default page