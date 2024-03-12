'use client';

import {get} from "@/api/fetch";
import { EditIcon } from "@/components/icons/Edit";
import TableCom, { TableColumn } from "@/components/table";
import { TableActions } from "@/components/table/RenderTableItem";
import { formatTableData } from "@/utils/formatData";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import HandleFeedback from "./handleFeedback";

const statusOptions = [
  {name: "CLOSED", uid: "closed"},
  {name: "SOLVING", uid: "solving"},
  {name: "QUEUING", uid: "queing"}
]

export default function Page() {
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [initialVisibleColumns, setInitialVisibleColumns] = useState<string[]>([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  
  const TABLE_ACTONS: TableActions = [
    {
      key: 'edit',
      content: <EditIcon />,
      tips: '处理',
      onclick: (e: any, row: any) => {
        e.preventDefault();
        console.log('触发编辑按钮', row);
        // router.push(`/admin/articles/edit/${row.id}`);
        onOpen();
      }
    }
  ]

  useEffect(() => {
    const getList = async () => {
      const {code, data, msg} = await get('/feedback');
      if(code === 0) {
        const {columns, initial_visible_columns} = formatTableData(data);
        setColumns(columns);
        setInitialVisibleColumns(initial_visible_columns);
        setFeedbackList(data || []);
      } else {
        console.log(msg);
      }
    }
    getList();
  }, []);

  return (
    <>
    <h1 className="text-lg font-bold">问题反馈</h1>
    {
      columns.length && initialVisibleColumns.length ? 
        <Suspense fallback={<div>Loading...</div>}>
          <TableCom
            columns={columns}
            initialColumns={initialVisibleColumns}
            actions={TABLE_ACTONS}
            statusOptions={statusOptions}
            selectionMode="none"
            data={feedbackList}
          />
        </Suspense> : <div>loading</div>
    }
    <HandleFeedback title="处理反馈" isOpen={isOpen} onOpenChange={onOpenChange}  />
    </>
  )
}