import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CodeList } from "@/lib/typeface";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";


import { format } from "date-fns";


import SendEmail from "./sendEmail";

export default function CodeTable({
  codeList,
  onResponse,
}: {
  codeList: CodeList[];
  onResponse: () => void;
}) {
  let token = localStorage.getItem("access_token");
  const { toast } = useToast();

  function handleDeleteCode(codeID: number, code: string) {
    fetch(
      "https://sealcutting.jadefoci.com/utype-api-develop/v1/admin/invitation/delete",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(token + ":"),
        },
        body: JSON.stringify({
          code_ids: [codeID],
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "success") {
          // Display success toast
          onResponse();
          toast({
            variant: "default",
            title: "删除成功",
            description: `成功删除【${code}】邀请码`,
          });
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
    <div className="p-4 border  w-full scroll-m-0 overflow-auto">
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>邀请码</TableHead>
            <TableHead>总调用额度</TableHead>
            <TableHead>总调用次数</TableHead>
            <TableHead>日调用额度</TableHead>
            <TableHead>今日调用量</TableHead>
            <TableHead>生效日期</TableHead>
            <TableHead>失效日期</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {codeList.map((code) => (
            <TableRow key={code.invitation_code_id}>
              <TableCell className="font-medium">
                {code.invitation_code_id}
              </TableCell>
              <TableCell className="font-mono">{code.code}</TableCell>
              <TableCell>{code.generate_limit}</TableCell>
              <TableCell>{code.generate_count}</TableCell>
              <TableCell>{code.generate_limit_per_day}</TableCell>
              <TableCell>{code.generate_count_today}</TableCell>
              <TableCell>
                {format(new Date(code.created_at), "yyyy-MM-dd HH:mm:ss")}
              </TableCell>
              <TableCell>
                {format(new Date(code.expire_time), "yyyy-MM-dd HH:mm:ss")}
              </TableCell>
              <TableCell className="gap-2 flex">
                <Button
                  onClick={() =>
                    handleDeleteCode(code.invitation_code_id, code.code)
                  }
                  variant="destructive"
                  size="sm"
                >
                  删除
                </Button>

                <SendEmail code={code.code} />
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
