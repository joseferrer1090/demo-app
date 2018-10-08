import React from "react";

class Logout extends React.Component {
    
    componentDidMount(){
        this.getLocalStorage();
    }
    
    getLocalStorage = () => {
        try {
            if(localStorage.getItem("auth_token")!= null){
                window.localStorage.clear();
                this.props.history.push("/");
            }
        } catch (error) {
         console.log("no borro nada");   
        }
    }
    render(){
        return(
            <div/>
        );
    }
}
export default Logout;