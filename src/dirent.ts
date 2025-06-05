import { Dirent, readdirSync } from "node:fs";

const fileRegex = /^[^_].+\.js$/;
const folderRegex = /^[^_]/;

/**
 * Validates if a file follows the Regex pattern. This will ignore files starting with an underscore.
 * This is used to filter out files that are not meant to be exported.
 * Files starting with an underscore are considered inactive.
 * 
 * ```ts
 * import { dirent } from "@made-simple/util";
 * dirent.isValidRegex(new Dirent("example.js")); // ["example.js"]
 * dirent.isValidRegex(new Dirent("_example.js")); // false
 * ```
 */
export function isValidRegex(file: Dirent): false | RegExpMatchArray | null {
    return (file.isFile() && file.name.match(fileRegex)) || (file.isDirectory() && file.name.match(folderRegex));
}

/**
 * Iterates over all files in a directory and its subdirectories recursively.
 * The callback function is called with the data from each file exported as default.
 * 
 * ```ts
 * import { dirent } from "@made-simple/util";
 * dirent.iterateOver(new URL("./example", import.meta.url), data => {
 *    console.log(data);
 * });
 * ```
 */
export function iterateOver<T>(url: URL, callback: (data: T) => void): void {
    const files = readdirSync(url, { withFileTypes: true });
    files.forEach(async file => {
        if (file.isDirectory() && isValidRegex(file)) {
            const subURL = new URL(file.name, url);
            iterateOver(subURL, callback);
        } else if (file.isFile() && isValidRegex(file)) {
            const data: T = (await import(`${url}/${file.name}`)).default
            callback(data);
        }
    });
}

export default {
    iterateOver,
    isValidRegex
}
