import { Component, OnInit } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from './student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'observables';
  students: Student[];

  constructor(public studentService: StudentService) {
  }

  ngOnInit() {
    const studentsObservable = this.studentService.getStudents();
    studentsObservable.subscribe((studentsData: Student[]) => {
      this.students = studentsData;
    });
  }
}
