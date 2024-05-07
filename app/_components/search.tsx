"use client";

import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = () => {
        if (!search){
            return;
        }

        router.push(`/restaurants?search=${search}`);
    }

    return (
    <div className="flex gap-2">
        <Input placeholder="Buscar restaurantes" 
        className="border-none"
        onChange={handleChange}
        value={search}/>
        <Button size="icon">
            <SearchIcon size={18} onClick={handleSearchSubmit}/>
        </Button>
    </div>
    );
};
 
export default Search;