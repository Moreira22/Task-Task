"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { Block, Task, User, UserGroup, Comment, Attachment } from "@/types"

interface TaskState {
  blocks: Block[]
  users: User[]
  groups: UserGroup[]
  currentUser: User | null
}

type TaskAction =
  | { type: "SET_BLOCKS"; payload: Block[] }
  | { type: "ADD_BLOCK"; payload: Block }
  | { type: "UPDATE_BLOCK"; payload: { id: string; updates: Partial<Block> } }
  | { type: "DELETE_BLOCK"; payload: string }
  | { type: "ADD_TASK"; payload: { blockId: string; task: Task } }
  | { type: "UPDATE_TASK"; payload: { id: string; updates: Partial<Task> } }
  | { type: "MOVE_TASK"; payload: { taskId: string; targetBlockId: string } }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "ADD_COMMENT"; payload: { taskId: string; comment: Comment } }
  | { type: "ADD_ATTACHMENT"; payload: { taskId: string; attachment: Attachment } }
  | { type: "SET_USERS"; payload: User[] }
  | { type: "SET_GROUPS"; payload: UserGroup[] }
  | { type: "SET_CURRENT_USER"; payload: User }

const initialState: TaskState = {
  blocks: [],
  users: [],
  groups: [],
  currentUser: null,
}

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case "SET_BLOCKS":
      return { ...state, blocks: action.payload }

    case "ADD_BLOCK":
      return { ...state, blocks: [...state.blocks, action.payload] }

    case "UPDATE_BLOCK":
      return {
        ...state,
        blocks: state.blocks.map((block) =>
          block.id === action.payload.id ? { ...block, ...action.payload.updates } : block,
        ),
      }

    case "DELETE_BLOCK":
      return {
        ...state,
        blocks: state.blocks.filter((block) => block.id !== action.payload),
      }

    case "ADD_TASK":
      return {
        ...state,
        blocks: state.blocks.map((block) =>
          block.id === action.payload.blockId ? { ...block, tasks: [...block.tasks, action.payload.task] } : block,
        ),
      }

    case "UPDATE_TASK":
      return {
        ...state,
        blocks: state.blocks.map((block) => ({
          ...block,
          tasks: block.tasks.map((task) =>
            task.id === action.payload.id ? { ...task, ...action.payload.updates } : task,
          ),
        })),
      }

    case "MOVE_TASK":
      const { taskId, targetBlockId } = action.payload
      let taskToMove: Task | null = null

      // Remove task from source block
      const blocksWithoutTask = state.blocks.map((block) => ({
        ...block,
        tasks: block.tasks.filter((task) => {
          if (task.id === taskId) {
            taskToMove = { ...task, blockId: targetBlockId, updatedAt: new Date() }
            return false
          }
          return true
        }),
      }))

      // Add task to target block
      if (taskToMove) {
        return {
          ...state,
          blocks: blocksWithoutTask.map((block) =>
            block.id === targetBlockId ? { ...block, tasks: [...block.tasks, taskToMove!] } : block,
          ),
        }
      }
      return state

    case "DELETE_TASK":
      return {
        ...state,
        blocks: state.blocks.map((block) => ({
          ...block,
          tasks: block.tasks.filter((task) => task.id !== action.payload),
        })),
      }

    case "ADD_COMMENT":
      return {
        ...state,
        blocks: state.blocks.map((block) => ({
          ...block,
          tasks: block.tasks.map((task) =>
            task.id === action.payload.taskId
              ? { ...task, comments: [...task.comments, action.payload.comment] }
              : task,
          ),
        })),
      }

    case "ADD_ATTACHMENT":
      return {
        ...state,
        blocks: state.blocks.map((block) => ({
          ...block,
          tasks: block.tasks.map((task) =>
            task.id === action.payload.taskId
              ? { ...task, attachments: [...task.attachments, action.payload.attachment] }
              : task,
          ),
        })),
      }

    case "SET_USERS":
      return { ...state, users: action.payload }

    case "SET_GROUPS":
      return { ...state, groups: action.payload }

    case "SET_CURRENT_USER":
      return { ...state, currentUser: action.payload }

    default:
      return state
  }
}

const TaskContext = createContext<{ state: TaskState; dispatch: React.Dispatch<TaskAction> } | null>(null)


export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState)

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
}

export function useTask() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider")
  }
  return context
}
