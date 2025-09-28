export default async function delay(ms) {
    return await new Promise (resolve => setTimeout(resolve, ms))    
}

export function formatDate(date='') {
    if (/\d\d\d\d-\d\d-\d\d/.test(date) === false) {return "-- -- ----"}
    const arrDate = date.split('-')
    const arrMonth =  ["Nul","Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${arrDate[2]} ${arrMonth[parseInt(arrDate[1])]} ${arrDate[0]}` 
}