// CodeMirror wrapper

var HtMarkdown = function(elm) {
    var editor = CodeMirror.fromTextArea(elm, {
//        mode: "javascript",
        mode: "gfm",
        lineNumbers: true,
        indentUnit: 4,
        autoCloseBrackets: true,
        autofocus: true
    });

    var onChange = function() {};

    editor.on("change", function() {
        editor.save();
        onChange($('#editor').val());
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

