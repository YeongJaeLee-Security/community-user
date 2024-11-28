import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1a1a1b",
        color: "#D7DADC",
        py: 3,
        textAlign: "center",
        mt: 4,
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        © {new Date().getFullYear()} Sesac Community. All rights reserved.
      </Typography>
    </Box>
  );
}
