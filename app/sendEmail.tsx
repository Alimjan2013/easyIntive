import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function SendEmail(code: { code: string }) {
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  let token = localStorage.getItem("access_token");

  function handleDeleteCode() {
    fetch("https://is-ali-api-3cqwsbjsnwsx.deno.dev/api/resend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(token + ":"),
      },
      body: JSON.stringify({
        code: code.code,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "success") {
          // Display success toast
          toast({
            variant: "default",
            title: "发送成功",
            description: `邀请码成功发送给${email}`,
          });
          setIsOpen(false)
        } else {
          // Display failure toast

          toast({
            variant: "destructive",
            title: "删除失败",
            description: data.msg,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Display failure toast
        toast({
          variant: "destructive",
          title: "删除失败",
          description: error,
        });
      });
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          发送邀请
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">发送邀请</h4>
            <p className="text-sm text-muted-foreground">
              请填写接收邀请的邮箱地址
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                className="col-span-2 h-8"
                placeholder="请输入邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-2">
              <Label htmlFor="code">邀请码</Label>
              <p className="col-span-2 px-2" id="code" defaultValue="100%">
                {code.code}
              </p>
            </div>
            <Button onClick={()=>handleDeleteCode()} variant="secondary">发送</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
