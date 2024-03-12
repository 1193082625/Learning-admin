import React, { useCallback, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  Selection,
  TableCell,
  SortDescriptor,
} from "@nextui-org/react";
import LTableHeader from "./LTableHeader";
import LTableBottom from "./LTableBottom";
import RenderTableItem, { TableActions } from "./RenderTableItem";

export interface TableColumn {
    name: string;
    uid: string;
    sortable?: boolean
}

type TableComProps = {
  columns: any[];
  initialColumns: string[];
  actions?: TableActions;
  statusOptions: {
    name: string;
    uid: string;
  }[];
  selectionMode?: any;
  defaultSelectedKeys?: string[];
  data: any[],
  createNew?: Function;
  [key: string]: any;
}

export default function TableCom({
  columns,
  initialColumns,
  statusOptions,
  actions,
  selectionMode,
  defaultSelectedKeys,
  data,
  createNew,
  ...props
}: TableComProps) {
  type DataItem = typeof data[0];

  const [filterValue, setFilterValue] = useState<string>("");
  const [selecteMode, setSelecteMode] = useState(selectionMode || 'multiple');
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(defaultSelectedKeys || []));
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(initialColumns));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    return columns.filter((column: any) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredData = [...data];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((item) =>
        (item.name || item.content).toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredData = filteredData.filter((item) =>
        Array.from(statusFilter).includes(item.status),
      );
    }

    return filteredData;
  }, [data, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as keyof DataItem] as number;
      const second = b[sortDescriptor.column as keyof DataItem] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((dataInfo: DataItem, columnKey: React.Key) => {
    return (
      <RenderTableItem dataInfo={dataInfo} columnKey={columnKey} actions={actions} />
    )
  }, []);

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = React.useMemo(() => {
    return (
      <LTableHeader
        createNew={createNew}
        filterValue={filterValue}
        columns={columns}
        initialColumns={initialColumns}
        statusOptions={statusOptions}
        pageChanged={onRowsPerPageChange}
        onClear={onClear}
        statusFilter={statusFilter}
        visibleColumns={visibleColumns}
        setVisibleColumns={setVisibleColumns}
        onRowsPerPageChange={onRowsPerPageChange}
        setStatusFilter={setStatusFilter}
        onSearchChange={onSearchChange}
      />
    )
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    data.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <LTableBottom
      selectedKeys={selectedKeys}
      filteredItems={filteredItems}
      onRowsPerPageChange={onRowsPerPageChange}
      page={page}
      pages={pages}
      setPage={setPage}
      />
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    /**
     * isHeaderSticky 使表头具有粘性
     * 
     */
    <Table
      aria-label="table"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "min-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode={selecteMode}
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={(keys) => setSelectedKeys(keys as any)}
      onSortChange={(e) => setSortDescriptor(e as any)}
    >
      <TableHeader columns={headerColumns}>
        {(column: any) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"暂无数据！"} items={sortedItems}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}


  /**
   * useCallback
   *  首先，假如我们不使用useCallback，在父组件中创建了一个名为handleClick的事件处理函数，根据需求我们需要把这个handleClick传给子组件，当父组件中的一些state变化后（这些state跟子组件没有关系），父组件会reRender，然后会重新创建名为handleClick函数实例，并传给子组件，这时即使用React.memo把子组件包裹起来，子组件也会重新渲染，因为props已经变化了，但这个渲染是无意义的
   *  如何优化呢？这时候就可以用useCallback了，我们用useCallback把函数包起来之后，在父组件中只有当deps变化的时候，才会创建新的handleClick实例，子组件才会跟着reRender（注意，必须要用React.memo把子组件包起来才有用，否则子组件还是会reRender。React.memo是类似于class组件中的Pure.Component的作用）
   *  对于这种deps不是经常变化的情况，我们用useCallback和React.memo的方式可以很好地避免子组件无效的reRender。但其实社区中对这个useCallback的使用也有争议，比如子组件中只是渲染了几个div，没有其他的大量计算，而浏览器去重新渲染几个dom的性能损耗其实也是非常小的，我们花了这么大的劲，使用了useCallback和React.memo，换来的收益很小，所以一些人认为就不用useCallback，就让浏览器去重新渲染好了  
   */