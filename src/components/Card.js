import styled, { css } from '@emotion/styled'

const Card = styled.div`
  border-radius: 10px;
  background: ${props => (props.dark ? '#212121' : '#efeeee')};
  box-shadow: ${props =>
    props.dark
      ? '20px 20px 60px #1c1c1c, -20px -20px 60px #262626;'
      : '10px 10px 20px #c9c8c8, -10px -10px 20px #ffffff'};
  border: 1px solid rgba(255, 255, 255, 0.2);
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
