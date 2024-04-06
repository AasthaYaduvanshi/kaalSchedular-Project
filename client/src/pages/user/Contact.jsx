import React, { useState } from "react"
import { Box, Grid, Typography, TextField, Button } from "@mui/material"
import useAxiosPrivate from "@hooks/useAxiosPrivate"

const ContactUs = () => {
  const api = useAxiosPrivate()

  const [contact, setContact] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Implement submission logic here. For example, send data to an API or email service.
    // console.log(contact)
    const response = await api.post("/api/user/contact", contact)
    if (response.status === 200) {
      alert("Your message has been sent!")
    } else {
      alert("Failed to send message. Please try again later.")
    }
    // Reset form after submission
    setContact({
      name: "",
      email: "",
      message: "",
    })
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 4 }} id="contact">
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Contact Us
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value={contact.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              type="email"
              value={contact.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="message"
              label="Message"
              name="message"
              multiline
              rows={4}
              value={contact.message}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default ContactUs
