import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: Student[] = [{
    id: 1,
    name: 'Krunal',
    enrollmentNumber: 110470116021,
    college: 'VVP Engineering College',
    university: 'GTU'
  },
    {
      id: 2,
      name: 'Rushabh',
      enrollmentNumber: 110470116023,
      college: 'VVP Engineering College',
      university: 'GTU'
    },
    {
      id: 3,
      name: 'Ankit',
      enrollmentNumber: 110470116022,
      college: 'VVP Engineering College',
      university: 'GTU'
    }];

  constructor() {
  }

  public getStudents(): Observable<Student[]> {
    const studentsObservable: Observable<Student[]> = new Observable(observer => {
      // Si se quita el timeout, lo que pasa es q al momento de correr la app
      // no pasa nada de tiempo para ver la lista en pantalla
      // esto es importante, por que en realidad todo depende el momento en el que se hace el Observable.subscribe()
      setTimeout(() => {
      observer.next(this.students);
      }, 5000);
    });

    return studentsObservable;
  }
}
