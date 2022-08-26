import React,{useState} from 'react';
import { StatusBar,Alert } from 'react-native';
import { Dimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import theme from './theme';
import Input from './componets/Input';
import Task from './componets/Task';
import DeleteAll from './componets/DeleteAll'
import LineButton from './componets/LineButton'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({theme}) => theme.background};
`

const Header = styled.Text`
  margin-top: 24px;
  margin-bottom: 4px;
  text-align: center;
  color: ${({theme}) => theme.text};
  background-color: ${({theme}) => theme.itemBackground};
  width: ${({width}) => width - 40};
  font-size: 40px;
  font-weight: 600;
`

const List = styled.ScrollView`
  flex: 1;
  width: ${({width}) => width - 40};
`

export default function App() {
  const [text,setText] = useState('');  //input입력값 저장변수
  const [tasks,setTasks] = useState({});  //버킷리스트 객체
  const [isLoading,setIsLoading] = useState(false); //처음 값 세팅 확인

  const width = Dimensions.get('window').width; 

  //로컬 저장소 값 저장
  const storeData = async (key,value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValue)
      setTasks(value);
    } catch (e) {
      // saving error
    }
  }

  //로컬 저장소 값 조회
  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      const task =  jsonValue != null ? JSON.parse(jsonValue) : null;
      if(task == null) {
        setTasks({})
      } else {
        setTasks(task);
      }
    } catch(e) {
      // error reading value
    }
  }

  //로컬 저장소 값 초기화
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
      setTasks({})
    } catch(e) {
      // clear error
    }
  
  }

  //input값 변동 감지
  const _handleTextChange = (text) => {
    setText(text);
  }

  //버킷리스트 객체 추가
  const _addTask = () => {
    const ID = Date.now().toString();
    const newTaskObject = {
      [ID]:{id:ID, text:text, completed:false}
    };

    storeData('tasks', {...tasks, ...newTaskObject});
    setText('');
  }

  //버킷리스트 값 삭제
  const _delete = (id) => {
    const currentTask = {...tasks};
    delete currentTask[id];
    console.log(currentTask);
    storeData('tasks',currentTask);
  }

  //버킷리스트 완료 상태 확인
  const _toggle = (id) => {
    const currentTask = {...tasks};
    currentTask[id]['completed'] = !currentTask[id]['completed'];
    storeData('tasks',currentTask);
  }

  //버킷리스트 수정
  const _update = (task) => {
    const currentTask = {...tasks};
    currentTask[task.id] = task;
    storeData('tasks',currentTask);
  }

  //버킷리스트 완료항목 삭제
  const _deleteAllTasks = () => {

    const deleteCompletedItems = () => {
      const currentTasks = {...tasks};
      // const newTask = {};
  
      // for (let taskId in currentTask) {
      //   const task = currentTask[taskId]
      //   if(!task.completed) {
      //     newTask[task.id] = task;
      //   }
      // }
      // storeData('tasks',newTask);

      const filteredTasks = 
        Object.fromEntries(Object.entries(currentTasks)
                                  .filter(task => !task[1].completed));
      storeData('tasks',filteredTasks);
    }

    Alert.alert(
      "삭제", //경고창 제목
      "완료항목 전체를 삭제하시겠습니까?",  //경고창 메세지
      [
        {
          text: "예",
          onPress: () => deleteCompletedItems()
        },
        { text: "아니오",
          onPress: () => console.log("OK Pressed")
        }
      ]
    );

  }
  
  //input 포커스를 떠나면 비활성화
  const _onBlur = () => {
    setText('');
}

  return !isLoading ? 
  ( 
    <AppLoading
    // 앱 로딩전 실행할 로직     
    startAsync={()=>{getData('tasks')}}
    //startAsync호출이 성공적으로 수행되면
    onFinish={()=>setIsLoading(true)}
    //startAsync호출이 실패하면
    onError={console.error}
    />
  ) :
  (
    <ThemeProvider theme={theme}>
      <Container>

        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.background}
        />
        <Header width={width}>버킷 리스트</Header>
        <Input 
          width={width}
          placeholder={'+항목 추가'}
          text={text}
          onChangeText={_handleTextChange}
          onSubmitEditing={_addTask}
          onBlur={_onBlur}

        />
        <List width={width}>
          {Object.values(tasks)
            .reverse()
            .map(task=><Task  key={task.id}
                              task={task} 
                              completed={task.completed}
                              deleteTask={_delete}
                              toggleTask={_toggle}
                              updateTask={_update}
            />)      
          }
        </List>
        {/* <DeleteAll 
              text={"완료항목 전체삭제"}
              deleteAllTasks={_deleteAllTasks}
          />  */}
          <LineButton text={'완료항목 전체삭제'} onPressOut={_deleteAllTasks}/>
      </Container>
    </ThemeProvider>
  );
}


