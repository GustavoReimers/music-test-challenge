import Logo from 'assets/images/logo.svg';

function Header() {
  return (
    <div className="header">
      <img src={Logo} alt="logo" />
      <div className="header__logo-title">My Studio</div>
    </div>
  )
}

export default Header;
