import axios from "axios";

export const getData = async (url, state, errorState=null) => {
    axios
        .get(url)
        .then(response => {
            state(response.data)
            errorState ? errorState("") : null
        })
        .catch(error => {
            if(errorState != null){
                errorState(error.response.data.msg)
            }
            //console.log(error);
        }
        );
};