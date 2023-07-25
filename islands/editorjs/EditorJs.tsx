
export type EditorJsProps = {
    name: string;
    html?: string;
}

export function EditorJs ({name, html }: EditorJsProps) {
      const editorName = `editor_${name}`; 
      const textAreaName = `${name}`; 
      html = html || "";
      // const editorChanged = (api: any, event: any) => {
      //   console.log(event);        
      // }
      // const onChangeEvent = name + "_editorChanged";
      // (window as any)[onChangeEvent] = editorChanged; 

      const script = `
        const textArea = document.getElementById('${textAreaName}');
        const edjsParser = edjsHTML();
        const editor = window.${name}editor = new EditorJS({
          /**
           * Id of Element that should contain Editor instance
           */
          holder: '${editorName}',
          onChange: (api, event) =>  { api.saver.save().then(data=> {
            console.log(textArea);
            textArea.value=JSON.stringify(edjsParser.parse(data)) 
          }) }
        });
        if('${html}') {
          editor.isReady.then(() => {
            console.log(editor)
            editor.blocks.renderFromHTML('${html}')
          }); 
        }`; 
        //style={{display: "none"}}
    return (<>
        <script src="https://cdn.jsdelivr.net/npm/@editorjs/editorjs@latest"></script>
        <script src="https://cdn.jsdelivr.net/npm/editorjs-html@3.4.0/build/edjsHTML.browser.js"></script>
        <textarea id={textAreaName} name={textAreaName} ></textarea>
        <div id={editorName} style={{borderStyle: "solid", borderColor: "black", borderWidth:"1px"}}></div>
        <script>{script}</script>
    </>);
}