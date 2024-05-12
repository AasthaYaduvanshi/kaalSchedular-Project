import React from "react"
import { Box, Grid, Card, CardContent, Typography, Avatar } from "@mui/material"

const testimonialsData = [
  {
    name: "Jane Doe",
    position: "CEO of CompanyX",
    avatar: "https://i.pravatar.cc/300?img=1",
    testimonial:
      "This product has revolutionized our workflow and increased productivity significantly. Highly recommended!",
  },
  {
    name: "John Smith",
    position: "Marketing Director at BrandY",
    avatar: "https://i.pravatar.cc/300?img=2",
    testimonial:
      "The user experience is unmatched. It has made our marketing processes smoother and more efficient.",
  },
  {
    name: "Alice Johnson",
    position: "CTO of StartupZ",
    avatar: "https://i.pravatar.cc/300?img=3",
    testimonial:
      "Technical support and customer service are top-notch. The team goes above and beyond to address our needs.",
  },
  // Add more testimonials as needed
]

const TestimonialCard = ({ name, position, avatar, testimonial }) => {
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardContent>
        <Box display="flex" alignItems="center" mb={2}>
          <Avatar
            src={avatar}
            alt={name}
            sx={{ width: 56, height: 56, mr: 2 }}
          />
          <Box>
            <Typography gutterBottom variant="h6" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {position}
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1">"{testimonial}"</Typography>
      </CardContent>
    </Card>
  )
}

const Testimonials = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        What Our Users Say
      </Typography>
      <Grid container justifyContent="center">
        {testimonialsData.map((testimonial, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TestimonialCard {...testimonial} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Testimonials
