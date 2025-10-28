"use client";

import { Post } from "@/types/post";
import FeedPostCard from "./FeedPostCard";
import AlertPostCard from "./AlertPostCard";

export default function PostCard({ post }: { post: Post }) {
    return post.alert ? <AlertPostCard post={post} /> : <FeedPostCard post={post} />;
}
