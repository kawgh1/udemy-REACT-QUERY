import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

import axios from "axios";

const initialUrl = "https://swapi.dev/api/people/";
// const fetchUrl = async (url) => {
//   const response = await fetch(url);
//   return response.json();
// };

const initialUrl2 = async (url) => {
    const response = await axios.get(url);
    return response.data;
};

export function InfiniteSpecies() {
    // TODO: get data for InfiniteScroll via React Query
    return <InfiniteScroll />;
}
