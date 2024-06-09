export function matchAllNonGlobal(str, regex, filter = (match, idx) => true) {
    if (regex.global) {
        throw Error("regex.global is true");
    }
    const result = [];
    let cursor = 0;
    let idx = 0;
    let sub = str;
    let match = regex.exec(sub);
    while (match !== null) {
        const matchIdx = match.index;
        // current cursor
        cursor = cursor + matchIdx;
        match.index = cursor;
        if (idx !== 0) {
            match.input = str.substring(0, cursor) + match.input;
        }
        if (filter(match, idx)) {
            result.push(match);
        }
        // next cursor
        cursor = cursor + match[0].length;
        sub = str.substring(cursor, str.length);
        match = regex.exec(sub);
        idx++;
    }
    return result;
}
