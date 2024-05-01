import Search from "./_components/ui/search";
import Header from "./_components/header";

const  Home = () => {
  return (
    <>    
    <Header />
    <div className="px-5 pt-6">
        <Search />
    </div>
    </>
  );
};

 
export default Home;