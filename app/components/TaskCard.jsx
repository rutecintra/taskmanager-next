import { Box, Heading, Text, Badge, ButtonGroup, Button, Flex } from "@chakra-ui/react";

export default function TaskCard({ task, onEdit, onDelete, onDragStart }) {
  const statusColor = {
    "pending": "yellow",
    "in-progress": "blue",
    "completed": "green"
  };
  
  const statusText = {
    "pending": "Pendente",
    "in-progress": "Em Progresso",
    "completed": "Concluída"
  };

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      mb={3}
      draggable
      onDragStart={e => onDragStart && onDragStart(e, task)}
    >
      <Flex justifyContent="space-between" alignItems="center" mb={2}>
        <Heading size="sm">{task.title}</Heading>
        <Badge colorScheme={statusColor[task.status]}>{statusText[task.status]}</Badge>
      </Flex>
      
      <Text fontSize="sm" mb={3}>{task.description}</Text>
      
      <ButtonGroup size="sm" variant="outline">
        <Button colorScheme="blue" onClick={() => onEdit(task)}>Editar</Button>
        <Button colorScheme="red" onClick={() => onDelete(task.id)}>Excluir</Button>
      </ButtonGroup>
    </Box>
  );
}