import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Images {
  data: {
    description: string;
    id: string;
    title: string;
    ts: number;
    url: string;
  }[],
  after: string | null
}

export default function Home(): JSX.Element {
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const { data } = await api.get<Images>('api/images', {
        params: {
          after: pageParam
        }
      });
      return data;
    },
    {
      getNextPageParam: (images) => images.after || null
    }
  );


  const formattedData = useMemo(() => data?.pages.map(i => i.data).flat(), [data]);
  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <Error />
  }
  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && <Button onClick={() => fetchNextPage()}>Carregar mais</Button>}
        {isFetchingNextPage && <Loading />}
      </Box>
    </>
  );
}
