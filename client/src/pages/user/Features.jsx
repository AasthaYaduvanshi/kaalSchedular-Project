import React from "react"
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { StarBorder, Build, ThumbUp, Visibility } from "@mui/icons-material"

const featuresData = [
  {
    title: "High Quality",
    description:
      "Our product ensures high quality through rigorous testing and user feedback.",
    icon: <StarBorder />,
  },
  {
    title: "Easy to Use",
    description:
      "Designed with user experience in mind, our product is intuitive and straightforward.",
    icon: <Build />,
  },
  {
    title: "Reliable",
    description:
      "Dependability is at the core of our product, ensuring you can count on it when needed.",
    icon: <ThumbUp />,
  },
  {
    title: "Innovative",
    description:
      "We continuously seek out the latest technologies to incorporate into our product.",
    icon: <Visibility />,
  },
]

const FeatureCard = ({ title, description, icon }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("sm"))

  return (
    <Card
      sx={{
        minWidth: 275,
        minHeight: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div">
          {icon} {title}
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  )
}

const Features = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Features
      </Typography>
      <Grid container spacing={4}>
        {featuresData.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <FeatureCard
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Features
