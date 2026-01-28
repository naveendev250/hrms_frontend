import { Box, Spinner, Text, VStack } from '@chakra-ui/react'

function Loading({ message = 'Loading...' }) {
  return (
    <VStack py={12} spacing={2}>
      <Spinner size="md" color="blue.500" thickness="2px" speed="0.65s" />
      <Text fontSize="10px" color="gray.500">{message}</Text>
    </VStack>
  )
}

export default Loading
