import Routes from "./routes";
import validacoesContext from "./contexts/ValidacoesContext";
import { validarSenha } from "./models/Validacoes";

function App() {
  return (
    <validacoesContext.Provider value={{senha: validarSenha}}>
      <Routes/>
    </validacoesContext.Provider>
  );
}

export default App;
