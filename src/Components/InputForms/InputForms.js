import React from 'react'
import { StyledInput, StyledLabel } from '../../StyledComponents/styledComponents'

const InputForms = ({inputData, input, index, formData, handleFormInputChange}) => {
  return (
    <div style={{width:'fit-content', marginTop: '20px',}} key={index}>
        <StyledLabel htmlFor={input.name}>{input.label}{!input.mandatory && <span>(optional)</span>}</StyledLabel>
        <div className='input-and-prefix'>
            {input.prefixText && <span className='prefix'>{input.prefixText}</span>}
            <StyledInput 
                type={input.type}
                name={input.name}
                id={input.name}
                placeholder={input.placeholder}
                required={input.mandatory}
                value={formData[input.name]}
                onChange={handleFormInputChange}
                className="card-field"
            />
        </div>
    </div>
  )
}

export default InputForms