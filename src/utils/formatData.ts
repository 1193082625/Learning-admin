import { TableColumn } from "@/components/table";

export const formatTableData = (data: Object[]) => {
  const item = data[0];
  const _columns: TableColumn[] = Object.keys(item).filter(key => key !== '_id').map(key => ({
    name: key.toUpperCase(),
    uid: key,
    sortable: true
  }))
  return {
    columns: [..._columns, {name: "ACTIONS", uid: "actions"}],
    initial_visible_columns: [...Object.keys(item).filter(key => key !== '_id'), 'actions']
  }
}