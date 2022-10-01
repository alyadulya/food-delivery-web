import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { loginUser } from "../../app/api/auth";
import { userLogin } from "../../app/features/Auth/action";
import { useDocumentTitle } from "../../app/utils";

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

const Login = () => {
    useDocumentTitle('Login');
    
    const {register, handleSubmit, formState: {errors}, setError} = useForm();
    const [status, setStatus] = useState(statusList.idle);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async FormData => {
        setStatus(statusList.process);
        const { data } = await loginUser(FormData);
        console.log(data);
        console.log(FormData);
        console.log(status);
        if (data.error) {
            setError('password', {type: 'InvalidCredential', message: data.message});
            setStatus(statusList.error);
        } else {
            const { user, token } = data;
            dispatch(userLogin({ user, token }));
            navigate('/');
        }

        setStatus(statusList.success)
    }

    return (
        <main className="form-signin w-50 m-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="h3 mb-3 fw-normal">Log in</h1>

                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="name@example.com"
                        {...register('email')}
                    />
                    <label htmlFor="email">Email address</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        {...register('password')}
                    />
                    <label htmlFor="password">Password</label>
                </div>

                <div className="checkbox my-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Remember me
                    </label>
                </div>
                <input
                    type="submit"
                    className="w-100 btn btn-lg btn-primary"
                    value={status === statusList.process ? "Processing..." : "Login"}
                    onClick={() => setStatus(statusList.process)}
                />
            </form>

            <div className="text-center mt-3">
                Don't have an account? <Link to="/register">Register here.</Link>
            </div>
        </main>
    )
}

export default Login;