import React from 'react';

import './help.css';

const Help = () => {
    return (
        <div>
            <h2>Getting Started</h2>
            <p><strong>Step 1: </strong>Click on the Clients tab to add a client. Add all of your client's info (you can add more or update it later) and click save.</p>
            <br />
            <p><strong>Step 2: </strong>Create a new project under the Projects tab, and assign it to a client</p>
            <br />
            <p><strong>Step 3: </strong>Use the time tracker when you are ready to start working. When you are done, click "Stop" and it will allow you to add that time to a project, add a descreiption of the task you worked on, and adjust the time, if necessary. Hit save and a new task will be added to the selected project's current invoice. If no invoice exists, or your your invoice's end date has passed, a new one will be created for you!</p>
            <br />
            <p>You can edit your invoices at any time by clicking on the Invoices tab and opening a project with the dropdown arrow to the right. You will see a list of all invoices for the project. Select the "+" icon to view the full invoice and make changes.</p>
            <p>When you are ready to send your invoice, click on the export button on the invoice detail page (in the top right corner).</p>
        </div>
    )
}

export default Help;