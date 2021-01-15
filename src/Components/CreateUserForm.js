import React from 'react'

class CreateUserForm extends React.Component{

    render(){
        return(
            <form>
                <input type="text" placeholder="username"/>
                <input type="text" placeholder="password"/>
                <input type="text" placeholder="neighborhood"/>
                <input type="text" placeholder="borough"/>
            </form>
        )
    }

}

export default CreateUserForm