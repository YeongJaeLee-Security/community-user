import React, { useState } from 'react';
import Header from './header';
import { Container } from '@mui/material';
import Footer from './footer';

export default function Layout({ children, searchQuery, setSearchQuery }) {
  

  console.log("app에서받은거:", searchQuery)

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
