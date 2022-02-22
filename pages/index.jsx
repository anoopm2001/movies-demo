import { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/dist/client/router'
export default function Home({ data }) {
  const router = useRouter()

  return (
    <div>
      <Head>
        <title>Movies Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="m-5 text-center text-3xl font-semibold lg:text-5xl">
        Now Showing
      </h1>
      <main className="mx-auto my-10 grid max-w-7xl grid-cols-2 items-center gap-5 lg:grid-cols-3">
        {data.films.map((item) => (
          <div
            className=" flex transform flex-col items-center rounded-lg p-2 shadow-md transition duration-200 ease-in-out hover:scale-105"
            onClick={() => router.push(`/movies/${item.film_id}`)}
          >
            <img
              className="h-60 cursor-pointer rounded-lg"
              src={item.images.poster[1]?.medium?.film_image}
              alt=""
            />
            <h1 className="text-md py-4 text-center lg:text-lg">
              {item.film_name}
            </h1>

            {/* films[0].images.poster[1].medium.film_image */}
          </div>
        ))}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const data = await fetch('https://api-gate2.movieglu.com/filmsNowShowing/', {
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
  }).then((data) => data.json())

  return {
    props: {
      data,
    },
  }
}

//
