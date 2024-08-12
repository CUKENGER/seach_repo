import { Box, Typography } from "@mui/material";
import styles from './index.module.scss'

const WelcomeState = () => (
  <Box className={styles.welcome_box}>
    <Typography variant="h3" className={styles.title}>Добро пожаловать</Typography>
  </Box>
);

export default WelcomeState