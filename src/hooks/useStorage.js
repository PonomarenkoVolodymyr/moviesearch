export default function useStorage(){
    const getItem = (key, defaultValue=null)=>{
        const item = localStorage.getItem(key)
        if (item) return JSON.parse(item)
        return defaultValue
    }  

     const setItem = (key, value) =>{
        localStorage.setItem (key, typeof(value)==="string" ? value : JSON.stringify(value))
     }
 useStorage
     return{
        getItem,
        setItem
     }
}