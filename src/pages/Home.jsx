import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import UpdateModal from "../components/UpdateModal";
import { useLoginContext } from "../context/AuthContext";
import { useFetch } from "../helpers/firebase";

const Home = () => {
  const { currentUser } = useLoginContext();
  const { authCode } = useFetch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setData(authCode);
  }, [authCode]);

  return (
    <>
      {!currentUser && (
        <Box
          sx={{
            textAlign: "center",
            mt: 2,
            fontWeight: "bold",
            color: "red",
            fontSize: "1.1rem",
          }}
        >
          There are no registered users. Please registered.
        </Box>
      )}
      <Box
        width="80vw"
        sx={{ width: "100vh", m: "auto", textAlign: "center", p: 3 }}
      >
        {currentUser && (
          <>
            {data?.map((item) => {
              const { id, username, email, userLogin } = item;
              return (
                <Box key={id}>
                  <Typography>UserName: {username}</Typography>
                  <br />
                  <Typography>Email: {email}</Typography>
                  <br />
                  <Typography>UserLogin: {userLogin}</Typography>
                  <br />
                </Box>
              );
            })}

            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              color="success"
            >
              Edit
            </Button>
            <UpdateModal open={open} setOpen={setOpen} />
          </>
        )}
      </Box>
    </>
  );
};

export default Home;
