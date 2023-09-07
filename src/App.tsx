import { useState } from 'react';
import { Route, Router, Text, ButtonGroup, Button, useText, Image } from '@urban-bot/core';
import fs from 'fs';
import logo from './assets/logo.png';

const file = fs.readFileSync(logo);

const Echo = () => {
    const [text, setText] = useState('Say something');

    useText(({ text }) => {
        setText(text);
    });

    return (
        <Text>
            <i>{text}</i>
        </Text>
    );
}

function Logo() {
    const [title, setTitle] = useState('Urban Bot');

    const addRobot = () => {
        setTitle(title + '🤖');
    };

    return (
        <Image
            title={title}
            file={file}
            buttons={
                <ButtonGroup>
                    <Button onClick={addRobot}>Add robot</Button>
                    <Button onClick={()=> {setTitle('Urban Bot')}}>Remove all robots</Button>
                </ButtonGroup>
            }
        />
    );
}

type TodoType = {
  text: string
  id: number
  isCompleted: boolean
}

export function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);

  function addTodo(text: string) {
    const newTodo = { text, id: Math.random(), isCompleted: false };
    setTodos([...todos, newTodo]);
  }

  function toggleTodo(toggledId: number) {
    const newTodos = todos.map((todo) => {
      if (todo.id === toggledId) {
        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }
      return todo;
    });

    setTodos(newTodos);
  }

  useText(({ text }) => {
    addTodo(text);
  });

  const title = todos.map((todo) => (
    <>
      {todo.isCompleted ? <s>{todo.text}</s> : todo.text}
      <br />
    </>
  ));

  const todosButtons = todos.map(({ text, id }) => (
    <Button key={id} onClick={() => toggleTodo(id)}>
      {text}
    </Button>
  ));

  if (todos.length === 0) {
    return <Text>Todo list is empty</Text>;
  }

  return (
    <ButtonGroup title={title} maxColumns={3}>
      {todosButtons}
    </ButtonGroup>
  );
    // return (
    //     <>
    //         <Text>Welcome to Urban Bot! Type /echo or /logo.</Text>
    //         {/*<Router>*/}
    //         {/*    <Route path="/echo">*/}
    //         {/*        <Echo />*/}
    //         {/*    </Route>*/}
    //         {/*    <Route path="/logo">*/}
    //         {/*        <Logo />*/}
    //         {/*    </Route>*/}
    //         {/*</Router>*/}
    //     </>
    // );
}
