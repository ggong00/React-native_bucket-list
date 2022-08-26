import React from "react";
import styled from "styled-components/native";
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';

const StyledButton = styled.TouchableOpacity`
    align-items: center;
    width: ${({width}) => width-40};
    background-color: ${({theme}) => theme.itemBackground};
    font-weight: 600;
    padding: 12px;
`

const StyledText = styled.Text`
    font-size: 32px;
`

const DeleteAll = ({text,deleteAllTasks}) => {
    const width = Dimensions.get('window').width;
    return (
        <StyledButton
            width={width}
            onPressOut={deleteAllTasks}
        >
            <StyledText>{text}</StyledText>
        </StyledButton>
    )

}

DeleteAll.defaultProps = {
    text:'기본값'
}

DeleteAll.prototype = {
    deleteAllTasks:PropTypes.func.isRequired,
}

export default DeleteAll;