import Navbar from "../../components/NavBar";
import Logo from "../../assets/images/furia_logo.png"
import Footer from "../../components/Footer";

const home =()=>{
    return (
        <div className="flex flex-col min-h-screen">
        <Navbar/>
        <main className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <img src={Logo} alt="Logo FURIA" className="w-52 h-52 mb-2" />
        <input
          type="text"
          placeholder="Aqui você vai saber tudo sobre o nosso time de CS!"
          className="w-full max-w-md border border-black rounded-full px-6 py-3 text-center focus:outline-none focus:ring-2 focus:ring-black transition"
        />
      </main>
        <Footer/>
        </div>
          );
}
export default home;