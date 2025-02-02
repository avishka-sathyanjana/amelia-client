// src/components/Breadcrumb.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Split the path into segments
  const pathSegments = location.pathname
    .split("/")
    .filter((segment) => segment !== ""); // Remove empty segments

  // Handle breadcrumb item click
  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "left",
        gap: 1,
        padding: 1,
        backgroundColor: "#FFF8E7",
      }}
    >
      {pathSegments.map((segment, index) => {
        // Construct the path up to the current segment
        const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

        return (
          <Box
            key={path}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {/* Breadcrumb link */}
            <Link
              onClick={() => handleClick(path)}
              sx={{
                textDecoration: "none",
                color: "black",
                fontWeight:
                  index === pathSegments.length - 1 ? "bold" : "normal",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              {segment}
            </Link>

            {/* Separator (>) */}
            {index < pathSegments.length - 1 && (
              <Typography sx={{ color: "text.secondary" }}>&gt;</Typography>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default Breadcrumb;
