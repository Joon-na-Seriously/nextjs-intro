import { useRouter } from "next/router";
import React from "react";
import Seo from "../../components/Seo";

const Movie = ({ params }: { params: undefined }) => {
  const router = useRouter();
  const [title, id] = (router.query.params as [string, number]) || [];
  return (
    <div>
      <Seo title={title} />
      <h4>{title}</h4>
    </div>
  );
};

export default Movie;

export function getServerSideProps(ctx: { params: undefined }) {
  return {
    props: {
      params: ctx.params,
    },
  };
}
