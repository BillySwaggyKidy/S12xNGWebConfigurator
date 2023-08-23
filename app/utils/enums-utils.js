// this object represent all the profile a user can have
export const UserStatus = Object.freeze({
  Viewer: 'Viewer',
  Configurator: 'Configurator',
  Admin: 'Admin',
});

// this object represent all status a notification can have
export const NotificationStatus = Object.freeze({
  Error: 'Error',
  Warning: 'Warning',
  Success: 'Success',
  Info: 'Info',
  Request: 'Request'
});

// this object represent all status the server can use to manage exceptions
export const ServerResponseStatus = Object.freeze({
  CannotOperate: 'CannotOperate',
  WrongId: 'WrongId',
  DBConnectionIssue: 'DBConnectionIssue',
  ServerIssue: 'ServerIssue',
  DuplicateIssue: 'DuplicateIssue',
  PermissionIssue: 'PermissionIssue'
});

// this object represent all operation status for handling data in the database
export const ServerOperationStatus = Object.freeze({
  Create: 'Create',
  Edit: 'Edit',
  Remove: 'Remove',
  Duplicate: 'Duplicate'
});

// this object represent all mode when a user handle a configuration
export const HandleModeStatus = Object.freeze({
  Read: 'Read',
  Edit: 'Edit',
});

// this object represent all status that the conf is when the user is saving
export const ConfStateStatus = Object.freeze({
  Error: 'Error',
  Loading: 'Loading',
  Sync: 'Sync',
  ErrorSync: 'ErrorSync',
  Updated: 'Updated',
});

// this object represent all status that the conf files items can have
export const ConfFilesItemStatus = Object.freeze({
  Wrong: 'Wrong',
  Incomplete: 'Incomplete',
  Complete: 'Complete',
});