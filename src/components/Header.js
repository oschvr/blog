import styled from '@emotion/styled'

const Header = styled.div`
  max-width: 825px;
  margin: 10px auto;
  padding: 20px;
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h3 {
    margin: 0;
    color: ${props => (props.dark ? '#fff' : '#0a0a0a')};
    width: 100%;
    font-size: 0.85rem;
  }
  .navLink {
    padding-right: 25px;
  }
  .nav {
    padding-top: 10px;
    display: flex;
  }
  a {
    font-size: 0.75rem;
  }
`

export default Header
