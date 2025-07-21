import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { ReactiveFormsModule, FormsModule } from "@angular/forms"
import { DragDropModule } from "@angular/cdk/drag-drop"

// Angular Material Modules
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatMenuModule } from "@angular/material/menu"
import { MatDialogModule } from "@angular/material/dialog"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { MatChipsModule } from "@angular/material/chips"
import { MatTabsModule } from "@angular/material/tabs"
import { MatTooltipModule } from "@angular/material/tooltip"
import { MatSnackBarModule } from "@angular/material/snack-bar"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { TaskBoardComponent } from "./components/task-board/task-board.component"
import { TaskDialogComponent } from "./components/task-dialog/task-dialog.component"
import { BlockDialogComponent } from "./components/block-dialog/block-dialog.component"

@NgModule({
  declarations: [AppComponent, TaskBoardComponent, TaskDialogComponent, BlockDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,

    // Angular Material
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTabsModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
