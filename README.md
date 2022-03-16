# udemy-REACT-QUERY

Code to support the Udemy course [React Query: Server State Management in React](https://www.udemy.com/course/learn-react-query/?referralCode=1479BB9FA7CA6F31671E)

### Notes

-   ### `isFetching` vs `isLoading`

    -   `isFetching` - the async query function function (to get the data from API) hasnt resolved yet
    -   `isLoading` - no cached data, we've never made this call, plus `isFetching`
    -   making this distinction becomes important with pagination and cached queries

-   ### React Query Dev Tools
    -   By default, React Query Dev Tools are not included in production
    -   **import {ReactQueryDevTools} from 'react-query/devtools'**
    -   ### Shows queries by key
        -   status of queries
        -   last updated timestamp
    -   ### Data Explorer
        -   see what data has been returned by your queries
    -   ### Query Explorer
        -   see the queries themselves
