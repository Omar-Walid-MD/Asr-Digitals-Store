export const makeId = function(length)
{
    let s = "1234567890abcdefghijklmnopqrstuvwxyz";
    let id = "";

    for (let i = 0; i < length; i++) {
        let char = s[parseInt(Math.random()*(s.length-1))];
        id += char;
    }

    return id;
}