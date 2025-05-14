import { Box, Heading, Button, VStack } from "@chakra-ui/react";
import TaskCard from "./TaskCard";

const statusList = [
  { key: "pending", label: "Pendente" },
  { key: "in-progress", label: "Em Progresso" },
  { key: "completed", label: "Concluída" },
];

export default function KanbanBoard({ tasks, onEdit, onDelete, onCreateTask, onMoveTask }) {
  const handleDragStart = (e, task) => {
    e.dataTransfer.setData("text/plain", task.id);
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    onMoveTask && onMoveTask(taskId, newStatus);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <Box display="flex" gap={4} w="100%" overflowX="auto">
      {statusList.map(({ key, label }) => (
        <Box
          key={key}
          flex="1"
          minW="300px"
          bg="gray.50"
          p={4}
          borderRadius="md"
          onDrop={e => handleDrop(e, key)}
          onDragOver={handleDragOver}
        >
          <Heading size="md" mb={4} textAlign="center">{label}</Heading>
          <VStack spacing={3} align="stretch">
            {tasks.filter(task => task.status === key).map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onDragStart={handleDragStart}
              />
            ))}
            <Button colorScheme="blue" variant="outline" onClick={() => onCreateTask(key)}>
              Criar Tarefa
            </Button>
          </VStack>
        </Box>
      ))}
    </Box>
  );
}