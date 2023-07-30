const EditorTypes = {
    Classic: 0,
    Inline: 1,
    Balloon: 2,
    BalloonBlock: 3,
    Document: 4,
    MultiRoot: 5,
    Superbuild: 6
}
function ckeditor_init(editorName, editorStyle, saveToId, content) {
    const editorSelector = `#${editorName}`;
    const saveToEl = document.querySelector(`#${saveToId}`)
    const doSave = (editor) => {
      saveToEl.value = editor.getData();
      console.log("content save:", saveToEl.value);
    }

    const config = {  
        plugins: ["Essentials", 
                  //"CKFinderUploadAdapter",
                  //"Autoformat", 
                  //"Autosave",
                  "Bold",
                  "Italic",
                  "BlockQuote",
                  //"CKBox",
                  //"CKFinder",
                  //"CloudServices",
                  "EasyImage", 
                  "Heading", 
                  "Image", 
                  "ImageCaption", 
                  "ImageStyle", 
                  "ImageToolbar",
                  //"ImageUpload",
                  "Indent",
                  "Link",
                  "List",
                  "MediaEmbed",
                  "Paragraph",
                  "PasteFromOffice",
                  "PictureEditing",
                  "Table",
                  "TableToolbar",
                  //"TextTransformation"
        ],
        initialData: (content || "")
    };
    const editorCreator = editorStyle === EditorTypes.Classic ? 
          ClassicEditor :  
        editorStyle === EditorTypes.Inline ?
          InlineEditor :
        editorStyle === EditorTypes.Balloon ?
          BalloonEditor : 
        editorStyle === EditorTypes.BalloonBlock ?
          BalloonBlockEditor : 
        editorStyle === EditorTypes.Document ?
          DecoupledEditor : 
        editorStyle === EditorTypes.MultiRoot ?
          MultiRootEditor :
          CKEDITOR.ClassicEditor; 

    // if(editorCreator.builtinPlugins.contains("WordCount")) {
    //     config.plugins.push("WordCount");
    // }

    editorCreator
        .create( document.querySelector(editorSelector), config)
        .then( (editor) => {
            if(editorStyle === EditorTypes.Document) {
                const toolbarContainer = document.querySelector( '#toolbar-container' );

                toolbarContainer.appendChild( editor.ui.view.toolbar.element );
            }
            //console.log( 'Editor was initialized', editor );
            editor.model.document.on( 'change:data', (editorName, editorStyle, saveToId, content) => {
              //console.log("data changed", editorName, editorStyle, saveToId, content);
              doSave(editor);
            })
        } )
        .catch( error => {
            console.error( error );
        } );
}