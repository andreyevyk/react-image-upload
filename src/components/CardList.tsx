import { Box, Grid, SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure()
  const [imgUrl, setImgUrl] = useState('');

  const onClickImage = (url: string) => {
    setImgUrl(url);
    onToggle();
  }

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        {cards.map(card => (
          <Card data={card} key={card.id} viewImage={onClickImage} />
        ))}
      </Grid>

      <ModalViewImage
        imgUrl={imgUrl}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
