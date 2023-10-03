import { Box, Pagination, Stack } from "@mui/material";
import { memo } from "react";

export type TypePagination = {
  total: number;
  sliceFrom: number;
  sliceTo: number;
  currentPage: number;
};

function PaginationProduct({
  pagination,
  setPagination,
  page,
}: {
  pagination: TypePagination;
  setPagination: (val: TypePagination) => void;
  page: number;
}) {
  function HandlePageChange(event, numPage) {
    const from = (numPage - 1) * page;
    const to = (numPage - 1) * page + page;
    setPagination({
      ...pagination,
      sliceFrom: from,
      sliceTo: to,
      currentPage: numPage,
    });
  }
  return (
    <>
      <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Stack spacing={5}>
          <Pagination
            color="secondary"
            count={Math.ceil(pagination.total / page)}
            onChange={HandlePageChange}
          />
        </Stack>
      </Box>
    </>
  );
}

export default memo(PaginationProduct);
