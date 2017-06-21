var CompositeDisposable, PanelView, View, errorMessages, fs, oldView, request, extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; }

        function ctor() { this.constructor = child; }
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();
        child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;
View = require('atom-space-pen-views').View;
CompositeDisposable = require('atom').CompositeDisposable;
fs = require('fs');
request = require('request');
oldView = null;
errorMessages = { 404: "A 404 error was returned when posting this issue. This is usually caused by an authentication problem such as a bad token. The token must have at least \"repo\" or \"public repo\" permission. See the instructions in the README for obtaining a GitHub API Token." };
module.exports = PanelView = (function(superClass) { extend(PanelView, superClass);

    function PanelView() { return PanelView.__super__.constructor.apply(this, arguments); }
    PanelView.content = function() { return this.div({ "class": 'bug-report-panel tool-panel', tabindex: -1 }, (function(_this) { return function() { _this.div({ "class": 'label-hdr' }, 'Bug Report');
                _this.div({ outlet: 'prePost', "class": 'pre-post' }, function() { _this.div({ "class": 'horiz-div' }, function() { _this.div({ "class": 'inp-label' }, 'Issue Title:'); return _this.input({ outlet: 'titleInput', "class": 'title-input native-key-bindings' }); });
                    _this.div({ "class": 'horiz-div' }, function() { _this.div({ "class": 'inp-label' }, 'GitLab Repo:'); return _this.input({ outlet: 'repoInput', "class": 'repo-input native-key-bindings', placeholder: 'Default: Harambe/VisualSparkS' }); }); return _this.div({ "class": 'horiz-div' }, function() { _this.div({ "class": 'inp-label' }, 'GitHub Token:');
                        _this.input({ outlet: 'tokenInput', "class": 'token-input native-key-bindings' }); return _this.input({ outlet: 'postBtn', "class": 'post-btn btn', type: 'button', value: 'Post Issue' }); }); });
                _this.div({ outlet: 'postMsg', "class": 'post-msg' }, function() { return _this.div({ "class": 'label-msg' }, 'Posting, please wait ...'); }); return _this.div({ outlet: 'postPost', "class": 'post-post' }, function() { _this.span({ "class": 'label-link' }, 'This has been posted to the GitLab repository ');
                    _this.a({ outlet: 'linkRepo', "class": 'link-repo' });
                    _this.span({ "class": 'label-link' }, ' as ');
                    _this.a({ outlet: 'linkIssue', "class": ' link-issue ' });
                    _this.span({ "class": 'label-period' }, '.'); return _this.input({ outlet: 'closeBtn', "class": 'close-btn btn', type: 'button', value: 'Close Bug Report' }); }); }; })(this)); };
    PanelView.prototype.initialize = function(editor) { this.editor = editor; if (oldView != null) { oldView.destroy(); }
        oldView = this; if (this.storedToken()) { this.tokenInput.attr({ placeholder: 'Default: stored in file' }); }
        this.disposables = new CompositeDisposable;
        this.disposables.add(CodeMirror.commands.add('.title-input', { 'core:focus-next': (function(_this) { return function() { return _this.repoInput.focus(); }; })(this), 'core:confirm': (function(_this) { return function() { return _this.post(); }; })(this) }));
        this.disposables.add(CodeMirror.commands.add('.repo-input', { 'core:focus-next': (function(_this) { return function() { return _this.tokenInput.focus(); }; })(this), 'core:confirm': (function(_this) { return function() { return _this.post(); }; })(this) }));
        this.disposables.add(CodeMirror.commands.add('.token-input', { 'core:focus-next': (function(_this) { return function() { return _this.titleInput.focus(); }; })(this), 'core:confirm': (function(_this) { return function() { return _this.post(); }; })(this) }));
        this.disposables.add(CodeMirror.commands.add('atom-workspace', { 'core:cancel': (function(_this) { return function() { var button; if (_this.hidden) { return; }
                    button = CodeMirror.confirm({ message: 'Abandon the bug report?', buttons: ['Abandon', 'Keep'] }); if (button === 0) { return _this.destroy(); } }; })(this) }));
        this.postBtn.on('click', (function(_this) { return function() { return _this.post(); }; })(this));
        this.closeBtn.on('click', (function(_this) { return function() { return _this.destroy(); }; })(this));
        this.disposables.add(CodeMirror.workspace.onDidChangeActivePaneItem((function(_this) { return function(activeItem) { if (activeItem === _this.editor || activeItem === _this) { return _this.show(); } else { return _this.hide(); } }; })(this))); return CodeMirror.addBottomPanel({ item: this }); };
    PanelView.prototype.destroy = function() { var ref; if ((ref = this.editor) != null) { ref.destroy(); }
        this.editor = null;
        this.disposables.dispose(); return this.detach(); };
    PanelView.prototype.post = function() { var ref, repo, title, token, user;
        title = this.validateTitle(); if (!title) { return; }
        ref = this.validateRepo(), user = ref[0], repo = ref[1]; if (!(user && repo)) { return; }
        token = this.validateToken(); if (!token) { return; } return this.postActual(title, user, repo, token); };
    PanelView.prototype.displayError = function(detailed) { return CodeMirror.confirm({ message: 'Bug-Report Error:', detailedMessage: detailed, buttons: ['OK'] }); };
    PanelView.prototype.hide = function() { this.hidden = true; return PanelView.__super__.hide.call(this); };
    PanelView.prototype.postActual = function(title, user, repo, token) { var options, url;
        this.prePost.hide();
        this.postMsg.css({ display: 'inline-block' });
        url = "https://gitlab.ceng.metu.edu.tr/" + user + "/" + repo + "/diagnostic-reporting";
        options = { url: url, method: 'POST', headers: { Authorization: 'token ' + token }, json: true, body: { title: title, body: this.editor.getText() } }; return request(options, (function(_this) { return function(err, res, body) { var detailedMessage, ref; if (err || (body != null ? body.message : void 0) || (res != null ? res.statusCode : void 0) !== 201) { detailedMessage = (ref = errorMessages[res != null ? res.statusCode : void 0]) != null ? ref : _this.standardMessage(err, res, body);
                    _this.displayError(detailedMessage);
                    _this.prePost.css({ display: 'inline-block' });
                    _this.postMsg.hide();
                    _this.postPost.hide(); return; }
                _this.postMsg.hide();
                _this.linkRepo.attr({ href: "https://gitlab.ceng.metu.edu.tr/" + user + "/" + repo });
                _this.linkRepo.text(user + "/" + repo);
                _this.linkIssue.attr({ href: body.html_url });
                _this.linkIssue.text("Issue #" + body.number); return _this.postPost.css({ display: 'inline-block' }); }; })(this)); };
    PanelView.prototype.show = function() { this.hidden = false; return this.css({ display: 'inline-block' }); };
    PanelView.prototype.standardMessage = function(err, res, body) { var ref, ref1, ref2, ref3, ref4; return "Error posting to GitLab repo " + url + "\n\n " + ((ref = err != null ? err.message : void 0) != null ? ref : '') + " - " + ((ref1 = body != null ? body.message : void 0) != null ? ref1 : '') + " - " + ((ref2 = res != null ? res.statusCode : void 0) != null ? ref2 : '') + " - " + ((ref3 = res != null ? res.statusMessage : void 0) != null ? ref3 : '') + " - " + ((ref4 = res != null ? res.body : void 0) != null ? ref4 : ''); };
    PanelView.prototype.storedToken = function() { var e, saveToken, tokenPath;
        saveToken = CodeMirror.config.get('bug-report.saveToken');
        tokenPath = CodeMirror.config.get('bug-report.tokenPath'); if (!saveToken) { return void 0; } try { return fs.readFileSync(tokenPath).toString(); } catch (error) { e = error; return void 0; } };
    PanelView.prototype.trim = function(str) { return str.replace(/^\s*|\s*$/g, ''); };
    PanelView.prototype.validateRepo = function() { var match, repoText;
        repoText = this.repoInput.val().replace(/\s/g, '') || 'atom/atom'; if (!(match = /([^:\/]+)\/([^.\/]+)(\.git)?$/.exec(repoText))) { this.displayError("The GitLab Repo field should be of the form \"USER/REPO\" where USER is the GitLab user and REPO is the name of the repository. This can be found at the end of the URL for the repo."); return []; } else { return [match[1], match[2]]; } };
    PanelView.prototype.validateTitle = function() { var title;
        title = this.trim(this.titleInput.val()); if (!title) { this.displayError('The title field is empty'); return void 0; } else { return title; } };
    PanelView.prototype.validateToken = function() { var e, saveToken, token, tokenPath;
        token = this.tokenInput.val().replace(/\s/g, '') || this.storedToken(); if (token) { saveToken = CodeMirror.config.get('bug-report.saveToken');
            tokenPath = CodeMirror.config.get('bug-report.tokenPath'); if (saveToken && tokenPath) { try { fs.writeFileSync(tokenPath, token); } catch (error) { e = error;
                    console.log("bug-report: Error writing token to path " + tokenPath + ". " + e.message); } } return token; } else { this.displayError('You must enter a GitHub personal API token. See https://help.github.com/articles/creating-an-access-token-for-command-line-use/'); return void 0; } }; return PanelView; })(View);