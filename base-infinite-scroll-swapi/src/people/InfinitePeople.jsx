import InfiniteScroll from "react-infinite-scroller";
import { Person } from "./Person";
import axios from "axios";
import { useInfiniteQuery } from "react-query";

const initialUrl = "https://swapi.dev/api/people/";
// const fetchUrl = async (url) => {
//   const response = await fetch(url);
//   return response.json();
// };

const fetchUrl2 = async (url) => {
    const response = await axios.get(url);
    return response.data;
};

export const InfinitePeople = () => {
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
        "sw-people",
        ({ pageParam = initialUrl }) => fetchUrl2(pageParam),
        {
            getNextPageParam: (lastPage) => lastPage.next || undefined,
        }
    );

    if (isLoading) return <div className="loading">Loading...</div>;
    if (isError) return <div className="error">Error!{error.toString()}</div>;
    return (
        <>
            {/* displaying "Loading..." in top right of page while scrolling and fetching */}
            {isFetching && <div className="loading">Loading...</div>}
            <InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
                {data.pages.map((pageData) => {
                    {
                        /* pageData.results is an array of person characteristics */
                    }
                    return pageData.results.map((person) => {
                        return (
                            <Person
                                key={person.name}
                                name={person.name}
                                hairColor={person.hair_color}
                                eyeColor={person.eye_color}
                            />
                        );
                    });
                })}
            </InfiniteScroll>
        </>
    );
};
