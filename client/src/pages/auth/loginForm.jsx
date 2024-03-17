import React, { useContext, useState } from "react"
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "./common"
import { Marginer } from "./marginer"
import { AccountContext } from "./AccountContext"
import useAuth from "hooks/useAuth"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import FormHelperText from "@mui/material/FormHelperText"
import { ColorModeContext } from "@contexts/DarkModeContext"
import { catchError } from "@utils/catchError"
const schema = z.object({
  userName: z
    .string()
    .trim()
    .min(5, "Username minimum 5 characters")
    .max(20, "Username maximum 20 characters"),
  password: z
    .string()
    .trim()
    .min(6, "Password should be minimum of 6 characters")
    .max(40, "Must be 40 or fewer characters long"),
})

const defaultValues = {
  userName: "",
  password: "",
}

export function LoginForm(props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const [toggleShowPassword, setShowPassword] = useState(false)
  const { darkMode } = useContext(ColorModeContext)

  const { switchToSignup } = useContext(AccountContext)
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  })

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const onSubmit = async (data) => {
    try {
      setLoading(true)

      await login(data.userName, data.password)
    } catch (error) {
      setError(catchError(error))
      setLoading(false)
    }
  }

  return (
    <BoxContainer>
      <FormContainer>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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
              type={toggleShowPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password should be at least 6 characters long",
                },
              })}
            />
            <label for="check">Show Password</label>
            <input
              id="check"
              type="checkbox"
              value={toggleShowPassword}
              onChange={handleClickShowPassword}
            />
            {errors.password && (
              <span style={{ fontSize: "0.6rem", color: "red" }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <SubmitButton type="submit">Signin</SubmitButton>

          {error && (
            <FormHelperText
              error
              sx={{ fontSize: "0.8rem", color: "red", marginTop: "10px" }}
            >
              {error}
            </FormHelperText>
          )}
        </form>
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      {/* <MutedLink href="#">Forget your password?</MutedLink> */}
      <Marginer direction="vertical" margin="1.6em" />

      <Marginer direction="vertical" margin="5px" />
      <LineText>
        Don't have an accoun?{" "}
        <BoldLink onClick={switchToSignup} href="#">
          Signup
        </BoldLink>
      </LineText>
    </BoxContainer>
  )
}
