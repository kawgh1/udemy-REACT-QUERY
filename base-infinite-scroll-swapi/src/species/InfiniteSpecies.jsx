import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/species/";
// const fetchUrl = async (url) => {
//   const response = await fetch(url);
//   return response.json();
// };

const fetchUrl2 = async (url) => {
    const response = await axios.get(url);
    return response.data;
};

export const InfiniteSpecies = () => {
    // TODO: get data for InfiniteScroll via React Query

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isFetching,
        isError,
        error,
    } = useInfiniteQuery(
        "sw-species",
        ({ pageParam = initialUrl }) => fetchUrl2(pageParam),
        { getNextPageParam: (lastPage) => lastPage.next || undefined }
    );

    if (isLoading) return <div className="loading">Loading...</div>;
    if (isError) return <div className="error">Error!{error.toString()}</div>;

    return (
        <>
            {/* displaying "Loading..." in top right of page while scrolling and fetching */}
            {isFetching && <div className="loading">Loading...</div>}

            <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
                {data.pages.map((pageData) => {
                    return pageData.results.map((species) => {
                        return (
                            <Species
                                key={species.name}
                                name={species.name}
                                language={species.language}
                                averageLifespan={species.average_lifespan}
                            />
                        );
                    });
                })}
            </InfiniteScroll>
        </>
    );
};
