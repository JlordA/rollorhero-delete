import React from 'react'

class ReviewForm extends React.Component {

    state = {
        title: "",
        date: "",
        body: "",
        rating: ""
    }

    render() {
        return (
            <>
                <h3>Write A Review</h3>
                <form>
                    <input type="text" name="title" placeholder="title" />
                    <input type="date" name="date" />
                    <textarea name="body"></textarea>
                    <input type="number" name="rating" />
                </form>
            </>
        )
    }
}

export default ReviewForm