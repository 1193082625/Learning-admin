'use client';

import {get} from "@/api/fetch";
import LBreadcrumbs from "@/components/Breadcrumbs";
import TableCom from "@/components/table";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const columns = [
  {name: 'ID', uid: '_id', sortable: true},
  {name: "CONTENT", uid: "content", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "CREATEAT", uid: "create_at", sortable: true},
  {name: "UPDATEAT", uid: "update_at", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const INITIAL_VISIBLE_COLUMNS = ["content", "status", "create_at", "update_at", 'actions'];

const statusOptions = [
  {name: "CLOSED", uid: "closed"},
  {name: "SOLVING", uid: "solving"},
  {name: "QUEUING", uid: "queing"}
]

export default function Page() {
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getList = async () => {
      const {code, data, msg} = await get('http://localhost:3001/feedback')
      if(code === 0) {
        setFeedbackList(data || []);
      } else {
        console.log(msg);
      }
    }
    getList();
  }, []);

  return (
    <>
    <div className="flex">
      <span onClick={() => router.back()}>{`<`}</span>
      <h1 className="text-lg font-bold">问题反馈</h1>
    </div>
    <LBreadcrumbs />
    <Suspense fallback={<div>Loading...</div>}>
      <TableCom
        columns={columns}
        initialColumns={INITIAL_VISIBLE_COLUMNS}
        statusOptions={statusOptions}
        data={feedbackList}
      />
    </Suspense>
    </>
  )
}