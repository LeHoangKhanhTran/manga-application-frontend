import { Container, ResultSection } from "./SearchBar.style";
import { LoadingItem } from "../MangaItem/MangaItem.style";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";
import { ChangeEvent, useState } from "react";
import MangaItem from "../MangaItem/MangaItem";
import AuthorItem from "../AuthorItem/AuthorItem";
import axios, { AxiosResponse } from "axios";
import config from "../../config";
import { AuthorResult, MangaResult } from "../../types";

interface SearchBarProps {
    // isFocused: boolean,
    // onFocus: (focus: boolean) => void,
    isNavBarHidden: boolean
}

export default function SearchBar({ isNavBarHidden} : SearchBarProps) {
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [mangaResults, setMangaResults] = useState<MangaResult[]>([]);
    const [authorResults, setAuthorResults] = useState<AuthorResult[]>([]);
    const [mangaLoading, setMangaLoading] = useState<boolean>();
    const [authorLoading, setAuthorLoading] = useState<boolean>();
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(_prev => e.target.value)
        getSearchResult(e.target.value);
    }

    async function getSearchResult(term: string) {
        if (term.length > 0) {
            try {
                setMangaLoading(_prev => true);
                setAuthorLoading(_prev => true);
                const manga: AxiosResponse<MangaResult[]> = await axios.get<MangaResult[]>(`${config.apiUrl}/api/manga/search`, {params: {title: term}})
                setMangaLoading(_prev => false);
                setMangaResults(_prev => manga.data);
                const authors: AxiosResponse<AuthorResult[]> = await axios.get<AuthorResult[]>(`${config.apiUrl}/api/author/search`, {params: {name: term}})
                setAuthorLoading(_prev => false);
                setAuthorResults(_prev => authors.data)
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setMangaLoading(_prev => false);
                setAuthorLoading(_prev => false);
            }
        }
    }

    function handleItemClick() {
        setSearchTerm(_prev => "")
        setIsFocused(_prev => false)
    }

    return (
        <Container isNavBarHidden={isNavBarHidden} isFocused={isFocused}>
            <form action="">
                <input type="search" name="search-bar" id="search-bar" placeholder="Search" value={searchTerm} onClick={() => setIsFocused(true)} autoComplete="off" onChange={handleChange}/>
                {searchTerm.length < 1 && <SearchIcon id="search-icon" width="16" height="16" onClick={() => setIsFocused(true)}/>}
                {isFocused && searchTerm.length === 0 && <div className="search-result">Enter a search query...</div>}
                {searchTerm.length > 0 && mangaResults.length === 0 && authorResults.length === 0 && !mangaLoading && <div className="search-result">No results found.</div>}
                {searchTerm.length > 0 && (mangaResults.length > 0 || authorResults.length > 0) && 
                    <div className="search-result">
                    {mangaLoading && 
                        <ResultSection>
                            <div className="skeleton" style={{width: '30%', height: '30px', borderRadius: '4px'}}></div>
                            <div className="search-result-list">
                                <LoadingItem className="skeleton"/>
                                <LoadingItem className="skeleton"/>
                            </div>
                        </ResultSection>
                    }
                    {mangaResults.length > 0 && !mangaLoading && 
                        <ResultSection>
                            <span className="search-result-type">Manga</span>
                            <div className="search-result-list">
                                {mangaResults.map((result) => {
                                    return (
                                        <MangaItem key={result.id} id={result.id} url={result.imageUrl} name={result.title} status={result.status} rating={result.rating} follows={result.follows} onClick={handleItemClick}/>
                                    )
                                })}
                            </div>
                        </ResultSection>
                    }
                    {authorLoading && 
                        <ResultSection>
                            <div className="skeleton" style={{width: '30%', height: '30px', borderRadius: '4px'}}></div>
                            <div className="search-result-list">
                                <LoadingItem className="skeleton"/>
                                <LoadingItem className="skeleton"/>
                            </div>
                        </ResultSection>
                    }
                    {authorResults.length > 0 && !authorLoading &&
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
            <button id="close-btn" onClick={(e) => {e.preventDefault(); setIsFocused(false)}}></button>
            {isFocused && <div className="shade" onClick={handleItemClick}></div>}
        </Container>
    )
}