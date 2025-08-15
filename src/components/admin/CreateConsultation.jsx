import React from 'react';

const CreateConsultation = () => {
    return (
        <div>
            <h2>Create Consultation</h2>
            <form>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" name="title" />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description"></textarea>
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateConsultation;