"use client";

import { useState, useEffect } from "react";
import { Box, Container, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const toast = useToast();
  
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  
  // Redireciona para login se não estiver autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);
  
  // Carrega as tarefas
  useEffect(() => {
    if (session) {
      fetchTasks();
    }
  }, [session, statusFilter]);
  
  const fetchTasks = async () => {
    try {
      const url = statusFilter 
        ? `/api/tasks?status=${statusFilter}` 
        : "/api/tasks";
      
      const response = await fetch(url);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      toast({
        title: "Erro ao carregar tarefas",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  const handleAddTask = async (task) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      
      if (response.ok) {
        fetchTasks();
        toast({
          title: "Tarefa adicionada com sucesso",
          status: "success",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao adicionar tarefa",
        status: "error",
        duration: 3000,
      });
    }
  };
  
  const handleUpdateTask = async (task) => {
    try {
      const response = await fetch("/api/tasks", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      
      if (response.ok) {
        setEditingTask(null);
        fetchTasks();
        toast({
          title: "Tarefa atualizada com sucesso",
          status: "success",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao atualizar tarefa",
        status: "error",
        duration: 3000,
      });
    }
  };
  
  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks?id=${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        fetchTasks();
        toast({
          title: "Tarefa excluída com sucesso",
          status: "success",
          duration: 2000,
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao excluir tarefa",
        status: "error",
        duration: 3000,
      });
    }
  };
  
  // Se estiver carregando ou não autenticado, não renderiza o conteúdo
  if (status === "loading" || status === "unauthenticated") {
    return null;
  }
  
  return (
    <Box>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <Box mb={8}>
          {editingTask ? (
            <>
              <TaskForm 
                onSubmit={handleUpdateTask} 
                initialData={editingTask}
              />
              <Box mb={2}>
                <Box 
                  as="button" 
                  color="blue.500" 
                  onClick={() => setEditingTask(null)}
                >
                  Cancelar edição
                </Box>
              </Box>
            </>
          ) : (
            <TaskForm onSubmit={handleAddTask} />
          )}
        </Box>
        
        <TaskList 
          tasks={tasks}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
        />
      </Container>
    </Box>
  );
}