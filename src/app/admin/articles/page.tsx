'use client';

import { get } from "@/api/fetch";
import LBreadcrumbs from "@/components/Breadcrumbs";
import { Header } from "@/components/Header";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { EditIcon } from "@/components/icons/Edit";
import TableCom, { TableColumn } from "@/components/table";
import { TableActions } from "@/components/table/RenderTableItem";
import { useUserStore } from "@/store/userStore";
import { formatTableData } from "@/utils/formatData";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";


const statusOptions = [
  {name: "PUBLISHED", uid: "published"},
  {name: "DRAFT", uid: "draft"},
]

export default function Page() {
  const logout = useUserStore(state => state.logout);
  const [articleList, setArticleList] = useState([]);
  const [columns, setColumns] = useState<TableColumn[]>([]);
  const [initialVisibleColumns, setInitialVisibleColumns] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getList = async () => {
      try {
        const {code, data, msg} = await get('/articles');
        if(code === 0) {
          const {columns, initial_visible_columns} = formatTableData(data);
          setColumns(columns);
          setInitialVisibleColumns(initial_visible_columns);
          setArticleList(data || []);
        }
      } catch (error: any) {
        console.error('Error fetching articles:', error);
        if([401, 403].includes(error?.code)) {
          logout();
          router.replace('/')
        }
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
        router.push(`/admin/articles/edit/${row._id}`);
      }
    }, {
      key: 'delete',
      content: <DeleteIcon />,
      tips: '删除',
      onclick: (e: any, row: any) => {
        e.preventDefault();
        console.log('触发删除按钮', row);
        // router.push(`/admin/articles/edit/${row.id}`);
      }
    }
  ]

  const createNew = () => {
    router.push('/admin/articles/create')
  }


  return (
    <>
      {
        columns.length && initialVisibleColumns.length ? 
        <Suspense fallback={<div>Loading...</div>}>
          <TableCom
            columns={columns}
            initialColumns={initialVisibleColumns}
            actions={TABLE_ACTONS}
            statusOptions={statusOptions}
            data={articleList}
            createNew={createNew}
          />
        </Suspense>: <div>loading</div>
      }
    </>
  )
}