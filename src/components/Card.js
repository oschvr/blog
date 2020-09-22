import styled from '@emotion/styled'

const Card = styled.div`
  border-radius: 15px;
  background: #efeeee;
  box-shadow: 35px 35px 70px #d1cdc7, -35px -35px 70px #ffffff;

  margin: 25px auto;
  text-align: left;
  max-width: 800px;
  width: auto;
  padding: 60px ${props => props.padding || 95}px;

  @media only screen and (max-width: 1024px) {
    padding: 50px 20px;
    margin: 25px;
  }
`

export default Card
