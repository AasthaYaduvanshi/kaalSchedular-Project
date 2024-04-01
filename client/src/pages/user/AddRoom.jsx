import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { TextField, Button } from "@mui/material"
import { SubmitButton } from "@pages/auth/common"
import toast from "react-hot-toast"
import useAxiosPrivate from "@hooks/useAxiosPrivate"
import AuthContext from "@contexts/AuthContext"

export default function AddRoom({ handleAddRoomClose }) {
  const { user } = React.useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })
  const [Error, SetError] = useState("")

  const api = useAxiosPrivate()
  const onSubmit = async (data) => {
    try {
      const response = await api.post("/api/user/create-room", {
        roomNumber: data.roomNumber,
        userId: user.userId,
      })
      // Check if the request was successful
      if (response?.data?.success) {
        toast.success(response.data.message)
      } else {
        console.log(response)
        toast.error(response.data.message)
      }
      handleAddRoomClose()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error(error.response?.data?.message || "An error occurred")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Room Number"
        variant="outlined"
        fullWidth
        inputProps={{ pattern: "[1-9][0-9]{0,2}" }}
        {...register("roomNumber", {
          required: true,
          pattern: /^[1-9]\d{0,2}$/,
        })}
        error={!!errors.roomNumber}
        helperText={
          errors.roomNumber
            ? "Room number must be a 1, 2, or 3-digit number not starting with zero"
            : ""
        }
      />

      <SubmitButton style={{ marginTop: "1rem" }}>Submit</SubmitButton>
    </form>
  )
}
