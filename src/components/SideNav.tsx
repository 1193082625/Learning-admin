'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SideNav() {
  const router = useRouter();
  const pathname = usePathname();
  const items = [
    {
      key: 'home',
      link: "/",
      label: "首页",
    },
    {
      key: 'practices',
      link: "/practices",
      label: "试题管理",
    },
    {
      key: 'articles',
      link: "/articles",
      label: "文章管理",
    },
    {
      key: 'feedback',
      link: "/feedback",
      label: "问题反馈",
    },
    {
      key: 'users',
      link: "/users",
      label: "用户管理",
    }
  ];
  return (
    <nav className="w-1/4 border-r-small h-full pt-5 pb-5 bg-gray-50">
      <h1 className="pl-5 h-10 bg-blue-300 flex items-center">Learning Management</h1>
      <ul>
        {items.map(item => (
          <li
            key={item.key}
            color={item.link === pathname ? "danger" : "default"}
            className={[item.link === pathname ? "text-danger" : "", 'h-11', 'flex', 'items-center', 'pl-4', 'border-t-small'].join(' ')}
            onClick={() => router.push(item.link)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      {/* <Listbox
        items={items}
        aria-label="Dynamic Actions"
      >
      {(item) => (
        <ListboxItem
          key={item.key}
          color={item.link === pathname ? "danger" : "default"}
          className={[item.link === pathname ? "text-danger" : "", 'h-12', 'border-t-small'].join(' ')}
          onClick={() => router.push(item.link)}
        >
          {item.label}
        </ListboxItem>
      )}
      </Listbox> */}
    </nav>
  )
}