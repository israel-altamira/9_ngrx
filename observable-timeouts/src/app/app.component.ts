import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  public title = 'observable-timeouts';

  public seq = [1111, 22222, 33333];
  public timeoutId = 0;
  public observer: Observer<string>;

  // Will run through an array of numbers, emitting one value
  // per second until it gets to the end of the array.
  public doSequence(arr, idx) {
    console.log('Como todavia no terminamos de recorrer el array ... declarando el setTimeout...');
    // Si quitamos el TIMEOUT, que pasa si mandamos todo de una vez?
    // sera que al momento de hacer el subcribe ya no habra valores que mostrar?
    // RESPUESTA = todo sucede despues de hacer el observable.subscribe()
    // this.timeoutId = setTimeout(() => {
    console.log(`===ejecutando el setTimeout valor[${arr[idx]}] indice[${idx}]... `);
    this.observer.next(arr[idx]);
    if (idx === arr.length - 1) {
      console.log('llegamos al final del arreglo y hacemos un observer.complete()');
      // this.observer.complete();
      console.log(`===completo!!! length=[${arr.length}]`);
    } else {
      this.doSequence(arr, ++idx);
    }
    // }, 3000);
    console.log(`El timeout=[${this.timeoutId}]`);
  }

  public sequenceSubscriber() {
    return (observer) => {
      this.observer = observer;
      this.doSequence(this.seq, 0);
      // Unsubscribe should clear the timeout to stop execution
      console.log('Ahora regresamos el cuerpo del UNSUBSCRIBE');
      return {
        unsubscribe() {
          console.log(`UNSUBSCRIBE timeout=[${this.timeoutId}]`);
          clearTimeout(this.timeoutId);
        }
      };
    };
  }

  ngOnInit() {
    // Create a new Observable that will deliver the above sequence
    console.log('Haciendo el observable...');
    const sequence = new Observable(this.sequenceSubscriber());
    console.log('Ahora hacemos el cuerpo del Subscribe()');
    sequence.subscribe({
      next(num) {
        console.log('===Subscriptor - Next on Subscribe:' + num);
      },
      complete() {
        console.log('===Subscriptor - Finished sequence');
      }
    });
  }
}
