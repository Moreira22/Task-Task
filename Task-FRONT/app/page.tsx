"use client"
import { TaskProvider } from "@/contexts/TaskContext"
import { TaskBoard } from "@/components/TaskBoard"

export default function Home() {
  return (
    <TaskProvider>
      <TaskBoard />
    </TaskProvider>
  )
}
