import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router";
import { logoutUser } from "../../app/api/auth";
import { userLogout } from "../../app/features/Auth/action";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        logoutUser()
            .then(_ => dispatch(userLogout()))
            .then(_ => navigate('/'));
    }, [dispatch, navigate]);

    return (
        <div className="text-center justify-center">
            Logging out ...
        </div>
    )
}

export default Logout;