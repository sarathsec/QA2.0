import React from "react";
import { Container, Typography, Button, Paper, Grid, Box } from "@mui/material";

function WelcomePage({ onProceed }) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                textAlign: "center",
                backgroundImage: "url('https://media.gettyimages.com/id/638523142/vector/quality-assurance-banner-and-icons.jpg?s=2048x2048&w=gi&k=20&c=jN2fiCR8D_x_bZxyYpAQ--Vpx3g5PEMf7GkLUaA40s4=')",// Set your wallpaper here
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "#fff" // Ensuring contrast for readability
            }}
        >
            {/* Heading */}
            <Typography
                variant="h3"
                fontWeight="bold"
                sx={{
                    mb: 3,
                    textAlign: "center",
                    color: "white",
                    fontFamily: "'Montserrat', sans-serif"
                }}
            >
                QUALITY AT ITS BEST THROUGH THE LENS OF EFICAA'S QA TEAM.
            </Typography>


            {/* Container for buttons */}
            <Paper
                sx={{
                    p: 3,
                    bgcolor: "rgba(0, 0, 0, 0.7)", // Dark background for readability
                    borderRadius: 3,
                    boxShadow: 3
                }}
            >
                {/* Main Categories */}
                <Grid container spacing={2} justifyContent="center">
                    {["HES", "MDMS", "Mobile", "API"].map((category) => (
                        <Grid item key={category}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => onProceed(category)}
                                sx={{ minWidth: 140 }} // Uniform size
                            >
                                {category}
                            </Button>
                        </Grid>
                    ))}
                </Grid>

                {/* Subcategories */}
                <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                    {[
                        { label: "Mobile Asset Survey App", value: "MobileAssetSurvey" },
                        { label: "Consumer App", value: "ConsumerApp" },
                        { label: "Web API", value: "WebAPI" },
                        { label: "Mobile API", value: "MobileAPI" }
                    ].map((sub) => (
                        <Grid item key={sub.value}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="medium"
                                onClick={() => onProceed(sub.value)}
                                sx={{ minWidth: 200, fontWeight: "bold", color: "#ff9800", borderColor: "#ff9800" }}
                            >
                                {sub.label}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Box>
    );
}

export default WelcomePage;
