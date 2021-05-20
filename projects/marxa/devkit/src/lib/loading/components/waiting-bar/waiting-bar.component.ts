import { Component, OnInit, ChangeDetectionStrategy,  Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MxLoading } from '../../loading.service';

@Component({
  selector: 'mx-waiting-bar',
  templateUrl: './waiting-bar.component.html',
  styleUrls: ['./waiting-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MxWaitingBarComponent implements OnInit {

  state$  = new BehaviorSubject<boolean>( false )
  @Input() set state(toggle: boolean) { this.state$.next(toggle); }
  get state() { return this.state$.getValue()}

  constructor(private loading: MxLoading) { }

  ngOnInit(): void {
    this.loading.toggleWaitingBar().subscribe( forcedState => {
      !forcedState
        ? this.state = !this.state
        : this.state = forcedState
      this.state$.next(this.state)
    })
  }

}
