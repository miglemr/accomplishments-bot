import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export interface Message {
  id: Generated<number>;
  templateId: number;
  gifUrl: string;
  userId: number;
  sprintId: number;
}

export interface Sprint {
  id: Generated<number>;
  code: string;
  title: string;
}

export interface Template {
  id: Generated<number>;
  text: string;
}

export interface User {
  id: Generated<number>;
  username: string;
}

export interface DB {
  message: Message;
  sprint: Sprint;
  template: Template;
  user: User;
}
