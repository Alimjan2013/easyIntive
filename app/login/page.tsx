"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from 'next/navigation';



import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();


  const login = (event: any) => {
    setLoading(true);
    event.preventDefault();

    fetch(
      "https://sealcutting.jadefoci.com/utype-api-develop/v1/admin/user/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.error_code === 0) {
            setLoading(false);
          // Login was successful
          const { username, user_type, access_token, refresh_token } =
            data.data;

          toast({
            variant: "default",
            title: `${username}, 登陆成功`,
            description: `以 ${user_type} 身份登陆成功`,
          });

          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          router.push('/');


          // You can now store the tokens and use them for future requests
        } else {
            setLoading(false);
          // Handle error
          toast({
            variant: "destructive",
            title: "登陆失败",
            description: data.msg + ` (code: ${data.error_code})`,
          });
          console.log(`Error: ${data.msg} (code: ${data.error_code})`);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error:", error);
      });
  };
  return (
    <div className="flex items-center justify-center w-full h-full bg-slate-300">
      <Card className="mx-auto max-w-sm min-w-80">
        <CardHeader>
          <CardTitle className="text-2xl">后台登陆</CardTitle>
          <CardDescription>请联系管理员获取账号密码</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={login} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">用户名</Label>
              <Input
                id="username"
                placeholder="请输入用户名"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">密码</Label>
              </div>
              <Input
                placeholder="请输入密码"
                id="password"
                type="password"
              
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button  disabled={loading} type="submit" className="w-full">
              登陆{loading? '中...': ''}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
