import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'mx-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  buscadorCtrl: FormControl = new FormControl('',);
  filtered?: Observable<any[]>;
  @Input() selector: string = ''
  @Input() items: any[] = []
  @Input() collection?: string
  @Input() lengthTrigger: number = 0

  @Output() selected: EventEmitter<any> = new EventEmitter()

  constructor(
    private _afs: AngularFirestore
  ) {
    this.filtered = this.buscadorCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value[this.selector]),
        map(selector => selector ? this._filter(selector) : this.items.slice())
      );
   }

  ngOnInit(): void {
    if (this.collection) {
      this.buscadorCtrl.valueChanges.subscribe(value => {
        if (value.length === this.lengthTrigger) {
          this._afs.collection(this.collection as string)
            .ref.get().then(data => {
            this.items = data.docs.map(doc => doc.data())
          })
        } else if (value.length == 0) {
          this.items = []
        }
      })
    }
  }

  displayFn(item: any): string {
    return item && item[this.selector] ? item[this.selector] : '';
  }

  private _filter(selector: string): any[] {
    const filterValue = selector.toLowerCase();
    let result: any[] = this.items.filter(
      item => item[selector].toLowerCase().includes(filterValue)
    )

    return result
  }

  onSubmit() {
    let value = this.buscadorCtrl.value
    this.selected.emit(value)
  }

}
