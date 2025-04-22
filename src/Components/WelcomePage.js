import React, { useMemo } from "react";
import { Typography, Button, Paper, Grid, Box } from "@mui/material";
import "./WelcomePage.css";

// Constants for better maintainability
const MAIN_CATEGORIES = ["HES", "MDMS", "Mobile", "API"];
const SUB_CATEGORIES = [
    { label: "Mobile Asset Survey App", value: "MobileAssetSurvey" },
    { label: "Consumer App", value: "ConsumerApp" },
    { label: "Web API", value: "WebAPI" },
    { label: "Mobile API", value: "MobileAPI" }
];

// Memoized button components to prevent unnecessary re-renders
const CategoryButton = React.memo(({ category, onProceed }) => (
    <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => onProceed(category)}
        className="main-category-button"
    >
        {category}
    </Button>
));

const SubCategoryButton = React.memo(({ sub, onProceed }) => (
    <Button
        variant="outlined"
        color="secondary"
        size="medium"
        onClick={() => onProceed(sub.value)}
        className="subcategory-button"
    >
        {sub.label}
    </Button>
));

function WelcomePage({ onProceed }) {
    // Memoize the main categories grid to prevent unnecessary re-renders
    const mainCategoriesGrid = useMemo(() => (
        <Grid container spacing={2} justifyContent="center">
            {MAIN_CATEGORIES.map((category) => (
                <Grid item key={category}>
                    <CategoryButton category={category} onProceed={onProceed} />
                </Grid>
            ))}
        </Grid>
    ), [onProceed]);

    // Memoize the subcategories grid to prevent unnecessary re-renders
    const subCategoriesGrid = useMemo(() => (
        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
            {SUB_CATEGORIES.map((sub) => (
                <Grid item key={sub.value}>
                    <SubCategoryButton sub={sub} onProceed={onProceed} />
                </Grid>
            ))}
        </Grid>
    ), [onProceed]);

    return (
        <Box className="welcome-container">
            <Typography
                variant="h3"
                className="welcome-heading"
                component="h1" // Semantic HTML
                aria-label="Welcome to QA Team"
            >
                QUALITY AT ITS BEST THROUGH THE LENS OF EFICAA'S QA TEAM.
            </Typography>

            <Paper
                className="welcome-buttons-container"
                role="navigation"
                aria-label="Category Navigation"
            >
                {mainCategoriesGrid}
                {subCategoriesGrid}
            </Paper>
        </Box>
    );
}

// Add display name for better debugging
CategoryButton.displayName = 'CategoryButton';
SubCategoryButton.displayName = 'SubCategoryButton';

export default React.memo(WelcomePage);
