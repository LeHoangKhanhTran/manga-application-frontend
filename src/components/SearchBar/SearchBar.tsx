import { Container, ResultSection } from "./SearchBar.style";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ChangeEvent, useState } from "react";
import MangaItem from "../MangaItem/MangaItem";
import AuthorItem from "../AuthorItem/AuthorItem";
import axios, { AxiosResponse } from "axios";
// import { ReactComponent as CloseIcon } from "../../assets/";
interface SearchBarProps {
    // isFocused: boolean,
    // onFocus: (focus: boolean) => void,
    isNavBarHidden: boolean
}



interface MangaResult {
    id: string,
    title: string,
    status: string, 
    imageUrl: string,
    rating: number,
    follows: number
}

interface AuthorResult {
    id: string,
    name: string,
    works: string[]
}


export default function SearchBar({ isNavBarHidden} : SearchBarProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [mangaResults, setMangaResults] = useState<MangaResult[]>([]);
    const [authorResults, setAuthorResults] = useState<AuthorResult[]>([]);
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(prev => e.target.value)
        getSearchResult(e.target.value);
    }
    async function getSearchResult(term: string) {
        if (term.length > 0) {
            const manga: AxiosResponse<MangaResult[]> = await axios.get<MangaResult[]>("https://localhost:7245/api/manga/search", {params: {title: term}})
            setMangaResults(prev => manga.data);
            const authors: AxiosResponse<AuthorResult[]> = await axios.get<AuthorResult[]>("https://localhost:7245/api/author/search", {params: {name: term}})
            setAuthorResults(prev => authors.data)
        }
    }
    function handleItemClick() {
        setSearchTerm(prev => "")
        setIsFocused(prev => false)
    }
    return (
        <Container isNavBarHidden={isNavBarHidden} isFocused={isFocused}>
            <form action="">
                <input type="search" name="search-bar" id="search-bar" placeholder="Search" value={searchTerm} onClick={() => setIsFocused(true)} autoComplete="off" onChange={handleChange}/>
                {searchTerm.length < 1 && <SearchIcon id="search-icon" width="16" height="16" onClick={() => setIsFocused(true)}/>}
                {isFocused && searchTerm.length === 0 && <div className="search-result">Enter a search query...</div>}
                <button id="close-btn" onClick={(e) => {e.preventDefault(); setIsFocused(false)}}></button>
                {searchTerm.length > 0 &&
                    <div className="search-result">
                    {mangaResults.length > 0 && 
                        <ResultSection>
                            <span className="search-result-type">Manga</span>
                            <div className="search-result-list">
                                {mangaResults.map((result) => {
                                    return (
                                        <MangaItem key={result.id} id={result.id} url={result.imageUrl} name={result.title} status="Ongoing" rating={result.rating} follows={result.follows} onClick={handleItemClick}/>
                                    )
                                })}
                            </div>
                        </ResultSection>
                    }
                    {authorResults.length > 0 && 
                        <ResultSection>
                            <span className="search-result-type">Authors</span>
                            <div className="search-result-list">
                                {authorResults.map((result) => {
                                    return (
                                        <AuthorItem id={result.id} name={result.name} onClick={handleItemClick} titleQuantity={result.works.length}/>
                                    )
                                })}
                            </div>
                        </ResultSection>
                    }
            </div>}
            </form>
            {isFocused && <div className="shade" onClick={handleItemClick}></div>}
        </Container>
    )
}