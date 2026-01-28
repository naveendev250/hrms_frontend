import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

function CustomModal({ isOpen, onClose, title, children }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(2px)" />
      <ModalContent mx={3}>
        <ModalHeader fontSize="sm" py={3} letterSpacing="tight">{title}</ModalHeader>
        <ModalCloseButton size="sm" />
        <ModalBody pb={4} pt={0}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CustomModal
