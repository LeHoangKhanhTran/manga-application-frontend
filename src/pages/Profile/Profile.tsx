import { Container, ProfileInfo } from "./Profile.style"
import catImg from "../../assets/dex-cat.png"
import { useEffect, useState } from "react"
import axios, { AxiosResponse } from "axios"
import { useParams } from "react-router-dom"
import { ReactComponent as BookmarkIcon } from "../../assets/bookmark.svg"
import { splitParagraph } from "../../util";
import ProfileItem from "../../components/ProfileItem/ProfileItem"
import config from "../../config";
import { User, Author } from "../../types"
interface ProfileProps {
    profileType: "user" | "author",
}

const getDefaultValue = (type: "user" | "author") => {
    if (type === "user") 
        return {
            id: "",
            username: "",
            email: "",
            role: "User",
            mangaFollows: [],
            userRatings: [],
        }
    return {
        id: "",
        name: "",
        works: [],
        biography: "", 
        avatarUrl: ""
    }
}

export default function Profile({ profileType }: ProfileProps) {
    const [profile, setProfile] = useState<User | Author>(getDefaultValue(profileType));
    const { authorId } = useParams();
    // const { user } = useUserContext();
    useEffect(() => {
        async function getAuthor() {
            try {
                const response: AxiosResponse = await axios.get<Author>(`${config.apiUrl}/api/author/${authorId}`);
                if (response.data) {
                    setProfile(_prev => response.data)
                }
            }
            catch(error) {
                console.log(error)
            }
        }
        async function getUser() {
            try {
                const response: AxiosResponse = await axios.get<User>(`${config.apiUrl}/api/user/me`, { withCredentials: true});
                if (response.data) {
                    setProfile(_prev => response.data)
                }
            }
            catch(error) {
                console.log(error)
            }
        }
        if (profileType === "user") {
            getUser();  
  
        }
        else {
            getAuthor()
        }
    }, [authorId, profileType])

    if (profileType === "user") {
        return ( 
            <Container>
                <div className="banner"></div>
                <ProfileInfo>
                    <div className="background"></div>
                    <img className="avatar" src={catImg} alt="" />
                    <div id="name">{(profile as User).username}</div>
                    <div className="buttons">
                        <button id="follow-btn" className="disabled">
                            <BookmarkIcon/>
                            Follow</button>
                    </div>
                    <dl className="info">
                        <dt>
                            <span className="label">User ID</span>
                            <div>{(profile as User).id}</div>
                        </dt>
                        <dt>
                            <span className="label">Role</span>
                            <div className="role">
                                <div className="light"></div>
                                <div>{(profile as User).role}</div>
                            </div>
                        </dt>
                        <div className="label">Follows ({(profile as User).mangaFollows?.length})</div>
                        <div className="manga-list">
                            {(profile as User).mangaFollows?.map(id => {
                                return (
                                    <ProfileItem key={id} mangaId={id}/>
                                )
                            })}
                        </div>
                    </dl>
                </ProfileInfo>
            </Container>
        )
    }
    return ( 
        <Container>
            <div className="banner"></div>
            <ProfileInfo>
                <div className="background"></div>
                <img className="avatar" src={catImg} alt="avatar"/>
                <div id="name">{(profile as Author).name}</div>
                <div className="buttons">
                        <button id="follow-btn" className="disabled">
                            <BookmarkIcon/>
                            Follow</button>
                    </div>
                <dl className="info">
                    <dt>
                        <span className="label">Biography</span>
                        <div className="biography">{(profile as Author).biography.length > 0 ? 
                            splitParagraph((profile as Author).biography).map((paragraph) => {
                                return (
                                    <p>{paragraph}</p>
                                )
                            })
                         : "No biography."}</div>
                    </dt>
                    <dt>
                        <div style={{marginBottom: "10px"}} className="label">Works ({(profile as Author).works.length})</div>
                        <div className="manga-list">
                            {(profile as Author).works.map(id => {
                                return (
                                    <ProfileItem key={id} mangaId={id}/>
                                )
                            })}
                        </div>
                    </dt>
                </dl>
                
            </ProfileInfo>
        </Container>
    )
}