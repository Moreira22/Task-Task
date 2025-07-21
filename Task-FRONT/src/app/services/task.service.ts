import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"
import type { Block, Task, Comment, Attachment, User, UserGroup } from "../models/interfaces"

@Injectable({
  providedIn: "root",
})
export class TaskService {
  private blocksSubject = new BehaviorSubject<Block[]>([])
  private usersSubject = new BehaviorSubject<User[]>([])
  private groupsSubject = new BehaviorSubject<UserGroup[]>([])

  public blocks$ = this.blocksSubject.asObservable()
  public users$ = this.usersSubject.asObservable()
  public groups$ = this.groupsSubject.asObservable()

  constructor() {
    this.initializeMockData()
  }

  private initializeMockData(): void {
    const mockUsers: User[] = [
      { id: "1", name: "João Silva", email: "joao@email.com", role: "admin" },
      { id: "2", name: "Maria Santos", email: "maria@email.com", role: "user" },
      { id: "3", name: "Pedro Costa", email: "pedro@email.com", role: "user" },
      { id: "4", name: "Ana Oliveira", email: "ana@email.com", role: "viewer" },
    ]

    const mockGroups: UserGroup[] = [
      {
        id: "1",
        name: "Desenvolvimento",
        description: "Equipe de desenvolvimento",
        members: ["1", "2"],
        createdBy: "1",
        createdAt: new Date(),
      },
      {
        id: "2",
        name: "Design",
        description: "Equipe de design",
        members: ["3", "4"],
        createdBy: "1",
        createdAt: new Date(),
      },
    ]

    const mockBlocks: Block[] = [
      {
        id: "1",
        title: "A Fazer",
        description: "Tarefas pendentes",
        color: "#f44336",
        position: 1,
        allowedUsers: ["1", "2", "3", "4"],
        allowedGroups: ["1", "2"],
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
            assignedGroups: ["1"],
            createdBy: "1",
            createdAt: new Date(),
            updatedAt: new Date(),
            priority: "high",
            status: "todo",
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
        color: "#ff9800",
        position: 2,
        allowedUsers: ["1", "2", "3", "4"],
        allowedGroups: ["1", "2"],
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
            assignedGroups: ["2"],
            createdBy: "1",
            createdAt: new Date(),
            updatedAt: new Date(),
            priority: "medium",
            status: "in-progress",
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
        color: "#4caf50",
        position: 3,
        allowedUsers: ["1", "2", "3", "4"],
        allowedGroups: ["1", "2"],
        createdBy: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
        tasks: [],
      },
    ]

    this.usersSubject.next(mockUsers)
    this.groupsSubject.next(mockGroups)
    this.blocksSubject.next(mockBlocks)
  }

  // Block operations
  getBlocks(): Observable<Block[]> {
    return this.blocks$
  }

  createBlock(block: Omit<Block, "id" | "createdAt" | "updatedAt">): void {
    const newBlock: Block = {
      ...block,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const currentBlocks = this.blocksSubject.value
    this.blocksSubject.next([...currentBlocks, newBlock])
  }

  updateBlock(blockId: string, updates: Partial<Block>): void {
    const currentBlocks = this.blocksSubject.value
    const updatedBlocks = currentBlocks.map((block) =>
      block.id === blockId ? { ...block, ...updates, updatedAt: new Date() } : block,
    )
    this.blocksSubject.next(updatedBlocks)
  }

  deleteBlock(blockId: string): void {
    const currentBlocks = this.blocksSubject.value
    const filteredBlocks = currentBlocks.filter((block) => block.id !== blockId)
    this.blocksSubject.next(filteredBlocks)
  }

  // Task operations
  createTask(blockId: string, task: Omit<Task, "id" | "createdAt" | "updatedAt" | "blockId">): void {
    const newTask: Task = {
      ...task,
      id: this.generateId(),
      blockId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const currentBlocks = this.blocksSubject.value
    const updatedBlocks = currentBlocks.map((block) =>
      block.id === blockId ? { ...block, tasks: [...block.tasks, newTask] } : block,
    )
    this.blocksSubject.next(updatedBlocks)
  }

  updateTask(taskId: string, updates: Partial<Task>): void {
    const currentBlocks = this.blocksSubject.value
    const updatedBlocks = currentBlocks.map((block) => ({
      ...block,
      tasks: block.tasks.map((task) => (task.id === taskId ? { ...task, ...updates, updatedAt: new Date() } : task)),
    }))
    this.blocksSubject.next(updatedBlocks)
  }

  moveTask(taskId: string, targetBlockId: string): void {
    const currentBlocks = this.blocksSubject.value
    let taskToMove: Task | null = null

    // Find and remove task from source block
    const blocksWithoutTask = currentBlocks.map((block) => ({
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
      const updatedBlocks = blocksWithoutTask.map((block) =>
        block.id === targetBlockId ? { ...block, tasks: [...block.tasks, taskToMove!] } : block,
      )
      this.blocksSubject.next(updatedBlocks)
    }
  }

  deleteTask(taskId: string): void {
    const currentBlocks = this.blocksSubject.value
    const updatedBlocks = currentBlocks.map((block) => ({
      ...block,
      tasks: block.tasks.filter((task) => task.id !== taskId),
    }))
    this.blocksSubject.next(updatedBlocks)
  }

  // Comment operations
  addComment(taskId: string, comment: Omit<Comment, "id" | "createdAt">): void {
    const newComment: Comment = {
      ...comment,
      id: this.generateId(),
      createdAt: new Date(),
    }

    const currentBlocks = this.blocksSubject.value
    const updatedBlocks = currentBlocks.map((block) => ({
      ...block,
      tasks: block.tasks.map((task) =>
        task.id === taskId ? { ...task, comments: [...task.comments, newComment] } : task,
      ),
    }))
    this.blocksSubject.next(updatedBlocks)
  }

  // Attachment operations
  addAttachment(taskId: string, attachment: Omit<Attachment, "id" | "uploadedAt">): void {
    const newAttachment: Attachment = {
      ...attachment,
      id: this.generateId(),
      uploadedAt: new Date(),
    }

    const currentBlocks = this.blocksSubject.value
    const updatedBlocks = currentBlocks.map((block) => ({
      ...block,
      tasks: block.tasks.map((task) =>
        task.id === taskId ? { ...task, attachments: [...task.attachments, newAttachment] } : task,
      ),
    }))
    this.blocksSubject.next(updatedBlocks)
  }

  // User operations
  getUsers(): Observable<User[]> {
    return this.users$
  }

  getUserById(id: string): User | undefined {
    return this.usersSubject.value.find((user) => user.id === id)
  }

  // Group operations
  getGroups(): Observable<UserGroup[]> {
    return this.groups$
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }
}
