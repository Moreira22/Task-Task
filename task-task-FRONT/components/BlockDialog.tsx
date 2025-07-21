"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTask } from "@/contexts/TaskContext"
import { useTaskActions } from "@/hooks/useTaskActions"
import type { Block } from "@/types"

interface BlockDialogProps {
  isOpen: boolean
  onClose: () => void
  block?: Block | null
}

export function BlockDialog({ isOpen, onClose, block }: BlockDialogProps) {
  const { state } = useTask()
  const { createBlock, updateBlock } = useTaskActions()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    color: "#3b82f6",
    allowedUsers: [] as string[],
  })

  const isEditMode = !!block

  useEffect(() => {
    if (block) {
      setFormData({
        title: block.title,
        description: block.description,
        color: block.color,
        allowedUsers: block.allowedUsers,
      })
    } else {
      setFormData({
        title: "",
        description: "",
        color: "#3b82f6",
        allowedUsers: [],
      })
    }
  }, [block])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) return

    const blockData = {
      title: formData.title,
      description: formData.description,
      color: formData.color,
      allowedUsers: formData.allowedUsers,
      allowedGroups: [],
      position: block?.position || state.blocks.length + 1,
      createdBy: state.currentUser?.id || "",
    }

    if (isEditMode && block) {
      updateBlock(block.id, blockData)
    } else {
      createBlock(blockData)
    }

    onClose()
  }

  const colorOptions = [
    { value: "#ef4444", label: "Vermelho" },
    { value: "#f97316", label: "Laranja" },
    { value: "#eab308", label: "Amarelo" },
    { value: "#22c55e", label: "Verde" },
    { value: "#3b82f6", label: "Azul" },
    { value: "#8b5cf6", label: "Roxo" },
    { value: "#ec4899", label: "Rosa" },
    { value: "#6b7280", label: "Cinza" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Editar Bloco" : "Novo Bloco"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Título do Bloco *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Digite o título do bloco"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descreva o bloco..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="color">Cor do Bloco</Label>
            <Select value={formData.color} onValueChange={(value) => setFormData({ ...formData, color: value })}>
              <SelectTrigger>
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: formData.color }} />
                    {colorOptions.find((c) => c.value === formData.color)?.label}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color.value }} />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="allowedUsers">Usuários Permitidos</Label>
            <Select
              value={formData.allowedUsers.join(",")}
              onValueChange={(value) => setFormData({ ...formData, allowedUsers: value ? value.split(",") : [] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione os usuários">
                  {formData.allowedUsers.length > 0 && `${formData.allowedUsers.length} usuário(s) selecionado(s)`}
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

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{isEditMode ? "Atualizar" : "Criar"} Bloco</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
