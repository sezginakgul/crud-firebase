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
      <Typography variant="h4" mt={1} align="center">
        -- Firebase Authentication --
      </Typography>
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
      <Box sx={{ m: "auto", textAlign: "center", p: 3 }}>
        {currentUser && (
          <>
            {data?.map((item) => {
              const { id, username, email, userLogin } = item;
              return (
                <Box
                  key={id}
                  sx={{
                    margin: " 0 auto 1rem",
                    width: "400px",
                    border: "2px solid grey",
                    borderRadius: "10px",
                    backgroundColor: "grey",
                    color: "white",
                  }}
                >
                  <Typography>UserName: {username}</Typography>

                  <Typography>Email: {email}</Typography>

                  <Typography>UserLogin: {userLogin}</Typography>
                </Box>
              );
            })}

            <Button
              variant="contained"
              onClick={() => setOpen(true)}
              color="success"
              sx={{ width: "400px" }}
            >
              Update User
            </Button>
            <UpdateModal open={open} setOpen={setOpen} />
          </>
        )}
      </Box>
    </>
  );
};

export default Home;
