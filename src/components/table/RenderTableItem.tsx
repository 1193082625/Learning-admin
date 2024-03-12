import { Chip, Link, Tooltip, User } from "@nextui-org/react";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

interface TableAction {
  key: string;
  content: any;
  tips: string;
  color?: "success" | "danger" | "warning" | "primary" | "default" | "secondary" | "foreground";
  onclick: Function;
}
export type TableActions = TableAction[];

type TableItemProps = {
  dataInfo: any;
  actions: TableActions | undefined;
  columnKey: any;
  [key: string]: any;
}

export default function RenderTableItem({dataInfo, actions, columnKey, ...props}: TableItemProps) {
  
  const cellValue = dataInfo[columnKey];

  switch (columnKey) {
    case "title":
      return (
        <Link href={`/articles/${dataInfo._id}`}>{dataInfo.title}</Link>
      );
    case "content":
      return (
        <div
          className="richtext"
          dangerouslySetInnerHTML={{ __html: dataInfo.content }}
        ></div>
      );
    case "like_num":
    case "favourite_num":
      return (
        <Chip color="primary">{dataInfo[columnKey]}</Chip>
      );
    case "create_at":
    case "update_at":
      return (
        <span>{dataInfo[columnKey]}</span>
      );
    case "name":
      return (
        <User
          avatarProps={{radius: "full", size: "sm", src: dataInfo.avatar}}
          classNames={{
            description: "text-default-500",
          }}
          description={dataInfo.email}
          name={cellValue}
        >
          {dataInfo.email}
        </User>
      );
    case "role":
      return (
        <div className="flex flex-col">
          <p className="text-bold text-small capitalize">{cellValue}</p>
          <p className="text-bold text-tiny capitalize text-default-400">{dataInfo.team}</p>
        </div>
      );
    case "status":
      return (
        <Chip className="capitalize" color={statusColorMap[dataInfo.status as keyof typeof statusColorMap] as any} size="sm" variant="flat">
          {cellValue}
        </Chip>
      );
    case "actions":
      if(!actions?.length) return null;
      return (
        <div className="relative flex items-center gap-2">
          {
            actions.map((actionItem: TableAction, index) => {
              return (
                <Tooltip color={actionItem.color || 'default' } content={actionItem.tips} key={index}>
                <span
                  className={['text-lg cursor-pointer active:opacity-50', `text-${actionItem.color}`].join(' ')}
                  onClick={(e) => actionItem.onclick(e, dataInfo)}
                >
                  {actionItem.content}
                </span>
              </Tooltip>
              )
            })
          }
        </div>
      );
    default:
      return cellValue;
  }
}