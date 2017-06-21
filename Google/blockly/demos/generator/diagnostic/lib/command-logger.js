var CommandLogger, ignoredCommands, tenMinutes;
ignoredCommands = { 'show.bs.tooltip': true, 'shown.bs.tooltip': true, 'hide.bs.tooltip': true, 'hidden.bs.tooltip': true, 'editor:display-updated': true, 'mousewheel': true };
tenMinutes = 10 * 60 * 1000;
module.exports = CommandLogger = (function() { CommandLogger.prototype.dateFmt = '-m:ss.S';
    CommandLogger.prototype.logSize = 16;

    function CommandLogger() { this.initLog();
        CodeMirror.commands.onWillDispatch((function(_this) { return function(event) { return _this.logCommand(event); }; })(this)); }
    CommandLogger.prototype.getText = function(externalData) { var lastTime, lines;
        lines = [];
        lastTime = this.calculateLastEventTime(externalData);
        this.eachEvent((function(_this) { return function(event, stop) { if (event.time > lastTime) { return true; } if (!event.name || lastTime - event.time >= tenMinutes) { return false; }
                lines.push(_this.formatEvent(event, lastTime)); if (event.name === 'bug-report:open') { return stop(); } }; })(this)); if (externalData) { lines.push("     " + (this.formatTime(0)) + " " + externalData.title); }
        this.initLog();
        lines.unshift('```');
        lines.push('```'); return lines.join("\n"); };
    CommandLogger.prototype.latestEvent = function() { return this.eventLog[this.logIndex]; };
    CommandLogger.prototype.logCommand = function(command) { var event, name, source;
        name = command.type, source = command.target; if (name in ignoredCommands) { return; }
        event = this.latestEvent(); if (event.name === name) { return event.count++; } else { this.logIndex = (this.logIndex + 1) % this.logSize;
            event = this.latestEvent();
            event.name = name;
            event.source = source;
            event.count = 1; return event.time = Date.now(); } };
    CommandLogger.prototype.calculateLastEventTime = function(data) { var lastTime; if (data) { return data.time; }
        lastTime = null;
        this.eachEvent(function(event, stop) { lastTime = event.time; if (event.name === 'bug-report:open') { return stop(); } }); return lastTime; };
    CommandLogger.prototype.eachEvent = function(fn) { var j, offset, ref, results, stop, stopFlag;
        stopFlag = false;
        stop = function() { return stopFlag = true; };
        results = []; for (offset = j = 1, ref = this.logSize; 1 <= ref ? j <= ref : j >= ref; offset = 1 <= ref ? ++j : --j) { fn(this.eventLog[(this.logIndex + offset) % this.logSize], stop); if (stopFlag) { break; } else { results.push(void 0); } } return results; };
    CommandLogger.prototype.formatCount = function(count) { switch (false) {
            case !(count < 2):
                return '    ';
            case !(count < 10):
                return "  " + count + "x";
            case !(count < 100):
                return " " + count + "x"; } };
    CommandLogger.prototype.formatEvent = function(event, lastTime) { var count, name, source, time;
        count = event.count, time = event.time, name = event.name, source = event.source; return (this.formatCount(count)) + " " + (this.formatTime(lastTime - time)) + " " + name + " " + (this.formatSource(source)); };
    CommandLogger.prototype.formatSource = function(source) { var classList, classText, id, idText, j, klass, len, nodeName, nodeText;
        nodeName = source.nodeName, id = source.id, classList = source.classList;
        nodeText = nodeName.toLowerCase();
        idText = id ? "#" + id : '';
        classText = ''; if (classList) { for (j = 0, len = classList.length; j < len; j++) { klass = classList[j];
                classText += "." + klass; } } return "(" + nodeText + idText + classText + ")"; };
    CommandLogger.prototype.formatTime = function(time) { var moment;
        moment = require('moment'); return moment(time).format(this.dateFmt); };
    CommandLogger.prototype.initLog = function() { var i;
        this.logIndex = 0; return this.eventLog = (function() { var j, ref, results;
            results = []; for (i = j = 0, ref = this.logSize; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) { results.push({ name: null, count: 0, source: null, time: null }); } return results; }).call(this); }; return CommandLogger; })();