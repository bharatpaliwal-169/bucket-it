"use client";

import React from 'react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GlobalConstants, NavLinks } from '@/constants/siteData/siteData';

import FormType from "@/constants/types/AuthFormType"; 

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z.string().email(),
    fullName: formType === GlobalConstants.signup ? z.string().min(2).max(50) : z.string().optional(),
  });
};


const AuthForm = ({type} : {type : FormType}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accountId, setAccountId] = useState(null);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });


  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");
  
    try {
      // const user =
        // type === "SIGNUP"
        //   ? await createAccount({
        //       fullName: values.fullName || "",
        //       email: values.email,
        //     })
        //   : await signInUser({ email: values.email });
  
      // setAccountId(user.accountId);
    } catch {
      setErrorMessage("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
          <h1 className="form-title">
            {type === GlobalConstants.signup ? GlobalConstants.SignUp : GlobalConstants.SignIn }
          </h1>
          {type === GlobalConstants.signup && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <div className="shad-form-item">
                    <FormLabel className="shad-form-label">{GlobalConstants.FullName}</FormLabel>

                    <FormControl>
                      <Input
                        placeholder="What is your name?"
                        className="shad-input"
                        {...field}
                      />
                    </FormControl>
                  </div>

                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="shad-form-item">
                  <FormLabel className="shad-form-label">{GlobalConstants.Email}</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Tell us your email-Id:"
                      className="shad-input"
                      {...field}
                    />
                  </FormControl>
                </div>

                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="form-submit-button"
            disabled={isLoading}
          >
            {type === GlobalConstants.signup ? GlobalConstants.SignUp : GlobalConstants.SignIn }

            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                alt="loader"
                width={24}
                height={24}
                className="ml-2 animate-spin"
              />
            )}
          </Button>

          {errorMessage && <p className="error-message">*{errorMessage}</p>}

          <div className="body-2 flex justify-center">
            <p className="text-light-100">
              {type === GlobalConstants.signup ? GlobalConstants.CreateNewAcc : GlobalConstants.AlreadyHaveAcc}
            </p>
            <Link
              href={type === GlobalConstants.signin ? NavLinks.signup : NavLinks.signin}
              className="ml-1 font-medium text-brand"
            >
              {" "}
              {type === GlobalConstants.signin ? GlobalConstants.SignUp : GlobalConstants.SignIn }
            </Link>
          </div>
        </form>
      </Form>

      {/* {accountId && (
        <OtpModal email={form.getValues("email")} accountId={accountId} />
      )} */}
    </>
  )
}

export default AuthForm;