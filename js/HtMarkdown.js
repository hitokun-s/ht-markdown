// CodeMirror wrapper

var HtMarkdown = function(elm) {
    var editor = CodeMirror.fromTextArea(elm, {
//        mode: "javascript",
        mode: "gfm",
        lineNumbers: true,
        indentUnit: 4,
        autoCloseBrackets: true,
        autofocus: true,
        lineWrapping:true
    });

    var onChange = function() {};

    editor.on("change", function() {
        editor.save();
        onChange($('#editor').val());
    });

    // detect paste
    editor.on("inputRead", function(cm,changeObj) {
        var arr = changeObj.text[0].split(".");
        if(arr.length <= 1)return;
        var extension = arr.pop();
        if(["gif","jpg","JPG","png"].filter(function(v){
            return v == extension;
        }).length > 0){
            console.log(changeObj);
            cm.execCommand("undo");
            cm.replaceSelection("!["+changeObj.text[0]+"]("+changeObj.text[0]+")");
        }
    });

    editor.setOption("extraKeys", {
        // "SmartEnter" function
        Enter: function(cm) {
            if (cm.getLine(cm.getCursor().line).replace(/\s/g, "")) {
                // if the line has any content other than space, 
                // add 2 spaces at the end of the line.
                cm.replaceSelection("  ");
            }
            cm.execCommand("newlineAndIndent");
        }
    });
    
    var global = {
        // fn should receive editor value
        onChange : function(fn) {
            onChange = fn;
        },
        execCommand : function(command){
            editor.doc.cm.execCommand(command);
        }
    };
    return global;
};

