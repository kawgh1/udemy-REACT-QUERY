import { Posts } from "./Posts";
import "./App.css";

// react query
import { QueryClient, QueryClientProvider } from "react-query";
// react query dev tools
import { ReactQueryDevTools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
    return (
        // provide React Query client to App
        // this means everything inside our QueryClientProvider can use react query hooks
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <h1>Blog Posts</h1>
                <Posts />
            </div>
        </QueryClientProvider>
    );
}

export default App;
