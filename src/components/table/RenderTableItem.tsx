import { Chip, Tooltip, User } from "@nextui-org/react";
import { EyeIcon } from "../icons/EyeIcon";
import { EditIcon } from "../icons/Edit";
import { DeleteIcon } from "../icons/DeleteIcon";
import Link from "next/link";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function RenderTableItem({dataInfo, columnKey}: any) {
  
  const cellValue = dataInfo[columnKey];

  switch (columnKey) {
    case "title":
      return (
        <Link href={`/articles/${dataInfo._id}`}>{dataInfo.title}</Link>
      );
    case "content":
      return (
        <span>{dataInfo.content}</span>
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
        <Chip className="capitalize" color={statusColorMap[dataInfo.status]} size="sm" variant="flat">
          {cellValue}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip content="Details">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip content="Edit">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" content="Delete">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
}