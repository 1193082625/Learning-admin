'use client';

import { Listbox, ListboxItem } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import Image from 'next/image'
import { BugIcon } from "./icons/BugIcon";
import { ChevronRightIcon } from "./icons/chevronRightIcon";
import { LayoutIcon } from "./icons/LayoutIcon";
import { UsersIcon } from "./icons/UsersIcon";
import { BookIcon } from "./icons/BookIcon";

export default function SideNav() {
  const router = useRouter();
  const pathname = usePathname();
  const items = [
    {
      key: 'home',
      link: "/",
      label: "首页",
      icon: <LayoutIcon className="text-xl" />,
    },
    {
      key: 'practices',
      link: "/admin/practices",
      label: "试题管理",
      icon: <BookIcon className="text-xl" />,
    },
    {
      key: 'articles',
      link: "/admin/articles",
      label: "文章管理",
      icon: <BookIcon className="text-xl" />,
    },
    {
      key: 'feedback',
      link: "/admin/feedback",
      label: "问题反馈",
      icon: <BugIcon className="text-xl" />,
    },
    {
      key: 'users',
      link: "/admin/users",
      label: "用户管理",
      icon: <UsersIcon className="text-xl" />,
    }
  ];
  return (
    <nav className="w-[320px] flex-none border-r-small border-[#eef1f6] h-full p-5">
      <div className="flex items-center justify-center mb-6 mt-5">
        <Image
          src="/imgs/logo.png"
          alt="LOGO"
          width={200}
          height={50}
        />
      </div>
      <Listbox
        aria-label="Menu"
        itemClasses={{
          base: "px-3 rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
        }}
        items={items}
      >
        {(item) => (
          <ListboxItem
            key={item.key}
            endContent={<ChevronRightIcon />}
            className={[item.link === pathname ? "bg-[#2f42cd] text-[#fff]" : "", 'h-14 mb-4'].join(' ')}
            onClick={() => router.push(item.link)}
            startContent={
              <div className="flex items-center rounded-small justify-center w-7 h-7">
                {item.icon}
              </div>
            }
          >
            {item.label}
          </ListboxItem>
        )}
      </Listbox>
    </nav>
  )
}