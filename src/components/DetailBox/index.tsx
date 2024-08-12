import { Box, Typography } from "@mui/material";
import styles from './index.module.scss'
import { FC } from "react";
import { Repository } from "../../types/Repo";

interface DetailBoxProps{
  selectedRepo: Repository | null; 
  formatDate: (date: string) => string;
}

const DetailBox:FC<DetailBoxProps> = ({ selectedRepo, formatDate }) => {

  if (!selectedRepo) {
    return (
      <Box className={styles.detail_empty_box}>
        <Typography>Выберите репозиторий</Typography>
      </Box>
    )
  }
  
  return (
    <Box className={styles.detail_box}>
      <Typography className={styles.title} variant="h6">{selectedRepo.name || 'Нет данных'}</Typography>
      <Typography className={styles.text}>Описание: {selectedRepo?.description || 'Нет данных'}</Typography>
      <Typography className={styles.text}>Лицензия: {selectedRepo?.licenseInfo?.name || 'Нет данных'}</Typography>
      <Typography className={styles.text}>Последнее обновление: {selectedRepo ? formatDate(selectedRepo.updatedAt) : 'Нет данных'}</Typography>
    </Box>
  )
};

export default DetailBox