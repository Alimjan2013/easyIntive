// "use client"
import { createClient } from "@/utils/supabase/server";
import CodeForm from "./Form";
import CodeTable from "./table";
import { redirect } from "next/navigation";
// import { useState, useEffect } from "react";
import { CodeList } from "@/lib/typeface";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // const [codeList, setCodeList] = useState<CodeList[]>([]);

  function fetchCodeList() {
    let count = 100; // replace with your value
    let offset = 0; // replace with your value

    fetch(
      `https://sealcutting.jadefoci.com/utype-api-develop/v1/admin/invitation/list?count=${count}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + btoa(  ":"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.msg === "success") {
          // Display success toast
          // setCodeList(data.invitation_codes.rows as CodeList[]);
        } else {
          console.error("Error:", data.msg);
          // Display failure toast
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Display failure toast
      });
  }

  function handleResponse() {
    fetchCodeList();
  }

  // useEffect(() => {
  //   fetchCodeList();
  // }, []);


  return (
    <div className="flex flex-row h-full gap-2">
      <CodeForm/>
      {/* <CodeTable codeList={codeList} onResponse={handleResponse}/>  */}
    </div>
  );
}
