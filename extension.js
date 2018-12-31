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
        vscode.window.showInformationMessage("this is the rootPath", rootPath);
      } else if (vscode.workspace.rootPath) {
        rootPath = vscode.workspace.rootPath;
        vscode.window.showInformationMessage("this is the rootPath", rootPath);
      } else {
        // no root, so just copy the whole thing
        rootPath = "";
        vscode.window.showInformationMessage("this is the rootPath", rootPath);
      }
      let relPath = relative(rootPath, target);
      clipboardy.writeSync(relPath);
      vscode.window.showInformationMessage("this is relPath:", relPath);
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;
