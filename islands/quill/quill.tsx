import { Signal } from "@preact/signals";
import { useEffect, useRef, useMemo, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";

const getQuillFn = () => {
    return (window as any).Quill;
}

const defaultQuillConfig = {
    modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'script', 'blockquote', 'align', 'direction'],
          [{'size': [ 'small', 'medium', 'large', 'huge' ]}], //'font', 
          ['color','background'],
          //['list', 'indent'],
          ['link', 'image', 'video', 'code'] //, 'code-block'
        ]
      }, 
    placeholder: 'Compose an epic...',       
    theme: 'snow' /* or 'bubble' */
};

export type QuillEditorProps = {

    name: string;
    html: Signal<string>;
    width?: string;
    height?: string;
    showSave?: boolean;
    quillConfig?: any;
};

export function QuillEditor({name, html, quillConfig, showSave }: QuillEditorProps) {
    
    const editorName = `${name}-editor`;
    const editorRef = useRef<HTMLDivElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);
    const [isSetup, setIsSetup] = useState(false); 

    const doSave = async () => {
        const formData = new FormData();
        formData.append(name, html.value);
        const result = await fetch(window.location.href, {
            body: formData,
            method: "post"
        });
        if(result.status === 200) {
            alert("Saved");
        } else {
            console.error(result);
            alert("Failed to save");
        }
    }

    const config = useMemo(() => { 
        const result = quillConfig ?? defaultQuillConfig;
        if (showSave) {
            result.modules.toolbar = [ ['save'], ...result.modules.toolbar]; // = [, ...result.modules.toolbar]; 
        }
        return result; 
    }, [name]);

    useEffect(() => {
        if (!isSetup && hiddenInputRef.current && editorRef.current) {
            const quill = new (getQuillFn())(`#${editorName}`,  //editorRef, {
                config);
            quill.on('text-change', function(delta: any, oldDelta: any, source: any) {
                html.value = quill.root.innerHTML;
            });
            const saveButton = document.getElementsByClassName('ql-save')[0] as HTMLButtonElement;
            if (showSave) {
                saveButton.textContent = 'Save';
                saveButton.addEventListener('click', function(e: any) {
                    doSave();
                });
            }
            quill.setContents(quill.clipboard.convert(html.value));
            
            setIsSetup(true);
        }
    }, [isSetup, config, hiddenInputRef, editorRef]);

    return (<>            
            <div id={editorName} ref={editorRef}></div>
            <input type="hidden" id={name} name={name} ref={hiddenInputRef} style={{"display": "none"}} value={html.value || ""} />
        </>)
}
