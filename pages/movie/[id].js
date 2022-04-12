import Navbar from "../../components/Navbar"
import axios from 'axios'

import Image  from "next/image"


export default function MoviePage({genres, result}) {
    console.log(result)
    const BASE_URL = 'https://image.tmdb.org/t/p/original'
    
    return (
        <div>
            <Navbar genres={genres} />

            {/* <div className="artboard phone-1">320×568</div> */}


            <div className="m-auto w-1/3">
                <h5 className="mt-20 mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{result.title}</h5>
                <div className="container">
                    <Image 
                            layout="responsive"
                            className="rounded-xl shadow-2xl"
                            height={1080}
                            width={1920}
                            src={
                                `${BASE_URL}${result.backdrop_path || result.poster_path }`
                            }
                            alt="Thumb"
                        />
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