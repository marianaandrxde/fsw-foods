import { notFound } from "next/navigation";
import { db } from "../_lib/prisma";
import ProductImage from "./[id]/_components/product-image";
import ProductDetails from "./[id]/_components/product-details";

interface ProductPageProps {
    params: {
        id: string;
    }
}


const ProductPage = async ({ params: { id } }: ProductPageProps) => {
    const product = await db.product.findUnique({
        where: {
            id,
        },
        include: {
            restaurant: true,
        },
    });

    const juices = await db.product.findMany({
        where: {
            category: {
                name: 'Sucos'
            },
            restaurant: {
            id: product?.restaurantId,
            },
        },
    
        include: {
            restaurant: true,
        },
    });

    if (!product) {
        return notFound();
    }

    return (<div>
        <ProductImage product={product} />

        <ProductDetails product={product} complementaryProducts={juices}/>
    </div>
    );
};

export default ProductPage;