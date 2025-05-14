import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Textarea, Select } from "@chakra-ui/react";

export default function TaskForm({ onSubmit, initialData = null }) {
  const [task, setTask] = useState(initialData || {
    title: "",
    description: "",
    status: "pending"
  });
  
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    if (!initialData) {
      setTask({ title: "", description: "", status: "pending" });
    }
  };
  
  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth={1} borderRadius="md" mb={4}>
      <FormControl mb={3} isRequired>
        <FormLabel>Título</FormLabel>
        <Input name="title" value={task.title} onChange={handleChange} />
      </FormControl>
      
      <FormControl mb={3}>
        <FormLabel>Descrição</FormLabel>
        <Textarea name="description" value={task.description} onChange={handleChange} />
      </FormControl>
      
      <FormControl mb={3}>
        <FormLabel>Status</FormLabel>
        <Select name="status" value={task.status} onChange={handleChange}>
          <option value="pending">Pendente</option>
          <option value="in-progress">Em Progresso</option>
          <option value="completed">Concluída</option>
        </Select>
      </FormControl>
      
      <Button type="submit" colorScheme="blue">
        {initialData ? "Atualizar" : "Adicionar"} Tarefa
      </Button>
    </Box>
  );
}