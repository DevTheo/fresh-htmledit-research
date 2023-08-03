import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getCkEditorBaseScript,CkEditorEditorTypes } from "../islands/ckeditor/CkEditor.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
        <link href="https://cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet" />
        <script src={`${getCkEditorBaseScript(CkEditorEditorTypes.Superbuild)}`}></script>
        <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
      </Head>
      <Component />
    </>
  );
}
