import { AvatarIcon, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, User } from "@nextui-org/react";
import LBreadcrumbs from "./Breadcrumbs";
import { useUserStore } from "@/store/userStore";

export function Header(props: any) {
  const userName = useUserStore(state => state.userName)
  const logout = useUserStore(state => state.logout);
  return (
    <div className="">
      <div className="flex pt-4 pb-4 pl-5 pr-5 items-center justify-between border-b-1 border-[#edf2f8] text-lg font-bold">
        <div>
          <h1>Learning Management</h1>
        </div>
        <div>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
                }}
                className="transition-transform"
                description="@learning"
                name={userName}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
              <DropdownItem key="settings" onClick={logout}>
                登出
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="border-b-1 border-[#edf2f8] pl-5 pr-5">
        <LBreadcrumbs />
      </div>
    </div>
  )
}