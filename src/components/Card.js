import styled from '@emotion/styled'

const Card = styled.div`
  border-radius: 10px;
  background: #efeeee;
  box-shadow: 10px 10px 20px #c9c8c8, -10px -10px 20px #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin: 45px auto;
  text-align: left;
  max-width: 800px;
  width: auto;
  padding: 60px ${props => props.padding || 95}px;
  transition: background-color 0.5s ease;
`

export default Card
