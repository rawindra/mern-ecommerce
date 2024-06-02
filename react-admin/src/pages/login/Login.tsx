import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, TextField } from "@mui/material"
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useAuthStore from "../../store/useAuthStore";
import { httpClient } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

type LoginFormData = {
    email: string;
    password: string;
}

const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useAuthStore();
    const schema = yup.object().shape({
        email: yup.string().required("email is required"),
        password: yup.string().required("Password is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formData: LoginFormData) => {
        httpClient.post("/auth/login", formData)
            .then((res) => {
                setToken(res.data.accessToken)
                navigate("/")
            })
            .catch((err) => console.log(err))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mt: 1 }}>
                <TextField
                    error={errors.email && true}
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    helperText={errors.email?.message}
                    autoComplete="email"
                    autoFocus
                    {...register("email")}
                />
                <TextField
                    error={errors.password && true}
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    helperText={errors.password?.message}
                    type="password"
                    id="password"
                    {...register("password")}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            </Box>
        </form>
    )
}

export default Login