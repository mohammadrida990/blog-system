export type Tag = {
  id: string;
  name: string;
};

export type Post = {
  id: number;
  title: string;
  slug: string;
  author: User;
  content: string;
  thumbnail: string | null;
  published: boolean;
  authorId: number;
  tags?: Tag[];
  createdAt: Date;
  updatedAt: Date;
  _count: {
    likes: number;
    comments: number;
  };
};

export type User = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CommentModel = {
  id: number;
  content: string;
  post: Post;
  author: User;
  createdAt: Date;
  updatedAt: Date;
};
