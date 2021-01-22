import React from 'react'

class AddDeliForm extends React.Component{

    state = {
        name: "",
        address: "",
        style: "",
        hours_open: "",
        neighborhood: "",
        borough: ""
    }
    render(){
        return(
            <form>
                <input type="text" name="name" placeholder="name"/>
                <input type="text" name="address" placeholder="password"/>
                NEEDS TO BE DROPDOWN FOR STYLE
                <input type="text" name="style" placeholder="style"/>
                <input type="text" name="hours_open" placeholder="hours"/>
                <input type="text" name="neighborhood" placeholder="neighborhood"/>
                <input type="text" name="borough" placeholder="borough"/>
            </form>
        )
    }
}
export default AddDeliForm