import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getCkEditorBaseScript,CkEditorEditorTypes } from "../islands/ckeditor/CkEditor.tsx";
import { getQuillCoreScript, getQuillThemeCssLink } from "../islands/quill/quill.tsx";
import { getTrixCssLink, getTrixScript } from "../islands/TrixRtfEditor.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
        {/* Quill Setup */}
        <link href={getQuillThemeCssLink("snow")} rel="stylesheet" />
        <script src={getQuillCoreScript()}></script>

        {/* CkEditor Setup */}
        <script src={`${getCkEditorBaseScript(CkEditorEditorTypes.Superbuild)}`}></script>

        {/* Trix Setup */}
        <link rel="stylesheet" type="text/css" href={getTrixCssLink()} />
        <script type="text/javascript" src={getTrixScript()}></script>

      </Head>
      <Component />
    </>
  );
}
