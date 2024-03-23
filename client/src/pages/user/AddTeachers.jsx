import React from "react"
import { Grid, TextField, Button } from "@mui/material"
import { useForm } from "react-hook-form"
import { SubmitButton } from "@pages/auth/common"
import useAxiosPrivate from "@hooks/useAxiosPrivate"
import toast from "react-hot-toast"

export default function AddTeachers({ handleAddUserClose, getConfirmation }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  })

  const api = useAxiosPrivate()
  const onSubmit = async (data) => {
    try {
      const response = await api.post("/api/user/create-teacher", data)

      if (response.data.success) {
        toast.success("Teacher created successfully")
        getConfirmation(response.data.success)
        reset()
      } else {
        getConfirmation(response.data.success)
        toast.error("Failed to create teacher")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast.error("An error occurred")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            label="Name"
            fullWidth
            {...register("name", { required: true })}
            error={!!errors.name}
            helperText={errors.name && "Name is required"}
            size="sm"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Status"
            fullWidth
            select
            SelectProps={{ native: true }}
            {...register("status", { required: true })}
            error={!!errors.status}
            helperText={errors.status && "Status is required"}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Location"
            fullWidth
            {...register("location", { required: true })}
            error={!!errors.location}
            helperText={errors.location && "Location is required"}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            fullWidth
            {...register("phoneNumber", { required: true })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber && "Phone Number is required"}
          />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton type="submit" variant="contained" color="primary">
            Submit
          </SubmitButton>
        </Grid>
      </Grid>
    </form>
  )
}
