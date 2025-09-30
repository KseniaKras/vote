export enum NotificationType {
  Error = 'Error',
  Info = 'Info',
  Success = 'Success',
} 

export interface INotificationHandler {
  publish: (type: NotificationType, text: string) => void;
}
