export const imageTo64Base = async(image: File):Promise<string>=>{
    const reader = new FileReader();
    reader.readAsDataURL(image);
    return await new Promise((reslove, reject)=>{
        reader.onload = ()=> reslove(reader.result as string);
        reader.onerror = (err)=> reject(err);
    }) as string
}