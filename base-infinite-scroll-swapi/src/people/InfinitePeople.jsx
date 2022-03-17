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

export function InfinitePeople() {
    // TODO: get data for InfiniteScroll via React Query
    const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
        "sw-people",
        ({ pageParam = initialUrl }) => fetchUrl2(pageParam),
        {
            getNextPageParam: (lastPage) => lastPage.next || undefined,
        }
    );
    return <InfiniteScroll />;
}
