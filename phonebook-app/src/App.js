import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GraphContactBox from './components/GraphContactBox';
import { graphqlClient } from './utils/api';
import { ApolloProvider, InMemoryCache } from "@apollo/client";



function App() {
  return (
    <ApolloProvider client={graphqlClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GraphContactBox />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
