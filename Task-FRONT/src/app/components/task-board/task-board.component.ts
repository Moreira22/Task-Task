import { Component, type OnInit, type OnDestroy } from "@angular/core"
import { type CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop"
import type { MatDialog } from "@angular/material/dialog"
import { Subject, takeUntil } from "rxjs"
import type { TaskService } from "../../services/task.service"
import type { Block, Task, User } from "../../models/interfaces"
import { TaskDialogComponent } from "../task-dialog/task-dialog.component"
import { BlockDialogComponent } from "../block-dialog/block-dialog.component"

@Component({
  selector: "app-task-board",
  templateUrl: "./task-board.component.html",
  styleUrls: ["./task-board.component.scss"],
})
export class TaskBoardComponent implements OnInit, OnDestroy {
  blocks: Block[] = []
  users: User[] = []
  currentUser: User = { id: "1", name: "João Silva", email: "joao@email.com", role: "admin" }

  private destroy$ = new Subject<void>()

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.taskService
      .getBlocks()
      .pipe(takeUntil(this.destroy$))
      .subscribe((blocks) => {
        this.blocks = blocks.sort((a, b) => a.position - b.position)
      })

    this.taskService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => {
        this.users = users
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  onTaskDrop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      const task = event.previousContainer.data[event.previousIndex]
      const targetBlockId = this.getBlockIdFromContainer(event.container)

      if (targetBlockId) {
        this.taskService.moveTask(task.id, targetBlockId)
      }
    }
  }

  private getBlockIdFromContainer(container: any): string | null {
    const blockElement = container.element.nativeElement.closest("[data-block-id]")
    return blockElement ? blockElement.getAttribute("data-block-id") : null
  }

  openTaskDialog(task?: Task, blockId?: string): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: "800px",
      maxHeight: "90vh",
      data: { task, blockId, users: this.users },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (task) {
          this.taskService.updateTask(task.id, result)
        } else if (blockId) {
          this.taskService.createTask(blockId, {
            ...result,
            assignedUsers: result.assignedUsers || [],
            assignedGroups: result.assignedGroups || [],
            createdBy: this.currentUser.id,
            comments: [],
            attachments: [],
            tags: result.tags || [],
          })
        }
      }
    })
  }

  openBlockDialog(block?: Block): void {
    const dialogRef = this.dialog.open(BlockDialogComponent, {
      width: "600px",
      data: { block, users: this.users },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (block) {
          this.taskService.updateBlock(block.id, result)
        } else {
          this.taskService.createBlock({
            ...result,
            position: this.blocks.length + 1,
            tasks: [],
            createdBy: this.currentUser.id,
          })
        }
      }
    })
  }

  deleteTask(taskId: string): void {
    if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
      this.taskService.deleteTask(taskId)
    }
  }

  deleteBlock(blockId: string): void {
    const block = this.blocks.find((b) => b.id === blockId)
    if (block && block.tasks.length > 0) {
      alert("Não é possível excluir um bloco que contém tarefas.")
      return
    }

    if (confirm("Tem certeza que deseja excluir este bloco?")) {
      this.taskService.deleteBlock(blockId)
    }
  }

  getUserById(id: string): User | undefined {
    return this.users.find((user) => user.id === id)
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case "urgent":
        return "#d32f2f"
      case "high":
        return "#f57c00"
      case "medium":
        return "#fbc02d"
      case "low":
        return "#388e3c"
      default:
        return "#757575"
    }
  }

  getPriorityIcon(priority: string): string {
    switch (priority) {
      case "urgent":
        return "priority_high"
      case "high":
        return "keyboard_arrow_up"
      case "medium":
        return "remove"
      case "low":
        return "keyboard_arrow_down"
      default:
        return "remove"
    }
  }
}
