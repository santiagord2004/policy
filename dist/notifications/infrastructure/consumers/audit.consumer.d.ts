export declare class AuditConsumer {
    handleLocalEvent(payload: any): void;
    handleKafkaIssued(data: any): void;
    handleKafkaActivated(data: any): void;
    handleKafkaSuspended(data: any): void;
    handleKafkaCancelled(data: any): void;
    private processEvent;
}
