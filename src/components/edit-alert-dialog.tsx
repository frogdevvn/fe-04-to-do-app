import React, { useEffect, useRef, useState } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Input
} from '@chakra-ui/react';
import type { Todo } from './todo-item';

export type EditAlertDialogProps = {
  curSelectTodo: Todo | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (newTask: string) => void;
};

const EditAlertDialog = ({
  curSelectTodo,
  isOpen,
  onClose,
  onSave
}: EditAlertDialogProps) => {
  const cancelRef = useRef(null);
  const taskInputRef = useRef<HTMLInputElement>(null);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    if (curSelectTodo) setNewTask(curSelectTodo.task);
  }, [curSelectTodo]);

  const onClickSave = () => {
    onSave(newTask);
    onClose();
  };

  const onChangeNewTaskInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Edit Todo
          </AlertDialogHeader>

          <AlertDialogBody>
            <Input
              ref={taskInputRef}
              size="md"
              value={newTask}
              onChange={onChangeNewTaskInput}
            ></Input>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" ml={3} onClick={onClickSave}>
              Save
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default EditAlertDialog;
