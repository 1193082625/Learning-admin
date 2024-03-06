import { Pagination } from "@nextui-org/react";

export default function LTableBottom({selectedKeys, filteredItems, onRowsPerPageChange, page, pages, setPage, ...props}: any) {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {`已选中${selectedKeys.size}条，共${filteredItems.length}条`}
        </span>
       <div className="flex items-center gap-4">
          <label className="flex items-center text-default-400 text-small">
            每页显示:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      </div>
  )
}