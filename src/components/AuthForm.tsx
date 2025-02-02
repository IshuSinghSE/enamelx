'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import {
//     signInWithEmailAndPassword,
//     signUpWithEmailAndPassword
// } from '@/lib/actions/auth';
import { cn } from '@/lib/utils'
// import { signIn } from 'next-auth/react';
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const AuthForm = ({ formType }: { formType: 'signin' | 'signup' }) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    fullName: '',
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      formType === 'signup' &&
      (!data.fullName || !data.email || !data.password)
    ) {
      return
    }
    if (formType === 'signin' && (!data.email || !data.password)) {
      return
    }

    // if (formType === 'signup') {
    //     const res = await signUpWithEmailAndPassword(data);
    //     if (res.success) {
    //         redirect('/dashboard');
    //     }
    // }
    // if (formType === 'signin') {
    //     const res = await signInWithEmailAndPassword({
    //         email: data.email,
    //         password: data.password
    //     });

    //     if (res.success) {
    //         redirect('/dashboard');
    //     }
    // }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="overflow-hidden z-10 border-border border-2">
        <CardContent className="grid p-0 md:grid-cols-1">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold font-sora">
                  Welcome {formType === 'signin' && 'back'}
                </h1>
                <p className="text-balance text-neutral-400 dark:text-neutral-400 font-noto-sans">
                  {formType === 'signup' ? 'Sign up' : 'Sign in'} to your
                  <span className="text-primary dark:text-secondary-hover font-sora mx-1">
                    EnamelX 
                    </span>
                    account
                </p>
              </div>
              {formType === 'signup' && (
                <div className="grid gap-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    name="fullName"
                    type="fullname"
                    onChange={(e) =>
                      setData({
                        ...data,
                        fullName: e.target.value,
                      })
                    }
                    placeholder="Enter your name"
                    className="text-sm"
                  />
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) =>
                    setData({
                      ...data,
                      email: e.target.value,
                    })
                  }
                  placeholder="Enter your email"
                  className="text-sm"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) =>
                    setData({
                      ...data,
                      password: e.target.value,
                    })
                  }
                  placeholder="Enter your password"
                  className="text-sm text-muted-foreground"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-muted text-white transition-all duration-200 ease-in-out "
              >
                {formType === 'signin' ? 'Sign in' : 'Sign up'}
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-neutral-800 dark:after:border-neutral-800">
                <span className="relative z-10 px-2 text-primary bg-background dark:text-neutral-400">
                  OR continue with
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <Button
                  variant="outline"
                  className="w-full hover:bg-secondary hover:text-white transition-all duration-300 ease-in-out "
                  // onClick={() => signIn('google')}
                >
                  <svg
                    width="800px"
                    height="800px"
                    viewBox="0 0 32 32"
                    data-name="Layer 1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16"
                      fill="#00ac47"
                    />
                    <path
                      d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16"
                      fill="#4285f4"
                    />
                    <path
                      d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z"
                      fill="#ffba00"
                    />
                    <polygon
                      fill="#2ab2db"
                      points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"
                    />
                    <path
                      d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z"
                      fill="#ea4435"
                    />
                    <polygon
                      fill="#2ab2db"
                      points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"
                    />
                    <path
                      d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z"
                      fill="#4285f4"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                  <span className="sr-only">
                    {formType === 'signup' ? 'Sign in' : 'Sign up'} with Google
                  </span>
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link
                  href={`/${formType === 'signup' ? 'signin' : 'signup'}`}
                  className="underline-offset-4 hover:underline text-secondary-foreground  font-semibold"
                >
                  {formType === 'signup' ? 'Sign in' : 'Sign up'}
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="text-balance text-center text-xs text-neutral-500 [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary dark:text-neutral-400 dark:hover:[&_a]:text-neutral-50 z-10 space-x-1">
          <p>By clicking continue, you agree to our</p>
          <Link href="#">Terms of Service</Link>
          <span>&amp;</span>
          <Link href="#">Privacy Policy</Link>.
        </CardFooter>
      </Card>
    </div>
  )
}

export default AuthForm
