"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import * as ReactHookForm from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const signupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  username: z.string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(50, { message: "Username must not exceed 50 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export function SignupForm(){
  const form = ReactHookForm.useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    console.log(values);
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Fill in the details below to create your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <ReactHookForm.Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <ReactHookForm.Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Your username"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <ReactHookForm.Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    {...field}
                  />
                  {fieldState.error && (
                    <p className="text-red-600 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
          <Button variant="outline" className="w-full">
            Sign Up with Google
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}