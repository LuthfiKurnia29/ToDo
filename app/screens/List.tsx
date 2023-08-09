import { View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FIRESTORE_DB } from "../../firebaseConfig";
import { addDoc, collection, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Entypo } from "@expo/vector-icons";

export interface Todo {
  title: string;
  done: boolean;
  id: string;
}

const List = ({ navigation }: any) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");
  useEffect(() => {
    const todoRef = collection(FIRESTORE_DB, "todos");

    const subscriber = onSnapshot(todoRef, {
      next: (snapshot) => {
        console.log("UPDATED");
        const todos: any[] = [];
        snapshot.docs.map((doc) => {
          console.log(doc.data());
          todos.push({
            id: doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos);
      },
    });
    return () => subscriber();
  }, []);

  const addTodo = async () => {
    // console.log('ADD')
    const doc = await addDoc(collection(FIRESTORE_DB, "todos"), { title: todo, done: false });
    setTodo("");
  };
  
  const renderTodo = ({ item }: any) => {
    const ref = doc(FIRESTORE_DB, `todos/${item.id}`)
    const toogleDone = async () => {
      updateDoc(ref, {done: !item.done});
    };
  
    const deleteItem = async () => {
      deleteDoc(ref)
    };
    return (
      <View style={styles.todoContainer}>
        <TouchableOpacity onPress={toogleDone} style={styles.todo}>
          {item.done && <Ionicons name="md-checkmark-circle" size={32} color="green"/>}
          {!item.done && <Entypo name="circle" size={24} color="black" />}
          <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
        <Ionicons name="trash-bin-outline" size={24} color="red" onPress={deleteItem} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder="Add New Todo" onChangeText={(text: string) => setTodo(text)} value={todo} />
        {/* <Button onPress={addTodo} title="Add Todo" disabled={todo === ""} /> */}

        <FontAwesome.Button name="database" backgroundColor="#3f7129" onPress={addTodo} disabled={todo === ''}>
          Add To Do List
        </FontAwesome.Button>

    
      </View>

      {todos.length > 0 && (
        <View>
          <FlatList data={todos} renderItem={(item) => renderTodo(item)} keyExtractor={(todo: Todo) => todo.id} />
        </View>
      )}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  form: {
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10
  },
  text: {
    flex: 1,
    paddingHorizontal: 20,
    fontSize: 20
  },
  todo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button:{
    color: 'red'
  }
});
