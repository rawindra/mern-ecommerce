
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import useAuthStore from "../store/useAuthStore";
import { httpClient } from "../utils/axios";

type LoginFormData = {
    email: string;
    password: string;
}

type RedirectLocationState = {
    from: Location;
};


const Login = () => {
    const navigate = useNavigate();
    const { setToken } = useAuthStore();
    const { state: locationState } = useLocation();

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
                if (locationState) {
                    const { from } = locationState as RedirectLocationState;
                    navigate(`${from.pathname}${from.search}`);
                } else {
                    navigate("/");
                }
            })
            .catch((err) => console.log(err))
    };

    return (
        <div className="container vh-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-5">
                    <div className="card card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    {...register("email")}
                                />
                                <p className="text-danger">{errors.email?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    {...register("password")}
                                />
                                <p className="text-danger">{errors.password?.message}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <button type="submit" className="btn btn-primary mt-2">Login</button>
                                <Link style={{ textDecoration: "none" }} to={"/register"}>Regsiter</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login