export const errorMessage =(msg: string):string => {
    const result = msg.trim().replace(/"/g, "");
    return result.charAt(0).toUpperCase() + result.slice(1);
}