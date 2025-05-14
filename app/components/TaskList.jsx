import { useState, useEffect } from "react";
import { Box, SimpleGrid, Select, Heading, Flex } from "@chakra-ui/react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks, statusFilter, onStatusChange, onEdit, onDelete }) {
  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="md">Minhas Tarefas</Heading>
        <Box>
          <Select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
            <option value="">Todas</option>
            <option value="pending">Pendente</option>
            <option value="in-progress">Em Progresso</option>
            <option value="completed">Concluída</option>
          </Select>
        </Box>
      </Flex>
      
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {tasks.map(task => (
          <TaskCard 
            key={task.id} 
            task={task} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}