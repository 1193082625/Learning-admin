'use client';

import LBreadcrumbs from "@/components/Breadcrumbs";
import TableCom from "@/components/table";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const columns = [
  {name: 'ID', uid: '_id', sortable: true},
  {name: "TITLE", uid: "title", sortable: true},
  {name: "CONTENT", uid: "content", sortable: true},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "LIKE_NUM", uid: "like_num", sortable: true},
  {name: "FAVOURITENUM", uid: "favourite_num", sortable: true},
  {name: "CREATEAT", uid: "create_at", sortable: true},
  {name: "UPDATEAT", uid: "update_at", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

const INITIAL_VISIBLE_COLUMNS = ["title", "content", "create_at", "update_at", 'actions'];

const statusOptions = [
  {name: "PUBLISHED", uid: "published"},
  {name: "DRAFT", uid: "draft"},
]

export default function Page() {
  const [articleList, setArticleList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getList = async () => {
      try {
        const response = await fetch('http://localhost:3001/article');
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data = await response.json();
        setArticleList(data.data || []);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    getList();
  }, []);

  return (
    <>
      <div className="flex">
        <span onClick={() => router.back()}>{`<`}</span>
        <h1 className="text-lg font-bold">文章页</h1>
      </div>
      <LBreadcrumbs />
      <Suspense fallback={<div>Loading...</div>}>
        <TableCom
          columns={columns}
          initialColumns={INITIAL_VISIBLE_COLUMNS}
          statusOptions={statusOptions}
          data={articleList}
        />
      </Suspense>
    </>
  )
}