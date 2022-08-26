import React from "react";
import styled from "styled-components/native";
import Proptypes from 'prop-types';
import {TouchableOpacity} from 'react-native';
import {images} from '../images';

const IconImg = styled.Image`
    width: 40px;
    height: 40px;
    opacity: ${({completed}) => completed ? 0.5 : 1};
`

const Button = ({task,onPressOut,type,completed}) => {

    const _onPressOut = () => {
        onPressOut(task.id)
    }

    return(
        <TouchableOpacity
            onPressOut={_onPressOut}
        
        >
            <IconImg
                source={type}
                completed={completed}
            />
        </TouchableOpacity>
    )

}

Button.proptypes = {
    type:Proptypes.oneOf(Object.values(images)).isRequired,
    onPressOut:Proptypes.func,
    task:Proptypes.object.isRequired
}

export default Button;