import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useDisclosure
} from '@chakra-ui/react';
import DeleteAlertDialog from 'components/delete-alert-dialog';
import EditAlertDialog from 'components/edit-alert-dialog';
import TodoItem from 'components/todo-item';
import type { Todo } from 'components/todo-item';

const LOCAL_TODO_LIST_KEY = 'todo-list';

const HomePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>(() => {
    const localData = localStorage.getItem(LOCAL_TODO_LIST_KEY);

    return localData ? JSON.parse(localData) : [];
  });
  const [curSelectTodo, setCurSelectTodo] = useState<Todo | null>(null);
  const taskInputRef = useRef<HTMLInputElement>(null);
  const {
    isOpen: isOpenDeleteAlertDialog,
    onOpen: onOpenDeleteAlertDialog,
    onClose: onCloseDeleteAlertDialog
  } = useDisclosure();
  const {
    isOpen: isOpenEditAlertDialog,
    onOpen: onOpenEditAlertDialog,
    onClose: onCloseEditAlertDialog
  } = useDisclosure();

  const onChangeTaskInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const clearTaskInput = () => {
    taskInputRef!.current!.value = '';
    setTask('');
  };

  const addTodo = () => {
    if (task.length > 0) {
      setTodoList([
        ...todoList,
        { id: todoList.length, task, isCompleted: false }
      ]);
      clearTaskInput();
    }
  };

  const deleteTodo = () => {
    if (isDeleting && curSelectTodo) {
      const idx = todoList.findIndex(todo => todo.id === curSelectTodo.id);

      if (idx >= 0) {
        const cloneTodoList = [...todoList];
        cloneTodoList.splice(idx, 1);
        setTodoList(cloneTodoList);
      }

      setCurSelectTodo(null);
      setIsDeleting(false);
    }
  };

  const editTodo = (newTask: string) => {
    if (isEditing && curSelectTodo) {
      const updatedTodoList = todoList.map(todo => {
        if (todo.id === curSelectTodo.id) return { ...todo, task: newTask };

        return todo;
      });

      setTodoList(updatedTodoList);
      setIsEditing(false);
    }
  };

  const completeTodo = (curSelectTodo: Todo) => {
    const updatedTodoList = todoList.map(todo => {
      if (todo.id === curSelectTodo.id) return { ...todo, isCompleted: true };

      return todo;
    });

    setTodoList(updatedTodoList);
  };

  const saveToLocal = () => {
    localStorage.setItem(LOCAL_TODO_LIST_KEY, JSON.stringify(todoList));
  };

  const openDeleteAlertDialog = (curSelectTodo: Todo) => {
    setIsDeleting(true);
    setCurSelectTodo(curSelectTodo);
    onOpenDeleteAlertDialog();
  };

  const openEditAlertDialog = (curSelectTodo: Todo) => {
    setIsEditing(true);
    setCurSelectTodo(curSelectTodo);
    onOpenEditAlertDialog();
  };

  const closeDeleteAlertDialog = () => {
    setIsDeleting(false);
    setCurSelectTodo(null);
    onCloseDeleteAlertDialog();
  };

  const closeEditAlertDialog = () => {
    setIsEditing(false);
    setCurSelectTodo(null);
    onCloseEditAlertDialog();
  };

  useEffect(() => saveToLocal(), [todoList]);

  return (
    <Container centerContent>
      <Heading fontWeight="extrabold">Todo App</Heading>

      <InputGroup size="md" mt={16}>
        <Input
          pr="4.5rem"
          variant="filled"
          type="text"
          placeholder="Type your new task here..."
          onChange={onChangeTaskInput}
          ref={taskInputRef}
        />

        <InputRightElement width="4.5rem" hidden={task.length === 0}>
          <Button variant="ghost" size="sm" onClick={clearTaskInput}>
            Clear
          </Button>
        </InputRightElement>
      </InputGroup>
      <Text fontSize="xs" width="100%" textAlign="left" color="teal">
        {`Length: ${task.length}`}
      </Text>

      <Button colorScheme="blue" mt={4} onClick={addTodo}>
        Add New Task
      </Button>

      <VStack spacing={2} width="100%" mt={16}>
        {todoList.length === 0 && (
          <Box>
            <Text as="i" colorScheme="gray" opacity={0.5}>
              You have no task to do!
            </Text>
          </Box>
        )}

        {todoList.map((todo, index) => {
          return (
            <TodoItem
              key={index}
              todo={todo}
              onClickEdit={openEditAlertDialog}
              onClickDelete={openDeleteAlertDialog}
              onClickComplete={completeTodo}
            ></TodoItem>
          );
        })}
      </VStack>

      {isDeleting && !isEditing && (
        <DeleteAlertDialog
          isOpen={isOpenDeleteAlertDialog}
          onClose={closeDeleteAlertDialog}
          onConfirm={deleteTodo}
        />
      )}

      {isEditing && !isDeleting && (
        <EditAlertDialog
          curSelectTodo={curSelectTodo}
          isOpen={isOpenEditAlertDialog}
          onClose={closeEditAlertDialog}
          onSave={editTodo}
        />
      )}
    </Container>
  );
};

export default HomePage;
