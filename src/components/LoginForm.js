import { Formik, useFormik, Form } from "formik";
import { useDispatch } from "react-redux";
import useClearForm from "../hooks/useClearForm";
import {
  getUser,
  getUsers,
  setCurrentUser,
  setActiveUser,
  clearError,
} from "../store";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { useEffect } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};
const LoginForm = ({ openModal, setOpenModal }) => {
  const dispatch = useDispatch();
  const clearForm = useClearForm();
  const validationSchema = Yup.object().shape({
    email: Yup.string().test(
      "email-exists",
      "Email doesn't exist",
      async function (value) {
        console.log("checking");
        const users = await getUsers();
        return users.some((user) => user.email === value);
      }
    ),
    password: Yup.string().test(
      "incorrect-pass",
      "Incorrect password",
      async function (value) {
        const users = await getUsers();
        return users.some((user) => user.password === value);
      }
    ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      await validationSchema.validate(values, { abortEarly: false });
      const currentUser = await getUser(formik.values.email);
      dispatch(setCurrentUser(currentUser));
      dispatch(setActiveUser());
      dispatch(clearError());
      setOpenModal(false);
      clearForm(values);
    },
  });
  return (
    <Box>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          formik.resetForm();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 3 }}
          >
            Login
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ display: "flex", alignItems: "center" }}></Box>
            <FormControl
              sx={{ width: "100%", my: 3 }}
              error={formik.submitCount > 0 && Boolean(formik.errors.email)}
            >
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                id="email-input"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.submitCount > 0 && formik.errors.email && (
                <FormHelperText>{formik.errors.email}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              sx={{ width: "100%" }}
              error={formik.submitCount > 0 && Boolean(formik.errors.password)}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password-input"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.submitCount > 0 && formik.errors.password && (
                <FormHelperText>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "1rem" }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};
export default LoginForm;
