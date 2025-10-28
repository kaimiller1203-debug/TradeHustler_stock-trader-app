export type PostAttachment =
    | { type: 'image'; url: string }
    | { type: 'video'; url: string }
    | { type: 'link'; url: string; title?: string };

export type Post = {
    id: string;
    userId: string;
    username: string;
    avatarUrl?: string;
    createdAt: string; // ISO string
    html: string;      // formatted content (bold/italic/underline/color)
    attachments?: PostAttachment[];
    metrics: {
        likes: number;
        replies: number;
        reposts: number;
    };
    animation?: 'none' | 'jump'; // simple “text jump” animation for the whole post
};
