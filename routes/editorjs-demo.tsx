import { Head } from "$fresh/runtime.ts";
import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { useCallback, useState } from "preact/hooks";
import { EditorJs } from "../islands/editorjs/editorjs.tsx";

export default function EditorJsDemo() {
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
  return (
    <>
      <Head>
        <title>fresh-htmledit-editorjs</title>
      </Head>

        <div>
          <h2>Editor!</h2>
          <EditorJs name="editor"/>
        </div>
    </>
  );
}
