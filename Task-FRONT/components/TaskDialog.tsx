"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, MessageCircle, Paperclip, Send, Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTask } from "@/contexts/TaskContext"
import { useTaskActions } from "@/hooks/useTaskActions"
import type { Task } from "@/types"

interface TaskDialogProps {
  isOpen: boolean
  onClose: () => void
  task?: Task | null
  blockId?: string
}

export function TaskDialog({ isOpen, onClose, task, blockId }: TaskDialogProps) {
  const { state } = useTask()
  const { createTask, updateTask, addComment, addAttachment, getUserById } = useTaskActions()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as const,
    assignedUsers: [] as string[],
    dueDate: "",
    tags: "",
  })

  const [newComment, setNewComment] = useState("")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const isEditMode = !!task

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        assignedUsers: task.assignedUsers,
        dueDate: task.dueDate ? task.dueDate.toISOString().split("T")[0] : "",
        tags: task.tags.join(", "),
      })
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        assignedUsers: [],
        dueDate: "",
        tags: "",
      })
    }
  }, [task])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) return

    const taskData = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      assignedUsers: formData.assignedUsers,
      assignedGroups: [],
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      tags: formData.tags
        ? formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag)
        : [],
      status: task?.status || ("todo" as const),
      comments: task?.comments || [],
      attachments: task?.attachments || [],
      createdBy: state.currentUser?.id || "",
    }

    if (isEditMode && task) {
      updateTask(task.id, taskData)
    } else if (blockId) {
      createTask(blockId, taskData)
    }

    onClose()
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !task) return

    addComment(task.id, newComment.trim())
    setNewComment("")
  }

  const handleFileUpload = () => {
    if (selectedFiles.length === 0 || !task) return

    selectedFiles.forEach((file) => {
      addAttachment(task.id, file)
    })

    setSelectedFiles([])
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const priorities = [
    { value: "low", label: "Baixa", color: "bg-green-500" },
    { value: "medium", label: "Média", color: "bg-yellow-500" },
    { value: "high", label: "Alta", color: "bg-red-500" },
    { value: "urgent", label: "Urgente", color: "bg-purple-500" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Editar Tarefa" : "Nova Tarefa"}</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="flex-1 overflow-hidden flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Detalhes</TabsTrigger>
            {isEditMode && <TabsTrigger value="comments">Comentários ({task?.comments.length || 0})</TabsTrigger>}
            {isEditMode && <TabsTrigger value="attachments">Anexos ({task?.attachments.length || 0})</TabsTrigger>}
          </TabsList>

          <TabsContent value="details" className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Título da Tarefa *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Digite o título da tarefa"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva a tarefa..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${priority.color}`} />
                            {priority.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="dueDate">Data de Vencimento</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="assignedUsers">Usuários Atribuídos</Label>
                <Select
                  value={formData.assignedUsers.join(",")}
                  onValueChange={(value) => setFormData({ ...formData, assignedUsers: value ? value.split(",") : [] })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione os usuários">
                      {formData.assignedUsers.length > 0 && (
                        <div className="flex gap-1">
                          {formData.assignedUsers.slice(0, 2).map((userId) => {
                            const user = getUserById(userId)
                            return user ? (
                              <Badge key={userId} variant="secondary" className="text-xs">
                                {user.name}
                              </Badge>
                            ) : null
                          })}
                          {formData.assignedUsers.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{formData.assignedUsers.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {state.users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Separe as tags por vírgula"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancelar
                </Button>
                <Button type="submit">{isEditMode ? "Atualizar" : "Criar"} Tarefa</Button>
              </div>
            </form>
          </TabsContent>

          {isEditMode && (
            <TabsContent value="comments" className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {task?.comments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle className="mx-auto h-12 w-12 mb-2" />
                    <p>Nenhum comentário ainda</p>
                  </div>
                ) : (
                  task?.comments.map((comment) => {
                    const user = getUserById(comment.userId)
                    return (
                      <div key={comment.id} className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {user?.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{user?.name}</span>
                            <span className="text-xs text-gray-500">{comment.createdAt.toLocaleString()}</span>
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              <div className="flex gap-2">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Adicionar comentário..."
                  rows={2}
                  className="flex-1"
                />
                <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </TabsContent>
          )}

          {isEditMode && (
            <TabsContent value="attachments" className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {task?.attachments.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <Paperclip className="mx-auto h-12 w-12 mb-2" />
                    <p>Nenhum anexo ainda</p>
                  </div>
                ) : (
                  task?.attachments.map((attachment) => {
                    const user = getUserById(attachment.uploadedBy)
                    return (
                      <div key={attachment.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <Paperclip className="h-5 w-5 text-gray-500" />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{attachment.fileName}</div>
                          <div className="text-xs text-gray-500">
                            {formatFileSize(attachment.fileSize)} • Enviado por {user?.name} •{" "}
                            {attachment.uploadedAt.toLocaleString()}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Upload className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <span>
                        <Plus className="mr-2 h-4 w-4" />
                        Selecionar Arquivos
                      </span>
                    </Button>
                  </label>
                </div>

                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Arquivos Selecionados:</h4>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <Paperclip className="h-4 w-4" />
                        <span>
                          {file.name} ({formatFileSize(file.size)})
                        </span>
                      </div>
                    ))}
                    <Button onClick={handleFileUpload} className="w-full">
                      <Upload className="mr-2 h-4 w-4" />
                      Fazer Upload
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
