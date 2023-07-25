
export type CkEditorProps = {
    name: string;
    html?: string;
};

enum EditorTypes {
    Classic,
    Superbuild
}

const editorType: EditorTypes = EditorTypes.Classic;

export function CkEditor({name, html} : CkEditorProps) {
    const editorName = `${name}-editor`;
    const containerName = `${name}-container`;
    const script = `ckeditor_init('${editorName}', ${(editorType===EditorTypes.Classic)})`;

    const scriptName = editorType === EditorTypes.Classic ? 
        "https://cdn.ckeditor.com/ckeditor5/38.1.1/classic/ckeditor.js" :
        "https://cdn.ckeditor.com/ckeditor5/38.1.1/super-build/ckeditor.js"

    return (<>
        <script src={`${scriptName}`}></script>
        <script src='/scripts/ckeditor-startup.js'></script>
        <div id={editorName}>
        </div>
        <input type="hidden" name={name} />
        <script>{script}</script>
    </>)
}