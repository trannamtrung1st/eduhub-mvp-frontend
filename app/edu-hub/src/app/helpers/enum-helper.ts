export function getEnumByKey(enumType: any, key: string): any {
    let keys = Object.keys(enumType).filter(x => x == key);
    return keys.length ? enumType[keys[0]] : null;
};