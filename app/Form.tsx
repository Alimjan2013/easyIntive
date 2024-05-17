"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

import { Input } from "@/components/ui/input";

const formSchema = z.object({
  quantity: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().positive()
  ),
  expiryDate: z.date({
    required_error: "A date of birth is required.",
  }),
  daylyLimit: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().positive()
  ),
  totalLimit: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10),
    z.number().int().positive()
  ),
});

// export default function CodeForm({onResponse}: {onResponse: () => void}){
  export default function CodeForm(){
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    let token = localStorage.getItem('access_token');

    fetch(
      "https://sealcutting.jadefoci.com/utype-api-develop/v1/admin/invitation/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": 'Basic ' + btoa(token + ':')
        },
        body: JSON.stringify({
          create_count: values.quantity,
          generate_limit: values.totalLimit,
          generate_limit_per_day: values.daylyLimit,
          expire_time: values.expiryDate,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "success") {
          // Display success toast
          // onResponse()
          toast({
            variant: "default",
            title: "生成成功",
            description: `成功生成了${data.invitation_codes.length}个邀请码`,
          });
        } else {
          // Display failure toast

          toast({
            variant: "destructive",
            title: "生成失败",
            description: data.msg,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Display failure toast
        toast({
          variant: "destructive",
          title: "生成失败",
          description: error,
        });
      });

    console.log(values);
  }

  return (
    <div className="p-4 border  border-l-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>生成邀请码数量</FormLabel>
                <FormControl>
                  <Input placeholder="请输入生成验证码数量" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>有效日期</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>选择日期</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      initialFocus
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date < today;
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="daylyLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>调用额度（每日）</FormLabel>
                <FormControl>
                  <Input placeholder="请输入每日调用量" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="totalLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>总调用额度</FormLabel>
                <FormControl>
                  <Input placeholder="请输入每日调用量" {...field} />
                </FormControl>
                <FormDescription>日调用量不能超过总调用额度</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit">
            生成
          </Button>
        </form>
      </Form>
    </div>
  );
}
