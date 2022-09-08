import Post from 'models/post'
import Todo from 'models/todo';

declare module 'knex/types/tables' {
  interface User {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
  }
  
  interface Tables {
    posts: Post;
    todos: Todo;
  }
}