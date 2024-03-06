'use client';

import TableCom from "@/components/table";
import {columns, INITIAL_VISIBLE_COLUMNS, users, statusOptions} from "./data";
import LBreadcrumbs from "@/components/Breadcrumbs";

export default function Page() {
  return (
    <div>
      <LBreadcrumbs />
      <TableCom
        columns={columns}
        initialColumns={INITIAL_VISIBLE_COLUMNS}
        statusOptions={statusOptions}
        data={users}
      />
    </div>
  )
}