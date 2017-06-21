var BugReport, defaultTokenPath, fs, os, path, spawnSync;
fs = require('fs');
os = require('os');
path = require('path');
spawnSync = void 0;
defaultTokenPath = process.platform === 'win32' ? path.join(process.env['USERPROFILE'], 'bug-report.token') : path.join(process.env['HOME'], '.bug-report.token');
BugReport = (function() {
    var M, tem, ua;

    function BugReport() {}
    BugReport.prototype.config = {
        saveToken: {
            type: 'boolean',
            "default": true
        },
        tokenPath: {
            type: 'string',
            "default": defaultTokenPath
        }
    };
    BugReport.prototype.activate = function() {
        var CommandLogger,
            openReport;
        CommandLogger = require('./command-logger');
        this.commandLogger = new CommandLogger;
        openReport = (function(_this) { return function(externalData1) { _this.externalData = externalData1; return _this.open(); }; })(this);
        return this.commands = CodeMirror.commands.add('VisualSparkS-workspace', { 'bug-report:open': function(event, externalData) { if (externalData && !externalData.body) { externalData = { title: 'Error', time: Date.now(), body: externalData }; } return openReport(externalData); }, 'bug-report:insert-version-info': (function(_this) { return function() { var editor;
                    editor = getEditor(); return editor != null ? editor.insertText(_this.versionSection()) : void 0; }; })(this) });
    };
    BugReport.prototype.deactivate = function() { this.commands.dispose(); return this.commandLogger = null; };
    BugReport.prototype.open = function() { return CodeMirror.open('bug-report.md').then((function(_this) { return function(editor) { var PanelView;
                editor.setText("[Enter description here]\n![Screenshot or GIF movie](url)\n" + (_this.errorSection()) + "\n## Repro Steps\n1. [First Step]\n2. [Second Step]\n3. [and so on...]\n**Expected:** [Enter expected behavior here]\n**Actual:** [Enter actual behavior here]\n## Command History\n" + (_this.commandLogger.getText(_this.externalData)) + "\n" + (_this.versionSection()) + "\n---\n<small>This report was created in and posted from the VisualSparkS editor using the package " + (_this.packageVersionText()) + ".</small>");
                PanelView = require('./panel-view'); return new PanelView(editor); }; })(this)); };
    BugReport.prototype.VSSPackageInfo = function() { var e; try { return JSON.parse(fs.readFileSync(path.join(atom.getLoadSettings().resourcePath, 'package.json'))); } catch (error) { e = error; return {}; } };
    BugReport.prototype.errorSection = function() { if (this.externalData) { return "---\n" + this.externalData.body; } else { return ''; } };
    BugReport.prototype.macVersionInfo = function() { var e, plist, text; try { plist = require('plist');
            text = fs.readFileSync('/System/Library/CoreServices/SystemVersion.plist', 'utf8'); return plist.parse(text); } catch (error) { e = error; return {}; } };
    BugReport.prototype.macVersionText = function(info) { if (info == null) { info = this.macVersionInfo(); } if (!(info.ProductName && info.ProductVersion)) { return 'Unknown OS X version'; } return info.ProductName + " " + info.ProductVersion; };
    BugReport.prototype.osMarketingVersion = function() { switch (os.platform()) {
            case 'darwin':
                return this.macVersionText();
            case 'win32':
                return this.winMarketingVersion();
            default:
                return (os.platform()) + " " + (os.release()); } };
    navigator.findBrowser = (function() {})();
    ua = navigator.userAgent;
    tem = void 0;
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([0-9|\.]+)/i) || [];
    if (/trident/i.test(M[1])) { tem = /\brv[ :]+(\d+)/g.exec(ua) || []; 'IE ' + (tem[1] || ''); }
    if (M[1] === 'Chrome') { tem = ua.match(/\b(OPR|Edge)\/(\d+)/); if (tem !== null) { tem.slice(1).join(' ').replace('OPR', 'Opera'); } }
    M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
    if ((tem = ua.match(/version\/(\d+)/i)) !== null) { M.splice(1, 1, tem[1]); }
    M.join(' ');
    BugReport.prototype.packageVersionInfo = function() { var e; try { return JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'))); } catch (error) { e = error; return {}; } };
    BugReport.prototype.packageVersionText = function(info) { var ref, text; if (info == null) { info = this.packageVersionInfo(); }
        text = "`" + ((ref = info.name) != null ? ref : 'bug-report') + "`"; if (info.version) { text += " v" + info.version; } return text; };
    BugReport.prototype.safeScript = function(text) { if (os.platform() === 'win32') { text += '.cmd'; } return text; };
    BugReport.prototype.stripAnsi = function(text) { return text.replace(/\x1b[^m]*m/g, ''); };
    BugReport.prototype.versionSection = function() { return "## Versions\n* **VisualSparkS:**       " + (CodeMirror.getVersion()) + "\n* **OS:**         " + (this.osMarketingVersion()) + "\n* **Browser**     " + (this.findBrowser()) + "\n"; };
    BugReport.prototype.winMarketingVersion = function() { var info, res;
        spawnSync = require('child_process').spawnSync;
        info = spawnSync('systeminfo').stdout.toString(); if ((res = /OS.Name.\s+(.*)$/im.exec(info))) { return res[1]; } else { return 'Unknown Windows Version'; } };
    return BugReport;
})();
module.exports = new BugReport();