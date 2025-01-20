import { BrowserRouter, Routes, Route} from "react-router-dom"
import { Home } from "./pages/Home"
import { Header } from "./Components/Header"
import { Eventos } from "./pages/Eventos"
import { CrearEvento } from "./pages/CrearEvento"
import { EditarEvento } from "./pages/EditarEvento"
function App() {
  return (
    <>
    <Header/>
     <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Home/>} />
          <Route path="/eventos" element= {<Eventos/>}/>
          <Route path="/eventos/crear" element= {<CrearEvento/>}/>
          <Route path="/eventos/edit/:id" element ={<EditarEvento/>}/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
