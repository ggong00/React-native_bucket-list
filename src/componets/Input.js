import React from "react";
import styled from "styled-components/native";
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';

const StyledInput = styled.TextInput`
    width: ${({width}) => width-40};
    height: 50px;
    margin: 4px 0;
    padding: 0 32px;
    background-color: ${({theme}) => theme.itemBackground};
    color: ${({theme}) => theme.text};
    font-size: 24px;
`

const Input = ({text,placeholder,onChangeText,onSubmitEditing,onBlur}) => {
    const width = Dimensions.get('window').width;
    
    return (

        <StyledInput
            width={width}
            value={text}
            placeholder={placeholder}
            maxLength={50}
            autoCapitalize={'none'}
            returnKeyType={'done'}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmitEditing}
            onBlur={onBlur}
        />
    )
} 

Input.defaultProps = {
    text:'기본값'
}

Input.prototype = {
    text:PropTypes.string,
    placeholder:PropTypes.string.isRequired,
    onChangeText:PropTypes.func.isRequired,
    onSubmitEditing:PropTypes.func.isRequired,
    onBlur:PropTypes.func.isRequired
}


export default Input;



