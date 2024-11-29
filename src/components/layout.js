import React, { useEffect, useRef, useState } from 'react';
import Header from './header';
import { Box, Container, Typography } from '@mui/material';
import Footer from './footer';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from "@/context/authcontext";

export default function Layout({ children, searchQuery, setSearchQuery }) {
  const router = useRouter();
  const { isLoggedIn, authId } = useAuth();
  const redirectDone = useRef(false);  // Track if redirect has already happened
  const [isBan, setIsBan] = useState(false);  // Changed to useState, you were using it incorrectly

  useEffect(() => {
    const checkBanStatus = async () => {
      if (isLoggedIn && authId && !redirectDone.current) {
        try {
          const url = `http://localhost:8000/auth/user/report/ban/${authId}`;
          
          const banResponse = await axios.get(url, {
            withCredentials: true,
          });

          if (banResponse.data?.message === true) {
            setIsBan(true); // Set the ban status to true
            return;
          }
        } catch (error) {
          console.error('인증 또는 Ban 상태 확인 중 오류:', error);
          router.replace('/404')
        }
      }
    };

    checkBanStatus();
  }, [isLoggedIn, authId]);

  // Conditional rendering based on isBan status
  if (isBan) {
    return <Box>
      <Typography>You are banned.</Typography>
      </Box>; // Or redirect to a banned page, like /404
  }

  return (
    <>
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        {children}
      </Container>
      <Footer /> 
    </>
  );
}
