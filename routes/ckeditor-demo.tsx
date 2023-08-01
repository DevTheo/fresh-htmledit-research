import { useSignal } from "@preact/signals";
import { CkEditor } from "../islands/ckeditor/CkEditor.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

let savedHtml = "";
interface Data {
  ck: string;
}

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    return await ctx.render({ ck: savedHtml});
  },
  async POST(req, ctx) {
    const form = await req.formData();
    
    const html = form.get("ck")?.toString();

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

export default function EditorJsDemo({ck}: Data) {
  const htmltext = useSignal<string>(ck);

  return (
    <CkEditor name="ck" html={htmltext} showSave={true}/>
  );
}
