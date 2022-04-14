import Navbar from "../../components/Navbar"
import axios from 'axios'

import Image  from "next/image"


export default function MoviePage({genres, result}) {
    console.log(result)
    const BASE_URL = 'https://image.tmdb.org/t/p/original'
    
    return (
        <div>

            <Navbar genres={genres} />

            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={`${BASE_URL}${result.backdrop_path || result.poster_path }`} className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-4xl font-bold">{result.title}</h1>
                        <p className="py-6">{result.overview}</p>
                    </div>
                </div>
            </div>

        </div>
    )

}

export async function getServerSideProps(context) {

    const { id } = context.query

    const requestGenres = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=en-US`)
    const { genres } = requestGenres.data
    
    
    const requestPopularMovies = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`)
    const { results } = await requestPopularMovies.data

    const result = results.find(result => result.id == id)
    
    return {
        props: {
          genres: genres,
          result: result
        }
    }
  
}