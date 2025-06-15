export function inInterface<T>(object: any): object is T {
    return "interface" in object;
}

export default {
    inInterface
}
