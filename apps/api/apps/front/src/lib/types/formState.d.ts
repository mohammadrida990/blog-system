export type SignUpFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      data?: {
        email?: string;
        password?: string;
        name?: string;
      };
      message?: string;
    }
  | undefined;

export type CreateCommentState =
  | {
      data?: {
        postId: number;
        content: string;
      };
      errors?: {
        content?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

export type PostFormState =
  | {
      errors?: {
        title?: string[];
        content?: string[];
        thumbnail?: string[];
        tags?: string[];
        isPublished?: boolean;
      };
      message?: string;
      success?: boolean;
      data?: {
        postId?: number;
        title?: string;
        content?: string;
        thumbnail?: File | null;
        tags?: string;
        published?: boolean;
        prevThumbnail?: string;
      };
    }
  | undefined;
