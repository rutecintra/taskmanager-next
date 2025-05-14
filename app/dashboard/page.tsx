"use client";

import { useState, useEffect } from "react";
import { Box, Container, useToast, useDisclosure } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Navbar from "../components/Navbar";
import KanbanBoard from "../components/KanbanBoard";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [initialStatus, setInitialStatus] = useState("pending");
  
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
  
  const handleOpenCreateTask = (status = "pending") => {
    setInitialStatus(status);
    onOpen();
  };
  
  const handleMoveTask = async (taskId, newStatus) => {
    const task = tasks.find(t => t.id == taskId);
    if (task && task.status !== newStatus) {
      await handleUpdateTask({ ...task, status: newStatus });
    }
  };
  
  // Se estiver carregando ou não autenticado, não renderiza o conteúdo
  if (status === "loading" || status === "unauthenticated") {
    return null;
  }
  
  return (
    <Box>
      <Navbar onCreateTask={() => handleOpenCreateTask()} />
      <Container maxW="container.xl" py={8}>
        {/* Remova ou comente este bloco abaixo */}
        {/* <Box mb={8}>
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
        </Box> */}
        
        <KanbanBoard
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDeleteTask}
          onCreateTask={handleOpenCreateTask}
          onMoveTask={handleMoveTask}
        />
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Criar Tarefa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm
              onSubmit={async (task) => {
                await handleAddTask(task);
                onClose();
              }}
              initialData={{ status: initialStatus }}
              mode="create"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}