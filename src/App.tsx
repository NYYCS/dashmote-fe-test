import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BaseLayout } from "./components/BaseLayout";
import { ProjectListing } from "./components/ProjectListing";
import "./App.css";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BaseLayout>
        <ProjectListing />
      </BaseLayout>
    </QueryClientProvider>
  );
}

export default App;
