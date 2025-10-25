'use client';

import { Post } from '@/types/post';
import Image from 'next/image';
import { MessageCircle, Repeat2, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
    post: Post;
};

export default function PostCard({ post }: Props) {
    return (
        <article
            className={cn(
                'w-full border-b border-muted/30 py-4',
                post.animation === 'jump' && 'animate-postJump'
            )}
        >
            <header className="flex gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full bg-muted">
                    {post.avatarUrl ? (
                        <Image src={post.avatarUrl} alt={post.username} fill className="object-cover" />
                    ) : null}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">{post.username}</span>
                        <span className="text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleString()}
            </span>
                    </div>

                    {/* Content is trusted because it only comes from our composer buttons */}
                    <div className="prose prose-invert max-w-none mt-2" dangerouslySetInnerHTML={{ __html: post.html }} />

                    {/* Attachments */}
                    {post.attachments?.length ? (
                        <div className="mt-3 space-y-2">
                            {post.attachments.map((att, i) => {
                                if (att.type === 'image') {
                                    return (
                                        <div key={i} className="relative w-full overflow-hidden rounded-xl border border-muted/30">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={att.url} alt="image" className="w-full h-auto" />
                                        </div>
                                    );
                                }
                                if (att.type === 'video') {
                                    return (
                                        <video key={i} controls className="w-full rounded-xl border border-muted/30">
                                            <source src={att.url} />
                                        </video>
                                    );
                                }
                                return (
                                    <a
                                        key={i}
                                        href={att.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block rounded-lg border border-muted/30 p-3 hover:bg-muted/10"
                                    >
                                        {att.title ?? att.url}
                                    </a>
                                );
                            })}
                        </div>
                    ) : null}

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-6 text-muted-foreground">
                        <button className="group inline-flex items-center gap-2 hover:text-foreground">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm">{post.metrics.replies}</span>
                        </button>
                        <button className="group inline-flex items-center gap-2 hover:text-foreground">
                            <Repeat2 className="h-4 w-4" />
                            <span className="text-sm">{post.metrics.reposts}</span>
                        </button>
                        <button className="group inline-flex items-center gap-2 hover:text-foreground">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm">{post.metrics.likes}</span>
                        </button>
                    </div>
                </div>
            </header>
        </article>
    );
}
