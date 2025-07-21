"use client"

import { useEffect, useState } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Plus, MoreHorizontal, MessageCircle, Paperclip } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTask } from "@/contexts/TaskContext"
import { useTaskActions } from "@/hooks/useTaskActions"
import { TaskDialog } from "./TaskDialog"
import { BlockDialog } from "./BlockDialog"
import type { Task, Block } from "@/types"

export function TaskBoard() {
  const { state , dispatch} = useTask()
  const { moveTask, deleteTask, deleteBlock, getUserById } = useTaskActions()
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false)
  const [newTaskBlockId, setNewTaskBlockId] = useState<string>("")

  // Initialize mock data
  useEffect(() => {
    if (state.blocks.length === 0) {
      initializeMockData()
    }
  }, [])

  const initializeMockData = () => {
    // This would typically come from an API
    const mockUsers = [
      { id: "1", name: "João Silva", email: "joao@email.com", role: "admin" as const, createdAt: new Date() },
      { id: "2", name: "Maria Santos", email: "maria@email.com", role: "user" as const, createdAt: new Date() },
      { id: "3", name: "Pedro Costa", email: "pedro@email.com", role: "user" as const, createdAt: new Date() },
      { id: "4", name: "Ana Oliveira", email: "ana@email.com", role: "viewer" as const, createdAt: new Date() },
    ]

    const mockBlocks = [
      {
        id: "1",
        title: "A Fazer",
        description: "Tarefas pendentes",
        color: "#ef4444",
        position: 1,
        allowedUsers: ["1", "2", "3", "4"],
        allowedGroups: [],
        createdBy: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        tasks: [
          {
            id: "1",
            title: "Implementar autenticação",
            description: "Criar sistema de login com JWT",
            blockId: "1",
            assignedUsers: ["1", "2"],
            assignedGroups: [],
            createdBy: "1",
            createdAt: new Date(),
            updatedAt: new Date(),
            priority: "high" as const,
            status: "todo" as const,
            comments: [],
            attachments: [],
            tags: ["backend", "security"],
          },
        ],
      },
      {
        id: "2",
        title: "Em Progresso",
        description: "Tarefas em desenvolvimento",
        color: "#f97316",
        position: 2,
        allowedUsers: ["1", "2", "3", "4"],
        allowedGroups: [],
        createdBy: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        tasks: [
          {
            id: "2",
            title: "Design da interface",
            description: "Criar mockups das telas principais",
            blockId: "2",
            assignedUsers: ["3"],
            assignedGroups: [],
            createdBy: "1",
            createdAt: new Date(),
            updatedAt: new Date(),
            priority: "medium" as const,
            status: "in-progress" as const,
            comments: [
              {
                id: "1",
                taskId: "2",
                userId: "3",
                content: "Iniciando os wireframes",
                createdAt: new Date(),
              },
            ],
            attachments: [],
            tags: ["design", "ui"],
          },
        ],
      },
      {
        id: "3",
        title: "Concluído",
        description: "Tarefas finalizadas",
        color: "#22c55e",
        position: 3,
        allowedUsers: ["1", "2", "3", "4"],
        allowedGroups: [],
        createdBy: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        tasks: [],
      },
    ]

    // Initialize data
    dispatch({ type: "SET_USERS", payload: mockUsers })
    dispatch({ type: "SET_CURRENT_USER", payload: mockUsers[0] })
    dispatch({ type: "SET_BLOCKS", payload: mockBlocks })
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination, draggableId } = result

    if (source.droppableId !== destination.droppableId) {
      moveTask(draggableId, destination.droppableId)
    }
  }

  const openTaskDialog = (task?: Task, blockId?: string) => {
    setSelectedTask(task || null)
    setNewTaskBlockId(blockId || "")
    setIsTaskDialogOpen(true)
  }

  const openBlockDialog = (block?: Block) => {
    setSelectedBlock(block || null)
    setIsBlockDialogOpen(true)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-purple-500"
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const sortedBlocks = [...state.blocks].sort((a, b) => a.position - b.position)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sistema de Gerenciamento de Tarefas</h1>
            <p className="text-gray-600">Organize suas tarefas em blocos e colabore com sua equipe</p>
          </div>
          <Button onClick={() => openBlockDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Bloco
          </Button>
        </div>
      </div>

      <div className="p-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex gap-6 overflow-x-auto pb-6">
            {sortedBlocks.map((block) => (
              <div key={block.id} className="min-w-[320px] max-w-[320px]">
                <Card className="h-fit max-h-[calc(100vh-200px)] flex flex-col">
                  <CardHeader className="flex-shrink-0 pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: block.color }} />
                        <CardTitle className="text-sm font-medium">{block.title}</CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {block.tasks.length}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => openBlockDialog(block)}>Editar Bloco</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              if (block.tasks.length > 0) {
                                alert("Não é possível excluir um bloco que contém tarefas.")
                                return
                              }
                              if (confirm("Tem certeza que deseja excluir este bloco?")) {
                                deleteBlock(block.id)
                              }
                            }}
                            className="text-red-600"
                          >
                            Excluir Bloco
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 overflow-hidden flex flex-col">
                    <Button
                      variant="outline"
                      className="mb-4 w-full border-dashed bg-transparent"
                      onClick={() => openTaskDialog(undefined, block.id)}
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Nova Tarefa
                    </Button>

                    <Droppable droppableId={block.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`flex-1 overflow-y-auto space-y-3 ${
                            snapshot.isDraggingOver ? "bg-blue-50 rounded-lg" : ""
                          }`}
                        >
                          {block.tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`${snapshot.isDragging ? "rotate-2 shadow-lg" : ""}`}
                                >
                                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                      <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-medium text-sm flex-1">{task.title}</h3>
                                        <div className="flex items-center gap-1">
                                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                                          <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                              <Button variant="ghost" size="sm">
                                                <MoreHorizontal className="h-3 w-3" />
                                              </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                              <DropdownMenuItem onClick={() => openTaskDialog(task)}>
                                                Editar Tarefa
                                              </DropdownMenuItem>
                                              <DropdownMenuItem
                                                onClick={() => {
                                                  if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
                                                    deleteTask(task.id)
                                                  }
                                                }}
                                                className="text-red-600"
                                              >
                                                Excluir Tarefa
                                              </DropdownMenuItem>
                                            </DropdownMenuContent>
                                          </DropdownMenu>
                                        </div>
                                      </div>

                                      {task.description && (
                                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                                      )}

                                      {task.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-3">
                                          {task.tags.slice(0, 3).map((tag) => (
                                            <Badge key={tag} variant="secondary" className="text-xs">
                                              {tag}
                                            </Badge>
                                          ))}
                                          {task.tags.length > 3 && (
                                            <Badge variant="secondary" className="text-xs">
                                              +{task.tags.length - 3}
                                            </Badge>
                                          )}
                                        </div>
                                      )}

                                      {task.assignedUsers.length > 0 && (
                                        <div className="flex items-center gap-2 mb-3">
                                          <div className="flex -space-x-2">
                                            {task.assignedUsers.slice(0, 3).map((userId) => {
                                              const user = getUserById(userId)
                                              return user ? (
                                                <Avatar key={userId} className="h-6 w-6 border-2 border-white">
                                                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                                                  <AvatarFallback className="text-xs">
                                                    {user.name
                                                      .split(" ")
                                                      .map((n) => n[0])
                                                      .join("")}
                                                  </AvatarFallback>
                                                </Avatar>
                                              ) : null
                                            })}
                                            {task.assignedUsers.length > 3 && (
                                              <div className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                                                <span className="text-xs">+{task.assignedUsers.length - 3}</span>
                                              </div>
                                            )}
                                          </div>
                                        </div>
                                      )}

                                      <div className="flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center gap-3">
                                          <button
                                            className="flex items-center gap-1 hover:text-gray-700"
                                            onClick={() => openTaskDialog(task)}
                                          >
                                            <MessageCircle className="h-3 w-3" />
                                            {task.comments.length}
                                          </button>
                                          <span className="flex items-center gap-1">
                                            <Paperclip className="h-3 w-3" />
                                            {task.attachments.length}
                                          </span>
                                        </div>
                                        <span>{task.createdAt.toLocaleDateString()}</span>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </DragDropContext>
      </div>

      <TaskDialog
        isOpen={isTaskDialogOpen}
        onClose={() => setIsTaskDialogOpen(false)}
        task={selectedTask}
        blockId={newTaskBlockId}
      />

      <BlockDialog isOpen={isBlockDialogOpen} onClose={() => setIsBlockDialogOpen(false)} block={selectedBlock} />
    </div>
  )
}
