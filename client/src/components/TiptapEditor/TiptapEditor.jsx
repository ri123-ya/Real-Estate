import { useEditor, EditorContent } from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import { useEffect } from "react";
import "./TiptapEditor.scss"; // Make sure you have styles

export default function TiptapEditor({ value, setValue }) {
  console.log("TiptapEditor is mounted");

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      setValue(editor.getHTML()); // Save content as HTML
    },
  });
  //added
  useEffect(() => {
    if (editor) {
      editor.commands.setContent(value); // Ensure the editor loads with existing content
    }
  }, [editor, value]);

  // 🔥 Prevent rendering if editor is null
  if (!editor) return <p>Loading Editor...</p>;
  //end

  return <EditorContent editor={editor} />;
}
