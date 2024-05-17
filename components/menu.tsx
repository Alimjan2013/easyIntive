import Link from "next/link";
import AuthButton from "@/components/AuthButton";




export default function Menu() {
  return (
    <header className="w-full flex items-center justify-between px-4 py-2 bg-gray-50  border-b border-gray-200">
      <div className="flex flex-row items-center gap-2">
        <Link replace href={"/"} prefetch={false}>
          esay Invite
        </Link>
      </div>

      <AuthButton />

      {/* <div className="  flex items-center justify-center h-12 w-12 bg-zinc-500">头像</div> */}
    </header>
  );
}
