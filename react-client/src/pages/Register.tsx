import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { httpClient } from "../utils/axios";

type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const Register = () => {
    const navigate = useNavigate();

    const schema = yup.object().shape({
        firstName: yup.string().required("First Name is required"),
        lastName: yup.string().required("Last Name is required"),
        email: yup.string().required("email is required"),
        password: yup.string().required("Password is required"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (formData: RegisterFormData) => {
        httpClient.post("/users/create", formData)
            .then(() => {
                navigate("/login")
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
                                <label htmlFor="name">First Name</label>
                                <input type="text" className="form-control" id="name" {...register("firstName")} />
                                <p className="text-danger">{errors.firstName?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Last Name</label>
                                <input type="text" className="form-control" id="name" {...register("lastName")} />
                                <p className="text-danger">{errors.lastName?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="text" className="form-control" id="email" {...register("email")} />
                                <p className="text-danger">{errors.email?.message}</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" {...register("password")} />
                                <p className="text-danger">{errors.password?.message}</p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <button type="submit" className="btn btn-primary mt-2">Register</button>
                                <Link style={{ textDecoration: "none" }} to={"/login"}>Login</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register