import { useEffect, useState } from "react";
import AdCard, { AdCardProps } from "./AdCard";
import { useGetAllAdsQuery } from "@/generated/graphql-types";
//import { useQuery } from "@apollo/client";
//import { GET_ALL_ADS_QUERY } from "@/graphql-queries/ads";

function RecentAds() {
  const [totalPrice, setTotalPrice] = useState<number>();

  //Pour rappel : méthode avant Codegen
  //const { loading, error, data } = useQuery(GET_ALL_ADS_QUERY);

  //En utilisant le hook généré par Codegen
  const { loading, error, data } = useGetAllAdsQuery();

  useEffect(() => {
    console.log("initialisation du totalPrice à 0");
    setTotalPrice(0);
  }, []);

  function addPrice(price: number): void {
    setTotalPrice(totalPrice! + price);
  }

  if (loading) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>erreur : {error.message}</p>;
  }

  console.log(
    "démonstration du retour de apollo client suite à la requête GraphQL ",
    data
  );

  let ads: AdCardProps[] = data!.getAllAds;

  return (
    <>
      <span>Le prix total est : {totalPrice}</span>
      <section className="recent-ads">
        {ads.map((adProps, index: number) => (
          <div key={index}>
            <AdCard {...adProps} />
            {/* <AdCard
              title={adProps.title}
              description={adProps.description}
              price={adProps.price}
              picture={adProps.picture}
            /> */}
            <button onClick={() => addPrice(adProps.price ?? 0)}>
              Add this price to total
            </button>
          </div>
        ))}
      </section>
    </>
  );
}

export default RecentAds;
