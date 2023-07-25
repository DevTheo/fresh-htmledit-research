import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/styles.css" />
        <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
        <link href="https://cdn.quilljs.com/1.3.6/quill.bubble.css" rel="stylesheet" />

      </Head>
      <Component />
    </>
  );
}
