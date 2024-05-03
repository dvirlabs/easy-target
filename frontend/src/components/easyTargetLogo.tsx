import '../style/logo.css'
import logo from '../icons/easy-target-logo.png'

const EasyTargetLogo = () => {
    return (
        <div className='easy-target-logo'>
            <h1>Easy Target</h1>
            <img className='easy-target-logo' src={logo} alt='logo'></img>
        </div>
    )
}

export default EasyTargetLogo