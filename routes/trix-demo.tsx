import { useSignal } from "@preact/signals";
//import { QuillEditor } from "../islands/quill/quill.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { TrixRtfEditor } from "../islands/TrixRtfEditor.tsx";

let savedHtml = "";
interface Data {
  html?: string;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    return await ctx.render({ html: savedHtml});
  },
  async POST(req, ctx) {
    const form = await req.formData();
    
    const html = form.get("html")?.toString();

    // Redirect user to thank you page.
    if (html) {
      console.log("saved");
      savedHtml = html;
      return new Response(null, {
        status: 200, // See Other
      });
    }

    return new Response(null, {
      status: 500, // See Other
    });
  },
};

export default function EditorJsDemo({html}: Data) {
  const existingHtml = useSignal(html || "");
  return (
    <>
      <TrixRtfEditor name="html" html={existingHtml} showSave={true}/>
    </>
  );
}
