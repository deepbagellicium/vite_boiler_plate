import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

type Column<T> = {
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  render?: (data: T) => React.ReactNode;
};

type ReactMUITableProps<T> = {
  columns: Column<T>[];
  rows: T[];
};

const ReactMUITable = <T,>({ columns, rows }: ReactMUITableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns?.map((column, index) => (
              <TableCell
                key={index}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, index) => (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              {columns?.map((column) => (
                <TableCell key={index} align={column.align}>
                  {column?.render && column?.render(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReactMUITable;
