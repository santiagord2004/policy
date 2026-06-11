export interface EventPublisherPort {
  publish(eventName: string, event: any): Promise<void>;
}
