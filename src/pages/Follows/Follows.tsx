import { Container, FollowItems } from "./Follow.style";
import { ReactComponent as BackArrow } from '../../assets/back-arrow.svg'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "../../App";
import axios, { Axios, AxiosResponse } from "axios";
import ProfileItem from "../../components/ProfileItem/ProfileItem";
interface FollowsProps {
    isNavBarHidden: boolean
}
export default function Follows({ isNavBarHidden }: FollowsProps) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>()
    useEffect(() => {
        const getUser = async() => {
            try {
                const response: AxiosResponse = await axios.get('https://localhost:7245/api/user/me', { withCredentials: true})
                setUser(prev => response.data)
            }
            catch(error) {
                console.log(error)
            }
        }
        getUser()
    }, [])
    return (
        <Container isNavBarHidden={isNavBarHidden}>
                <div id="top-bar">
                    <BackArrow width='26' height='26' id="back-arrow"  onClick={() => navigate(-1)}/>
                    <div>Follows</div>
                </div>
                <FollowItems>
                    {user && user.mangaFollows?.map(id=> {
                        return (
                            <ProfileItem mangaId={id}/>
                        )
                    })}
                </FollowItems>
        </Container>
    )
}