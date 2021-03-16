import React, {useEffect, useState} from 'react'
import {API_KEY, API_URL, IMG_URL} from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCard from '../commons/GridCard'
import {Button, Row} from 'antd'
import Favorite from './Sections/Favorite'

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Actor, setActor] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointDetail = `${API_URL}movie/${movieId}?api_key=${API_KEY}`
        
        fetch(endpointDetail)
        .then(response=> response.json())
        .then(response=>{
            console.log(response)
            setMovie(response)
        })
         
        fetch(endpointCrew)
        .then(response=> response.json())
        .then(response=>{
            setActor(response.cast)
        })
        
    }, [])

    const showActorToggle = () => {
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            
            {/* Header */}
            {Movie.backdrop_path &&
                    <MainImage 
                        image={`${IMG_URL}w1280${Movie.backdrop_path}`}
                        title={Movie.original_title}
                        text={Movie.overview}
                    />
            }
            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto'}}>
            <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                <Favorite 
                    movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')}
                />
            </div>  
                    {/* Movie Detail */}
                    <MovieInfo 
                        movie={Movie}
                    />
                    
                    <br />
                    {/* Actors Grid  */}
                    <div style={{ display: 'flex',  justifyContent: 'center', margin: '2rem'}}>
                        <Button onClick={showActorToggle}> Toggle Actor</Button>
                    </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                    {Actor && Actor.map((actor, index)=>(
                        <React.Fragment key={index}>
                            <GridCard 
                            image={actor.profile_path
                                ? `${IMG_URL}w500${actor.profile_path}` : null}
                                characterName={actor.name}
                            />
                        </React.Fragment>
                    ))}
                    </Row>
                }
            </div>
        </div>
    )
}

export default MovieDetail
