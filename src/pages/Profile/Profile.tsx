import { Container, ProfileInfo } from "./Profile.style"
import catImg from "../../assets/dex-cat.png"
import { useParams } from "react-router-dom"
import { ReactComponent as BookmarkIcon } from "../../assets/bookmark.svg"
import { splitParagraph } from "../../util";
import ProfileItem from "../../components/profile/ProfileItem/ProfileItem"
import { User, Author } from "../../types"
import useFetch from "../../hooks/useFetch"
interface ProfileProps {
    profileType: "user" | "author",
}

// const getDefaultValue = (type: "user" | "author") => {
//     if (type === "user") 
//         return {
//             id: "",
//             username: "",
//             email: "",
//             role: "User",
//             mangaFollows: [],
//             userRatings: [],
//         }
//     return {
//         id: "",
//         name: "",
//         works: [],
//         biography: "", 
//         avatarUrl: ""
//     }
// }

const path = {
    user: '/api/user/me',
    author: '/api/author'
}

export default function Profile({ profileType }: ProfileProps) {
    const { authorId } = useParams();
    // const [profile, setProfile] = useState<User | Author>(getDefaultValue(profileType));
    const {data: profile, loading, error} = useFetch<User | Author>(`${path[profileType]}${profileType === 'author' ? '/' + authorId : ''}`, undefined, profileType === 'user');
    if (error) {
        console.log(error);
    }

    if (!loading && profile) {
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
        else {
            return ( 
                <Container>
                    <div className="banner"></div>
                    <ProfileInfo>
                        <div className="background"></div>
                        <img className="avatar" src={catImg} alt="avatar"/>
                        <div id="name">{(profile as Author)?.name}</div>
                        <div className="buttons">
                                <button id="follow-btn" className="disabled">
                                    <BookmarkIcon/>
                                    Follow
                                </button>
                            </div>
                        <dl className="info">
                            <dt>
                                <span className="label">Biography</span>
                                <div className="biography">{(profile as Author).biography?.length > 0 ? 
                                    splitParagraph((profile as Author).biography).map((paragraph) => {
                                        return (
                                            <p>{paragraph}</p>
                                        )
                                    })
                                 : "No biography."}</div>
                            </dt>
                            <dt>
                                <div style={{marginBottom: "10px"}} className="label">Works ({(profile as Author).works?.length})</div>
                                <div className="manga-list">
                                    {(profile as Author).works?.map(id => {
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
    }
}