'use client';

import { get } from "@/api/fetch";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { EditIcon } from "@/components/icons/Edit";
import TableCom, { TableColumn } from "@/components/table";
import { TableActions } from "@/components/table/RenderTableItem";
import { formatTableData } from "@/utils/formatData";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";


const statusOptions = [
  {name: "PUBLISHED", uid: "published"},
  {name: "DRAFT", uid: "draft"},
]

export default function Page() {
  const [userList, setUserList] = useState([]);
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [initialVisibleColumns, setInitialVisibleColumns] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getList = async () => {
      try {
        const {code, data, msg} = await get('/user');
        if(code === 0) {
          const {columns, initial_visible_columns} = formatTableData(data);
          setColumns(columns);
          setInitialVisibleColumns(initial_visible_columns);
          setUserList(data || []);
        }
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    getList();
  }, []);


  const TABLE_ACTONS: TableActions = [
    {
      key: 'edit',
      content: <EditIcon />,
      tips: '编辑',
      onclick: (e: any, row: any) => {
        // e.preventDefault();
        // console.log('触发编辑按钮', row);
        router.push(`/admin/user/edit/${row._id}`);
      }
    }, {
      key: 'delete',
      content: <DeleteIcon />,
      tips: '删除',
      onclick: (e: any, row: any) => {
        e.preventDefault();
        console.log('触发删除按钮', row);
        // router.push(`/admin/user/edit/${row.id}`);
      }
    }
  ]

  const createNew = () => {
    router.push('/admin/user/create')
  }


  return (
    <>
      <h1 className="text-lg font-bold">用户管理</h1>
      {
        columns.length && initialVisibleColumns.length ? 
        <Suspense fallback={<div>Loading...</div>}>
          <TableCom
            columns={columns}
            initialColumns={initialVisibleColumns}
            actions={TABLE_ACTONS}
            statusOptions={statusOptions}
            data={userList}
            createNew={createNew}
          />
        </Suspense>: <div>loading</div>
      }
    </>
  )
}