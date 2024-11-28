import Head from "next/head";

import Feed from "@/components/feed";
import { Box, Button } from "@mui/material";
import { useAuth } from "@/context/authcontext";
import { useCallback, useEffect, useState } from "react";

export default function Settings() {
  const [ authState, setAuthState ] = useState(null);

  const [isEditEmail, setIsEditEmail] = useState(false);
  const [ emailState, setEmailState ] = useState(null);

  const [isEditUsername, setIsEditUsername] = useState(false);
  const [ usernameState, setUsernameState ] = useState(null);

  const { authId } = useAuth();

  const fetchAuth = useCallback(
    async () => {
      const response = await fetch(
        `http://localhost:8000/auth/profile/${authId}`
      );
      const auth = await response.json();
      setAuthState(auth);
      setEmailState(auth.email);
      setUsernameState(auth.username);
    }, [authId]
  )

  useEffect(() => {
    fetchAuth();
  }, [fetchAuth]);

  function enterEditEmail() {
    setIsEditEmail(true);
  }

  function cancelEditEmail() {
    setContent(authState.email);
    setIsEditEmail(false);
  }

  function enterEditUsername() {
    setIsEditUsername(true);
  }

  function cancelEditUsername() {
    setUsernameState(authState.username);
    setIsEditUsername(false);
  }

  return (
    <>
      <Head>
        <title>Settings Account</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        {authState && <Feed posts={[...authState.posts].reverse()}></Feed>}
        <Button>Delete account</Button>
      </Box>
    </>
  );
}
