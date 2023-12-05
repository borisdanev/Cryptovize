import { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import useClearForm from "../hooks/useClearForm";
import {
  createUser,
  setCurrentUser,
  getUsers,
  setActiveUser,
  getUser,
} from "../store";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import { FaInfo } from "react-icons/fa";
import AuthInfo from "./AuthInfo";
const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25rem",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};
const RegisterForm = ({ openModal, setOpenModal, setOpenLoginForm }) => {
  const dispatch = useDispatch();
  const clearForm = useClearForm();
  const [infoOpen, setInfoOPen] = useState(true);
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Invalid email")
      .required("Email is required")
      .test("email-exists", "Email already exists", async function (value) {
        const users = await getUsers();
        return !users.some((user) => user.email === value);
      }),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      await validationSchema.validate(values, { abortEarly: false });
      await createUser(values);
      const currentUser = await getUser(values.email);
      dispatch(setCurrentUser(currentUser));
      setOpenModal(false);
      dispatch(setActiveUser());
      clearForm(values);
    },
  });

  return (
    <div className="register-container">
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
          {infoOpen && <AuthInfo setInfoOpen={setInfoOPen} />}
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <IconButton onClick={() => setInfoOPen(true)}>
              <FaInfo style={{ fontSize: "1.2rem" }} />
            </IconButton>
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 3 }}
          >
            Register
          </Typography>
          <form className="register-form" onSubmit={formik.handleSubmit}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <FormControl
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                sx={{ width: "100%" }}
              >
                <InputLabel htmlFor="firstName-input">First Name</InputLabel>
                <Input
                  id="firstName-input"
                  name="firstName"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ mr: 3 }}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <FormHelperText>{formik.errors.firstName}</FormHelperText>
                )}
              </FormControl>
              <FormControl
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
              >
                <InputLabel htmlFor="lastName-input">Last Name</InputLabel>
                <Input
                  id="lastName-input"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  sx={{ width: "100%" }}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <FormHelperText>{formik.errors.lastName}</FormHelperText>
                )}
              </FormControl>
            </Box>
            <FormControl
              sx={{ width: "100%", my: 3 }}
              error={formik.touched.email && Boolean(formik.errors.email)}
            >
              <InputLabel htmlFor="email-input">Email</InputLabel>
              <Input
                id="email-input"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText>{formik.errors.email}</FormHelperText>
              )}
            </FormControl>
            <FormControl
              error={formik.touched.password && Boolean(formik.errors.password)}
              sx={{ width: "100%" }}
            >
              <InputLabel htmlFor="password-input">Password</InputLabel>
              <Input
                id="password-input"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ width: "100%" }}
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                style={{ marginTop: "1rem" }}
              >
                Register
              </Button>
              <Typography sx={{ width: "8rem" }}>
                Already have an account?
                <Link
                  sx={{ color: "white" }}
                  onClick={() => {
                    setOpenModal(false);
                    setOpenLoginForm(true);
                  }}
                >
                  Log in
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
export default RegisterForm;
