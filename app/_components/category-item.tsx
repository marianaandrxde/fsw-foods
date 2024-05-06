import { Category } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

interface CategoryItemProps{
    category: Category;
}


const CategoryItem = ({category}: CategoryItemProps) => {
    return ( 
    <Link href={`/categories/${category.id}/products`}>
    <div className="flex items-center gap-3 py-3 px-4 bg-white shadow-md rounded-full">
        <Image src={category.imageUrl} alt={category.name} height={30} width={30} />

        <span className="font-semibold text-semibold">{category.name}</span>
    </div> 
    </Link>
    );
};
 
export default CategoryItem;