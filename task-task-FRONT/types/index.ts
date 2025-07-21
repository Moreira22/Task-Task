export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "admin" | "user" | "viewer"
  createdAt: Date
}

export interface UserGroup {
  id: string
  name: string
  description: string
  members: string[] // User IDs
  createdBy: string
  createdAt: Date
}

export interface Comment {
  id: string
  taskId: string
  userId: string
  content: string
  createdAt: Date
  updatedAt?: Date
}

export interface Attachment {
  id: string
  taskId: string
  fileName: string
  fileUrl: string
  fileType: string
  fileSize: number
  uploadedBy: string
  uploadedAt: Date
}

export interface Task {
  id: string
  title: string
  description: string
  blockId: string
  assignedUsers: string[]
  assignedGroups: string[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
  dueDate?: Date
  priority: "low" | "medium" | "high" | "urgent"
  status: "todo" | "in-progress" | "review" | "done"
  comments: Comment[]
  attachments: Attachment[]
  tags: string[]
}

export interface Block {
  id: string
  title: string
  description: string
  color: string
  position: number
  tasks: Task[]
  allowedUsers: string[]
  allowedGroups: string[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
  description: string
  blocks: Block[]
  members: string[]
  groups: string[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
}
