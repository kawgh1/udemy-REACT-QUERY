# udemy-REACT-QUERY

Code to support the Udemy course [React Query: Server State Management in React](https://www.udemy.com/course/learn-react-query/?referralCode=1479BB9FA7CA6F31671E)

## Notes

-   ### `isFetching` vs `isLoading`

    -   `isFetching` - the async query function function (to get the data from API) hasnt resolved yet
    -   `isLoading` - no cached data, we've never made this call, plus `isFetching`
    -   making this distinction becomes important with pagination and cached queries

-   ### React Query Dev Tools

    -   By default, React Query Dev Tools are not included in production
    -   **import {ReactQueryDevtools} from 'react-query/devtools'**
    -   #### Shows queries by key
        -   status of queries
        -   last updated timestamp
    -   #### Data Explorer
        -   see what data has been returned by your queries
    -   #### Query Explorer
        -   see the queries themselves

-   ### `staleTime` vs `cacheTime`

    -   `staleTime` translates to "max age" - how long are you willing to let your data be stale or out of date?
        -   for blog posts, probably doesnt matter that much - hours to days old
        -   but for more time sensitive data - say social media posts in a user's feed - we'd want to check at least every few minutes - ideally more to keep them as engaged as possible
    -   `staleTime` is for re-fetching data
    -   Cache is for data that might be re-used later
        -   query goes into 'cold storage' if there's no active `useQuery`
        -   cache data expires after `cacheTime` (default: 5 minutes)
            -   how long it's been since the last active `useQuery`
            -   After the cache expires, the data is garbage collected
        -   Cache is backup data to display while fetching
            -   better to display slightly old data while fetching than no data at all to user

-   ### Using an Array as the Query Key

    -   In our blog example, our react query was getting the comments from the first blog post, caching them, and then returning those same comments for every blog post
    -   A good way to solve this is to make a react query for each blog post, **where the key is an array** with the blog post id
        -   **const { data } = useQuery( [ 'comments', post.id ] , ( ) => fetchComments( post.id ) );**
        -   this allows us to cache the comments for each blog post and avoid re-fetching or overwriting previous queries
        -   sometimes this is described as a query's **"dependency array"**

-   ### Pagination w/ React Query

    -   Track current page in component state (`currentPage`)
    -   Use query keys that include the page number `["posts", currentPage]`
    -   **const { data } = useQuery( [ "posts", currentPage ] , ( ) => fetchPosts2( currentPage ) );**
    -   User clicks "next page" or "previous page" button
        -   update `currentPage` state
        -   fire off new react query to load appropriate blog results

-   ### Prefetching

    -   adds data to the cache
    -   data is automatically stale, but this is configurable
    -   shows while re-fetching as long as the cache hasn't expired
    -   Prefetching can be used for any anticipated data needs, not just pagination
    -   https://react-query.tanstack.com/reference/QueryClient#queryclientprefetchquery

        -   prefetching is done with a hooke `useQueryClient`

                        // prefetching
                        const queryClient = useQueryClient();

                        useEffect( ( ) => {
                            if ( currentPage < maxPostPage ) {
                                const nextPage = currentPage + 1;
                                queryClient.prefetchQuery( [ "posts", nextPage ], ( ) =>
                                    fetchPosts2( nextPage )
                                );
                            }
                        }, [ currentPage, queryClient ] );

-   ### Mutations

    -   Mutation - making a network call that changes data on the server
        -   jsonplaceholder API doesnt change the data
    -   **Day Spa app** will demonstrate showing changes to user:
        -   Optimistic updates (assume change will happen, rollback if it doesnt work)
        -   Update React Query cache with data returned from the server
        -   Trigger re-fetch of relevant data by _invalidating_ the current query
    -   `useMutation`

        -   similar to useQuery, but:

            -   returns a `mutate` function
            -   doesnt need a query key
            -   `isLoading` but no `isFetching`
            -   by default, no retries (configurable)
            -   https://react-query.tanstack.com/guides/mutations

                    File: PostDetail.jsx

                    ...
                    // full update of item uses 'put'
                    // partial update of item uses 'patch'
                    const updatePost2 = async ( postId ) => {
                        try {
                            const response = await axios.patch(
                                `https://jsonplaceholder.typicode.com/postId/${ postId }`,
                                { title: "REACT QUERY FOREVER!!!!" }
                            );
                        } catch (error) {
                            console.log(error.message);
                        }
                    };
                    ...
                    ...
                    // update post mutation
                    const updateMutation = useMutation( ( postId ) => updatePost2( postId ) );
                    ...
                    ...
                    render
                    ...
                    <button onClick={( ) => updateMutation.mutate( post.id ) }>
                        Update title
                    </button>
