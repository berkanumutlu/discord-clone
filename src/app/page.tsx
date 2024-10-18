import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import { cn } from "@/lib/utils";

const state = true;

export default function Home() {
  return (
    <div className="flex flex-col">
      <p className="text-3xl font-bold text-indigo-500">Home Page</p>
      <div className="mx-2 inline-flex gap-2">
        <Button>Button</Button>
        <Button variant="outline">Outline Variant</Button>
        <Button variant="ghost">Ghost Variant</Button>
        <Link href="#" className={buttonVariants({ variant: "outline" })}>Click here</Link>
        <Button asChild>
          <Link href="/login">Button with Link</Link>
        </Button>
        <Button className={cn(
          "bg-indigo-500",
          state && "bg-red-500"
        )}>cn Button</Button>
      </div>
    </div>

  );
}
