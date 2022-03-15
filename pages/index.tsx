import NavBar from "../components/NavBar";
import Head from "next/head";
import Seo from "../components/Seo";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: React.FC<{
  result: Array<{ id: number; poster_path: string; original_title: string }>;
}> = ({ result }) => {
  // const [movies, setMovies] = useState<
  //   { id: number; poster_path: string; original_title: string }[]
  // >([]);
  // useEffect(() => {
  //   async () => {
  //     setMovies(result);
  //   };
  // }, []);
  const router = useRouter();
  const onClick = (id: number, title: string) => {
    router.push(`/movies/${title}/${id}`);
    // router.push(
    //   {
    //     pathname: `/movies/${id}`,
    //     query: {
    //       id,
    //       title: "potatos",
    //     },
    //   },
    //   `/movie/${id}`
    // );
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {/* {!result && <h4>Loading...</h4>} */}
      {result?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <Link href={`/movies/${movie.original_title}/${movie.id}`}>
            <a>
              <h4>{movie.original_title}</h4>
            </a>
          </Link>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export async function getServerSideProps() {
  // 여기에 뭘 쓰던 server에서 돌아갈 것. api key를 숨기기 위해서 rewrite를 쓰지 않고 server에서만 실행해줘도 될 것. (server에서만 일어나므로 client에서는 확인 불가능.)
  const { result } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      result,
    },
  };
}

export default Home;
