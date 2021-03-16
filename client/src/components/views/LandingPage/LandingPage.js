import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import {API_URL, API_KEY, IMG_URL} from '../../Config'
import MainImage from './Sections/MainImage'
import GridCard from '../commons/GridCard'
import { Row } from 'antd'
function LandingPage() {
    
    const [Movies, setMovies] = useState([]);
    const [MainMovie, setMainMovie] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)
    }, [])
    
    const fetchMovies=(endpoint)=>{
        fetch(endpoint)
        .then(response => response.json())
        .then(response =>{
            console.log(response)
            setMovies([...Movies, ...response.results])
            setMainMovie(response.results[0])
            setCurrentPage(response.page)
        })
    }
    const loadMores = ()=>{
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`
        fetchMovies(endpoint)
    }
    return (
        <div style={{ width: '100%', margin: '0'}}>
            {/* 대문이미지 장착 */}
            {MainMovie &&
              <MainImage image={`${IMG_URL}w1280${MainMovie.backdrop_path}`}
                        title={MainMovie.original_title}
                        text={MainMovie.overview}
              />
            }
            <div style={{ width: '80%', margin: '1rem auto'}}>
                <h2>Latest</h2>
                <hr />
                {/* 영화 카드 그리드 */}
                <Row gutter={[16, 16]}>

                {Movies && Movies.map((movie, index)=>(
                    <React.Fragment key={index}>
                        <GridCard 
                            landingPage
                           image={movie.poster_path
                            ? `${IMG_URL}w500${movie.poster_path}` : null}
                            movieId={movie.id}
                            movieName={movie.original_title}
                        />
                    </React.Fragment>
                ))}


                </Row>
            </div>

        <div style={{ display:'flex', justifyContent: 'center'}}>
            <button onClick={loadMores}>More Movies</button>
        </div>
        
        </div>
    )
}

export default LandingPage
