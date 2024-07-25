import { Container, FollowItems } from "./Follow.style";
import { ReactComponent as BackArrow } from '../../assets/back-arrow.svg'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { User } from "../../types";
import ProfileItem from "../../components/ProfileItem/ProfileItem";
import Spinner from "../../components/Spinner/Spinner";
import useFetch from "../../hooks/useFetch";
interface FollowsProps {
    isNavBarHidden: boolean
}
export default function Follows({ isNavBarHidden }: FollowsProps) {
    const navigate = useNavigate();
    const { data: user, loading, error} = useFetch<User>('/api/user/me', undefined, true);
    useEffect(() => {
       if (error) {
        console.log(error)
        navigate('../login');
       }
    }, [error])
    return (
        <Container isNavBarHidden={isNavBarHidden}>
                <div id="top-bar">
                    <BackArrow width='26' height='26' id="back-arrow"  onClick={() => navigate(-1)}/>
                    <div>Follows</div>
                </div>
                {!loading && 
                    <FollowItems>
                        {user && user.mangaFollows?.map(id=> {
                            return (
                                <ProfileItem mangaId={id}/>
                            )
                        })}
                    </FollowItems>
                }
                {loading && 
                    <div className="spinner-container" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                        <Spinner size="2.5rem"/>
                    </div>
                }

                {user && user.mangaFollows && user.mangaFollows.length === 0 &&
                    <div id="no-follow-holder">You have not followed any titles</div>
                }
        </Container>
    )
}