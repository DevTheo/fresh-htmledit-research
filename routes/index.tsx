import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
//import JoditEditor from "../islands/jodit/mod.ts";
import { useCallback, useState } from "preact/hooks";
import { EditorJs } from "../islands/editorjs/editorjs.tsx";
//import { QuillEditor } from "../islands/quill/quill.tsx";

export default function Home() {
  const count = useSignal(3);
  const [config, setConfig] = useState({
		readonly: false,
		toolbar: true
	});
  const [textAreaValue, setTextAreaValue] = useState<string>('Test');
  const [inputValue, setInputValue] = useState<string>('');

	const handleBlurAreaChange = useCallback((textAreaValue: string, event: any) => {
		console.log('handleBlurAreaChange', textAreaValue, event);
	}, []);

	const handleWYSIWYGChange = useCallback((newTextAreaValue: string) => {
		console.log('handleWYSIWYGChange', newTextAreaValue);

		setTextAreaValue(newTextAreaValue);
		setInputValue(newTextAreaValue);

		return setTextAreaValue(() => newTextAreaValue);
	}, []);
/*
      <div class="px-4 py-8 mx-auto bg-[#86efac]">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <img
            class="my-6"
            src="/logo.svg"
            width="128"
            height="128"
            alt="the fresh logo: a sliced lemon dripping with juice"
          />
          <h1 class="text-4xl font-bold">Welcome to fresh</h1>
          <p class="my-4">
            Try updating this message in the
            <code class="mx-2">./routes/index.tsx</code> file, and refresh.
          </p>
          <Counter count={count} />
        </div>  
      </div> */
  return (
    <>
      <Head>
        <title>fresh-htmledit</title>
      </Head>

        <div>
          <h2>Editor!</h2>
          <EditorJs name="editor"/>
        </div>
    </>
  );
}
