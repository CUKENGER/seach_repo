import { Box } from '@mui/material';
import styles from './App.module.scss';
import Header from './components/Header';
import { useCallback, useEffect, useState } from 'react';
import ResultsList from './components/ResultsList';
import { useLazySearchRepositoriesQuery } from './api/RepoService';
import { formatDate } from './services/formatDate';
import LoadingState from './components/LoadingState';
import WelcomeState from './components/WelcomeState';
import DetailBox from './components/DetailBox';
import { Repository } from './types/Repo';
import ErrorState from './components/ErrorState';

function App() {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);

  const [getRepos, { data: repos, isLoading, isError }] = useLazySearchRepositoriesQuery();
  
  // Функция для выполнения поиска репозиториев
  const handleSearch = useCallback(() => {
    setCursor(undefined);
    getRepos({ query, cursor: undefined, perPage: pageSize });
  }, [query, pageSize])

   // Функция для обработки изменения поискового запроса
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, [])

  // Эффект для выполнения поиска при изменении курсора или размера страницы
  useEffect(() => {
    if (query) {
      getRepos({ query, cursor, perPage: pageSize });
    }
  }, [cursor, pageSize]);

  // Функция для перехода на следующую страницу результатов
  const handleNextPage = () => {
    if (repos?.search.pageInfo.hasNextPage) {
      setCursor(repos.search.pageInfo.endCursor);
    }
  };

  return (
    <Box className={styles.main_box}>
      <Header query={query} handleChange={handleChange} handleSearch={handleSearch} />
      <Box className={styles.main_info_box}>
        {isLoading && <LoadingState />}
        {isError && <ErrorState/>}
        {!isLoading && !isError && !repos && <WelcomeState />}
        {repos && repos.search.edges.length > 0 && (
          <ResultsList
            isLoading={isLoading}
            setPageSize={setPageSize}
            repos={repos.search.edges.map(edge => edge.node)}
            page={cursor ? 2 : 1}
            setPage={handleNextPage}
            totalCount={repos.search.repositoryCount}
            pageSize={pageSize}
            setSelectedRepo={setSelectedRepo}
          />
        )}
        <DetailBox
          selectedRepo={selectedRepo} 
          formatDate={formatDate} 
          />
      </Box>
    </Box>
  );
}

export default App
