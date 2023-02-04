import React, { useEffect, useState } from "react";
import withAuth from "../services/withAuth";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { logout } from "../services/firebase";
function Dashboard(props: any) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const meQuery = gql`
    query {
      me {
        email
        uid
        email_verified
        phone_number
      }
    }
  `;
  const { error, data, loading } = useQuery(meQuery);
  if (loading) {
    return <div>Loading Dashboard..</div>;
  }

  if (error) {
    router.push("/login");
    console.error(error);
    return null;
  }

  if (data) {
    console.log(data);
  }

  const signOut = async () => {
    await logout();
    await fetch("http://localhost:3001/auth/logout", {
      method: "post",
      credentials: "include",
    });
    router.push("/login");
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome {data?.me?.name ? data?.me?.name : "User"}
        </Typography>
        <Box sx={{ mt: 1, width: "100%" }}>
          <Typography component="h6" variant="h5">
            Email: {data?.me?.email}
          </Typography>
          <Typography component="h6" variant="h5">
            uid: {data?.me?.uid}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ position: "fixed", right: "20px", top: "20px" }}
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </Box>
    </Container>
  );
}

export default Dashboard;
