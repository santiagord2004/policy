import { Injectable } from '@nestjs/common';

@Injectable() // NestJS default scope is Singleton (Scope.DEFAULT)
export class PolicyNumberSequencer {
  private currentSeq = 0;

  public getNext(): string {
    this.currentSeq += 1;
    const year = new Date().getFullYear();
    const padded = String(this.currentSeq).padStart(6, '0');
    return `POL-${year}-${padded}`;
  }
}
