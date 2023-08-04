import { Signal } from "@preact/signals";
import { MergeTags, TrixEditor, TrixEditorProps } from "../components/react-trix.tsx";
import { useMemo } from "preact/hooks";
import { createElement } from "preact";


export const getTrixCssLink = () => "https://unpkg.com/trix@2.0.0/dist/trix.css";
export const getTrixScript = () => "https://unpkg.com/trix@2.0.0/dist/trix.umd.min.js";


export type TrixRtfEditorConfig = {
  name: string;
  html: Signal<string>;
  showSave: boolean;

  // TrixEditorProps below
  className?: string;
  autoFocus?: boolean;
  placeholder?: string;
  toolbar?: string;
  //value?: string;
  uploadURL?: string;
  uploadData?: { [key: string]: string };
  fileParamName?: string;

  /* list of available merge tag */
  mergeTags?: Array<MergeTags>;

  //onEditorReady?: (editor: any) => void;
  //onChange: (html: string, text: string) => void;
}

export function TrixRtfEditor({name, html, ...props} : TrixRtfEditorConfig) {
   
  const changed =  (html: string, text: string) => {
    console.log("changed", html, text);
  }

  const trixProps = ({...props} as any) as TrixEditorProps;
  trixProps.mergeTags = props.mergeTags || null;
  // trixProps.toolbar = `editor-${name}`;
  // var attributes: { [key: string]: string } = {
  //   "id": `editor-${name}`,
  // };
  //{createElement("trix-toolbar", attributes)}
    
  return (<>  
    <TrixEditor {...trixProps} value={html.value} onChange={changed} />
  </>)
}