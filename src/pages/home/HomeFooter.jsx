import React from 'react'

const HomeFooter = () => {
    return (
        <section className='p-4 bg-green-950 text-green-50 mt-24 wh-24 flex items-center justify-between'>
            <div className='flex flex-col'>
                <span>Terms &amp; Conditions | Privacy Policy | Cookie Policy | Slavery Act</span>
                <span>Copyright © 2023 Summer NJS1705 Team 3 SWP391.</span>
            </div>
            <a href='https://recipehub.herokuapp.com/swagger-ui/index.html#/'
            target='_blank'
            className='font-semibold text-green-500 text-2xl'>&lt;Backend API documents&gt;</a>
            <div className='flex items-center gap-4'>
                <span className='text-2xl'>Contact us: </span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id='facebook' fill='lightgreen' width="50"><path d="M24 3H8a5 5 0 0 0-5 5v16a5 5 0 0 0 5 5h8a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1h-1v-2h1a1 1 0 0 0 1-1v-3.5a2.5 2.5 0 0 1 2.5-2.5H22v2h-1a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h1.72l-.5 2H20a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0v-3h1a1 1 0 0 0 1-.76l1-4a1 1 0 0 0-.18-.86A1 1 0 0 0 23 15h-2v-1h2a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-3.5a4.51 4.51 0 0 0-4.5 4.5V15h-1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h1v6H8a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3h-4a1 1 0 0 0 0 2h4a5 5 0 0 0 5-5V8a5 5 0 0 0-5-5Z" data-name="facebook fb face book"></path></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id='email' fill='lightgreen' width="50"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path></svg>
            </div>
        </section>
    )
}

export default HomeFooter