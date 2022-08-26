import React,{useState} from "react";
import styled from "styled-components/native";
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import Button from './Button';
import {images} from '../images'
import Input from "./Input";

const StyledTask = styled.View`
    flex-direction: row;
    width: 100%;
    height: 50px;
    margin: 4px 0;
    padding: 8px;
    background-color: ${({theme,completed}) => completed ? theme.done : theme.itemBackground};
    color: ${({theme,completed}) => completed ? theme.done : theme.main};
    font-size: 22px;
`

const Contents = styled.Text`
    flex: 1;
    color: ${({theme}) => theme.text};
    padding: 8px;
    text-decoration: ${({completed})=> completed ? 'line-through' : 'none'};
`

const Task = ({task,updateTask,completed,toggleTask,deleteTask}) => {
    const width = Dimensions.get('window').width;
    
    const [isEditing, setIsEditing] = useState(false);  //수정모드 체크 변수
    const [text, setText] = useState(task.text);    //

    const _handleUpdateButtonPress  = () => {
        setIsEditing(true);
    }

    const _onSubmitEditing = () => {
        if(isEditing) {
            const editedTask = {...task , text};
            updateTask(editedTask);
            setIsEditing(false);
        }
    }

    const _onBlur = () => {
        if(isEditing)
        setIsEditing(false);
        setText(task.text);
    }

    return  isEditing ? 
    (
        <Input
            text={text}
            placeholder={'항목을 작성바랍니다'}
            onChangeText={text=>setText(text)}   
            onSubmitEditing={_onSubmitEditing} 
            onBlur={_onBlur}
        />
    )
    :
    (
        <StyledTask
            width={width - 40}
            completed={completed}
        >
            <Button type={completed ? images.completed : images.uncompleted} onPressOut={toggleTask} task={task} completed={completed} />
            <Contents completed={completed}>{task.text}</Contents>
            {completed || <Button type={images.update} onPressOut={_handleUpdateButtonPress} task={task} completed={completed}/>}
            <Button type={images.delete} onPressOut={deleteTask} task={task} completed={completed}/>
        </StyledTask>
    )

} 

Task.prototype = {
    task:PropTypes.object.isRequired,
    deleteTask:PropTypes.func.isRequired,
    toggleTask:PropTypes.func.isRequired,
    updateTask:PropTypes.func.isRequired,
    completed:PropTypes.bool.isRequired
}


export default Task;