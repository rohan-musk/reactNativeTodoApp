import React,{useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedbackBase, View } from 'react-native';
import Task from './components/Task'

export default function App() {

  const [task,setTask] = useState('');
  const [taskItems, setTaskItems] =useState([]);


  const handleAddTask = () =>{
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }
  
  const completeTask = (index) =>{
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  }
  
  return (
    <View style={styles.container}>
      {/* Todays task */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <View style={styles.items}>
          {
            taskItems.map((item,index) =>{
              return (
                <TouchableOpacity key={index} onPress={()=>completeTask(index)}>
                  <Task text ={item} />
                </TouchableOpacity>
              )

            })
          }
        </View>
      </View>

      {/* write a task */}
    <KeyboardAvoidingView behavior ={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
      <TextInput style={styles.input} placeholder={'Write a Task'}  value ={task} onChangeText = { text => setTask(text)}/> 

      <TouchableOpacity onPress = {()=>handleAddTask()}>
        <View style = {styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeefff',
  },
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold',
  },  
  items:{

  },
  writeTaskWrapper:{
    position:'absolute',
    bottom:60,
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input:{
    paddingVertical:15,
    width: 250,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius:60,
  },
  addWrapper:{
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText :{

  },
});
