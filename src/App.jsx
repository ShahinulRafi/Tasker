import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import Taskboard from "./Task/Taskboard";

function App() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        <Hero />
        <Taskboard />
      </div>
      <Footer />
    </>
  );
}

export default App;
