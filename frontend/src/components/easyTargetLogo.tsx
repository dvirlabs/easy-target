import '../style/logo.css'
import logo from '../icons/easy-target-logo.png'
import ExportTargets from './exportTargets'
import AddTargetsFromFile from './addTargetsFromFile'

const EasyTargetLogo = () => {
    return (
        <div className='header'>
            <div className='logo'>
                <h1>Easy Target</h1>
                <img src={logo} alt='logo' />
            </div>
            <div className='navbar-buttons'>
                <AddTargetsFromFile />
                <ExportTargets />
            </div>
        </div>
    )
}

export default EasyTargetLogo