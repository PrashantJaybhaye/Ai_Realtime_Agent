import React from "react";
import { Button } from '@/components/ui/button'
import Link from 'next/link'


const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-background/10 backdrop-blur-xl border-b border-border/40 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 max-sm:py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary-foreground">
              <svg
                width={32}
                height={32}
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m32 10 8 14 -8 14 -8 -14Z" fill="#10A37F" />
                <path
                  d="m32 54 -8 -14 8 -14 8 14Z"
                  fill="#10A37F"
                  opacity={0.5}
                />
                <path
                  cx={16}
                  cy={16}
                  r={4}
                  fill="#10A37F"
                  opacity={0.3}
                  d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z"
                />
                <path
                  d="M16 32q16 -12 32 0 -16 12 -32 0Z"
                  stroke="#10A37F"
                  strokeWidth={2}
                  fill="none"
                />
              </svg>
            </div>
            <span className="text-xl font-semibold text-foreground">
              Sidvia
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Button asChild variant={"secondary"}>
              <Link href="/sign-up">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
