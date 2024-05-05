import '../style/logo.css'
import logo from '../icons/easy-target-logo.png'

const EasyTargetLogo = () => {
    return (
        <div className='easy-target'>
            <h1 className='easy-target'>Easy Target</h1>
            <img className='easy-target' src={logo} alt='logo'></img>
        </div>
    )
}

export default EasyTargetLogo