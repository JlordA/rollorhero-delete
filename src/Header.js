import React from 'react'
import { Button, Icon, Header, Image } from 'semantic-ui-react'



const HeaderExampleImage = () => (
    <>
        <Header as='h2' inverted>
            <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> Patrick
        </Header>
        <Button animated>
            <Button.Content visible>Next</Button.Content>
            <Button.Content hidden>
                <Icon name='arrow right' />
            </Button.Content>
        </Button>
    </>
)

export default HeaderExampleImage

{/* <iframe
            width="600"
            height="450"
            frameborder="0" 
            src="https://www.google.com/maps/embed/v1/search?zoom=16&key=AIzaSyCtcZhnuZsw60rHQctphAItzEqaNhwi_Dg&q=Emilys+Pork+Store+Williamsburg+Brooklyn" allowfullscreen>
        </iframe> */}