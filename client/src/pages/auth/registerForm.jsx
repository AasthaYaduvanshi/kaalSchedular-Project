import React, { useContext, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { AccountContext } from "./AccountContext"
import {
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  SubmitButton,
  BoldLink,
} from "./common"
import axios from "@utils/axios"
import { toast } from "react-hot-toast"
import { catchError } from "@utils/catchError"
import usePageTitle from "@hooks/usePageTitle"
import { ColorModeContext } from "@contexts/DarkModeContext"

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email({ message: "Invalid email" }),
  userName: z
    .string()
    .regex(/^\S*$/, "Space not allow")
    .min(5, "Username minimum 5 characters")
    .max(20, "Username maximum 20 characters"),
  password: z.string().min(6, "Password minimum 6 characters"),
  role: z.enum(["user", "admin"]),
})

const defaultValues = {
  name: "",
  email: "",
  userName: "",
  password: "",
  role: "user",
}

export function SignupForm(props) {
  usePageTitle("Create account")
  const [submitting, setSubmitting] = useState(false)
  const { darkMode } = useContext(ColorModeContext)

  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues,
  })
  const { switchToSignin } = useContext(AccountContext)

  const onSubmit = async (data) => {
    setSubmitting(true)

    const response = axios.post("/api/auth/signup", data)

    toast.promise(response, {
      loading: "Saving...",
      success: ({ data }) => {
        reset(defaultValues)
        return data.message
      },
      error: (error) => {
        setSubmitting(false)
        return catchError(error)
      },
    })
  }

  return (
    <BoxContainer>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <div style={{ marginBottom: "10px" }}>
            <Input
              darkMode={darkMode}
              type="text"
              placeholder="Full name"
              {...register("name")}
            />
            {errors.name && (
              <span style={{ fontSize: "0.6rem", color: "red" }}>
                {errors.name.message}
              </span>
            )}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <Input
              darkMode={darkMode}
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <span style={{ fontSize: "0.6rem", color: "red" }}>
                {errors.email.message}
              </span>
            )}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Input
              darkMode={darkMode}
              type="text"
              placeholder="Username"
              {...register("userName", {
                required: "Username is required",
                minLength: {
                  value: 5,
                  message: "Username should be at least 5 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Username should not exceed 20 characters",
                },
              })}
            />
            {errors.userName && (
              <span style={{ fontSize: "0.6rem", color: "red" }}>
                {errors.userName.message}
              </span>
            )}
          </div>
          <div style={{ marginBottom: "10px" }}>
            <Input
              darkMode={darkMode}
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            {errors.password && (
              <span style={{ fontSize: "0.6rem", color: "red" }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <SubmitButton type="submit">Signup</SubmitButton>
          <LineText>
            Already have an account?{" "}
            <BoldLink onClick={switchToSignin} href="#">
              Signin
            </BoldLink>
          </LineText>
        </form>
      </FormContainer>
    </BoxContainer>
  )
}
