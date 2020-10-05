import styled from '@emotion/styled'
import React from 'react'
import useDarkMode from 'use-dark-mode'

const ToggleWrapper = styled.div`
  input[type='checkbox'] {
    position: relative;
    width: 40px;
    height: 20px;
    -webkit-appearance: none;
    background: #c6c6c6;
    outline: none;
    border-radius: 50px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
  }
  input:checked[type='checkbox'] {
    background: #6699ff;
  }
  input[type='checkbox']:before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    top: 0;
    left: 0;
    background: #fff;
    transform: scale(1.1);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    transition: 0.5s;
  }
  input:checked[type='checkbox']:before {
    left: 20px;
  }
`
const Toggle = () => {
  const darkMode = useDarkMode(false)
  return (
    <ToggleWrapper>
      <input
        type="checkbox"
        onChange={darkMode.value ? darkMode.disable : darkMode.enable}
        checked={darkMode.value}
      />
    </ToggleWrapper>
  )
}

export default Toggle
