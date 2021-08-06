import { ValidacoesProvider } from "./contexts/ValidacoesContext";
import { CarrinhoProvider } from "./contexts/CarrinhoContext";
import { SearchProvider } from "./contexts/SearchContext";
import Routes from "./routes";

function App() {
  return (
    <CarrinhoProvider>
      <ValidacoesProvider>
        <SearchProvider>
          <Routes />
        </SearchProvider>
      </ValidacoesProvider>
    </CarrinhoProvider >
  );
}

export default App;
