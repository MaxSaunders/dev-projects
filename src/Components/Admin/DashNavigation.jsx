import { RiExchangeDollarLine } from "react-icons/ri"

import userAvatar from './assets/user.svg'
import './DashNavigation.scss'

const DashNavigation = () => {
    return (
        <>
            {/* extended && <ExtendedComp /> */}
            {/* TODO: make this a thin bar that can extend on button click */}

            <div className=' d-lg-none'>

            </div>

            <div className='dashboard-nav d-none d-lg-inline'>
                <div className='nav-logo-container'>
                    <span className='me-1 logo'>
                        <RiExchangeDollarLine size='50px' />
                    </span>
                    <span className='nav-logo fs-5'>
                        Dashboard
                    </span>
                </div>
                <div className='nav-body'></div>
                <div className='nav-footer'>
                    <span className='me-2'>
                        <img src={userAvatar} className='user-avatar' />
                    </span>
                    <span className='user-name'>
                        Max Saunders
                    </span>
                </div>
            </div>
        </>
    )
}

export default DashNavigation
