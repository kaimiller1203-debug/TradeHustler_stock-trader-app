'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MOCK_USER } from '@/lib/mockUser';
import { Post, PostAttachment } from '@/types/post';
import { loadFeed, saveFeed } from '@/lib/storage';
import { cn } from '@/lib/utils';
import { Bold, Italic, Underline, Highlighter, ImageIcon, LinkIcon, PlaySquare } from 'lucide-react';

// Simple sanitizer for allowed tags we insert ourselves
function sanitize(html: string) {
    // We only allow b, i, u, span (with style color), a (with href), br
    // Remove anything else.
    if (typeof document === 'undefined') return html;

    const div = document.createElement('div');
    div.innerHTML = html;

    const allowed = new Set(['B', 'I', 'U', 'SPAN', 'A', 'BR']);
    const walk = (node: Node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            if (!allowed.has(el.tagName)) {
                const parent = el.parentNode;
                while (el.firstChild) parent?.insertBefore(el.firstChild, el);
                parent?.removeChild(el);
                return;
            }
            // Limit <span> to color style only
            if (el.tagName === 'SPAN') {
                const color = (el.style && el.style.color) || '';
                el.removeAttribute('style');
                if (color) el.style.color = color;
            }
            // Limit <a> to href only and target blank
            if (el.tagName === 'A') {
                const href = (el as HTMLAnchorElement).getAttribute('href') || '#';
                el.getAttributeNames().forEach((attr) => {
                    if (attr !== 'href') el.removeAttribute(attr);
                });
                (el as HTMLAnchorElement).setAttribute('target', '_blank');
                (el as HTMLAnchorElement).setAttribute('rel', 'noreferrer');
                (el as HTMLAnchorElement).textContent ||= href;
            }
        }
        node.childNodes.forEach(walk);
    };
    walk(div);
    return div.innerHTML;
}

type Props = {
    onCreate(post: Post): void;
};

export default function PostComposer({ onCreate }: Props) {
    const [value, setValue] = useState('');
    const [color, setColor] = useState<string>('#ffffff');
    const [attachments, setAttachments] = useState<PostAttachment[]>([]);
    const [anim, setAnim] = useState<'none' | 'jump'>('none');

    const textRef = useRef<HTMLTextAreaElement>(null);

    // Toolbar actions apply to selected text (textarea)
    const applyTag = (openTag: string, closeTag: string) => {
        const el = textRef.current;
        if (!el) return;
        const start = el.selectionStart ?? 0;
        const end = el.selectionEnd ?? 0;
        const before = value.slice(0, start);
        const mid = value.slice(start, end);
        const after = value.slice(end);
        const next = before + openTag + mid + closeTag + after;
        setValue(next);
        // Restore selection after formatting
        requestAnimationFrame(() => {
            el.focus();
            el.setSelectionRange(start + openTag.length, end + openTag.length);
        });
    };

    const onBold = () => applyTag('<b>', '</b>');
    const onItalic = () => applyTag('<i>', '</i>');
    const onUnderline = () => applyTag('<u>', '</u>');
    const onColor = () => applyTag(`<span style="color:${color}">`, '</span>');

    const addImage = () => {
        const url = prompt('Paste image URL (https://...)');
        if (!url) return;
        setAttachments((prev) => [...prev, { type: 'image', url }]);
    };

    const addVideo = () => {
        const url = prompt('Paste video URL (mp4/webm, https://...)');
        if (!url) return;
        setAttachments((prev) => [...prev, { type: 'video', url }]);
    };

    const addLink = () => {
        const url = prompt('Paste link URL (https://...)');
        if (!url) return;
        setAttachments((prev) => [...prev, { type: 'link', url }]);
    };



    const submit = () => {
        if (!value.trim() && attachments.length === 0) return;

        const newPost: Post = {
            id: `p_${Date.now()}`,
            userId: MOCK_USER.id,
            username: MOCK_USER.username,
            avatarUrl: MOCK_USER.avatarUrl,
            createdAt: new Date().toISOString(),
            html: sanitize(
                value
                    .replace(/\n/g, '<br/>')
                    .replace(/<(?!\/?(b|i|u|span|a|br)\b)/gi, '&lt;')

            ),
            attachments,
            metrics: { likes: 0, replies: 0, reposts: 0 },
            animation: anim,
        };

        onCreate(newPost);
        setValue('');
        setAttachments([]);
        setAnim('none');
    };

    return (
        <Card className="w-full border-muted/40 bg-background/60 backdrop-blur">
            <CardContent className="p-4">
                {/* Toolbar */}
                <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={onBold} className="gap-2">
                        <Bold className="h-4 w-4" /> Bold
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={onItalic} className="gap-2">
                        <Italic className="h-4 w-4" /> Italic
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={onUnderline} className="gap-2">
                        <Underline className="h-4 w-4" /> Underline
                    </Button>

                    <div className="flex items-center gap-2">
                        <Input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="h-8 w-10 p-1"
                            aria-label="Text color"
                        />
                        <Button type="button" variant="outline" size="sm" onClick={onColor} className="gap-2">
                            <Highlighter className="h-4 w-4" /> Color
                        </Button>
                    </div>

                    <div className="ml-auto flex items-center gap-2">
                        <label className="text-sm text-muted-foreground">Animation:</label>
                        <select
                            value={anim}
                            onChange={(e) => setAnim(e.target.value as 'none' | 'jump')}
                            className={cn(
                                'rounded-md border border-muted/40 bg-background/60 px-2 py-1 text-sm',
                                'focus:outline-none'
                            )}
                        >
                            <option value="none">None</option>
                            <option value="jump">Jump</option>
                        </select>
                    </div>
                </div>

                {/* Textarea */}
                <Textarea
                    ref={textRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="What’s happening?"
                    className="min-h-[90px]"
                />

                {/* Attachments row */}
                <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Button type="button" variant="ghost" size="sm" onClick={addImage} className="gap-2">
                        <ImageIcon className="h-4 w-4" /> Image URL
                    </Button>
                    <Button type="button" variant="ghost" size="sm" onClick={addVideo} className="gap-2">
                        <PlaySquare className="h-4 w-4" /> Video URL
                    </Button>
                    <Button type="button" variant="ghost" size="sm" onClick={addLink} className="gap-2">
                        <LinkIcon className="h-4 w-4" /> Link
                    </Button>

                    <div className="ml-auto">
                        <Button type="button" onClick={submit}>Post</Button>
                    </div>
                </div>

                {/* Attachment preview */}
                {attachments.length ? (
                    <div className="mt-3 space-y-2 rounded-lg border border-muted/30 p-3">
                        {attachments.map((att, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                <span className="truncate">
                  {att.type.toUpperCase()} —{' '}
                    {'url' in att ? (att as any).url : ''}
                </span>
                                <button
                                    className="text-muted-foreground hover:text-foreground"
                                    onClick={() =>
                                        setAttachments((prev) => prev.filter((_, idx) => idx !== i))
                                    }
                                >
                                    remove
                                </button>
                            </div>
                        ))}
                    </div>
                ) : null}
            </CardContent>
        </Card>
    );
}
