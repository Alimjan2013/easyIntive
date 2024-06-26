
"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import { useState } from "react";

const logo = (
    <svg
      width="98"
      height="36"
      viewBox="0 0 98 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.79045 8.176V19.348C7.79045 20.2627 7.98645 20.9907 8.37845 21.532C8.78912 22.0547 9.44245 22.316 10.3385 22.316C11.2345 22.316 11.8971 22.0547 12.3265 21.532C12.7558 20.9907 12.9705 20.2627 12.9705 19.348V8.176H19.1585V19.348C19.1585 21.2333 18.7665 22.848 17.9825 24.192C17.1985 25.5173 16.1251 26.516 14.7625 27.188C13.3998 27.86 11.8785 28.196 10.1985 28.196C8.51845 28.196 7.02512 27.86 5.71845 27.188C4.43045 26.516 3.42245 25.5173 2.69445 24.192C1.96645 22.8667 1.60245 21.252 1.60245 19.348V8.176H7.79045ZM42.1653 8.176V13.104H36.9013V28H30.6853V13.104H25.4773V8.176H42.1653ZM61.6872 12.208L51.5792 35.56H44.7752L48.7512 27.216L42.1712 12.208H49.0872L52.0552 20.216L54.8272 12.208H61.6872ZM69.0164 14.364C69.4084 13.636 69.9684 13.0667 70.6964 12.656C71.4431 12.2267 72.3297 12.012 73.3564 12.012C74.5884 12.012 75.6991 12.3387 76.6884 12.992C77.6777 13.6267 78.4524 14.56 79.0124 15.792C79.5911 17.0053 79.8804 18.4427 79.8804 20.104C79.8804 21.7653 79.5911 23.212 79.0124 24.444C78.4524 25.6573 77.6777 26.5907 76.6884 27.244C75.6991 27.8787 74.5884 28.196 73.3564 28.196C72.3297 28.196 71.4431 27.9907 70.6964 27.58C69.9684 27.1507 69.4084 26.572 69.0164 25.844V35.56H62.8004V12.208H69.0164V14.364ZM73.5804 20.104C73.5804 19.264 73.3657 18.6107 72.9364 18.144C72.5071 17.6773 71.9564 17.444 71.2844 17.444C70.6124 17.444 70.0617 17.6773 69.6324 18.144C69.2031 18.6107 68.9884 19.264 68.9884 20.104C68.9884 20.944 69.2031 21.5973 69.6324 22.064C70.0617 22.5307 70.6124 22.764 71.2844 22.764C71.9564 22.764 72.5071 22.5307 72.9364 22.064C73.3657 21.5973 73.5804 20.944 73.5804 20.104ZM97.1196 19.964C97.1196 20.3933 97.0916 20.804 97.0356 21.196H87.0396C87.133 22.5587 87.7023 23.24 88.7476 23.24C89.4196 23.24 89.905 22.932 90.2036 22.316H96.7836C96.5596 23.436 96.0836 24.444 95.3556 25.34C94.6463 26.2173 93.741 26.9173 92.6396 27.44C91.557 27.944 90.3623 28.196 89.0556 28.196C87.4876 28.196 86.0876 27.8693 84.8556 27.216C83.6423 26.5627 82.6903 25.6293 81.9996 24.416C81.3276 23.184 80.9916 21.7467 80.9916 20.104C80.9916 18.4613 81.3276 17.0333 81.9996 15.82C82.6903 14.588 83.6423 13.6453 84.8556 12.992C86.0876 12.3387 87.4876 12.012 89.0556 12.012C90.6236 12.012 92.0143 12.3387 93.2276 12.992C94.4596 13.6267 95.4116 14.5413 96.0836 15.736C96.7743 16.9307 97.1196 18.34 97.1196 19.964ZM90.8196 18.48C90.8196 17.9573 90.6516 17.5653 90.3156 17.304C89.9796 17.024 89.5596 16.884 89.0556 16.884C87.9543 16.884 87.3103 17.416 87.1236 18.48H90.8196Z"
        fill="url(#paint0_linear_472_3692)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_472_3692"
          x1="1.44118"
          y1="7.5"
          x2="94.3313"
          y2="35.8546"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#333333" />
          <stop offset="1" stopColor="#333333" stopOpacity="0.8" />
        </linearGradient>
      </defs>
    </svg>
  );



export default function Component() {
    const router = useRouter()
    const [inviteCode,setInviteCode] = useState<string>('kdjhe2') 

    async function routeToWeb(){
        console.log('route to web:inviteCode',inviteCode)
    
        try {
            await navigator.clipboard.writeText(inviteCode);
            console.log('Invite code copied to clipboard');
        } catch (err) {
            console.log('Failed to copy invite code: ', err);
        }
        window.open("https://sealcutting.jadefoci.com/utype-develop/", '_blank')

    }
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
            <div className="flex items-center justify-center pb-4">
            {logo}
            </div>
      
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            体验优字造，定制个性字体
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            你获得了优字造最新产品的内测邀请
          </p>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-4xl font-bold dark:bg-gray-800">
              {inviteCode}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              点击下方按钮复制并访问优字造官网，输入邀请码即可激活。
            </p>
            <div className=" w-full max-w-sm flex space-x-2">
              <Button onClick={()=>routeToWeb()} className="w-full">立即体验</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


