import { useSignal } from "@preact/signals";
import { CkEditor } from "../islands/ckeditor/CkEditor.tsx";

export default function EditorJsDemo() {
  const htmltext = useSignal<string>("");
  return (
    <>
      <CkEditor name="ck" html={htmltext}/>
    </>
  );
}
