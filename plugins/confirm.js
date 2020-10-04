$.confirm = function(options){
    return new Promise ((resolve,reject)=>{
        const modal = $.modal({
            title: options.title,
            width: '400px',
            closable: false,
            content: options.content,
            onClose (){
                modal.destroy()
            },  
            footerButtons: [
                {text:"dismiss", type: "secondary", handler(){console.log("secondary btn cliced");  modal.close(); reject()}},
                {text:"delete", type: "danger", handler(){console.log("danger btn cliced"); modal.close(); resolve()}},
            ]
        })
    setTimeout(() =>modal.open(), 100)
    })
}