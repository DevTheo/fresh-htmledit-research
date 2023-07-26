
export type CkEditorProps = {
    name: string;
    html?: string;
};

enum EditorTypes {
    Classic,
    Inline, // not working
    Balloon,
    BalloonBlock,
    Document,
    MultiRoot,
    Superbuild
}

const editorType: EditorTypes = EditorTypes.Superbuild;

export function CkEditor({name, html} : CkEditorProps) {
    const editorName = `${name}-editor`;
    const containerName = `${name}-container`;
    html = html || 'temp';
    const script = `ckeditor_init('${editorName}', ${editorType}, '${name}', '${html}')`;

    const scriptName = editorType === EditorTypes.Classic ? 
        "https://cdn.ckeditor.com/ckeditor5/38.1.1/classic/ckeditor.js" :
        editorType === EditorTypes.Inline ? 
        "https://cdn.ckeditor.com/ckeditor5/38.1.1/inline/ckeditor.js" :
        editorType === EditorTypes.Balloon ?
        "https://cdn.ckeditor.com/ckeditor5/38.1.1/balloon/ckeditor.js" : 
        editorType === EditorTypes.BalloonBlock ?
        "https://cdn.ckeditor.com/ckeditor5/38.1.1/balloon-block/ckeditor.js" :
        editorType === EditorTypes.Document ?
        "https://cdn.ckeditor.com/ckeditor5/38.1.1/decoupled-document/ckeditor.js" :
        editorType === EditorTypes.MultiRoot ?
        "https://cdn.ckeditor.com/ckeditor5/38.1.1/multi-root/ckeditor.js" :
        // Superbuild
        "https://cdn.ckeditor.com/ckeditor5/38.1.1/super-build/ckeditor.js";

    return (<>
        <script src={`${scriptName}`}></script>
        <script src='/scripts/ckeditor-startup.js'></script>
        <div id="toolbar-container">            
        </div>
        <div id={editorName}>
        </div>
        <input type="hidden" name={name} id={name} />
        <script>{script}</script>
    </>)
}