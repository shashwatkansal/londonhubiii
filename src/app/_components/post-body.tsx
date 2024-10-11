"use client";
import markdownStyles from "./markdown-styles.module.css";
import { useEffect } from "react";

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  // Handle effects such as custom styling or further sanitization if needed
  useEffect(() => {
    // Example: If you need to apply custom client-side logic for styling or interactions
  }, []);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Use markdown or rich text styles here */}
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
