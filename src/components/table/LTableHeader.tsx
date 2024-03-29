import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from "@nextui-org/react";
import { SearchIcon } from "../icons/SearchIcon";
import React from "react";
import { ChevronDownIcon } from "../icons/ChevronDownIcon";
import { capitalize } from "@/utils/stringsFunc";
import { PlusIcon } from "../icons/PlusIcon";
import { useRouter } from "next/navigation";

const StatusDropdown = ({
  statusFilter,
  setStatusFilter,
  statusOptions,
}: any) => {
  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
          状态
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Table Columns"
        closeOnSelect={false}
        selectedKeys={statusFilter}
        selectionMode="multiple"
        onSelectionChange={setStatusFilter}
      >
        {statusOptions.map((status: any) => (
          <DropdownItem key={status.uid} className="capitalize">
            {capitalize(status.name)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export default function LTableHeader({totalNum, filterValue, columns, initialColumns,statusOptions, pageChanged, onClear, statusFilter, visibleColumns, setVisibleColumns, createNew, onRowsPerPageChange, setStatusFilter, onSearchChange, ...props}: any) {
  const router = useRouter();
    return (
    <div className="flex flex-col gap-4 mb-5">
      <div className="flex justify-between gap-4 items-end">
        <Input
          isClearable
          className="w-[300px]"
          placeholder="请输入搜索内容"
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={() => onClear()}
          onValueChange={onSearchChange}
        />
        <div className="flex gap-3">
          {
           statusOptions && statusOptions.length && <StatusDropdown statusFilter={statusFilter} setStatusFilter={setStatusFilter} statusOptions={statusOptions}/>
          }
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                显示列
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={(key) => setVisibleColumns(key)}
            >
              {columns.map((column: any) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {
            createNew && (
              <Button color="primary" endContent={<PlusIcon />} onClick={createNew}>
                新建
              </Button>
            )
          }
          
        </div>
      </div>
    </div>
  );
}