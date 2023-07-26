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
    const wordCountConfig = {
        onUpdate: ( stats ) => {
            console.log("writing");
            saveToEl.value = editor.getData();
        }
    };
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
        initialData: (content || ""),
        autosave: {
            save: ( editor ) => {
                console.log("writing");
                // The saveData() function must return a promise
                // which should be resolved when the data is successfully saved.
                saveToEl.value = editor.getData();
                return Promise.resolve();
            },
            waitingTime: 10
        },
        wordCount: wordCountConfig
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
            console.log( 'Editor was initialized', editor );
            // editor.on('change:state', (eventInfo, name, value, oldValue) => {
            //     console.log('eventInfo:', eventInfo)
            //     console.log('name:', name);
            //     console.log('values:', value, oldValue);
            // })
        } )
        .catch( error => {
            console.error( error );
        } );
}