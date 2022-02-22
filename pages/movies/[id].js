import { useRouter } from 'next/router'
import React from 'react'
import { PlayIcon } from '@heroicons/react/solid'
import { ArrowCircleLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'
function MovieComponent({ moviedetails }) {
  const router = useRouter()
  const id = router.query

  return (
    <div className="ml-5 mt-5 bg-white lg:ml-10 lg:mt-5">
      <Link href="/">
        <ArrowCircleLeftIcon className="mb-10 h-10 transform cursor-pointer transition duration-200 ease-in-out hover:scale-105" />
      </Link>

      <div className="flex items-center">
        <img
          className="rounded-lg"
          src={moviedetails.images.poster[1].medium.film_image}
          alt=""
        />
        <div className="flex flex-col p-4">
          <h1 className="font-semibold text-gray-700 lg:text-5xl">
            {moviedetails.film_name}
          </h1>
          <h1 className="p-2">{moviedetails.release_dates[0].release_date}</h1>
          {moviedetails?.trailers?.high[0].film_trailer ? (
            <Link href={moviedetails?.trailers?.high[0].film_trailer}>
              <div className="group flex cursor-pointer items-center rounded-full border px-2 lg:border-0">
                <PlayIcon className="  h-12  transform transition duration-200 ease-in-out group-hover:scale-105 lg:h-20" />
                <h1 className="text-center text-sm lg:text-lg">Play Trailer</h1>
              </div>
            </Link>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <h1 className="mt-5 p-3  text-3xl">Snapshots:</h1>
      <div className="flex gap-4 overflow-scroll py-5 px-3 scrollbar-hide">
        <img
          className="transform cursor-pointer rounded-lg transition duration-200 ease-in-out hover:scale-105"
          src={moviedetails.trailers?.high[0]?.trailer_image}
          alt=""
        />
        {moviedetails.images?.still[3].medium.film_image ? (
          <img
            className="transform cursor-pointer rounded-lg transition duration-200 ease-in-out hover:scale-105"
            src={moviedetails.images?.still[3].medium?.film_image}
            alt=""
          />
        ) : (
          <img src="" />
        )}
        {moviedetails.images?.still[4].medium?.film_image ? (
          <img
            className="transform cursor-pointer rounded-lg transition duration-200 ease-in-out hover:scale-105"
            src={moviedetails.images?.still[4].medium?.film_image}
            alt=""
          />
        ) : (
          <img src="" />
        )}

        <img
          src={moviedetails.images?.still[1].medium?.film_image}
          alt=""
          className="transform cursor-pointer rounded-lg transition duration-200 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex gap-5">
        <p className="rounded-full border  px-5">
          {moviedetails.age_rating[0].rating}
        </p>
        <p className="rounded-full border  px-5">
          {moviedetails.genres[0].genre_name}
        </p>
        <p className="rounded-full border  px-5">
          {moviedetails.duration_mins} mins
        </p>
      </div>
      <h3 className="mt-4 p-3 text-3xl">Synopsis:</h3>
      <p className="p-2 text-gray-600">{moviedetails.synopsis_long}</p>
      <h2 className="p-3 text-3xl">Cast:</h2>
      {moviedetails.cast.map((item) => (
        <div>
          <h1 className="p-2">{item.cast_name}</h1>
        </div>
      ))}
    </div>
  )
}

export default MovieComponent

export async function getServerSideProps(context) {
  const moviedetails = await fetch(
    `https://api-gate2.movieglu.com/filmDetails/?film_id=${context.params.id}`,
    {
      method: 'GET', // or 'PUT'
      headers: {
        client: 'SEEL',
        'x-api-key': '0fIQnjl6Tl42B68bWF6Mj9jNwfAerKwq5qLg6G2L',
        authorization: '	Basic U0VFTF9YWDpOMkl4Z1JzYTNhUzM=',
        territory: 'XX',
        'api-version': 'v200',
        geolocation: '',
        'device-datetime': new Date().toISOString(),
      },
    }
  ).then((data) => data.json())

  return {
    props: {
      moviedetails,
    },
  }
}

//
