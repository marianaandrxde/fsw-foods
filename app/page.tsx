import Search from "./_components/search";
import Header from "./_components/header";
import CategoryList from "./_components/category-list";
import Image from "next/image";
import ProductList from "./_components/product-list";

const Home = () => {
  return (
    <>
      <Header />

      <div className="px-5 pt-6">
        <Search />
      </div>

      <div className="px-5 pt-6">
        <CategoryList />
      </div>

      <div className="px-5 pt-6">
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de desconto em pizza"
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto w-full object-contain"
          quality={100}
        />
      </div>

      <div className="px-5 pt-6">
        <ProductList />
      </div>
    </>
  );
};

export default Home;
