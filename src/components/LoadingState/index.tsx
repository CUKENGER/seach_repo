import { Box, CircularProgress } from "@mui/material";
import styles from './index.module.scss'

const LoadingState = () => (
  <Box className={styles.center_box}>
    <CircularProgress />
  </Box>
);

export default LoadingState