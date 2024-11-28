import React from 'react';
import Header from './header';
import { Container } from '@mui/material';
import Footer from './footer';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        {children}
      </Container>
      <Footer />
    </>
  );
}
