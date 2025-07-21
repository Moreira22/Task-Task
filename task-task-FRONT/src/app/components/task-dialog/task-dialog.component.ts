import { Component, type OnInit } from "@angular/core"
import { type FormBuilder, type FormGroup, Validators } from "@angular/forms"
import type { MatDialogRef } from "@angular/material/dialog"
import type { Task, User } from "../../models/interfaces"
import type { TaskService } from "../../services/task.service"

interface DialogData {
  task?: Task
  blockId?: string
  users: User[]
}

@Component({
  selector: "app-task-dialog",
  templateUrl: "./task-dialog.component.html",
  styleUrls: ["./task-dialog.component.scss"],
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup
  isEditMode: boolean
  priorities = [
    { value: "low", label: "Baixa", color: "#4caf50" },
    { value: "medium", label: "Média", color: "#ff9800" },
    { value: "high", label: "Alta", color: "#f44336" },
    { value: "urgent", label: "Urgente", color: "#9c27b0" },
  ]

  newComment = ""
  selectedFiles: File[] = []

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    public data: DialogData,
  ) {
    this.isEditMode = !!data.task
    this.taskForm = this.createForm()
  }

  ngOnInit(): void {
    if (this.data.task) {
      this.taskForm.patchValue({
        title: this.data.task.title,
        description: this.data.task.description,
        priority: this.data.task.priority,
        assignedUsers: this.data.task.assignedUsers,
        dueDate: this.data.task.dueDate,
        tags: this.data.task.tags.join(", "),
      })
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ["", [Validators.required, Validators.minLength(3)]],
      description: [""],
      priority: ["medium", Validators.required],
      assignedUsers: [[]],
      dueDate: [""],
      tags: [""],
    })
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value
      const taskData = {
        ...formValue,
        tags: formValue.tags
          ? formValue.tags
              .split(",")
              .map((tag: string) => tag.trim())
              .filter((tag: string) => tag)
          : [],
        status: this.data.task?.status || "todo",
      }

      this.dialogRef.close(taskData)
    }
  }

  onCancel(): void {
    this.dialogRef.close()
  }

  addComment(): void {
    if (this.newComment.trim() && this.data.task) {
      this.taskService.addComment(this.data.task.id, {
        taskId: this.data.task.id,
        userId: "1", // Current user ID
        content: this.newComment.trim(),
      })
      this.newComment = ""
    }
  }

  onFileSelected(event: any): void {
    const files = event.target.files
    if (files) {
      this.selectedFiles = Array.from(files)
    }
  }

  uploadFiles(): void {
    if (this.selectedFiles.length > 0 && this.data.task) {
      this.selectedFiles.forEach((file) => {
        // Simulate file upload
        const attachment = {
          taskId: this.data.task!.id,
          fileName: file.name,
          fileUrl: URL.createObjectURL(file),
          fileType: file.type,
          fileSize: file.size,
          uploadedBy: "1", // Current user ID
        }

        this.taskService.addAttachment(this.data.task!.id, attachment)
      })

      this.selectedFiles = []
    }
  }

  removeAttachment(attachmentId: string): void {
    // Implementation for removing attachment
    console.log("Remove attachment:", attachmentId)
  }

  getUserName(userId: string): string {
    const user = this.data.users.find((u) => u.id === userId)
    return user ? user.name : "Usuário desconhecido"
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }
}
