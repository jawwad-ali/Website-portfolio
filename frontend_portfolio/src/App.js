import { About, Footer, Header, Skills, Work, Services } from "./container";
import { Navbar } from "./components";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Services />
      <Skills />
      <Footer />
    </div>
  );
}

export default App;