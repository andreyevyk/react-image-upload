import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}

    >
      <ModalOverlay />
      <ModalContent
        bgColor="pGray.800"
      >
        <ModalBody
          p={0}
          maxW={900} maxH={600}
        >
          <Image src={imgUrl} />
        </ModalBody>
        <ModalFooter
          justifyContent="flex-start"
          p={3}
          color="pGray.50"
          fontSize={15}
        >
          <Link href={imgUrl} isExternal>
            Abrir original
          </Link>
        </ModalFooter>

      </ModalContent>
    </Modal>
  )
}
