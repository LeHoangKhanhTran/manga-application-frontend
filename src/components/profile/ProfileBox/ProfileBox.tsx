import { Container, Profile, Options } from "./ProfileBox.style";
import { ReactComponent as PersonIcon } from "../../../assets/person.svg"
import { ReactComponent as BookmarkIcon } from "../../../assets/bookmark.svg"
import { ReactComponent as SignOutIcon } from "../../../assets/signout.svg"
import axios, { AxiosResponse } from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useUserContext } from "../../../App";
import catImg from "../../../assets/dex-cat.png";
import config from "../../../config";
interface ProfileBoxProps {
    onClick: () => void
}
export default function ProfileBox({ onClick } : ProfileBoxProps) {
    const { user } = useUserContext();
    const navigate = useNavigate();
    async function logOut() {
        try {
            const response: AxiosResponse = await axios.post(`${config.apiUrl}/api/user/logout`, "", {withCredentials: true});
            console.log(response)
        }
        catch(error) {
            console.log(error)
        }
    }
    async function handleLogOut() {
        await logOut();
        navigate("/login")
    }
    if (user) {
        return (
            <Container>
                <div className="shade" onClick={onClick}></div>
                <Profile to="/user/me" onClick={onClick}>
                    <img src={catImg} alt="avatar"/>
                    <span>{user.username}</span>
                    <div>User</div>
                </Profile>
                <hr/>
                <Options>
                    <Link className="option" to="/user/me" onClick={onClick}>
                        <PersonIcon/>
                        <span>My Profile</span>
                    </Link>
                    <Link to='../user/follows' className="option" onClick={onClick}>
                        <BookmarkIcon/>
                        <span>My Follows</span>
                    </Link>
                </Options>
                <hr />
                <Options>
                    <div className="option" onClick={handleLogOut}>
                        <SignOutIcon/>
                        <span>Sign Out</span>
                    </div>
                </Options>
            </Container>
        )
    }
    return (
        <Container>
            <div className="shade" onClick={onClick}></div>
            <Profile to="/login">
                <PersonIcon width="50" height="50"/>
                <span>Guest</span>
            </Profile>
            <hr/>
            <Link to="/login">
                <button className="sign-in">Sign In</button>
            </Link>
            <Link to="/register">
                <button className="register">Register</button>
            </Link>
        </Container>
    )
}