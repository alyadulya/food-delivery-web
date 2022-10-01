import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { registerUser } from "../../app/api/auth";
import { Link } from "react-router-dom";
import { useDocumentTitle } from "../../app/utils";

const statusList = {
    idle: 'idle',
    process: 'process',
    success: 'success',
    error: 'error'
}

const Register = () => {
    useDocumentTitle('Register');
    
    const [status, setStatus] = useState(statusList.idle);
    const {register, handleSubmit, formState : {errors}, setError} = useForm();
    const navigate = useNavigate();
    const onSubmit = async FormData => {
        const { password, password_confirmation } = FormData;
        if (password !== password_confirmation) {
            setStatus(statusList.error);
            return setError('password_confirmation', { type: 'equality', message: 'password tidak sama' });
        }

        setStatus(statusList.process);
        delete FormData.password_confirmation;
        const { data } = await registerUser(FormData);
        console.log(FormData);

        if (data.error) {
            let fields = Object.keys(data.fields);
            fields.forEach(field => {
                setError(field, {type: 'server', message: data.fields[field]?.properties?.message});
            });

            setStatus(statusList.error);
            return;
        }

        setStatus(statusList.success);
        navigate('/login');
    }

    return (
        <div className="w-50 m-auto">
            <h1 className="h3 mb-3 fw-normal">Register</h1>
            
            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="name" name="name" placeholder="Full name" {...register('full_name')} />
                    <label htmlFor="name">Full name</label>
                    <p>{errors.full_name?.message}</p>
                </div>
                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="email" name="email" placeholder="Email" {...register('email')} />
                    <label htmlFor="email">Email address</label>
                    <p>{errors.email?.message}</p>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password" name="password" placeholder="Password" {...register('password')} />
                    <label htmlFor="password">Password</label>
                    <p>{errors.password?.message}</p>
                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="password-confirmation" placeholder="Password confirmation" {...register('password_confirmation')} />
                    <label htmlFor="password-confirmation">Password confirmation</label>
                    <p>{errors.password_confirmation?.message}</p>
                </div>
                <input type="submit" className="w-100 btn btn-lg btn-primary" value={status === statusList.process ? "Processing..." : "Register"} onClick={() => setStatus(statusList.process)} />
                
            </form>

            <div className="text-center mt-3">
                Already have an account? <Link to="/login">Log in here.</Link>
            </div>
        </div>
    )
}

export default Register;