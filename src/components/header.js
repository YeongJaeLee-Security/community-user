import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import AuthButton from "./authbutton";

export default function Header() {
  const router = useRouter();

  return (
    <AppBar position="static" sx={{ bgcolor: "#1a1a1b", color: "#FFFFFF" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* 홈 버튼 */}
        <Button 
          color="inherit" 
          onClick={() => router.push("/")} 
          sx={{ fontWeight: "bold" }}
        >
          Sesac Community
        </Button>

        {/* 검색창 - 홈 화면에서만 표시 */}
        {router.pathname === "/" && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              bgcolor: "#333",
              borderRadius: 2,
              px: 2,
              py: 0.5,
              width: "60%", // 검색창 너비 설정
            }}
          >
            <SearchIcon sx={{ color: "#D7DADC", mr: 1 }} />
            <InputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
              sx={{ color: "#FFFFFF", width: "100%" }}
            />
          </Box>
        )}

        {/* 로그인 버튼 */}
        <AuthButton></AuthButton>
      </Toolbar>
    </AppBar>
  );
}
