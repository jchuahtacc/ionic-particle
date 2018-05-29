import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ParticleProvider } from '../../providers/particle/particle';

@Component({
  selector: 'particle-progress',
  templateUrl: 'particle-progress.html'
})
export class ParticleProgressComponent {
  @Input('event') eventName: string;
  @Input('min') min: number = 0;
  @Input('max') max: number = 100;
  @Output('onChange') onChangeEvent: EventEmitter<any> =  new EventEmitter();
  public progress: number = 0;
  private subscription: any = null;

  constructor(public particle: ParticleProvider) {
  }

  cancelSubscription() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
    this.subscription = null;
  }

  ngOnChanges() {
    this.cancelSubscription();
    // Subscribe to an event
    this.subscription = this.particle.subscribe(this.eventName).subscribe(
        (event) => {
            // Calculate progress bar percentage based on event.data (assuming that it's a double)
            this.progress = (parseFloat(event.data) - this.min) /  (this.max - this.min) * 100;
            // Update any listeners that the progress bar changed
            this.onChangeEvent.emit(this.progress);
        },
        (error) => {
            console.log("particle-progress subscription error for event", this.eventName);
        },
        () => {
            console.log("particle-progress subscription ended for event", this.eventName);
        }
    );
  }

}
