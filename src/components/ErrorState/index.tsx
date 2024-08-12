import { Box, Typography } from "@mui/material";
import styles from './index.module.scss'

const ErrorState = () => (
  <Box className={styles.center_box}>
    <Typography variant="h6">Ошибка при загрузке данных</Typography>
  </Box>
);

export default ErrorState