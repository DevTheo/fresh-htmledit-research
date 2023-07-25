import { useState } from "https://esm.sh/v128/preact@10.15.1/hooks/src/index.js";
//import { HTMLAttributes, useRef } from "preact/compat";
// import * as quillmod from "https://esm.sh/quill@1.3.7"; 
//import Quill from "https://esm.sh/quill@1.3.7"; 

export type QuillEditorProps = {
    name: string;
    html?: string;
    width?: string;
    height?: string;
};

export function QuillEditor({name, html, height, width }: QuillEditorProps) {
    //const [editedHtml, setEditedHtml] = useState<string>("");
    
    const editorName = `${name}-editor`;
    const toolbarName = `${name}-toolbar`;
    html = html || "";
    const style = {display: "block"};
    (style as any)["height"] = height ? height : "height: 375px;";
    if(width) {
        (style as any)["width"] = width;
    }

    const quillScript = `
            const hiddenText = document.getElementById('${name}');
            const quill = new Quill('#${editorName}', {
                modules: {
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline'],
                      ['image', 'code-block']
                    ]
                  }, 
                placeholder: 'Compose an epic...',       
                theme: 'snow' /* or 'bubble' */
            });
            quill.root.style.height='375px';
            quill.on('text-change', function(delta, oldDelta, source) {
                hiddenText.value = quill.root.innerHTML;
            });
        `;    
        //  
        
        //   
            
        
// {...props}
    return (<>
            <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
            
            <div id={editorName}></div>
            <input type="hidden" id={name} name={name} style={{"display": "none"}} onChange={(e) => console.log(e)} />
            <script>{quillScript}</script>
        </>)
}
