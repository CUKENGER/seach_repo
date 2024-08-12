import { TextField, Button, Box } from "@mui/material";
import { FC,useCallback } from "react";
import styles from "./index.module.scss";

interface HeaderProps {
  query: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

const Header: FC<HeaderProps> = ({ query, handleChange, handleSearch }) => {

  // Обработчик нажатии "Enter" для поиска
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [] )

  return (
    <Box
      className={styles.container}
    >
      <TextField  
        onChange={handleChange}
        value={query}
        onKeyDown={handleKeyDown}
        label="Введите поисковой запрос"
        variant="filled"
        className={styles.textField}
      />
      <Button 
        type="button"
        onClick={handleSearch}
        variant="contained" 
        color="primary"
        className={styles.button}
      >
        Искать
      </Button>
    </Box>
  );
}

export default Header
