import styled from '@emotion/styled'

const Card = styled.div`
  border-radius: 10px;
  background: #efeeee;
  box-shadow: 10px 10px 20px #c9c8c8, -10px -10px 20px #ffffff;

  margin: 45px auto;
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
