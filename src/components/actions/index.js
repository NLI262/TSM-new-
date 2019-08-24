import axios from "axios";

export function loadDetails(){
    return(dispatch)=>{
        return axios.get("https://jsonplaceholder.typicode.com/users").then((response)=>{
            dispatch(projectPage(response.data));
        })
    }
}

export function projectPage(details){
    return{
        type:"GET_PROJECT",
        details:details
    }
}
