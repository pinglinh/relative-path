let vscode = require("vscode");
let relative = require("relative");
let clipboardy = require("clipboardy");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.copyPathRelative",
    function(path) {
      let target = path.path;
      let activeEditor = vscode.window.activeTextEditor;
      let rootPath;

      if (activeEditor) {
        rootPath = activeEditor.document.fileName.replace(/[^\/]$/, "");
      } else if (vscode.workspace.rootPath) {
        rootPath = vscode.workspace.rootPath;
      } else {
        rootPath = "";
      }
      let relPath = relative(rootPath, target);
      if (!relPath.includes("/")) {
        relPath = "./" + relPath;
      }
      clipboardy.writeSync(relPath);
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
