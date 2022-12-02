import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { UpdatedAuth, useFetch } from "../helpers/firebase";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 1,
};

const UpdateModal = ({ open, setOpen }) => {
  const { authCode } = useFetch();
  const [newAuth, setNewAuth] = useState();

  const handleChange = (e) => {
    const { value, name } = e.target;
    const changes = { ...newAuth, [name]: value };
    setNewAuth(changes);
  };

  const handleSave = () => {
    UpdatedAuth({ ...authCode[0], ...newAuth });
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {authCode?.map((item) => {
              const { id, username, email } = item;
              return (
                <Box key={id}>
                  <TextField
                    fullWidth
                    name="username"
                    label="UserName"
                    defaultValue={username}
                    onChange={handleChange}
                  />
                  <TextField
                    fullWidth
                    name="email"
                    label="Email"
                    margin="dense"
                    defaultValue={email}
                    onChange={handleChange}
                  />
                </Box>
              );
            })}
            <Button
              fullWidth
              variant="contained"
              color="success"
              onClick={handleSave}
              sx={{ display: "block", margin: "auto" }}
            >
              Save
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};
export default UpdateModal;
