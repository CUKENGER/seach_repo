import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import styles from "./index.module.scss"
import { FC } from "react";
import { formatDate } from "../../services/formatDate";
import { Repository } from "../../types/Repo";

interface ResultsListProps{
  repos: Repository[];
  page: number;
  setPage: (e:number) => void;
  totalCount: number;
  pageSize: number;
  setPageSize: (size: number) => void;
  isLoading: boolean;
  setSelectedRepo: (repo: Repository) => void;
}

const ResultsList:FC<ResultsListProps> = ({repos, page, setPage, totalCount, pageSize, setPageSize, isLoading, setSelectedRepo}) => {

  // Определение колонок для таблицы
  const columns = [
    { field: 'name', headerName: 'Название', flex: 1, minWidth: 90},
    { field: 'primaryLanguage', headerName: 'Язык', flex: 1, minWidth: 90, valueGetter: (params: {name: string}) => {
      return params ? params.name : 'Нет данных';
    },},
    { field: 'forkCount', headerName: 'Число форков', flex: 0.5, minWidth: 70 },
    { field: 'stargazerCount', headerName: 'Число звёзд', flex: 0.5, minWidth: 70 },
    { field: 'updatedAt', headerName: 'Дата обновления', flex: 1, minWidth: 100, valueGetter: (params: string) => {
        return params ? formatDate(params) : 'Нет данных';
      },
    },
  ]

  return (
    <Box className={styles.box}>
      <h1 className={styles.title}>Результаты поиска</h1>
        <DataGrid
          className={styles.dataGrid}
          rows={repos}
          columns={columns}
          paginationModel={{
            pageSize: pageSize,
            page: page - 1,
          }}
          onPaginationModelChange={(model) => {
            setPage(model.page + 1);
            setPageSize(model.pageSize);
          }}
          onRowClick={(params) => setSelectedRepo(params.row)}
          pagination
          paginationMode="server"
          rowCount={totalCount}
          autoHeight
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 20]}
          loading={isLoading}
        />
    </Box>
  );
}

export default ResultsList
