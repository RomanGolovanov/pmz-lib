
function formatIniText(ini: any): string {
    var lines: string[] = [];
    Object.keys(ini).forEach(function(sectionKey) {
        lines.push('[' + sectionKey + ']');
        Object.keys(ini[sectionKey]).forEach(function(valueKey) {
            var value = ini[sectionKey][valueKey];
            if (value instanceof Array) {
                for (var i = 0; i < value.length; i++) {
                    lines.push(valueKey + '=' + value[i]);
                }
            } else {
                lines.push(valueKey + '=' + value);
            }
        });
    });
    return lines.reduce((a, c) => a + '\n' + c);
}

function parseIniText(text: string): any {
    var regex = {
        section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
        param: /^\s*([\w\.\-\_]+)\s*=\s*(.*?)\s*$/,
        comment: /^\s*;.*$/
    };
    var value: any = {};
    var lines = text.split(/\r\n|\r|\n/);
    var section: any = null;
    lines.forEach(function(line) {
        if (regex.comment.test(line)) {
            return;
        } else if (regex.param.test(line)) {
            var match = line.match(regex.param);
            if (section) {
                var currentValue = value[section][match[1]];
                if (!currentValue) {
                    value[section][match[1]] = match[2];
                } else {
                    if (typeof (currentValue) === 'string') {
                        value[section][match[1]] = [currentValue, match[2]];
                    } else {
                        value[section][match[1]].push(match[2]);
                    }
                }



            } else {
                value[match[1]] = match[2];
            }
        } else if (regex.section.test(line)) {
            var match = line.match(regex.section);
            value[match[1]] = {};
            section = match[1];
        } else if (line.length == 0 && section) {
            section = null;
        };
    });
    return value;
}

export { formatIniText, parseIniText };