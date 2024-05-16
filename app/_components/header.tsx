"use client";

import { HeartIcon, HomeIcon, ListOrderedIcon, LogInIcon, LogOutIcon, MenuIcon, ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Sheet } from "./ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Separator } from "./ui/separator";

const Header = () => {
  const { data } = useSession();

  const handleSignOutClick = () => signOut();
  const handleSignInClick = () => signIn();

  return (
    <div className="flex justify-between px-5 pt-6">
      <Link href="/">
        <Image src="/Logo.png" alt="FSW Foods" height={30} width={100} />
      </Link>


      {/* <Button onClick={() => signIn()}>Login</Button> */}

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <>
              <div className="flex justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={data?.user?.image as string | undefined} className="w-12 h-12 rounded-full" />
                    <AvatarFallback>{data?.user?.name?.split(" ")[0][0]}{data?.user?.name?.split(" ")[1][0]}</AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">
                      {data?.user?.name}
                    </h3>

                    <span className="text-xs block text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
              <div className="py-6">
                  <Separator />
                </div>

                <div className="space-y-2">
                  <Button variant="ghost" className="space-x-3 w-full text-sm font-normal justify-start rounded-full">
                    <HomeIcon size={16} />
                    <span className="block"> Início </span>
                  </Button>
                </div>

                <div>
                  <Button variant="ghost" className="space-x-3 w-full text-sm font-normal rounded-full justify-start">
                    <ScrollTextIcon size={16} />
                    <span className="block"> Meus pedidos </span>
                  </Button>
                </div>

                <div>
                  <Button variant="ghost" className="space-x-3 w-full text-sm font-normal rounded-full justify-start">
                    <HeartIcon size={16} />
                    <span className="block"> Restaurantes favoritos </span>
                  </Button>
                </div>

                <div className="py-6">
                  <Separator />
                </div>

                <div>
                  <Button variant="ghost" className="space-x-3 w-full text-sm font-normal rounded-full justify-start" onClick={handleSignOutClick}>
                    <LogOutIcon size={16} />
                    <span className="block">Sair da conta</span>
                  </Button>
                </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center pt-10">
                <h2 className="font-semibold">Olá! Faça seu login.</h2>
                <Button size="icon" onClick={handleSignInClick}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
