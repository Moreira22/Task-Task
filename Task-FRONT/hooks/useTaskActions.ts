import { useTask } from "@/contexts/TaskContext"
import type { Block, Task, Comment, Attachment } from "@/types"

export function useTaskActions() {
  const { dispatch, state } = useTask()

  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9)

  const createBlock = (blockData: Omit<Block, "id" | "createdAt" | "updatedAt" | "tasks">) => {
    const newBlock: Block = {
      ...blockData,
      id: generateId(),
      tasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    dispatch({ type: "ADD_BLOCK", payload: newBlock })
  }

  const updateBlock = (id: string, updates: Partial<Block>) => {
    dispatch({ type: "UPDATE_BLOCK", payload: { id, updates: { ...updates, updatedAt: new Date() } } })
  }

  const deleteBlock = (id: string) => {
    dispatch({ type: "DELETE_BLOCK", payload: id })
  }

  const createTask = (blockId: string, taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "blockId">) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
      blockId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    dispatch({ type: "ADD_TASK", payload: { blockId, task: newTask } })
  }

  const updateTask = (id: string, updates: Partial<Task>) => {
    dispatch({ type: "UPDATE_TASK", payload: { id, updates: { ...updates, updatedAt: new Date() } } })
  }

  const moveTask = (taskId: string, targetBlockId: string) => {
    dispatch({ type: "MOVE_TASK", payload: { taskId, targetBlockId } })
  }

  const deleteTask = (id: string) => {
    dispatch({ type: "DELETE_TASK", payload: id })
  }

  const addComment = (taskId: string, content: string) => {
    if (!state.currentUser) return

    const comment: Comment = {
      id: generateId(),
      taskId,
      userId: state.currentUser.id,
      content,
      createdAt: new Date(),
    }
    dispatch({ type: "ADD_COMMENT", payload: { taskId, comment } })
  }

  const addAttachment = (taskId: string, file: File) => {
    if (!state.currentUser) return

    const attachment: Attachment = {
      id: generateId(),
      taskId,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file),
      fileType: file.type,
      fileSize: file.size,
      uploadedBy: state.currentUser.id,
      uploadedAt: new Date(),
    }
    dispatch({ type: "ADD_ATTACHMENT", payload: { taskId, attachment } })
  }

  const getUserById = (id: string) => {
    return state.users.find((user) => user.id === id)
  }

  const getTaskById = (id: string) => {
    for (const block of state.blocks) {
      const task = block.tasks.find((task) => task.id === id)
      if (task) return task
    }
    return null
  }

  return {
    createBlock,
    updateBlock,
    deleteBlock,
    createTask,
    updateTask,
    moveTask,
    deleteTask,
    addComment,
    addAttachment,
    getUserById,
    getTaskById,
  }
}
